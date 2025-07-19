
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const DewanPembina = () => {
  const pembina = [
    {
      id: 1,
      name: "Dr. Ahmad Fauzi, M.Si",
      position: "Ketua Dewan Pengarah",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      background: "Dosen Senior Fakultas Ekonomi Universitas Padjadjaran dengan pengalaman 20+ tahun dalam bidang ekonomi kreatif dan kewirausahaan.",
      message: "GEKRAFS Jawa Barat adalah manifestasi dari semangat anak muda yang ingin berkontribusi nyata bagi bangsa. Melalui ekonomi kreatif, kita tidak hanya menciptakan peluang ekonomi, tetapi juga membangun karakter generasi yang inovatif dan berjiwa entrepreneur."
    },
    {
      id: 2,
      name: "Prof. Dr. Siti Nurhaliza, M.Pd",
      position: "Anggota Dewan Pengarah",
      photo: "https://images.unsplash.com/photo-1494790108755-2616c69e6e6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      background: "Profesor dalam bidang Pendidikan dan Pengembangan SDM di Universitas Pendidikan Indonesia. Aktif dalam berbagai organisasi kemahasiswaan dan pengembangan karakter.",
      message: "Pendidikan karakter dan pengembangan soft skills menjadi kunci kesuksesan GEKRAFS. Kami berkomitmen mendampingi mahasiswa untuk menjadi pemimpin masa depan yang berintegritas dan peduli terhadap kemajuan bangsa."
    },
    {
      id: 3,
      name: "Dr. Budi Santoso, M.M",
      position: "Anggota Dewan Pengarah",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      background: "Praktisi bisnis dan akademisi dengan fokus pada pengembangan UMKM dan startup. Memiliki pengalaman sebagai mentor untuk berbagai inkubator bisnis.",
      message: "GEKRAFS memiliki potensi besar untuk menjadi wadah pengembangan jiwa entrepreneur mahasiswa. Dengan dukungan yang tepat, organisasi ini dapat melahirkan generasi penerus bangsa yang mandiri dan inovatif."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-green-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                Dewan Pengarah GEKRAFS
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Para tokoh dan akademisi yang memberikan arahan dan dukungan 
                bagi perkembangan organisasi GEKRAFS Jawa Barat
              </p>
            </div>
          </div>
        </section>

        {/* Dewan Pengarah Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="space-y-12">
              {pembina.map((member, index) => (
                <Card key={member.id} className="shadow-xl border-0 overflow-hidden">
                  <div className={`grid md:grid-cols-2 gap-8 ${index % 2 === 1 ? 'md:grid-flow-col-dense' : ''}`}>
                    {/* Photo */}
                    <div className={`${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-96 object-cover"
                      />
                    </div>
                    
                    {/* Content */}
                    <CardContent className={`p-8 flex flex-col justify-center ${index % 2 === 1 ? 'md:col-start-1' : ''}`}>
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          {member.name}
                        </h3>
                        <p className="text-lg text-blue-600 font-medium mb-4">
                          {member.position}
                        </p>
                        <p className="text-gray-600 mb-6">
                          {member.background}
                        </p>
                      </div>
                      
                      <blockquote className="border-l-4 border-blue-500 pl-6 italic text-gray-700 text-lg leading-relaxed">
                        "{member.message}"
                      </blockquote>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Vision for GEKRAFS */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-8">
                Visi Dewan Pengarah untuk GEKRAFS
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="bg-white shadow-lg border-0">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Pengembangan Karakter</h3>
                    <p className="text-gray-600">
                      Membentuk mahasiswa yang berintegritas, mandiri, dan memiliki jiwa kepemimpinan yang kuat.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white shadow-lg border-0">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Inovasi & Kreativitas</h3>
                    <p className="text-gray-600">
                      Mendorong mahasiswa untuk berpikir kreatif dan inovatif dalam menghadapi tantangan zaman.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white shadow-lg border-0">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Kontribusi Nyata</h3>
                    <p className="text-gray-600">
                      Menciptakan dampak positif bagi masyarakat melalui program-program yang berkelanjutan.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default DewanPembina;
