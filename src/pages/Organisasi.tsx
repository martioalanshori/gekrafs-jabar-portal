
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Users, Target, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Organisasi = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Organisasi GEKRAFS Kampus Jawa Barat</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mengenal lebih dalam tentang struktur dan tujuan organisasi.
            </p>
          </div>

          {/* Tentang GEKRAFS */}
          <Card className="shadow-xl border-0 bg-white mb-12">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Tentang GEKRAFS</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Gerakan Ekonomi Kreatif Mahasiswa dan Pelajar (GEKRAFS) Kampus Jawa Barat adalah 
                organisasi semi otonom yang bernaung di bawah gerakan ekonomi kreatif nasional. 
                Organisasi ini didirikan dengan tujuan utama mengembangkan potensi mahasiswa dan 
                pelajar di Jawa Barat dalam bidang ekonomi kreatif.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                GEKRAFS Jawa Barat berkomitmen untuk menjadi wadah bagi mahasiswa dalam mengasah 
                kemampuan leadership, kreativitas, dan inovasi. Melalui berbagai program dan kegiatan, 
                organisasi ini berupaya menciptakan generasi muda yang siap berkontribusi dalam 
                pembangunan ekonomi kreatif Indonesia.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Dengan jaringan yang tersebar di 35 kampus mitra dan melibatkan lebih dari 40 anggota 
                aktif, GEKRAFS Jawa Barat terus berkembang dan memperluas dampak positifnya bagi 
                mahasiswa di seluruh Jawa Barat.
              </p>
            </CardContent>
          </Card>

          {/* Visi Misi */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
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

          <div className="text-center">
            <Link to="/">
              <Button className="bg-gradient-to-r from-sky-600 to-yellow-6000 hover:from-sky-700 hover:to-yellow-700">
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

export default Organisasi;
