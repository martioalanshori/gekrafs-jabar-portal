import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Monitor, Wrench, ShoppingCart, Users, BookOpen, Laptop, Video, TrendingUp, ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LogoSlider from "@/components/LogoSlider";
import OrganizationStats from "@/components/OrganizationStats";
import GoogleMapsSection from "@/components/GoogleMapsSection";
import { supabase } from "@/integrations/supabase/client";
import DynamicMetaTags from "@/components/DynamicMetaTags";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [articles, setArticles] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      supabase.from('articles').select('*').eq('published', true).order('created_at', { ascending: false }).limit(6),
      supabase.from('products').select('*').eq('active', true).order('created_at', { ascending: false }).limit(6)
    ]).then(([articlesRes, productsRes]) => {
      if (articlesRes.error) setError(articlesRes.error.message);
      else setArticles(articlesRes.data || []);
      if (productsRes.error) setError(productsRes.error.message);
      else setProducts(productsRes.data || []);
      setLoading(false);
    });
  }, []);

  const totalSlides = Math.ceil(articles.length / 3);

  useEffect(() => {
    if (articles.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);
    return () => clearInterval(timer);
  }, [totalSlides, articles.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getSlideArticles = () => {
    const articlesPerSlide = 3;
    const start = currentSlide * articlesPerSlide;
    return articles.slice(start, start + articlesPerSlide);
  };

  // Data testimoni vendor
  const testimonials = [
    {
      id: 1,
      name: "Avip Firmansyah",
      company: "Dewan Pengarah",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      testimonial: "GEKRAFS Jawa Barat adalah manifestasi dari semangat anak muda yang ingin berkontribusi nyata bagi bangsa. Melalui ekonomi kreatif, kita tidak hanya menciptakan peluang ekonomi, tetapi juga membangun karakter generasi yang inovatif dan berjiwa entrepreneur.",
    },
    {
      id: 2,
      name: "Ervin Luthfi",
      company: "Dewan Pengarah",
      photo: "https://randomuser.me/api/portraits/men/22.jpg",
      testimonial: "GEKRAFS Jawa Barat menjadi wadah kolaboratif bagi para pemuda untuk menyalurkan ide dan kreativitasnya. Lewat ekonomi kreatif, kita tidak hanya membentuk ekosistem industri yang berdaya saing, tetapi juga mendorong lahirnya talenta-talenta muda yang visioner dan berdampak bagi masa depan bangsa.",
    },
    {
      id: 3,
      name: "Dodi Gustari",
      company: "Dewan Pengarah",
      photo: "https://randomuser.me/api/portraits/men/65.jpg",
      testimonial: "GEKRAFS Jawa Barat adalah ruang tumbuh bagi generasi muda untuk berkarya dan berinovasi, menjadikan kreativitas sebagai kekuatan pembangunan bangsa."
    }
  ];

  return (
    <div className="min-h-screen">
      <DynamicMetaTags 
        title="GEKRAFS Kampus Jawa Barat - Organisasi Mahasiswa Kreatif"
        description="Gerakan Ekonomi Kreatif Mahasiswa Kampus Jawa Barat. Wadah mahasiswa untuk berkolaborasi, kreativitas, dan inovasi untuk masa depan yang lebih baik."
        image="/assets/img/gekrafslogo.png"
        type="website"
      />
      <Header />
     {/* Hero Section */}
     <section className="pt-24 sm:pt-28 lg:pt-32 bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image - Shows first on mobile, second on desktop */}
            <div className="relative animate-slide-in-right order-1 lg:order-2">
              <img
                src="assets/img/gedungsate.png"
                alt="Gedung Sate Bandung"
                className="w-full h-auto rounded-2xl shadow-2xl smooth-transition hover:scale-105"
              />
            </div>
            
            {/* Text Content - Shows second on mobile, first on desktop */}
            <div className="text-left space-y-4 sm:space-y-6 animate-fade-in-up order-2 lg:order-1">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-800 leading-tight">
                Selamat Datang di{" "}
                <span className="bg-gradient-to-r from-sky-600 to-yellow-600 bg-clip-text text-transparent">
                  GEKRAFS
                </span>{" "}
                Kampus
                <br />
                Jawa Barat
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                Gerakan Ekonomi Kreatif Mahasiswa Kampus Jawa Barat
                Wadah mahasiswa untuk berkolaborasi, kreativitas, dan inovasi untuk masa depan yang lebih baik.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <Link to="/program">
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-sky-600 to-yellow-600 hover:from-sky-700 hover:to-yellow-700 text-base sm:text-lg px-6 sm:px-8 py-3 hover-lift smooth-transition">
                    Bergabung Dengan Kami
                  </Button>
                </Link>
                <Link to="/organisasi">
                  <Button variant="outline" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 hover-lift smooth-transition">
                    Pelajari Lebih Lanjut
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* Logo Slider */}
            <LogoSlider/>

<OrganizationStats/>

      {/* Vision Mission Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
              Visi & Misi Perusahaan
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">Menjadi pusat solusi IT dan pelatihan komputer terbaik di Cianjur</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="grid gap-6 sm:gap-8">
              <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-white hover-lift smooth-transition">
                <CardHeader className="text-center pb-4 sm:pb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center smooth-transition hover:scale-110">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl text-blue-800">Visi</CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                  Menjadi organisasi mahasiswa terdepan di Jawa Barat yang menginspirasi generasi muda untuk berkreasi, berinovasi, dan berkontribusi nyata bagi kemajuan bangsa melalui kolaborasi lintas kampus yang solid dan berkelanjutan.                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-xl border-0 bg-gradient-to-br from-green-50 to-white hover-lift smooth-transition">
                <CardHeader className="text-center pb-4 sm:pb-6">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center smooth-transition hover:scale-110">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl text-green-800">Misi</CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <ul className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                    <li className="smooth-transition hover:translate-x-2">1. Memfasilitasi pengembangan soft skill dan leadership mahasiswa.</li>
                    <li className="smooth-transition hover:translate-x-2">2. Menciptakan ekosistem kolaborasi antar kampus di Jawa Barat.</li>
                    <li className="smooth-transition hover:translate-x-2">3. Mengembangkan program-program inovatif dan berdampak sosial.</li>
                    <li className="smooth-transition hover:translate-x-2">4. Membangun jaringan mahasiswa yang kuat dan saling mendukung.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <div className="relative mt-8 lg:mt-0 animate-slide-in-right">
              <img
                src="assets/img/ourvision.jpg"
                alt="Toko GEKRAFS Kampus Jabar Cianjur"
                className="rounded-2xl shadow-2xl w-full h-auto hover-lift smooth-transition"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimoni Vendor */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Sambutan Dewan Pengarah</h2>
            <p className="text-lg sm:text-xl text-gray-600">Dewan Pengarah GEKRAFS Kampus Jawa Barat</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {testimonials.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col p-6">
                <img src={item.photo} alt={item.name} className="w-16 h-16 rounded-full mx-auto mb-3 object-cover" />
                <h3 className="font-bold text-lg text-center">{item.name}</h3>
                <p className="text-sky-600 text-sm text-center mb-1">{item.company}</p>
                <p className="text-gray-700 text-sm text-center italic flex-1">"{item.testimonial}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Articles Slider Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Artikel dan Kegiatan</h2>
            <p className="text-lg sm:text-xl text-gray-600">Dokumentasi berbagai artikel dan kegiatan yang telah kami laksanakan dengan sukses.</p>
          </div>
          {loading ? (
            <div className="text-center text-gray-500 py-12">Loading data dari database...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-12">{error}</div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {articles.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                  <div className="relative">
                    <img
                      src={item.image_url || "/public/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-40 object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-sky-600 text-white text-xs px-3 py-1 rounded-full shadow">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 flex-1">{item.excerpt || item.content?.slice(0, 100) + "..."}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400 mt-auto">
                      <span>
                        <svg className="inline-block mr-1" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="7"/><path d="M8 4v4l3 3"/></svg>
                        {item.created_at ? new Date(item.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : ""}
                      </span>
                      <span>
                        <svg className="inline-block mr-1" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10.5a8.38 8.38 0 0 1-1.9 5.4L12 21l-7.1-5.1A8.38 8.38 0 0 1 3 10.5C3 6.36 6.36 3 10.5 3S18 6.36 18 10.5z"/><circle cx="12" cy="10.5" r="2.5"/></svg>
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-8 sm:mt-12">
            <Link to="/artikel" className="text-sky-600 hover:text-sky-800">
              <Button className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white text-base sm:text-lg px-6 sm:px-8 py-3 transition-all duration-300 ease-in-out">
                Lihat Semua Galeri
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-16 sm:py-20 lg:py-24 relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://cdn0-production-images-kly.akamaized.net/6GmAl7WTROc8OOUlojkP_l9cqTw=/0x86:1600x987/800x450/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4665617/original/086927100_1701140014-Ilustrasi_karyawan__bekerja__suasana_kantor.jpg")'
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
          Butuh Informasi Lebih Lanjut?
          </h2>
          <p className="text-xl sm:text-2xl text-white mb-6 sm:mb-8">
          Jangan ragu untuk menghubungi kami!
          </p>
          <Link to="/contact" className="text-sky-600 hover:text-sky-800">
          <Button className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white text-base sm:text-lg px-6 sm:px-8 py-3 transition-all duration-300 ease-in-out">
          <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Hubungi GEKRAFS Kampus Jabar
            </Button>
          </Link>
        </div>
      </section>

      {/* Google Maps Section */}
      <GoogleMapsSection />


      <Footer />
    </div>
  );
};

export default Index;