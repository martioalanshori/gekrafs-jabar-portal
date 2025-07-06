import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Program } from '@/types/database';

export const usePrograms = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

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

  const createProgram = async (programData: any) => {
    try {
      // Prepare data for database insertion
      const dbData = {
        name: programData.name,
        description: programData.description,
        duration: programData.duration,
        schedule: programData.schedule,
        location: programData.location,
        max_participants: programData.max_participants,
        image_url: programData.image_url,
        google_form_url: programData.google_form_url,
        benefits: programData.benefits,
        requirements: programData.requirements,
        active: programData.active,
        // Keep start_date and end_date as null for now
        start_date: null,
        end_date: null
      };

      const { error } = await supabase
        .from('programs')
        .insert([dbData]);
      
      if (error) throw error;
      toast.success('Program berhasil dibuat');
      fetchPrograms();
      return { success: true };
    } catch (error) {
      console.error('Error creating program:', error);
      toast.error('Gagal membuat program');
      return { success: false };
    }
  };

  const updateProgram = async (id: string, programData: Partial<Program>) => {
    try {
      const { error } = await supabase
        .from('programs')
        .update(programData)
        .eq('id', id);
      
      if (error) throw error;
      toast.success('Program berhasil diperbarui');
      fetchPrograms();
      return { success: true };
    } catch (error) {
      console.error('Error updating program:', error);
      toast.error('Gagal memperbarui program');
      return { success: false };
    }
  };

  const deleteProgram = async (programId: string) => {
    try {
      const { error } = await supabase
        .from('programs')
        .delete()
        .eq('id', programId);

      if (error) throw error;
      
      toast.success('Program berhasil dihapus');
      fetchPrograms();
      return { success: true };
    } catch (error) {
      console.error('Error deleting program:', error);
      toast.error('Gagal menghapus program');
      return { success: false };
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  return {
    programs,
    loading,
    fetchPrograms,
    createProgram,
    updateProgram,
    deleteProgram,
  };
};