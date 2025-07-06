-- Also fix articles policies that might have recursion issues
DROP POLICY IF EXISTS "Allow authenticated users to manage articles" ON public.articles;

-- Create better policies for articles
CREATE POLICY "Authors can manage their articles" 
ON public.articles 
FOR ALL 
TO authenticated
USING (auth.uid() = author_id);

CREATE POLICY "Admins can manage all articles" 
ON public.articles 
FOR ALL 
TO authenticated
USING (public.get_current_user_role() IN ('admin_artikel', 'super_admin'));