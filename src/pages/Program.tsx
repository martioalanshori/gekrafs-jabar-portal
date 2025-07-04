
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, Target, Calendar, MapPin, Clock } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Program = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const programs = [
    {
      id: "leadership-development",
      title: "Leadership Development Program",
      description: "Program pengembangan kepemimpinan dan soft skills untuk mahasiswa yang ingin menjadi pemimpin masa depan",
      duration: "3 bulan",
      schedule: "Setiap Sabtu, 09:00 - 16:00 WIB",
      location: "Kampus Universitas Padjadjaran",
      capacity: "30 peserta",
      benefits: [
        "Sertifikat resmi dari GEKRAFS",
        "Mentoring dari profesional berpengalaman",
        "Networking dengan mahasiswa se-Jawa Barat",
        "Workshop praktis leadership skills"
      ],
      requirements: [
        "Mahasiswa aktif di Jawa Barat",
        "Minimal semester 3",
        "Memiliki motivasi tinggi untuk berkembang",
        "Dapat mengikuti program secara konsisten"
      ],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "entrepreneurship-workshop",
      title: "Entrepreneurship Workshop Series",
      description: "Serangkaian workshop intensif untuk membangun mindset entrepreneur dan mengembangkan ide bisnis dari kampus",
      duration: "2 bulan",
      schedule: "Setiap Minggu, 13:00 - 17:00 WIB",
      location: "Co-working Space Bandung",
      capacity: "25 peserta",
      benefits: [
        "Panduan lengkap memulai startup",
        "Akses ke mentor dan investor",
        "Peluang pendanaan untuk ide terbaik",
        "Komunitas entrepreneur muda"
      ],
      requirements: [
        "Memiliki ide bisnis (draft)",
        "Berkomitmen mengikuti seluruh sesi",
        "Siap untuk presentasi dan pitching",
        "Memiliki laptop untuk workshop"
      ],
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-green-500 to-green-600"
    },
    {
      id: "creative-festival",
      title: "Creative Economy Festival",
      description: "Festival tahunan yang menampilkan karya kreatif mahasiswa dari berbagai bidang seni, teknologi, dan bisnis",
      duration: "3 hari",
      schedule: "15-17 Maret 2024",
      location: "Gedung Sate & Taman Lansia Bandung",
      capacity: "500+ peserta",
      benefits: [
        "Platform showcase karya kreatif",
        "Kompetisi dengan total hadiah 50 juta",
        "Expo produk dan jasa mahasiswa",
        "Talk show dengan tokoh inspiratif"
      ],
      requirements: [
        "Terbuka untuk semua mahasiswa",
        "Memiliki karya untuk dipamerkan",
        "Registrasi online wajib",
        "Mengikuti protokol kesehatan"
      ],
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: "scholarship-program",
      title: "GEKRAFS Scholarship Program",
      description: "Program beasiswa untuk mahasiswa berprestasi dengan latar belakang ekonomi kurang mampu",
      duration: "1 semester",
      schedule: "Pendaftaran: 1-30 April 2024",
      location: "Seluruh kampus mitra di Jawa Barat",
      capacity: "50 penerima beasiswa",
      benefits: [
        "Bantuan biaya kuliah Rp 5 juta/semester",
        "Bimbingan akademik dan soft skills",
        "Kesempatan magang di perusahaan mitra",
        "Komunitas scholar GEKRAFS"
      ],
      requirements: [
        "IPK minimal 3.25",
        "Surat keterangan tidak mampu",
        "Essay motivasi dan rencana masa depan",
        "Rekomendasi dari dosen pembimbing"
      ],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-orange-500 to-orange-600"
    }
  ];


  const handleRegisterProgram = async (programId: string, programTitle: string) => {
    if (!user || !profile) {
      // Redirect to login page with return URL
      window.location.href = "/signin";
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('program_registrations')
        .insert({
          user_id: user.id,
          program_name: programTitle,
          full_name: profile.full_name || 'User',
          email: user.email || '',
          phone: '', // User can update this in their profile
          campus: profile.campus || '',
          motivation: 'Registered from program page',
          status: 'pending'
        });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Info",
            description: "Anda sudah terdaftar dalam program ini",
            variant: "default",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Pendaftaran Berhasil!",
          description: `Anda berhasil mendaftar program ${programTitle}. Silakan cek dashboard untuk status pendaftaran.`,
        });
      }
    } catch (error) {
      console.error('Error registering for program:', error);
      toast({
        title: "Error",
        description: "Gagal mendaftar program. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-green-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                Program GEKRAFS
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Bergabunglah dengan program-program unggulan GEKRAFS untuk mengembangkan 
                potensi diri dan membangun jaringan yang kuat
              </p>
            </div>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8">
              {programs.map((program) => (
                <Card key={program.id} className="shadow-xl border-0 overflow-hidden">
                  <div className="relative">
                    <img 
                      src={program.image} 
                      alt={program.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className={`absolute top-4 left-4 bg-gradient-to-r ${program.color} px-4 py-2 rounded-full`}>
                      <Badge className="bg-white text-gray-800 font-medium">
                        Tersedia
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-2xl">{program.title}</CardTitle>
                    <p className="text-gray-600">{program.description}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Program Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{program.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{program.schedule}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{program.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>{program.capacity}</span>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="font-semibold mb-2">Manfaat Program:</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {program.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-green-500 mt-1">•</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Requirements */}
                    <div>
                      <h4 className="font-semibold mb-2">Persyaratan:</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {program.requirements.map((req, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button 
                      onClick={() => handleRegisterProgram(program.id, program.title)}
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-sky-600 to-yellow-6000 hover:from-sky-700 hover:to-yellow-700"
                    >
                      {loading ? 'Mendaftar...' : 'Daftar Program'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Program;
