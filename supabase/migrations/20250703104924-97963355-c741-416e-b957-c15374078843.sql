
-- Tambah tabel program_registrations untuk pendaftaran program
CREATE TABLE public.program_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  program_name TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  campus TEXT,
  motivation TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.program_registrations ENABLE ROW LEVEL SECURITY;

-- Policy untuk users bisa melihat pendaftaran mereka sendiri
CREATE POLICY "Users can view their own registrations"
  ON public.program_registrations
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy untuk users bisa membuat pendaftaran
CREATE POLICY "Users can create registrations"
  ON public.program_registrations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy untuk super admin bisa melihat semua pendaftaran
CREATE POLICY "Super admins can view all registrations"
  ON public.program_registrations
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'super_admin'
  ));

-- Policy untuk super admin bisa update status pendaftaran
CREATE POLICY "Super admins can update registrations"
  ON public.program_registrations
  FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'super_admin'
  ));

-- Tambah kolom avatar_url ke profiles
ALTER TABLE public.profiles ADD COLUMN avatar_url TEXT;

-- Policy untuk contact_messages agar super admin bisa update
CREATE POLICY "Super admins can update contact messages"
  ON public.contact_messages
  FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'super_admin'
  ));
