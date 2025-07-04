
-- Drop existing problematic policies
DROP POLICY IF EXISTS "Super admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Create new non-recursive policies
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Create a simpler super admin policy that doesn't reference the profiles table recursively
CREATE POLICY "Super admins can view all profiles" 
  ON public.profiles 
  FOR SELECT 
  USING (
    auth.uid() = id OR 
    (SELECT email FROM auth.users WHERE id = auth.uid()) = 'mar.tio9000@gmail.com'
  );

-- Allow profile creation during signup
CREATE POLICY "Allow profile creation during signup" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);
