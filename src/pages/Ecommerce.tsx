
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, Filter, Star, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Product } from "@/types/database";
import { useAuth } from "@/contexts/AuthContext";

const Ecommerce = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { user } = useAuth();

  // Data dummy produk
  const dummyProducts: Product[] = [
    {
      id: "1",
      name: "Kerajinan Tangan Tradisional",
      description: "Kerajinan tangan buatan mahasiswa dengan sentuhan tradisional modern yang indah dan berkualitas tinggi",
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
      description: "Tas rajut berkualitas tinggi dengan desain unik dan fungsional, cocok untuk sehari-hari",
      price: 85000,
      image_url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      seller_id: "1",
      category: "Fashion",
      stock: 15,
      active: true
    },
    {
      id: "3",
      name: "Lukisan Canvas Modern",
      description: "Lukisan canvas dengan tema modern minimalis cocok untuk dekorasi rumah atau kantor",
      price: 200000,
      image_url: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      seller_id: "1", 
      category: "Seni",
      stock: 5,
      active: true
    },
    {
      id: "4",
      name: "Batik Modern Jabar",
      description: "Kain batik dengan motif khas Jawa Barat yang dipadukan dengan desain modern",
      price: 120000,
      image_url: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      seller_id: "1",
      category: "Fashion",
      stock: 20,
      active: true
    },
    {
      id: "5",
      name: "Produk Organik Lokal",
      description: "Produk makanan organik hasil pertanian lokal Jawa Barat yang sehat dan bergizi",
      price: 45000,
      image_url: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      seller_id: "1",
      category: "Makanan",
      stock: 30,
      active: true
    },
    {
      id: "6",
      name: "Aksesoris Unik Handmade",
      description: "Aksesoris unik buatan tangan dengan bahan berkualitas dan desain yang menarik",
      price: 75000,
      image_url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      seller_id: "1",
      category: "Aksesoris",
      stock: 12,
      active: true
    }
  ];

  const categories = ["All", "Kerajinan", "Fashion", "Seni", "Makanan", "Aksesoris"];

  useEffect(() => {
    setProducts(dummyProducts);
  }, []);

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] && newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory && product.active;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <div className="pt-16">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Toko GEKRAFS</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Produk kreatif dan inovatif dari mahasiswa GEKRAFS Jawa Barat
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-12 space-y-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Cari produk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="mb-2"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="shadow-lg hover:shadow-xl transition-shadow border-0 bg-white overflow-hidden">
                <div className="relative">
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-3 left-3">{product.category}</Badge>
                  <div className="absolute top-3 right-3 bg-white rounded-full p-1">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">4.5</span>
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">{product.description}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      Rp {product.price.toLocaleString()}
                    </span>
                    <Badge variant="outline">
                      Stock: {product.stock}
                    </Badge>
                  </div>

                  {user ? (
                    <div className="space-y-2">
                      {cart[product.id] ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeFromCart(product.id)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-medium">{cart[product.id]}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addToCart(product.id)}
                              disabled={cart[product.id] >= product.stock}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button className="flex-1 ml-4">
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Di Keranjang
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          className="w-full"
                          onClick={() => addToCart(product.id)}
                          disabled={product.stock === 0}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {product.stock === 0 ? 'Stok Habis' : 'Tambah ke Keranjang'}
                        </Button>
                      )}
                    </div>
                  ) : (
                    <Link to="/signin">
                      <Button className="w-full">
                        Login untuk Membeli
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Tidak ada produk yang ditemukan.</p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Cart Button */}
      {user && getTotalItems() > 0 && (
        <Link to="/cart">
          <Button 
            className="fixed bottom-6 right-6 rounded-full p-4 shadow-2xl bg-gradient-to-r from-sky-600 to-yellow-6000 hover:from-sky-700 hover:to-yellow-700"
            size="lg"
          >
            <ShoppingCart className="h-6 w-6 mr-2" />
            <span className="font-bold">{getTotalItems()}</span>
          </Button>
        </Link>
      )}
      
      <Footer />
    </div>
  );
};

export default Ecommerce;
