import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Program } from '@/types/database';
import ProgramForm from './ProgramForm';

interface ProgramDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingProgram: Program | null;
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
}

const ProgramDialog = ({ 
  open, 
  onOpenChange, 
  editingProgram, 
  onSubmit,
  isSubmitting 
}: ProgramDialogProps) => {
  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl animate-scale-in">
        <DialogHeader>
          <DialogTitle>
            {editingProgram ? 'Edit Program' : 'Buat Program Baru'}
          </DialogTitle>
        </DialogHeader>
        <ProgramForm
          editingProgram={editingProgram}
          onSubmit={onSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProgramDialog;