
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, GraduationCap, Building2, Calendar, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Program = () => {
  const programs = [
    {
      title: "Leadership Development Program",
      description: "Program pengembangan kepemimpinan mahasiswa melalui workshop dan pelatihan intensif selama 3 bulan",
      icon: Users,
      color: "from-blue-500 to-blue-600",
      duration: "3 Bulan",
      location: "Bandung",
      schedule: "Setiap Sabtu",
      status: "Aktif",
      participants: "50 Peserta"
    },
    {
      title: "Creative Workshop Series",
      description: "Workshop kreatif bulanan untuk mengasah keterampilan mahasiswa dalam bidang ekonomi kreatif",
      icon: GraduationCap,
      color: "from-green-500 to-green-600",
      duration: "1 Hari",
      location: "Berbagai Kampus",
      schedule: "Bulanan",
      status: "Aktif",
      participants: "30 Peserta/Workshop"
    },
    {
      title: "Campus Collaboration Project",
      description: "Program kolaborasi antar kampus untuk memperkuat jaringan mahasiswa dan berbagi best practices",
      icon: Building2,
      color: "from-purple-500 to-purple-600",
      duration: "6 Bulan",
      location: "Multi Kampus",
      schedule: "Mingguan",
      status: "Mendatang",
      participants: "100+ Mahasiswa"
    },
    {
      title: "Startup Incubation Program",
      description: "Program inkubasi startup untuk mahasiswa yang ingin mengembangkan ide bisnis kreatif",
      icon: Building2,
      color: "from-orange-500 to-orange-600",
      duration: "4 Bulan",
      location: "Innovation Hub",
      schedule: "Intensif",
      status: "Pendaftaran",
      participants: "20 Tim"
    },
    {
      title: "Digital Marketing Bootcamp",
      description: "Bootcamp intensif digital marketing untuk meningkatkan kemampuan pemasaran digital mahasiswa",
      icon: GraduationCap,
      color: "from-red-500 to-red-600",
      duration: "2 Minggu",
      location: "Online/Offline",
      schedule: "Intensif",
      status: "Selesai",
      participants: "75 Peserta"
    },
    {
      title: "Social Impact Challenge",
      description: "Kompetisi untuk mahasiswa dalam menciptakan solusi inovatif untuk masalah sosial",
      icon: Users,
      color: "from-teal-500 to-teal-600",
      duration: "3 Bulan",
      location: "Jawa Barat",
      schedule: "Kompetisi",
      status: "Aktif",
      participants: "40 Tim"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aktif":
        return "bg-green-100 text-green-800";
      case "Mendatang":
        return "bg-blue-100 text-blue-800";
      case "Pendaftaran":
        return "bg-yellow-100 text-yellow-800";
      case "Selesai":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Program GEKRAFS Jawa Barat</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Program unggulan untuk pengembangan potensi mahasiswa dalam bidang ekonomi kreatif 
            dan kepemimpinan
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {programs.map((program, index) => (
            <Card key={index} className="shadow-xl border-0 bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className={`bg-gradient-to-r ${program.color} p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4`}>
                  <program.icon className="h-7 w-7 text-white" />
                </div>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg text-gray-800 leading-tight">{program.title}</CardTitle>
                  <Badge className={getStatusColor(program.status)}>{program.status}</Badge>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{program.description}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{program.duration}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{program.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{program.schedule}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">{program.participants}</span>
                </div>
                <Button 
                  className="w-full mt-4" 
                  variant={program.status === "Aktif" || program.status === "Pendaftaran" ? "default" : "outline"}
                >
                  {program.status === "Pendaftaran" ? "Daftar Sekarang" : 
                   program.status === "Aktif" ? "Lihat Detail" : "Info Program"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-xl border-0 bg-white mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Cara Bergabung dengan Program</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Pilih Program</h3>
                <p className="text-gray-600 text-sm">Pilih program yang sesuai dengan minat dan kebutuhan Anda</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Daftar Online</h3>
                <p className="text-gray-600 text-sm">Isi formulir pendaftaran online dengan data yang lengkap</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Ikuti Program</h3>
                <p className="text-gray-600 text-sm">Ikuti program dengan aktif dan dapatkan manfaat maksimal</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link to="/contact">
            <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 mr-4">
              Hubungi Kami untuk Info Lebih Lanjut
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline">
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Program;
