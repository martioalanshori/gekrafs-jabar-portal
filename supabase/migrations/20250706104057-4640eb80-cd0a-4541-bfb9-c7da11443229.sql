-- Create programs table for program management
CREATE TABLE public.programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  max_participants INTEGER DEFAULT 50,
  current_participants INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for programs table
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;

-- Create policies for programs table
CREATE POLICY "Everyone can view active programs" 
ON public.programs 
FOR SELECT 
USING (active = true);

CREATE POLICY "Super admins can manage all programs" 
ON public.programs 
FOR ALL 
USING (get_current_user_role() = 'super_admin');

-- Add RLS policy to allow super admins to delete profiles
CREATE POLICY "Super admins can delete profiles" 
ON public.profiles 
FOR DELETE 
USING (get_current_user_role() = 'super_admin');

-- Add RLS policy to allow super admins to update all profiles
CREATE POLICY "Super admins can update all profiles" 
ON public.profiles 
FOR UPDATE 
USING (get_current_user_role() = 'super_admin');

-- Update orders table to allow status updates by super admins and sellers
CREATE POLICY "Super admins and sellers can update orders" 
ON public.orders 
FOR UPDATE 
USING (
  get_current_user_role() = 'super_admin' OR 
  get_current_user_role() = 'seller'
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for programs updated_at
CREATE TRIGGER update_programs_updated_at
BEFORE UPDATE ON public.programs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for orders table
ALTER TABLE public.orders REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.orders;

-- Enable realtime for programs table  
ALTER TABLE public.programs REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.programs;