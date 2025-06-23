
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, GraduationCap, Building2, Target, Eye, Heart, MapPin, Phone, Mail, ChevronDown } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useState } from "react";

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

  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoIndex((prevIndex) => (prevIndex + 1) % mitraLogos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [mitraLogos.length]);

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
                <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">Beranda</a>
                <div className="relative group">
                  <a href="#tentang" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center">
                    Tentang Kami <ChevronDown className="ml-1 h-4 w-4" />
                  </a>
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <a href="#organisasi" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Organisasi</a>
                    <a href="#ad-art" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">AD/ART</a>
                    <a href="#kepengurusan" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Kepengurusan</a>
                  </div>
                </div>
                <a href="#program" className="text-gray-700 hover:text-blue-600 transition-colors">Program</a>
                <a href="#artikel" className="text-gray-700 hover:text-blue-600 transition-colors">Artikel</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
              </div>
            </nav>
            <div className="flex space-x-4">
              <Button variant="outline" className="border-gray-600 text-gray-700 hover:bg-gray-100">
                <span className="mr-2">🛒</span>
                Cart
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                <span className="mr-2">👤</span>
                Sign In
              </Button>
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

      {/* Sambutan Ketua GEKRAFS Nasional */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Sambutan Ketua 1 */}
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

            {/* Sambutan Ketua 2 */}
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
    </div>
  );
};

export default Index;
