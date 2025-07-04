
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Users, Eye, Plus, Edit, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ProgramRegistration } from '@/types/database';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Program {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  max_participants: number;
  active: boolean;
  created_at: string;
}

const ProgramManagement = () => {
  const [registrations, setRegistrations] = useState<ProgramRegistration[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegistration, setSelectedRegistration] = useState<ProgramRegistration | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProgramDialogOpen, setIsProgramDialogOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [programFormData, setProgramFormData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    max_participants: '',
    active: true
  });

  const fetchRegistrations = async () => {
    try {
      const { data, error } = await supabase
        .from('program_registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRegistrations(data as ProgramRegistration[] || []);
    } catch (error) {
      console.error('Error fetching registrations:', error);
      toast.error('Gagal memuat data pendaftaran program');
    }
  };

  const fetchPrograms = async () => {
    try {
      // Since we don't have a programs table yet, we'll create mock data
      // In a real implementation, this would fetch from a programs table
      setPrograms([]);
    } catch (error) {
      console.error('Error fetching programs:', error);
      toast.error('Gagal memuat data program');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
    fetchPrograms();
  }, []);

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('program-registrations-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'program_registrations' },
        () => {
          fetchRegistrations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('program_registrations')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      toast.success('Status pendaftaran diperbarui');
      fetchRegistrations();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Gagal memperbarui status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'approved': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Menunggu';
      case 'approved': return 'Disetujui';
      case 'rejected': return 'Ditolak';
      default: return status;
    }
  };

  const resetProgramForm = () => {
    setProgramFormData({
      name: '',
      description: '',
      start_date: '',
      end_date: '',
      max_participants: '',
      active: true
    });
    setEditingProgram(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Memuat data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Kelola Program</h2>
        <Dialog open={isProgramDialogOpen} onOpenChange={setIsProgramDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={resetProgramForm}
              className="hover-lift smooth-transition"
            >
              <Plus className="h-4 w-4 mr-2" />
              Buat Program Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl animate-scale-in">
            <DialogHeader>
              <DialogTitle>
                {editingProgram ? 'Edit Program' : 'Buat Program Baru'}
              </DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <Input
                placeholder="Nama Program"
                value={programFormData.name}
                onChange={(e) => setProgramFormData({ ...programFormData, name: e.target.value })}
                required
              />
              <Textarea
                placeholder="Deskripsi Program"
                value={programFormData.description}
                onChange={(e) => setProgramFormData({ ...programFormData, description: e.target.value })}
                className="min-h-20"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Tanggal Mulai</label>
                  <Input
                    type="date"
                    value={programFormData.start_date}
                    onChange={(e) => setProgramFormData({ ...programFormData, start_date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tanggal Selesai</label>
                  <Input
                    type="date"
                    value={programFormData.end_date}
                    onChange={(e) => setProgramFormData({ ...programFormData, end_date: e.target.value })}
                    required
                  />
                </div>
              </div>
              <Input
                type="number"
                placeholder="Maksimal Peserta"
                value={programFormData.max_participants}
                onChange={(e) => setProgramFormData({ ...programFormData, max_participants: e.target.value })}
                min="1"
              />
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="program-active"
                  checked={programFormData.active}
                  onChange={(e) => setProgramFormData({ ...programFormData, active: e.target.checked })}
                />
                <label htmlFor="program-active">Program aktif</label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsProgramDialogOpen(false)}
                >
                  Batal
                </Button>
                <Button type="submit">
                  {editingProgram ? 'Perbarui' : 'Buat'} Program
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card className="hover-lift smooth-transition">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Pendaftaran Program
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {registrations.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Belum ada pendaftaran program</p>
                <p className="text-sm mt-2">Pendaftaran akan muncul di sini setelah ada yang mendaftar</p>
              </div>
            ) : (
              registrations.map((registration) => (
                <div key={registration.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 smooth-transition">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium">{registration.full_name}</h3>
                      <Badge className={`${getStatusColor(registration.status)} text-white`}>
                        {getStatusText(registration.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{registration.email}</p>
                    <p className="text-sm font-medium mt-1">{registration.program_name}</p>
                    <p className="text-sm text-gray-600 mt-1">Campus: {registration.campus}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(registration.created_at).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedRegistration(registration)}
                          className="hover:scale-105 smooth-transition"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl animate-scale-in">
                        <DialogHeader>
                          <DialogTitle>Detail Pendaftaran Program</DialogTitle>
                        </DialogHeader>
                        {selectedRegistration && (
                          <div className="space-y-4">
                            <div>
                              <label className="font-medium">Program:</label>
                              <p>{selectedRegistration.program_name}</p>
                            </div>
                            <div>
                              <label className="font-medium">Nama Lengkap:</label>
                              <p>{selectedRegistration.full_name}</p>
                            </div>
                            <div>
                              <label className="font-medium">Email:</label>
                              <p>{selectedRegistration.email}</p>
                            </div>
                            <div>
                              <label className="font-medium">Telepon:</label>
                              <p>{selectedRegistration.phone || 'Tidak diisi'}</p>
                            </div>
                            <div>
                              <label className="font-medium">Campus:</label>
                              <p>{selectedRegistration.campus || 'Tidak diisi'}</p>
                            </div>
                            <div>
                              <label className="font-medium">Motivasi:</label>
                              <p className="whitespace-pre-wrap">{selectedRegistration.motivation || 'Tidak diisi'}</p>
                            </div>
                            <div>
                              <label className="font-medium">Status:</label>
                              <div className="flex space-x-2 mt-2">
                                {['pending', 'approved', 'rejected'].map((status) => (
                                  <Button
                                    key={status}
                                    variant={selectedRegistration.status === status ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => updateStatus(selectedRegistration.id, status)}
                                    className="hover:scale-105 smooth-transition"
                                  >
                                    {getStatusText(status)}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgramManagement;
