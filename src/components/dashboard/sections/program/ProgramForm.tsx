import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Program } from '@/types/database';

interface ProgramFormData {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  max_participants: string;
  image_url: string;
  google_form_url: string;
  benefits: string;
  requirements: string;
  active: boolean;
}

interface ProgramFormProps {
  editingProgram: Program | null;
  onSubmit: (data: ProgramFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const ProgramForm = ({ editingProgram, onSubmit, onCancel, isSubmitting }: ProgramFormProps) => {
  const [formData, setFormData] = useState<ProgramFormData>({
    name: editingProgram?.name || '',
    description: editingProgram?.description || '',
    start_date: editingProgram?.start_date || '',
    end_date: editingProgram?.end_date || '',
    max_participants: editingProgram?.max_participants?.toString() || '50',
    image_url: editingProgram?.image_url || '',
    google_form_url: editingProgram?.google_form_url || '',
    benefits: editingProgram?.benefits || '',
    requirements: editingProgram?.requirements || '',
    active: editingProgram?.active ?? true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const updateField = (field: keyof ProgramFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Nama Program"
        value={formData.name}
        onChange={(e) => updateField('name', e.target.value)}
        required
      />
      
      <Textarea
        placeholder="Deskripsi Program"
        value={formData.description}
        onChange={(e) => updateField('description', e.target.value)}
        className="min-h-20"
      />
      
      <Input
        placeholder="URL Gambar Program"
        value={formData.image_url}
        onChange={(e) => updateField('image_url', e.target.value)}
      />
      
      <Input
        placeholder="URL Google Form Pendaftaran"
        value={formData.google_form_url}
        onChange={(e) => updateField('google_form_url', e.target.value)}
      />
      
      <Textarea
        placeholder="Manfaat Program"
        value={formData.benefits}
        onChange={(e) => updateField('benefits', e.target.value)}
        className="min-h-20"
      />
      
      <Textarea
        placeholder="Persyaratan Program"
        value={formData.requirements}
        onChange={(e) => updateField('requirements', e.target.value)}
        className="min-h-20"
      />
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Tanggal Mulai</label>
          <Input
            type="date"
            value={formData.start_date}
            onChange={(e) => updateField('start_date', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tanggal Selesai</label>
          <Input
            type="date"
            value={formData.end_date}
            onChange={(e) => updateField('end_date', e.target.value)}
            required
          />
        </div>
      </div>
      
      <Input
        type="number"
        placeholder="Maksimal Peserta"
        value={formData.max_participants}
        onChange={(e) => updateField('max_participants', e.target.value)}
        min="1"
      />
      
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="program-active"
          checked={formData.active}
          onChange={(e) => updateField('active', e.target.checked)}
        />
        <label htmlFor="program-active">Program aktif</label>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Batal
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting 
            ? 'Menyimpan...' 
            : editingProgram 
              ? 'Perbarui Program' 
              : 'Buat Program'
          }
        </Button>
      </div>
    </form>
  );
};

export default ProgramForm;