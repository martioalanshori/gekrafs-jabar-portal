
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Plus, Edit, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Program } from '@/types/database';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';


const ProgramManagement = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [isProgramDialogOpen, setIsProgramDialogOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [programFormData, setProgramFormData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    max_participants: '',
    image_url: '',
    google_form_url: '',
    benefits: '',
    requirements: '',
    active: true
  });

  const fetchPrograms = async () => {
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPrograms(data as Program[] || []);
    } catch (error) {
      console.error('Error fetching programs:', error);
      toast.error('Gagal memuat data program');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const resetProgramForm = () => {
    setProgramFormData({
      name: '',
      description: '',
      start_date: '',
      end_date: '',
      max_participants: '',
      image_url: '',
      google_form_url: '',
      benefits: '',
      requirements: '',
      active: true
    });
    setEditingProgram(null);
  };

  const saveProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const programData = {
        name: programFormData.name,
        description: programFormData.description,
        start_date: programFormData.start_date,
        end_date: programFormData.end_date,
        max_participants: parseInt(programFormData.max_participants) || 50,
        image_url: programFormData.image_url,
        google_form_url: programFormData.google_form_url,
        benefits: programFormData.benefits,
        requirements: programFormData.requirements,
        active: programFormData.active,
      };

      if (editingProgram) {
        const { error } = await supabase
          .from('programs')
          .update(programData)
          .eq('id', editingProgram.id);
        
        if (error) throw error;
        toast.success('Program berhasil diperbarui');
      } else {
        const { error } = await supabase
          .from('programs')
          .insert([programData]);
        
        if (error) throw error;
        toast.success('Program berhasil dibuat');
      }

      setIsProgramDialogOpen(false);
      resetProgramForm();
      fetchPrograms();
    } catch (error) {
      console.error('Error saving program:', error);
      toast.error('Gagal menyimpan program');
    }
  };

  const editProgram = (program: Program) => {
    setEditingProgram(program);
    setProgramFormData({
      name: program.name,
      description: program.description || '',
      start_date: program.start_date,
      end_date: program.end_date,
      max_participants: program.max_participants?.toString() || '50',
      image_url: program.image_url || '',
      google_form_url: program.google_form_url || '',
      benefits: program.benefits || '',
      requirements: program.requirements || '',
      active: program.active
    });
    setIsProgramDialogOpen(true);
  };

  const deleteProgram = async (programId: string) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus program ini?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('programs')
        .delete()
        .eq('id', programId);

      if (error) throw error;
      
      toast.success('Program berhasil dihapus');
      fetchPrograms();
    } catch (error) {
      console.error('Error deleting program:', error);
      toast.error('Gagal menghapus program');
    }
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
            <form onSubmit={saveProgram} className="space-y-4">
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
              <Input
                placeholder="URL Gambar Program"
                value={programFormData.image_url}
                onChange={(e) => setProgramFormData({ ...programFormData, image_url: e.target.value })}
              />
              <Input
                placeholder="URL Google Form Pendaftaran"
                value={programFormData.google_form_url}
                onChange={(e) => setProgramFormData({ ...programFormData, google_form_url: e.target.value })}
              />
              <Textarea
                placeholder="Manfaat Program"
                value={programFormData.benefits}
                onChange={(e) => setProgramFormData({ ...programFormData, benefits: e.target.value })}
                className="min-h-20"
              />
              <Textarea
                placeholder="Persyaratan Program"
                value={programFormData.requirements}
                onChange={(e) => setProgramFormData({ ...programFormData, requirements: e.target.value })}
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
      
      {/* Programs List */}
      <Card className="hover-lift smooth-transition">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Daftar Program
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {programs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Belum ada program yang dibuat</p>
                <p className="text-sm mt-2">Klik "Buat Program Baru" untuk membuat program pertama</p>
              </div>
            ) : (
              programs.map((program) => (
                <div key={program.id} className="border rounded-lg p-4 hover:bg-gray-50 smooth-transition">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-medium">{program.name}</h3>
                        <Badge className={program.active ? 'bg-green-500' : 'bg-gray-500'}>
                          {program.active ? 'Aktif' : 'Tidak Aktif'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{program.description}</p>
                      <div className="text-sm text-gray-500">
                        <p>Tanggal: {new Date(program.start_date).toLocaleDateString('id-ID')} - {new Date(program.end_date).toLocaleDateString('id-ID')}</p>
                        <p>Maksimal Peserta: {program.max_participants}</p>
                        <p>Peserta Saat Ini: {program.current_participants || 0}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => editProgram(program)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteProgram(program.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
