-- Fix all RLS policies to ensure proper access
-- First, let's check and recreate the articles policies
DROP POLICY IF EXISTS "Everyone can view published articles" ON public.articles;
DROP POLICY IF EXISTS "Authors can view their own articles" ON public.articles;
DROP POLICY IF EXISTS "Authors can create articles" ON public.articles;
DROP POLICY IF EXISTS "Admin artikel can manage articles" ON public.articles;

-- Create simple policy for everyone to read published articles
CREATE POLICY "Public can view published articles" 
ON public.articles 
FOR SELECT 
TO public
USING (published = true);

-- Create policies for authenticated users
CREATE POLICY "Authenticated users can view published articles" 
ON public.articles 
FOR SELECT 
TO authenticated
USING (published = true);

CREATE POLICY "Authors can manage their articles" 
ON public.articles 
FOR ALL 
TO authenticated
USING (auth.uid() = author_id);

CREATE POLICY "Admins can manage all articles" 
ON public.articles 
FOR ALL 
TO authenticated
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role IN ('admin_artikel', 'super_admin')
));

-- Also fix profiles table access
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Super admins can view all profiles" ON public.profiles;

-- Recreate profiles policies
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Super admins can view all profiles" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (
  auth.uid() = id OR 
  EXISTS (
    SELECT 1 FROM profiles p2 
    WHERE p2.id = auth.uid() 
    AND p2.role = 'super_admin'
  )
);

-- Make sure RLS is enabled
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;