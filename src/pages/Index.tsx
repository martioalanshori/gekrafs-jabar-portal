
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, GraduationCap, Building2, Target, Eye, Heart, MapPin, Phone, Mail } from "lucide-react";

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

  const totalMembers = campuses.reduce((sum, campus) => sum + campus.members, 0);

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
            <nav className="hidden md:flex space-x-6">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">Beranda</a>
              <a href="#visi-misi" className="text-gray-700 hover:text-blue-600 transition-colors">Visi Misi</a>
              <a href="#kampus" className="text-gray-700 hover:text-blue-600 transition-colors">Kampus</a>
              <a href="#statistik" className="text-gray-700 hover:text-blue-600 transition-colors">Statistik</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
              Gerakan Mahasiswa Kreatif dan Inspiratif
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent mb-6">
              GEKRAFS Jawa Barat
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Menghubungkan mahasiswa kreatif se-Jawa Barat untuk membangun masa depan yang lebih baik 
              melalui kolaborasi, inovasi, dan pengembangan diri yang berkelanjutan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg px-8 py-3">
                Bergabung Sekarang
              </Button>
              <Button variant="outline" className="text-lg px-8 py-3 border-2 border-blue-200 hover:bg-blue-50">
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistik Utama */}
      <section id="statistik" className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <Building2 className="h-12 w-12 mx-auto mb-4 opacity-90" />
                <div className="text-3xl font-bold mb-2">{campuses.length}</div>
                <div className="text-blue-100">Kampus Bergabung</div>
              </CardContent>
            </Card>
            <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-90" />
                <div className="text-3xl font-bold mb-2">{totalMembers.toLocaleString()}</div>
                <div className="text-green-100">Total Anggota</div>
              </CardContent>
            </Card>
            <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <Target className="h-12 w-12 mx-auto mb-4 opacity-90" />
                <div className="text-3xl font-bold mb-2">25+</div>
                <div className="text-purple-100">Program Aktif</div>
              </CardContent>
            </Card>
            <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              <CardContent className="p-6">
                <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-90" />
                <div className="text-3xl font-bold mb-2">5</div>
                <div className="text-orange-100">Tahun Berdiri</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section id="visi-misi" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Visi & Misi</h2>
            <p className="text-xl text-gray-600">Fondasi yang menguatkan langkah kami menuju masa depan</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
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
          </div>
        </div>
      </section>

      {/* Kampus Anggota */}
      <section id="kampus" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Kampus Anggota</h2>
            <p className="text-xl text-gray-600">Universitas dan institusi yang telah bergabung dengan GEKRAFS</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {campuses.map((campus, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="bg-gradient-to-r from-blue-500 to-green-500 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-3">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg leading-tight">{campus.name}</CardTitle>
                  <CardDescription className="flex items-center text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {campus.city}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{campus.members}</div>
                      <div className="text-sm text-gray-500">Anggota</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-600">{campus.established}</div>
                      <div className="text-sm text-gray-500">Bergabung</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-green-500 p-2 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">GEKRAFS Jawa Barat</h3>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Organisasi mahasiswa yang menghubungkan kreativitas dan inovasi 
                di seluruh kampus Jawa Barat.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Kontak</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-blue-400" />
                  <span className="text-gray-300">info@gekrafs-jabar.org</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-green-400" />
                  <span className="text-gray-300">+62 812 3456 7890</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-red-400" />
                  <span className="text-gray-300">Bandung, Jawa Barat</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Program Unggulan</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Leadership Development</li>
                <li>• Innovation Challenge</li>
                <li>• Social Impact Projects</li>
                <li>• Inter-Campus Collaboration</li>
                <li>• Skill Enhancement Workshop</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 GEKRAFS Jawa Barat. Semua hak cipta dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
