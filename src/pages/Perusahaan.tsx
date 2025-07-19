import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Users, Target, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Perusahaan = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Profil Perusahaan GEKRAFS Kampus Jabar</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mengenal lebih dekat perusahaan IT, toko komputer, dan pusat pelatihan GEKRAFS Kampus Jabar yang berkomitmen memberikan solusi teknologi terbaik di Cianjur dan sekitarnya.
            </p>
          </div>

          {/* Tentang Perusahaan */}
          <Card className="shadow-xl border-0 bg-white mb-12">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Tentang GEKRAFS Kampus Jabar</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                GEKRAFS Kampus Jabar adalah perusahaan berbentuk CV yang bergerak di bidang IT, penjualan komputer, laptop, printer, aksesoris, serta jasa servis, perakitan, pengadaan barang, dan pelatihan komputer. Kami telah dipercaya oleh berbagai instansi, sekolah, dan masyarakat umum sebagai mitra solusi teknologi terlengkap dan terpercaya di Cianjur.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Dengan pengalaman lebih dari 10 tahun, kami berkomitmen memberikan layanan profesional, produk berkualitas, serta pelatihan yang relevan dengan kebutuhan industri digital masa kini. Kepuasan pelanggan adalah prioritas utama kami.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Didukung oleh tim ahli dan jaringan mitra yang luas, GEKRAFS Kampus Jabar siap menjadi partner terbaik Anda dalam memenuhi kebutuhan IT, pengadaan barang, dan pengembangan SDM di era digital.
              </p>
            </CardContent>
          </Card>

          {/* Visi Misi */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-white">
              <CardHeader className="text-center pb-6">
                <div className="bg-gradient-to-r from-sky-500 to-sky-700 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-sky-700">Visi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Menjadi perusahaan IT dan toko komputer terdepan di Cianjur yang memberikan solusi teknologi, layanan servis, dan pelatihan komputer terbaik untuk mendukung kemajuan masyarakat dan dunia usaha di era digital.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-white">
              <CardHeader className="text-center pb-6">
                <div className="bg-gradient-to-r from-sky-500 to-sky-700 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-sky-700">Misi</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700">
                  <li>• Menyediakan produk dan layanan IT berkualitas dan terjangkau</li>
                  <li>• Memberikan layanan servis, perbaikan, dan perakitan komputer profesional</li>
                  <li>• Menjadi mitra pengadaan barang IT untuk instansi, sekolah, dan perusahaan</li>
                  <li>• Menyelenggarakan pelatihan komputer dan pengembangan SDM berbasis teknologi</li>
                  <li>• Mengutamakan kepuasan pelanggan dan inovasi berkelanjutan</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link to="/">
              <Button className="bg-sky-600 hover:bg-sky-700 text-white">
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

export default Perusahaan;
