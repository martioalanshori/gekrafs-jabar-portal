
import { useState, useEffect, useRef } from "react";
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
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose
} from "@/components/ui/drawer";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

const Ecommerce = () => {
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const { user } = useAuth();
  const [isBannerActive, setIsBannerActive] = useState(false);
  const carouselApiRef = useRef(null);
  const autoSlideInterval = useRef<NodeJS.Timeout | null>(null);

  // Fetch products from Supabase
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Product[];
    },
  });

  // Get unique categories from products
  const categories = ["All", ...Array.from(new Set(products?.map(p => p.category).filter(Boolean)))];

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('gekrafs-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('gekrafs-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-slide logic
  useEffect(() => {
    if (!carouselApiRef.current) return;
    const api = carouselApiRef.current;
    if (!api) return;
    function nextSlide() {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0); // Loop to first
      }
    }
    autoSlideInterval.current && clearInterval(autoSlideInterval.current);
    autoSlideInterval.current = setInterval(nextSlide, 4000);
    return () => {
      autoSlideInterval.current && clearInterval(autoSlideInterval.current);
    };
  }, [carouselApiRef.current]);

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
    
    return matchesSearch && matchesCategory;
  });

  // Loading spinner lebih friendly
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Header />
        <div className="pt-16 flex flex-col items-center justify-center min-h-[50vh]">
          <ShoppingCart className="animate-spin h-16 w-16 text-sky-600 mb-4 opacity-80" />
          <div className="text-gray-500 text-lg">Memuat produk...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error loading products</p>
            <p className="text-gray-600">{(error as Error).message}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <div className="pt-16">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Toko GEKRAFS Kampus Jabar</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Produk Digital Dari GEKRAFS Kampus Jabar
            </p>

            {/* Banner/Ads Slider */}
            <div
              className="my-8 max-w-8xl mx-auto group relative"
              onMouseEnter={() => setIsBannerActive(true)}
              onMouseLeave={() => setIsBannerActive(false)}
              onTouchStart={() => setIsBannerActive(true)}
              onTouchEnd={() => setIsBannerActive(false)}
            >
              <Carousel className="w-full" setApi={api => (carouselApiRef.current = api)}>
                <CarouselContent>
                  {/* Slide 1 */}
                  <CarouselItem>
                    <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden shadow-md bg-gradient-to-r from-black/80 to-yellow-900/60 flex items-center">
                      <img src="/assets/img/gedungsate.png" alt="Banner 1" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                      {/* Overlay label */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-black/80 text-white text-xs font-bold px-3 py-1 rounded-lg">Tokopedia</span>
                        <span className="bg-black/80 text-white text-xs font-bold px-3 py-1 rounded-lg">Shopee</span>
                        <span className="bg-black/80 text-white text-xs font-bold px-3 py-1 rounded-lg">Whatsapp</span>
                      </div>
                      {/* Headline & subheadline */}
                      <div className="relative z-10 pl-8">
                        <div className="text-2xl sm:text-4xl font-extrabold text-white drop-shadow mb-2">Super Brand Day</div>
                        <div className="text-3xl sm:text-5xl font-extrabold text-yellow-200 drop-shadow mb-4">Diskon s.d. 50%</div>
                      </div>
                      {/* Button kanan bawah */}
                      <a href="#" className="absolute bottom-4 right-4 bg-black/80 text-white text-xs font-semibold px-4 py-2 rounded-md shadow hover:bg-black/90 transition">Lihat Promo Lainnya</a>
                      {/* Dot indicator */}
                      <div className="absolute left-6 bottom-4 flex gap-2">
                        <span className="w-2 h-2 rounded-full bg-white/80" />
                        <span className="w-2 h-2 rounded-full bg-white/40" />
                        <span className="w-2 h-2 rounded-full bg-white/40" />
                      </div>
                    </div>
                  </CarouselItem>
                  {/* Slide 2 */}
                  <CarouselItem>
                    <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden shadow-md bg-gradient-to-r from-blue-900/80 to-blue-400/60 flex items-center">
                      <img src="/assets/img/ourvision.jpg" alt="Banner 2" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                      <a href="#" className="absolute bottom-4 right-4 bg-black/80 text-white text-xs font-semibold px-4 py-2 rounded-md shadow hover:bg-black/90 transition">Lihat Detail</a>
                      <div className="absolute left-6 bottom-4 flex gap-2">
                        <span className="w-2 h-2 rounded-full bg-white/40" />
                        <span className="w-2 h-2 rounded-full bg-white/80" />
                        <span className="w-2 h-2 rounded-full bg-white/40" />
                      </div>
                    </div>
                  </CarouselItem>
                  {/* Slide 3 */}
                  <CarouselItem>
                    <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden shadow-md bg-gradient-to-r from-gray-900/80 to-gray-400/60 flex items-center">
                      <img src="/assets/img/gekrafslogo.png" alt="Banner 3" className="absolute inset-0 w-full h-full object-contain bg-white opacity-80 p-6" />
                      <a href="#" className="absolute bottom-4 right-4 bg-black/80 text-white text-xs font-semibold px-4 py-2 rounded-md shadow hover:bg-black/90 transition">Lihat Semua</a>
                      <div className="absolute left-6 bottom-4 flex gap-2">
                        <span className="w-2 h-2 rounded-full bg-white/40" />
                        <span className="w-2 h-2 rounded-full bg-white/40" />
                        <span className="w-2 h-2 rounded-full bg-white/80" />
                      </div>
                    </div>
                  </CarouselItem>
                </CarouselContent>
                {/* Tombol navigasi dengan fade dan posisi di luar banner */}
                <CarouselPrevious
                  className={`transition-opacity duration-300 absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white shadow-lg rounded-full w-10 h-10 ${isBannerActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                />
                <CarouselNext
                  className={`transition-opacity duration-300 absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white shadow-lg rounded-full w-10 h-10 ${isBannerActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                />
              </Carousel>
            </div>
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

            {/* Kategori lebih menarik */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  className={`mb-2 rounded-full px-4 py-1 transition-all duration-200 ${selectedCategory === category ? 'bg-sky-600 text-white' : 'bg-white text-sky-600 border-sky-600'}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white overflow-hidden rounded-2xl transform hover:-translate-y-1 hover:scale-105"
              >
                <div className="relative">
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-3 left-3 bg-sky-600 text-white px-3 py-1 rounded-full text-xs shadow-md">
                    {product.category}
                  </Badge>
                  <div className="absolute top-3 right-3 bg-white rounded-full p-1 shadow">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">4.5</span>
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2 font-bold text-gray-800">{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">{product.description}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-sky-600 drop-shadow-sm">
                      Rp {product.price.toLocaleString()}
                    </span>
                    <Badge className="bg-gray-100 text-gray-700 border border-gray-300 px-2 py-0.5 rounded-full text-xs">
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
                              className="rounded-full border-sky-200"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-medium text-lg">{cart[product.id]}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addToCart(product.id)}
                              disabled={cart[product.id] >= product.stock}
                              className="rounded-full border-sky-200"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button className="flex-1 ml-4 bg-sky-600 to-green-500 hover:from-sky-700 hover:to-green-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 active:scale-95">
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Di Keranjang
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          className="w-full bg-sky-600 to-green-500 hover:from-sky-700 hover:to-green-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 active:scale-95"
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
                      <Button className="w-full bg-sky-600 to-green-500 hover:from-sky-700 hover:to-green-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200">
                        Login untuk Membeli
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 flex flex-col items-center">
              <img src="/public/placeholder.svg" alt="No products" className="w-24 h-24 mb-4 opacity-60" />
              <p className="text-gray-500 text-lg">Tidak ada produk yang ditemukan.</p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Cart Button */}
      {user && getTotalItems() > 0 && (
        isMobile ? (
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger asChild>
              <Button
                className="fixed bottom-8 right-8 z-50 rounded-full p-6 shadow-2xl bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-gray-900 text-white flex items-center space-x-2 transition-colors duration-300 ease-in-out border-4 border-white"
                size="icon"
                style={{ width: 72, height: 72 }}
              >
                <div className="relative flex items-center justify-center">
                  <ShoppingCart className="h-8 w-8 mr-0 text-white" />
                  <span
                    className="absolute -top-3 -right-5 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5 shadow min-w-[20px] text-center border-2 border-white"
                    style={{ fontSize: 12, lineHeight: '16px' }}
                  >
                    {getTotalItems()}
                  </span>
                </div>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-w-md mx-auto">
              <DrawerHeader>
                <DrawerTitle>Keranjang Belanja</DrawerTitle>
              </DrawerHeader>
              <div className="p-4 space-y-4">
                {Object.keys(cart).length === 0 ? (
                  <div className="text-center text-gray-500 py-8">Keranjang kosong.</div>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(cart).map(([productId, qty]) => {
                      const product = products.find(p => p.id === productId);
                      if (!product) return null;
                      return (
                        <div key={productId} className="flex items-center gap-4 border-b pb-2">
                          <img src={product.image_url} alt={product.name} className="w-16 h-16 object-cover rounded" />
                          <div className="flex-1">
                            <div className="font-semibold">{product.name}</div>
                            <div className="text-sm text-gray-500">Rp {product.price.toLocaleString()} x {qty}</div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button size="icon" variant="outline" onClick={() => removeFromCart(productId)}><Minus className="h-4 w-4" /></Button>
                            <span className="mx-2 font-bold">{qty}</span>
                            <Button size="icon" variant="outline" onClick={() => addToCart(productId)} disabled={qty >= product.stock}><Plus className="h-4 w-4" /></Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <DrawerFooter>
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total</span>
                  <span>Rp {Object.entries(cart).reduce((sum, [productId, qty]) => {
                    const product = products.find(p => p.id === productId);
                    return sum + (product ? product.price * qty : 0);
                  }, 0).toLocaleString()}</span>
                </div>
                <Link to="/cart">
                  <Button className="w-full">Lihat Keranjang & Checkout</Button>
                </Link>
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full">Tutup</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        ) : (
          <Link to="/cart">
            <Button
              className="fixed bottom-8 right-8 z-50 rounded-full p-6 shadow-2xl bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-gray-900 text-white flex items-center space-x-2 transition-colors duration-300 ease-in-out border-4 border-white"
              size="icon"
              style={{ width: 72, height: 72 }}
            >
              <div className="relative flex items-center justify-center">
                <ShoppingCart className="h-8 w-8 mr-0 text-white" />
                <span
                  className="absolute -top-3 -right-5 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5 shadow min-w-[20px] text-center border-2 border-white"
                  style={{ fontSize: 12, lineHeight: '16px' }}
                >
                  {getTotalItems()}
                </span>
              </div>
            </Button>
          </Link>
        )
      )}
      
      <Footer />
    </div>
  );
};

export default Ecommerce;
