import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, Building2, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Kepengurusan = () => {
  const pengurus = [
    {
      nama: "Ahmad Rizki Pratama",
      jabatan: "Ketua",
      kampus: "Institut Teknologi Bandung",
      email: "ketua@gekrafs-jabar.org",
      phone: "+62 812 3456 7890",
      icon: GraduationCap,
      color: "from-blue-500 to-blue-600"
    },
    {
      nama: "Siti Nurhaliza",
      jabatan: "Wakil Ketua",
      kampus: "Universitas Padjadjaran",
      email: "wakilketua@gekrafs-jabar.org",
      phone: "+62 812 3456 7891",
      icon: Users,
      color: "from-green-500 to-green-600"
    },
    {
      nama: "Budi Santoso",
      jabatan: "Sekretaris Jenderal",
      kampus: "Universitas Islam Bandung",
      email: "sekjen@gekrafs-jabar.org",
      phone: "+62 812 3456 7892",
      icon: Building2,
      color: "from-purple-500 to-purple-600"
    },
    {
      nama: "Dewi Lestari",
      jabatan: "Bendahara",
      kampus: "Universitas Pasundan",
      email: "bendahara@gekrafs-jabar.org",
      phone: "+62 812 3456 7893",
      icon: Users,
      color: "from-orange-500 to-orange-600"
    },
    {
      nama: "Agus Setiawan",
      jabatan: "Koordinator Program",
      kampus: "Institut Teknologi Nasional",
      email: "program@gekrafs-jabar.org",
      phone: "+62 812 3456 7894",
      icon: GraduationCap,
      color: "from-red-500 to-red-600"
    },
    {
      nama: "Maya Sari",
      jabatan: "Koordinator Hubungan Eksternal",
      kampus: "Universitas Komputer Indonesia",
      email: "humas@gekrafs-jabar.org",
      phone: "+62 812 3456 7895",
      icon: Building2,
      color: "from-teal-500 to-teal-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Kepengurusan GEKRAFS Jawa Barat</h1>
            <p className="text-xl text-gray-600">Tim pengurus periode 2024-2025</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {pengurus.map((person, index) => (
              <Card key={index} className="shadow-xl border-0 bg-white hover:shadow-2xl transition-shadow duration-300">
                <CardHeader className="text-center pb-4">
                  <div className={`bg-gradient-to-r ${person.color} p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center`}>
                    <person.icon className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-800">{person.nama}</CardTitle>
                  <p className="text-blue-600 font-semibold">{person.jabatan}</p>
                  <p className="text-sm text-gray-500">{person.kampus}</p>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{person.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">{person.phone}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="shadow-xl border-0 bg-white mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Tugas dan Tanggung Jawab</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Ketua</h3>
                <p className="text-gray-700">
                  Memimpin organisasi, mengkoordinasi seluruh kegiatan, dan menjadi perwakilan 
                  organisasi dalam forum eksternal.
                </p>
              </div>
            
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Wakil Ketua</h3>
                <p className="text-gray-700">
                  Membantu tugas ketua, menggantikan ketua saat berhalangan, dan mengawasi 
                  jalannya program-program organisasi.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Sekretaris Jenderal</h3>
                <p className="text-gray-700">
                  Mengelola administrasi organisasi, membuat notulen rapat, dan mengatur 
                  korespondensi organisasi.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Bendahara</h3>
                <p className="text-gray-700">
                  Mengelola keuangan organisasi, membuat laporan keuangan, dan mengawasi 
                  penggunaan dana organisasi.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Link to="/">
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                Kembali ke Beranda
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Kepengurusan;
