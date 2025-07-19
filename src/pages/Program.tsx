import { useState, useEffect } from "react";
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
import { Program as ProgramType } from "@/types/database";

const Program = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [programs, setPrograms] = useState<ProgramType[]>([]);
  const [loadingPrograms, setLoadingPrograms] = useState(true);

  const fetchPrograms = async () => {
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPrograms(data || []);
    } catch (error) {
      console.error('Error fetching programs:', error);
      toast({
        title: "Error",
        description: "Gagal memuat program. Silakan refresh halaman.",
        variant: "destructive",
      });
    } finally {
      setLoadingPrograms(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);


  const handleRegisterProgram = (googleFormUrl: string) => {
    if (googleFormUrl) {
      window.open(googleFormUrl, '_blank');
    } else {
      toast({
        title: "Error",
        description: "Link pendaftaran tidak tersedia",
        variant: "destructive",
      });
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
                Program Unggulan
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pilihan program pelatihan yang disesuaikan dengan kebutuhan industri modern.
              </p>
            </div>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            {loadingPrograms ? (
              <div className="flex items-center justify-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-4 text-lg text-gray-600">Memuat program...</span>
              </div>
            ) : programs.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Belum Ada Program Tersedia</h3>
                <p className="text-gray-600">Program baru akan segera hadir. Pantai terus halaman ini!</p>
              </div>
            ) : (
              <div className="grid lg:grid-cols-2 gap-8">
                {programs.map((program) => (
                  <Card key={program.id} className="shadow-xl border-0 overflow-hidden">
                    <div className="relative">
                      <img 
                        src={program.image_url || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                        alt={program.name}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-green-600 text-white font-bold px-4 py-2 rounded-full">
                          Tersedia
                        </Badge>
                      </div>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-2xl">{program.name}</CardTitle>
                      <p className="text-gray-600">{program.description}</p>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      {/* Program Details */}
                      <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
                        {program.duration && (
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span>{program.duration}</span>
                          </div>
                        )}
                        {program.schedule && (
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span>{program.schedule}</span>
                          </div>
                        )}
                        {program.location && (
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span>{program.location}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span>{program.max_participants || 0} peserta</span>
                        </div>
                      </div>

                      {/* Benefits */}
                      {program.benefits && (
                        <div>
                          <h4 className="font-semibold mb-2">Manfaat Program:</h4>
                          <p className="text-sm text-gray-600 whitespace-pre-wrap">{program.benefits}</p>
                        </div>
                      )}

                      {/* Requirements */}
                      {program.requirements && (
                        <div>
                          <h4 className="font-semibold mb-2">Persyaratan:</h4>
                          <p className="text-sm text-gray-600 whitespace-pre-wrap">{program.requirements}</p>
                        </div>
                      )}

                      <Button 
                        onClick={() => handleRegisterProgram(program.google_form_url || '')}
                        className="w-full bg-gradient-to-r from-sky-600 to-yellow-600 hover:from-sky-700 hover:to-yellow-700"
                      >
                        Daftar Program
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Program;
