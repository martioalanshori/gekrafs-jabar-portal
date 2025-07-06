-- Drop all existing policies first
DROP POLICY IF EXISTS "Public can view published articles" ON public.articles;
DROP POLICY IF EXISTS "Authenticated users can view published articles" ON public.articles;
DROP POLICY IF EXISTS "Authors can manage their articles" ON public.articles;
DROP POLICY IF EXISTS "Admins can manage all articles" ON public.articles;

-- Create a simple, permissive policy for reading published articles
CREATE POLICY "Allow reading published articles" 
ON public.articles 
FOR SELECT 
USING (published = true);

-- Create policy for authenticated users to create/manage articles
CREATE POLICY "Allow authenticated users to manage articles" 
ON public.articles 
FOR ALL 
TO authenticated
USING (auth.uid() = author_id OR auth.uid() IS NOT NULL);

-- Make sure table has RLS enabled
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;