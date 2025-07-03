
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, Target, Eye, ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  const [articles, setArticles] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const fetchArticles = async () => {
    try {
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(6);
      
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 3);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 3) % 3);
  };

  const getSlideArticles = () => {
    const articlesPerSlide = 3;
    const start = currentSlide * articlesPerSlide;
    return articles.slice(start, start + articlesPerSlide);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-16 bg-gradient-to-br from-blue-50 via-white to-green-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight">
                Selamat Datang di{" "}
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  GEKRAFS
                </span>{" "}
                Jawa Barat
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Gerakan Ekonomi Kreatif Mahasiswa dan Pelajar Kampus Jawa Barat - 
                Wadah kolaborasi, kreativitas, dan inovasi untuk masa depan yang lebih baik.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/program">
                  <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg px-8 py-3">
                    Bergabung Dengan Kami
                  </Button>
                </Link>
                <Link to="/organisasi">
                  <Button variant="outline" className="text-lg px-8 py-3">
                    Pelajari Lebih Lanjut
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1555992336-fb0d29498b13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Gedung Sate Bandung"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="grid gap-8">
              <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-white">
                <CardHeader className="text-center pb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-blue-800">Visi</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Menjadi organisasi mahasiswa terdepan di Jawa Barat yang menginspirasi generasi muda 
                    untuk berkreasi, berinovasi, dan berkontribusi nyata bagi kemajuan bangsa melalui 
                    kolaborasi lintas kampus yang solid dan berkelanjutan.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 bg-gradient-to-br from-green-50 to-white">
                <CardHeader className="text-center pb-6">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-green-800">Misi</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-700">
                    <li>• Memfasilitasi pengembangan soft skill dan leadership mahasiswa</li>
                    <li>• Menciptakan ekosistem kolaborasi antar kampus di Jawa Barat</li>
                    <li>• Mengembangkan program-program inovatif dan berdampak sosial</li>
                    <li>• Membangun jaringan mahasiswa yang kuat dan saling mendukung</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Foto Kepengurusan GEKRAFS"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pembina Message Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
              Sambutan dari Pembina Organisasi
            </h2>
            <Card className="max-w-4xl mx-auto shadow-xl border-0 bg-white">
              <CardContent className="p-8">
                <p className="text-lg text-gray-700 leading-relaxed mb-6 italic">
                  "GEKRAFS Jawa Barat adalah manifestasi dari semangat anak muda yang ingin berkontribusi 
                  nyata bagi bangsa. Melalui ekonomi kreatif, kita tidak hanya menciptakan peluang ekonomi, 
                  tetapi juga membangun karakter generasi yang inovatif dan berjiwa entrepreneur."
                </p>
                <div className="text-center">
                  <h4 className="font-bold text-xl text-gray-800">Dr. Ahmad Fauzi, M.Si</h4>
                  <p className="text-gray-600">Pembina GEKRAFS Jawa Barat</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Program Unggulan</h2>
            <p className="text-xl text-gray-600">Program-program inovatif untuk mengembangkan potensi mahasiswa</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Leadership Development",
                description: "Program pengembangan kepemimpinan dan soft skills untuk mahasiswa",
                icon: Users,
                color: "from-blue-500 to-blue-600"
              },
              {
                title: "Entrepreneurship Workshop",
                description: "Pelatihan kewirausahaan dan membangun startup dari kampus",
                icon: Target,
                color: "from-green-500 to-green-600"
              },
              {
                title: "Creative Economy Festival",
                description: "Festival tahunan yang menampilkan karya kreatif mahasiswa",
                icon: GraduationCap,
                color: "from-purple-500 to-purple-600"
              }
            ].map((program, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow border-0 bg-white">
                <CardHeader className="text-center">
                  <div className={`bg-gradient-to-r ${program.color} p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                    <program.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{program.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/program">
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg px-8 py-3">
                Lihat Semua Program
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Articles Slider Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Artikel GEKRAFS</h2>
            <p className="text-xl text-gray-600">Berita dan informasi terbaru dari kegiatan kami</p>
          </div>

          {articles.length > 0 && (
            <div className="relative">
              <div className="grid md:grid-cols-3 gap-8">
                {getSlideArticles().map((article: any, index) => (
                  <Card key={article.id} className="shadow-lg hover:shadow-xl transition-shadow border-0 bg-white">
                    <div className="relative">
                      <img 
                        src={article.image_url} 
                        alt={article.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-3 left-3">{article.category}</Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">{article.excerpt}</p>
                      <Button variant="outline" size="sm">
                        Baca Selengkapnya
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-center items-center mt-8 space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevSlide}
                  className="p-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="flex space-x-2">
                  {[0, 1, 2].map((index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextSlide}
                  className="p-2"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/artikel">
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg px-8 py-3">
                Lihat Semua Artikel
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-24 relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")'
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Need further information?
          </h2>
          <p className="text-2xl text-white mb-8">
            Don't hesitate to contact us!
          </p>
          <Link to="/contact">
            <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-xl px-12 py-4">
              <Phone className="mr-2 h-5 w-5" />
              Contact Us
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
