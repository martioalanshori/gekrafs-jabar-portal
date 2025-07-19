-- Add new fields to programs table
ALTER TABLE public.programs 
ADD COLUMN duration text,
ADD COLUMN schedule text,
ADD COLUMN location text;

-- Update programs to make start_date and end_date nullable since we're transitioning away from them
ALTER TABLE public.programs 
ALTER COLUMN start_date DROP NOT NULL,
ALTER COLUMN end_date DROP NOT NULL;

-- Fix articles RLS policies to ensure published articles are accessible
-- Drop existing policies first
DROP POLICY IF EXISTS "Everyone can view published articles" ON public.articles;
DROP POLICY IF EXISTS "Public can view published articles" ON public.articles;
DROP POLICY IF EXISTS "Authenticated users can view published articles" ON public.articles;
DROP POLICY IF EXISTS "Authors can manage their articles" ON public.articles;
DROP POLICY IF EXISTS "Admins can manage all articles" ON public.articles;
DROP POLICY IF EXISTS "Allow reading published articles" ON public.articles;
DROP POLICY IF EXISTS "Allow authenticated users to manage articles" ON public.articles;

-- Create simple, permissive policy for reading published articles
CREATE POLICY "Public can view published articles" 
ON public.articles 
FOR SELECT 
TO public
USING (published = true);

-- Create policy for authenticated users to manage articles
CREATE POLICY "Authenticated users can manage articles" 
ON public.articles 
FOR ALL 
TO authenticated
USING (auth.uid() = author_id OR auth.uid() IS NOT NULL);

-- Make sure RLS is enabled
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;