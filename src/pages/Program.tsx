
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GraduationCap, Users, Target, Calendar, MapPin, Clock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Program = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedProgram, setSelectedProgram] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    campus: "",
    motivation: ""
  });
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  }, [user, navigate]);

  const programs = [
    {
      id: "leadership",
      title: "Leadership Development Program",
      description: "Program pengembangan kepemimpinan untuk mahasiswa dengan materi soft skills, public speaking, dan manajemen tim",
      duration: "3 Bulan",
      schedule: "Setiap Sabtu, 09:00-12:00",
      location: "Kampus ITB & Online",
      requirements: ["Mahasiswa aktif", "Berkomitmen mengikuti seluruh sesi", "Memiliki motivasi tinggi"],
      benefits: ["Sertifikat resmi", "Networking dengan mahasiswa se-Jabar", "Mentoring dari praktisi"],
      icon: Users,
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "entrepreneurship",
      title: "Entrepreneurship Workshop",
      description: "Workshop intensif tentang kewirausahaan, business plan, dan cara membangun startup dari kampus",
      duration: "2 Bulan",
      schedule: "Setiap Minggu, 13:00-17:00",
      location: "Kampus UNPAD & Hybrid",
      requirements: ["Memiliki ide bisnis", "Berkomitmen membuat business plan", "Siap pitching"],
      benefits: ["Mentoring business plan", "Akses ke investor", "Inkubasi startup"],
      icon: Target,
      color: "from-green-500 to-green-600"
    },
    {
      id: "creative-festival",
      title: "Creative Economy Festival",
      description: "Festival tahunan ekonomi kreatif yang menampilkan karya mahasiswa dari berbagai bidang seni dan teknologi",
      duration: "3 Hari",
      schedule: "Desember 2024",
      location: "Gedung Sate Bandung",
      requirements: ["Memiliki karya kreatif", "Siap showcase", "Team work"],
      benefits: ["Eksposur karya", "Peluang kerjasama", "Hadiah kompetisi"],
      icon: GraduationCap,
      color: "from-purple-500 to-purple-600"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = (programId: string) => {
    setSelectedProgram(programId);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const program = programs.find(p => p.id === selectedProgram);
      const { error } = await supabase
        .from('program_registrations')
        .insert([
          {
            user_id: user.id,
            program_name: program?.title || selectedProgram,
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            campus: formData.campus,
            motivation: formData.motivation,
          }
        ]);

      if (error) throw error;

      alert("Pendaftaran berhasil! Kami akan menghubungi Anda segera.");
      setShowForm(false);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        campus: "",
        motivation: ""
      });
    } catch (error) {
      console.error('Error:', error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Program GEKRAFS Jawa Barat</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bergabunglah dengan program-program unggulan kami untuk mengembangkan potensi dan skill Anda
            </p>
          </div>

          {!showForm ? (
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {programs.map((program) => (
                <Card key={program.id} className="shadow-xl border-0 bg-white hover:shadow-2xl transition-shadow">
                  <CardHeader className="text-center pb-4">
                    <div className={`bg-gradient-to-r ${program.color} p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                      <program.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-gray-800">{program.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">{program.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{program.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{program.schedule}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{program.location}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Persyaratan:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {program.requirements.map((req, index) => (
                          <li key={index}>• {req}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Manfaat:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {program.benefits.map((benefit, index) => (
                          <li key={index}>• {benefit}</li>
                        ))}
                      </ul>
                    </div>

                    <Button 
                      onClick={() => handleRegister(program.id)}
                      className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                    >
                      Daftar Program
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="max-w-2xl mx-auto shadow-xl border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Pendaftaran Program: {programs.find(p => p.id === selectedProgram)?.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Nama Lengkap</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="nama@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>

                  <div>
                    <Label htmlFor="campus">Kampus/Universitas</Label>
                    <Input
                      id="campus"
                      name="campus"
                      type="text"
                      required
                      value={formData.campus}
                      onChange={handleInputChange}
                      placeholder="Nama kampus/universitas"
                    />
                  </div>

                  <div>
                    <Label htmlFor="motivation">Motivasi Mengikuti Program</Label>
                    <Textarea
                      id="motivation"
                      name="motivation"
                      required
                      value={formData.motivation}
                      onChange={handleInputChange}
                      placeholder="Ceritakan motivasi Anda mengikuti program ini..."
                      rows={4}
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowForm(false)}
                      className="flex-1"
                    >
                      Batal
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                    >
                      {loading ? "Mengirim..." : "Daftar"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Program;
