import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Edit, Trash2 } from 'lucide-react';
import { Program } from '@/types/database';

interface ProgramListProps {
  programs: Program[];
  onEdit: (program: Program) => void;
  onDelete: (programId: string) => void;
  loading?: boolean;
}

const ProgramList = ({ programs, onEdit, onDelete, loading }: ProgramListProps) => {
  const handleDelete = (programId: string, programName: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus program "${programName}"?`)) {
      onDelete(programId);
    }
  };

  if (loading) {
    return (
      <Card className="hover-lift smooth-transition">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Daftar Program
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Memuat data...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
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
                      {program.duration && <p>Durasi: {program.duration}</p>}
                      {program.schedule && <p>Jadwal: {program.schedule}</p>}
                      {program.location && <p>Lokasi: {program.location}</p>}
                      <p>{program.max_participants || 0} peserta</p>
                    </div>
                    {program.google_form_url && (
                      <p className="text-sm text-blue-600 mt-1">
                        Google Form: {program.google_form_url.substring(0, 50)}...
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(program)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(program.id, program.name)}
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
  );
};

export default ProgramList;