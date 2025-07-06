-- Fix RLS policies for articles table to allow public access to published articles
DROP POLICY IF EXISTS "Everyone can view published articles" ON public.articles;

-- Create new policy that allows everyone to view published articles
CREATE POLICY "Everyone can view published articles" 
ON public.articles 
FOR SELECT 
USING (published = true);

-- Make sure RLS is enabled
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;