
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, GraduationCap, Building2, Target, Eye, Heart, MapPin, Phone, Mail, ChevronDown, Instagram, Youtube, Linkedin, ShoppingCart } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const campuses = [
    { name: "Institut Teknologi Bandung", city: "Bandung", members: 145, established: 2019 },
    { name: "Universitas Padjadjaran", city: "Bandung", members: 98, established: 2020 },
    { name: "Universitas Islam Bandung", city: "Bandung", members: 76, established: 2020 },
    { name: "Universitas Pasundan", city: "Bandung", members: 54, established: 2021 },
    { name: "Institut Teknologi Nasional", city: "Bandung", members: 43, established: 2021 },
    { name: "Universitas Komputer Indonesia", city: "Bandung", members: 67, established: 2022 },
    { name: "Politeknik Negeri Bandung", city: "Bandung", members: 38, established: 2022 },
    { name: "Universitas Pendidikan Indonesia", city: "Bandung", members: 89, established: 2019 }
  ];

  const mitraLogos = [
    "ITB", "UNPAD", "UNISBA", "UNPAS", "ITENAS", "UNIKOM", "POLBAN"
  ];

  const programs = [
    {
      title: "Leadership Development",
      description: "Program pengembangan kepemimpinan mahasiswa melalui workshop dan pelatihan intensif",
      icon: Users,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Creative Workshop",
      description: "Workshop kreatif untuk mengasah keterampilan mahasiswa dalam bidang ekonomi kreatif",
      icon: GraduationCap,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Campus Collaboration",
      description: "Program kolaborasi antar kampus untuk memperkuat jaringan mahasiswa",
      icon: Building2,
      color: "from-purple-500 to-purple-600"
    }
  ];

  const articles = [
    {
      title: "Inovasi Mahasiswa GEKRAFS dalam Bidang Teknologi",
      excerpt: "Mahasiswa GEKRAFS menciptakan aplikasi inovatif untuk membantu UMKM lokal...",
      date: "15 Desember 2024",
      image: "https://via.placeholder.com/300x200"
    },
    {
      title: "Workshop Kewirausahaan: Membangun Startup dari Kampus",
      excerpt: "Event workshop kewirausahaan yang diselenggarakan GEKRAFS berhasil menarik...",
      date: "10 Desember 2024",
      image: "https://via.placeholder.com/300x200"
    },
    {
      title: "Kolaborasi GEKRAFS dengan Industri Kreatif",
      excerpt: "Kerjasama strategis dengan berbagai perusahaan kreatif untuk membuka peluang...",
      date: "5 Desember 2024",
      image: "https://via.placeholder.com/300x200"
    }
  ];

  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoIndex((prevIndex) => (prevIndex + 1) % mitraLogos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [mitraLogos.length]);

  useEffect(() => {
    const articleInterval = setInterval(() => {
      setCurrentArticleIndex((prevIndex) => (prevIndex + 1) % articles.length);
    }, 4000);

    return () => clearInterval(articleInterval);
  }, [articles.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">GEKRAFS</h1>
                <p className="text-sm text-gray-600">Jawa Barat</p>
              </div>
            </div>
            <nav className="flex-1 flex justify-center">
              <div className="flex space-x-6">
                <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Beranda</Link>
                <div className="relative group">
                  <span className="text-gray-700 hover:text-blue-600 transition-colors flex items-center cursor-pointer">
                    Tentang Kami <ChevronDown className="ml-1 h-4 w-4" />
                  </span>
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link to="/organisasi" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Organisasi</Link>
                    <Link to="/ad-art" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">AD/ART</Link>
                    <Link to="/kepengurusan" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Kepengurusan</Link>
                  </div>
                </div>
                <Link to="/program" className="text-gray-700 hover:text-blue-600 transition-colors">Program</Link>
                <Link to="/artikel" className="text-gray-700 hover:text-blue-600 transition-colors">Artikel</Link>
                <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
              </div>
            </nav>
            <div className="flex space-x-4">
              <Link to="/cart">
                <Button variant="outline" className="border-gray-600 text-gray-700 hover:bg-gray-100">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                </Button>
              </Link>
              <Link to="/signin">
                <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                  <span className="mr-2">👤</span>
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Welcome Section */}
      <section id="home" className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl text-gray-600 mb-4">Welcome to</h2>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent mb-6">
              GEKRAFS Kampus<br />Jawa Barat
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              adalah lembaga semi otonom di bawah gerakan ekonomi kreatif nasional 
              yang bergerak di pengembangan potensi mahasiswa dan pelajar
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg px-8 py-3">
              Tentang Kami
            </Button>
          </div>
        </div>
      </section>

      {/* Slider Logo Mitra */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Logo Mitra Kampus Kami</h2>
          <div className="w-full max-w-6xl mx-auto overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentLogoIndex * (100 / 7)}%)` }}
            >
              {mitraLogos.concat(mitraLogos).map((logo, index) => (
                <div key={index} className="w-1/7 flex-shrink-0 px-4">
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-green-50">
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <div className="text-2xl font-bold text-blue-600">{logo}</div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Data Kuantitatif */}
      <section id="statistik" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Data Organisasi</h2>
            <p className="text-xl text-gray-600">Jejak langkah GEKRAFS dalam angka</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <MapPin className="h-12 w-12 mx-auto mb-4 opacity-90" />
                <div className="text-3xl font-bold mb-2">27</div>
                <div className="text-blue-100">Kabupaten & Kota</div>
              </CardContent>
            </Card>
            <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <Building2 className="h-12 w-12 mx-auto mb-4 opacity-90" />
                <div className="text-3xl font-bold mb-2">35</div>
                <div className="text-green-100">Kampus Mitra</div>
              </CardContent>
            </Card>
            <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-90" />
                <div className="text-3xl font-bold mb-2">40</div>
                <div className="text-purple-100">Anggota Aktif</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Visi Misi dengan Foto Pengurus */}
      <section id="visi-misi" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Visi & Misi</h2>
            <p className="text-xl text-gray-600">Fondasi yang menguatkan langkah kami menuju masa depan</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-white">
              <CardHeader className="text-center pb-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-blue-800">Visi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-lg leading-relaxed text-center">
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
                  <li className="flex items-start">
                    <Heart className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Memfasilitasi pengembangan soft skill dan leadership mahasiswa</span>
                  </li>
                  <li className="flex items-start">
                    <Heart className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Menciptakan ekosistem kolaborasi antar kampus di Jawa Barat</span>
                  </li>
                  <li className="flex items-start">
                    <Heart className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Mengembangkan program-program inovatif dan berdampak sosial</span>
                  </li>
                  <li className="flex items-start">
                    <Heart className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Membangun jaringan mahasiswa yang kuat dan saling mendukung</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Foto Pengurus */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-purple-50 to-white">
              <CardHeader className="text-center pb-6">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-purple-800">Pengurus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <GraduationCap className="h-10 w-10 text-white" />
                    </div>
                    <h4 className="font-semibold text-purple-800">Ahmad Rizki</h4>
                    <p className="text-sm text-gray-600">Ketua GEKRAFS Jabar</p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <Users className="h-10 w-10 text-white" />
                    </div>
                    <h4 className="font-semibold text-blue-800">Siti Nurhaliza</h4>
                    <p className="text-sm text-gray-600">Wakil Ketua</p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <Building2 className="h-10 w-10 text-white" />
                    </div>
                    <h4 className="font-semibold text-green-800">Budi Santoso</h4>
                    <p className="text-sm text-gray-600">Sekretaris Jenderal</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sambutan Pembina Organisasi */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Sambutan dari Pembina Organisasi</h2>
            <p className="text-xl text-gray-600">Dukungan dan arahan dari para pembina</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Sambutan Pembina 1 */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-white">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <GraduationCap className="h-16 w-16 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-blue-800 mb-2">Dr. Ahmad Susanto, M.Pd</h3>
                    <p className="text-blue-600 font-semibold mb-4">Ketua GEKRAFS Nasional</p>
                    <p className="text-gray-700 leading-relaxed italic">
                      "GEKRAFS Jawa Barat telah menjadi contoh teladan dalam mengembangkan potensi mahasiswa 
                      di bidang ekonomi kreatif. Semangat kolaborasi dan inovasi yang ditunjukkan sangat 
                      menginspirasi untuk terus berkarya bagi kemajuan bangsa."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sambutan Pembina 2 */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-green-50 to-white">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                      <Users className="h-16 w-16 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-right">
                    <h3 className="text-2xl font-bold text-green-800 mb-2">Prof. Dr. Siti Nurhasanah, M.Si</h3>
                    <p className="text-green-600 font-semibold mb-4">Wakil Ketua GEKRAFS Nasional</p>
                    <p className="text-gray-700 leading-relaxed italic">
                      "Melihat perkembangan GEKRAFS Jawa Barat yang begitu pesat dalam memberdayakan 
                      mahasiswa melalui program-program kreatif, saya yakin generasi muda Indonesia 
                      memiliki masa depan yang cerah dalam membangun ekonomi kreatif nasional."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* List of Programs */}
      <section className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Program Kami</h2>
            <p className="text-xl text-gray-600">Program unggulan untuk pengembangan mahasiswa</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {programs.map((program, index) => (
              <Card key={index} className="shadow-xl border-0 bg-white hover:shadow-2xl transition-shadow duration-300">
                <CardHeader className="text-center pb-6">
                  <div className={`bg-gradient-to-r ${program.color} p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                    <program.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-800">{program.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center leading-relaxed">{program.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Artikel Slider */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Artikel GEKRAFS</h2>
            <p className="text-xl text-gray-600">Berita dan informasi terkini</p>
          </div>
          <div className="max-w-4xl mx-auto overflow-hidden rounded-xl shadow-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentArticleIndex * 100}%)` }}
            >
              {articles.map((article, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Card className="border-0 bg-white">
                    <div className="md:flex">
                      <div className="md:w-1/2">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-64 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-1/2 p-8">
                        <Badge className="mb-4">{article.date}</Badge>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">{article.title}</h3>
                        <p className="text-gray-600 leading-relaxed mb-6">{article.excerpt}</p>
                        <Button variant="outline">Baca Selengkapnya</Button>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section 
        className="py-20 px-4 bg-cover bg-center bg-fixed relative"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
        }}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Need further information?<br />
            Don't hesitate to contact us!
          </h2>
          <Link to="/contact">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg px-8 py-4">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Logo dan Kontak */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">GEKRAFS</h3>
                  <p className="text-sm text-gray-300">Jawa Barat</p>
                </div>
              </div>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>info@gekrafs-jabar.org</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+62 812 3456 7890</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Bandung, Jawa Barat</span>
                </div>
              </div>
            </div>

            {/* Navigasi */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Navigasi</h4>
              <div className="space-y-2">
                <Link to="/" className="block text-gray-300 hover:text-white transition-colors">Beranda</Link>
                <Link to="/organisasi" className="block text-gray-300 hover:text-white transition-colors">Tentang Kami</Link>
                <Link to="/program" className="block text-gray-300 hover:text-white transition-colors">Program</Link>
                <Link to="/artikel" className="block text-gray-300 hover:text-white transition-colors">Artikel</Link>
                <Link to="/contact" className="block text-gray-300 hover:text-white transition-colors">Contact</Link>
              </div>
            </div>

            {/* Media Sosial */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Media Sosial GEKRAFS Kampus Jawa Barat</h4>
              <div className="space-y-2">
                <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                  <Instagram className="h-4 w-4" />
                  <span>Instagram</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.219-5.175 1.219-5.175s-.311-.623-.311-1.544c0-1.446.839-2.525 1.883-2.525.888 0 1.317.664 1.317 1.46 0 .889-.566 2.219-.857 3.449-.244 1.031.517 1.871 1.533 1.871 1.84 0 3.257-1.944 3.257-4.748 0-2.481-1.783-4.216-4.33-4.216-2.95 0-4.684 2.213-4.684 4.499 0 .891.343 1.846.771 2.365.085.102.097.191.072.296-.079.329-.255 1.031-.291 1.175-.047.191-.154.232-.355.139-1.279-.594-2.077-2.461-2.077-3.961 0-3.266 2.371-6.266 6.837-6.266 3.589 0 6.378 2.558 6.378 5.975 0 3.567-2.25 6.434-5.37 6.434-1.048 0-2.037-.546-2.374-1.196 0 0-.52 1.979-.646 2.462-.234.895-.866 2.015-1.289 2.697.971.3 1.999.456 3.063.456 6.621 0 11.99-5.367 11.99-11.987C24.007 5.367 18.637.001 12.017.001z"/>
                  </svg>
                  <span>Tiktok</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span>X</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                  <Youtube className="h-4 w-4" />
                  <span>Youtube</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                  <Linkedin className="h-4 w-4" />
                  <span>Linkedin</span>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GEKRAFS Jawa Barat. Semua hak cipta dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
