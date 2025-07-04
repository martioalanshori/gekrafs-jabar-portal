
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Product } from "@/types/database";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Cart = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<{[key: string]: number}>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("transfer");
  const [loading, setLoading] = useState(false);

  // Data dummy produk (sama seperti di Ecommerce)
  const dummyProducts: Product[] = [
    {
      id: "1",
      name: "Kerajinan Tangan Tradisional",
      description: "Kerajinan tangan buatan mahasiswa dengan sentuhan tradisional modern",
      price: 150000,
      image_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      seller_id: "1",
      category: "Kerajinan",
      stock: 10,
      active: true
    },
    {
      id: "2", 
      name: "Tas Rajut Handmade",
      description: "Tas rajut berkualitas tinggi dengan desain unik dan fungsional",
      price: 85000,
      image_url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      seller_id: "1",
      category: "Fashion",
      stock: 15,
      active: true
    }
  ];

  useEffect(() => {
    setProducts(dummyProducts);
    // Simulate cart items for demo
    setCartItems({ "1": 2, "2": 1 });
  }, []);

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      const newCart = { ...cartItems };
      delete newCart[productId];
      setCartItems(newCart);
    } else {
      setCartItems(prev => ({
        ...prev,
        [productId]: newQuantity
      }));
    }
  };

  const removeItem = (productId: string) => {
    const newCart = { ...cartItems };
    delete newCart[productId];
    setCartItems(newCart);
  };

  const getTotalPrice = () => {
    return Object.entries(cartItems).reduce((total, [productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      return total + (product ? product.price * quantity : 0);
    }, 0);
  };

  const handleCheckout = async () => {
    if (!shippingAddress.trim()) {
      toast.error("Alamat pengiriman harus diisi");
      return;
    }

    setLoading(true);
    try {
      // Create order in Supabase
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user?.id,
          total_amount: getTotalPrice() + 15000, // Include shipping cost
          status: 'pending',
          payment_method: paymentMethod,
          shipping_address: shippingAddress
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = Object.entries(cartItems).map(([productId, quantity]) => {
        const product = products.find(p => p.id === productId);
        return {
          order_id: order.id,
          product_id: productId,
          quantity,
          price: product?.price || 0
        };
      });

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      toast.success("Pesanan berhasil dibuat! Silakan tunggu konfirmasi pembayaran dari admin.");
      setCartItems({});
      
      // Navigate to a success page or order details
      navigate(`/dashboard`, { 
        state: { 
          message: `Pesanan #${order.id.slice(0, 8)} berhasil dibuat. Status: Menunggu Pembayaran`,
          orderId: order.id 
        } 
      });
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error("Gagal membuat pesanan");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  const cartProducts = products.filter(product => cartItems[product.id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <div className="pt-16">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Keranjang Belanja</h1>
            <p className="text-xl text-gray-600">
              Review pesanan Anda sebelum checkout
            </p>
          </div>

          {cartProducts.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-600 mb-2">Keranjang Kosong</h2>
              <p className="text-gray-500 mb-6">Belum ada produk di keranjang Anda</p>
              <Button onClick={() => navigate('/ecommerce')} className="bg-gradient-to-r from-sky-600 to-yellow-6000">
                Mulai Belanja
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartProducts.map((product) => (
                  <Card key={product.id} className="shadow-lg border-0 bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{product.name}</h3>
                          <p className="text-gray-600 text-sm">{product.description}</p>
                          <p className="text-blue-600 font-bold text-lg">
                            Rp {product.price.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(product.id, cartItems[product.id] - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            value={cartItems[product.id]}
                            onChange={(e) => updateQuantity(product.id, parseInt(e.target.value) || 0)}
                            className="w-16 text-center"
                            min="0"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(product.id, cartItems[product.id] + 1)}
                            disabled={cartItems[product.id] >= product.stock}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeItem(product.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Checkout Form */}
              <div className="space-y-6">
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle>Ringkasan Pesanan</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>Rp {getTotalPrice().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ongkos Kirim</span>
                      <span>Rp 15.000</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>Rp {(getTotalPrice() + 15000).toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle>Informasi Pengiriman</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Alamat Lengkap</label>
                      <Textarea
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        placeholder="Masukkan alamat lengkap Anda..."
                        className="min-h-20"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Metode Pembayaran</label>
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                      >
                        <option value="transfer">Transfer Bank</option>
                        <option value="cod">Bayar di Tempat (COD)</option>
                      </select>
                    </div>

                    <Button
                      onClick={handleCheckout}
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-sky-600 to-yellow-6000 hover:from-sky-700 hover:to-yellow-700"
                    >
                      {loading ? "Memproses..." : "Checkout"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;
