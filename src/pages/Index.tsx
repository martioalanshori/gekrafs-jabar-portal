import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, Target, Eye, ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CampusSlider from "@/components/CampusSlider";
import OrganizationStats from "@/components/OrganizationStats";
import GoogleMapsSection from "@/components/GoogleMapsSection";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Data dummy artikel
  const dummyArticles = [
    {
      id: 1,
      title: "Inovasi Mahasiswa GEKRAFS dalam Bidang Teknologi",
      excerpt: "Mahasiswa GEKRAFS menciptakan aplikasi inovatif untuk membantu UMKM lokal dalam digitalisasi bisnis mereka...",
      image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Teknologi"
    },
    {
      id: 2,
      title: "Workshop Kewirausahaan: Membangun Startup dari Kampus",
      excerpt: "Event workshop kewirausahaan yang diselenggarakan GEKRAFS berhasil menarik lebih dari 200 mahasiswa...",
      image_url: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Kewirausahaan"
    },
    {
      id: 3,
      title: "Festival Ekonomi Kreatif Jawa Barat 2024",
      excerpt: "GEKRAFS Jawa Barat menyelenggarakan festival ekonomi kreatif tahunan yang menampilkan karya-karya inovatif mahasiswa...",
      image_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Event"
    },
    {
      id: 4,
      title: "Program Beasiswa GEKRAFS untuk Mahasiswa Berprestasi",
      excerpt: "GEKRAFS membuka program beasiswa untuk mahasiswa berprestasi dengan latar belakang ekonomi kurang mampu...",
      image_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Beasiswa"
    },
    {
      id: 5,
      title: "Kolaborasi GEKRAFS dengan Pemerintah Daerah",
      excerpt: "Kerjasama strategis GEKRAFS dengan Pemerintah Provinsi Jawa Barat dalam pengembangan ekonomi kreatif...",
      image_url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Kerjasama"
    },
    {
      id: 6,
      title: "Pelatihan Leadership untuk Pengurus GEKRAFS",
      excerpt: "Program pelatihan kepemimpinan intensif untuk meningkatkan kapasitas pengurus GEKRAFS di seluruh Jawa Barat...",
      image_url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Leadership"
    }
  ];

  const totalSlides = Math.ceil(dummyArticles.length / 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 2000);

    return () => clearInterval(timer);
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getSlideArticles = () => {
    const articlesPerSlide = 3;
    const start = currentSlide * articlesPerSlide;
    return dummyArticles.slice(start, start + articlesPerSlide);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
{/* Hero Section - Fixed padding with better spacing */}
<section className="pt-24 sm:pt-28 lg:pt-32 bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 sm:py-12 lg:py-16">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      {/* Image - Shows first on mobile, second on desktop */}
      <div className="relative animate-slide-in-right order-1 lg:order-2">
        <img
          src="assets/img/gedungsate.png"
          alt="Gedung Sate Bandung"
          className="w-full h-auto smooth-transition"
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

      {/* Campus Slider */}
      <CampusSlider />

      {/* Vision Mission Section - Enhanced mobile padding */}
      <section className="py-12 sm:py-16 lg:py-36 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
              Our Vision & Mission
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">Membangun masa depan yang lebih baik melalui kolaborasi dan inovasi</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="grid gap-6 sm:gap-8">
              <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-white">
                <CardHeader className="text-center pb-4 sm:pb-6">
                  <CardTitle className="text-xl sm:text-2xl text-blue-800">Our Vision</CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                    Menjadi organisasi mahasiswa terdepan di Jawa Barat yang menginspirasi generasi muda 
                    untuk berkreasi, berinovasi, dan berkontribusi nyata bagi kemajuan bangsa melalui 
                    kolaborasi lintas kampus yang solid dan berkelanjutan.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 bg-gradient-to-br from-green-50 to-white">
                <CardHeader className="text-center pb-4 sm:pb-6">
                  <CardTitle className="text-xl sm:text-2xl text-green-800">Our Mission</CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <ul className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                    <li>1. Memfasilitasi pengembangan soft skill dan leadership mahasiswa</li>
                    <li>2. Menciptakan ekosistem kolaborasi antar kampus di Jawa Barat</li>
                    <li>3. Mengembangkan program-program inovatif dan berdampak sosial</li>
                    <li>4. Membangun jaringan mahasiswa yang kuat dan saling mendukung</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="relative mt-8 lg:mt-0">
              <img
                src="assets/img/ourvision.jpg"
                alt="Foto Kepengurusan GEKRAFS"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Organization Stats */}
      <OrganizationStats />

      {/* Pembina Message Section - Enhanced mobile padding */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
              Sambutan dari Dewan Pembina
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {/* Pembina 1 */}
              <Card className="shadow-xl border-0 bg-white hover-lift smooth-transition animate-scale-in" style={{ animationDelay: '0.7s' }}>
                <CardContent className="p-6 sm:p-8">
                  <div className="flex flex-col items-center mb-4 sm:mb-6">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                      alt="Dr. Ahmad Fauzi"
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mb-3 sm:mb-4 smooth-transition hover:scale-110"
                    />
                    <h4 className="font-bold text-lg sm:text-xl text-gray-800 text-center">Dr. Ahmad Fauzi, M.Si</h4>
                    <p className="text-gray-600 text-sm sm:text-base">Ketua Dewan Pembina</p>
                  </div>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed italic text-center">
                    "GEKRAFS Jawa Barat adalah manifestasi dari semangat anak muda yang ingin berkontribusi 
                    nyata bagi bangsa. Melalui ekonomi kreatif, kita tidak hanya menciptakan peluang ekonomi, 
                    tetapi juga membangun karakter generasi yang inovatif dan berjiwa entrepreneur."
                  </p>
                </CardContent>
              </Card>

              {/* Pembina 2 */}
              <Card className="shadow-xl border-0 bg-white hover-lift smooth-transition animate-scale-in" style={{ animationDelay: '0.9s' }}>
                <CardContent className="p-6 sm:p-8">
                  <div className="flex flex-col items-center mb-4 sm:mb-6">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                      alt="Prof. Dr. Siti Nurhaliza"
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mb-3 sm:mb-4 smooth-transition hover:scale-110"
                    />
                    <h4 className="font-bold text-lg sm:text-xl text-gray-800 text-center">Prof. Dr. Siti Nurhaliza, M.Pd</h4>
                    <p className="text-gray-600 text-sm sm:text-base">Anggota Dewan Pembina</p>
                  </div>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed italic text-center">
                    "Pendidikan karakter dan pengembangan soft skills menjadi kunci kesuksesan GEKRAFS. 
                    Kami berkomitmen mendampingi mahasiswa untuk menjadi pemimpin masa depan yang berintegritas 
                    dan peduli terhadap kemajuan bangsa."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section - Enhanced mobile padding */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in-up" style={{ animationDelay: '1.0s' }}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Program Unggulan</h2>
            <p className="text-lg sm:text-xl text-gray-600">Program-program inovatif untuk mengembangkan potensi mahasiswa</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
              <Card key={index} className="shadow-lg hover:shadow-xl hover-lift smooth-transition border-0 bg-white animate-scale-in" style={{ animationDelay: `${1.1 + index * 0.1}s` }}>
                <CardHeader className="text-center pb-4">
                  <div className={`bg-gradient-to-r ${program.color} p-3 sm:p-4 rounded-full w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center smooth-transition hover:scale-110`}>
                    <program.icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">{program.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <p className="text-gray-600 text-center text-sm sm:text-base">{program.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Link to="/program">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-sky-600 to-yellow-6000 hover:from-sky-700 hover:to-yellow-700 text-base sm:text-lg px-6 sm:px-8 py-3 hover-lift smooth-transition">
                Lihat Semua Program
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Articles Slider Section - Enhanced mobile padding */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in-up" style={{ animationDelay: '1.4s' }}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Artikel GEKRAFS</h2>
            <p className="text-lg sm:text-xl text-gray-600">Berita dan informasi terbaru dari kegiatan kami</p>
          </div>

          <div className="relative">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {getSlideArticles().map((article, index) => (
                <Card key={article.id} className="shadow-lg hover:shadow-xl hover-lift smooth-transition border-0 bg-white animate-scale-in" style={{ animationDelay: `${1.5 + index * 0.1}s` }}>
                  <div className="relative">
                    <img 
                      src={article.image_url} 
                      alt={article.title}
                      className="w-full h-40 sm:h-48 object-cover rounded-t-lg smooth-transition hover:scale-105"
                    />
                    <Badge className="absolute top-2 sm:top-3 left-2 sm:left-3 text-xs sm:text-sm animate-scale-in" style={{ animationDelay: `${1.6 + index * 0.1}s` }}>{article.category}</Badge>
                  </div>
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="text-base sm:text-lg line-clamp-2">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6">
                    <p className="text-gray-600 text-xs sm:text-sm line-clamp-3 mb-3 sm:mb-4">{article.excerpt}</p>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto hover-lift smooth-transition text-xs sm:text-sm">
                      Baca Selengkapnya
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center mt-6 sm:mt-8 space-x-3 sm:space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={prevSlide}
                className="p-2 hover-lift smooth-transition"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex space-x-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full smooth-transition hover:scale-125 ${
                      currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={nextSlide}
                className="p-2 hover-lift smooth-transition"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Link to="/artikel">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-sky-600 to-yellow-6000 hover:from-sky-700 hover:to-yellow-700 text-base sm:text-lg px-6 sm:px-8 py-3 hover-lift smooth-transition">
                Lihat Semua Artikel
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <GoogleMapsSection />

      {/* CTA Section - Enhanced mobile padding */}
      <section 
        className="py-16 sm:py-20 lg:py-24 relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("assets/img/ourvision.jpg")'
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Need further information?
          </h2>
          <p className="text-xl sm:text-2xl text-white mb-6 sm:mb-8">
            Don't hesitate to contact us!
          </p>
          <Link to="/contact">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-sky-600 to-yellow-6000 hover:from-sky-700 hover:to-yellow-700 text-lg sm:text-xl px-8 sm:px-12 py-3 sm:py-4">
              <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
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