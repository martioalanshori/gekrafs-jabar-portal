import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Program } from '@/types/database';
import { usePrograms } from '@/hooks/usePrograms';
import ProgramList from './program/ProgramList';
import ProgramDialog from './program/ProgramDialog';

const ProgramManagement = () => {
  const { programs, loading, createProgram, updateProgram, deleteProgram } = usePrograms();
  const [isProgramDialogOpen, setIsProgramDialogOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateNew = () => {
    setEditingProgram(null);
    setIsProgramDialogOpen(true);
  };

  const handleEdit = (program: Program) => {
    setEditingProgram(program);
    setIsProgramDialogOpen(true);
  };

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    
    const programData = {
      name: formData.name,
      description: formData.description,
      start_date: formData.start_date,
      end_date: formData.end_date,
      max_participants: parseInt(formData.max_participants) || 50,
      image_url: formData.image_url,
      google_form_url: formData.google_form_url,
      benefits: formData.benefits,
      requirements: formData.requirements,
      active: formData.active,
    };

    let result;
    if (editingProgram) {
      result = await updateProgram(editingProgram.id, programData);
    } else {
      result = await createProgram(programData);
    }

    if (result.success) {
      setIsProgramDialogOpen(false);
      setEditingProgram(null);
    }
    
    setIsSubmitting(false);
  };

  const handleDelete = async (programId: string) => {
    await deleteProgram(programId);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Kelola Program</h2>
        <Button 
          onClick={handleCreateNew}
          className="hover-lift smooth-transition"
        >
          <Plus className="h-4 w-4 mr-2" />
          Buat Program Baru
        </Button>
      </div>
      
      <ProgramList
        programs={programs}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />
      
      <ProgramDialog
        open={isProgramDialogOpen}
        onOpenChange={setIsProgramDialogOpen}
        editingProgram={editingProgram}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default ProgramManagement;