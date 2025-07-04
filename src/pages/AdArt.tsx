import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Scale, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AdArt = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Anggaran Dasar & Anggaran Rumah Tangga</h1>
            <p className="text-xl text-gray-600">GEKRAFS Kampus Jawa Barat</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center shadow-lg">
              <CardHeader>
                <FileText className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <CardTitle>Anggaran Dasar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Landasan hukum dan ketentuan fundamental organisasi</p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg">
              <CardHeader>
                <Scale className="h-12 w-12 mx-auto text-green-600 mb-4" />
                <CardTitle>Anggaran Rumah Tangga</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Aturan operasional dan tata cara organisasi</p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg">
              <CardHeader>
                <Users className="h-12 w-12 mx-auto text-purple-600 mb-4" />
                <CardTitle>Struktur Organisasi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Susunan kepengurusan dan pembagian tugas</p>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-xl border-0 bg-white mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Anggaran Dasar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">BAB I - NAMA, WAKTU, DAN TEMPAT</h3>
                <p className="text-gray-700">
                  Organisasi ini bernama Gerakan Ekonomi Kreatif Mahasiswa dan Pelajar (GEKRAFS) Kampus Jawa Barat, 
                  didirikan untuk jangka waktu yang tidak ditentukan dan berkedudukan di Provinsi Jawa Barat.
                </p>
              </div>
            
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">BAB II - ASAS DAN TUJUAN</h3>
                <p className="text-gray-700 mb-2">Organisasi berasaskan:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Pancasila dan UUD 1945</li>
                  <li>Kekeluargaan dan gotong royong</li>
                  <li>Transparansi dan akuntabilitas</li>
                  <li>Profesionalisme dan integritas</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">BAB III - KEGIATAN</h3>
                <p className="text-gray-700">
                  Organisasi menyelenggarakan kegiatan dalam bidang pengembangan ekonomi kreatif, 
                  pelatihan kepemimpinan, workshop keterampilan, dan program kolaborasi antar kampus.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-white mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Anggaran Rumah Tangga</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">BAB I - KEANGGOTAAN</h3>
                <p className="text-gray-700 mb-2">Syarat keanggotaan:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Mahasiswa aktif di perguruan tinggi di Jawa Barat</li>
                  <li>Memiliki minat dalam bidang ekonomi kreatif</li>
                  <li>Bersedia mengikuti program dan kegiatan organisasi</li>
                  <li>Berkomitmen terhadap visi dan misi organisasi</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">BAB II - STRUKTUR ORGANISASI</h3>
                <p className="text-gray-700 mb-2">Struktur kepengurusan terdiri dari:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Ketua dan Wakil Ketua</li>
                  <li>Sekretaris Jenderal</li>
                  <li>Bendahara</li>
                  <li>Koordinator Program</li>
                  <li>Koordinator Hubungan Eksternal</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">BAB III - RAPAT DAN KEPUTUSAN</h3>
                <p className="text-gray-700">
                  Rapat organisasi dilaksanakan minimal sekali dalam sebulan. Keputusan diambil 
                  berdasarkan musyawarah mufakat, dan jika tidak tercapai maka melalui voting 
                  dengan suara terbanyak.
                </p>
              </div>
            </CardContent>
          </Card>

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

export default AdArt;
