
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Mail, Phone, GraduationCap, MessageCircle } from 'lucide-react';

interface ProgramRegistration {
  id: string;
  program_name: string;
  full_name: string;
  email: string;
  phone: string;
  campus: string;
  motivation: string;
  status: string;
  created_at: string;
}

const ProgramRegistrations = () => {
  const { data: registrations, isLoading, error } = useQuery({
    queryKey: ['program-registrations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('program_registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as ProgramRegistration[];
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Users className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold">Pendaftar Program</h1>
        </div>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-gray-200 animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Users className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold">Pendaftar Program</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <p className="text-red-600">Error loading registrations: {(error as Error).message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold">Pendaftar Program</h1>
        </div>
        <div className="text-sm text-gray-600">
          Total {registrations?.length || 0} pendaftar
        </div>
      </div>

      <div className="grid gap-6">
        {registrations?.map((registration) => (
          <Card key={registration.id} className="shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{registration.program_name}</CardTitle>
                <Badge className={getStatusColor(registration.status)}>
                  {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                </Badge>
              </div>
              <div className="text-sm text-gray-600">
                Mendaftar pada {new Date(registration.created_at).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{registration.full_name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{registration.email}</span>
                  </div>
                  {registration.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{registration.phone}</span>
                    </div>
                  )}
                  {registration.campus && (
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{registration.campus}</span>
                    </div>
                  )}
                </div>
                
                {registration.motivation && (
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <MessageCircle className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-sm">Motivasi:</span>
                    </div>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {registration.motivation}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {registrations?.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Belum Ada Pendaftar</h3>
              <p className="text-gray-500">Pendaftar program akan muncul di sini</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProgramRegistrations;
