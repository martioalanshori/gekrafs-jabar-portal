
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart, CreditCard, ArrowLeft } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<{[key: string]: number}>({});
  const [products, setProducts] = useState<any[]>([]);
  const [shippingData, setShippingData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.cartItems && location.state?.products) {
      setCartItems(location.state.cartItems);
      setProducts(location.state.products);
    } else {
      // Redirect back to ecommerce if no cart data
      navigate('/ecommerce');
    }
  }, [location.state, navigate]);

  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getCartProducts = () => {
    return Object.entries(cartItems).map(([productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      return { ...product, quantity };
    }).filter(item => item.id);
  };

  const getTotalAmount = () => {
    return getCartProducts().reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleCheckout = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            user_id: user.id,
            total_amount: getTotalAmount(),
            status: 'pending',
            payment_method: 'midtrans',
            shipping_address: `${shippingData.fullName}, ${shippingData.phone}, ${shippingData.address}, ${shippingData.city}, ${shippingData.postalCode}`
          }
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = getCartProducts().map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Simulate Midtrans integration
      alert(`Pesanan berhasil dibuat dengan ID: ${order.id}. Integrasi Midtrans akan segera tersedia untuk pembayaran.`);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating order:', error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const cartProducts = getCartProducts();

  if (cartProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-16">
          <div className="container mx-auto px-4 py-20 text-center">
            <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">Keranjang Kosong</h2>
            <Link to="/ecommerce">
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                Mulai Berbelanja
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-8">
            <Link to="/ecommerce">
              <Button variant="ghost" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali Belanja
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-xl">Ringkasan Pesanan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  {cartProducts.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 pb-4 border-b">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{item.name}</h4>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(getTotalAmount())}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Ongkos Kirim</span>
                    <span className="text-green-600">Gratis</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between text-lg font-bold text-gray-800">
                      <span>Total</span>
                      <span>{formatPrice(getTotalAmount())}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Form */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-xl">Informasi Pengiriman</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => { e.preventDefault(); handleCheckout(); }} className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Nama Lengkap</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={shippingData.fullName}
                      onChange={handleInputChange}
                      placeholder="Nama penerima"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={shippingData.phone}
                      onChange={handleInputChange}
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Alamat Lengkap</Label>
                    <Input
                      id="address"
                      name="address"
                      type="text"
                      required
                      value={shippingData.address}
                      onChange={handleInputChange}
                      placeholder="Jalan, No. Rumah, RT/RW"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">Kota</Label>
                      <Input
                        id="city"
                        name="city"
                        type="text"
                        required
                        value={shippingData.city}
                        onChange={handleInputChange}
                        placeholder="Kota"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Kode Pos</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        type="text"
                        required
                        value={shippingData.postalCode}
                        onChange={handleInputChange}
                        placeholder="12345"
                      />
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Metode Pembayaran</h4>
                    <p className="text-sm text-blue-700">
                      Pembayaran akan diproses melalui Midtrans dengan berbagai pilihan metode pembayaran
                      (Credit Card, Bank Transfer, E-wallet, dll.)
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 mt-6"
                  >
                    {loading ? (
                      "Memproses..."
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Bayar Sekarang - {formatPrice(getTotalAmount())}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
