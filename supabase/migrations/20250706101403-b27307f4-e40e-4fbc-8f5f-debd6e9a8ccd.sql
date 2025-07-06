-- Create comments table
CREATE TABLE public.comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID NOT NULL,
  user_id UUID,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  approved BOOLEAN DEFAULT false
);

-- Add RLS policies for comments
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to create comments
CREATE POLICY "Anyone can create comments" 
ON public.comments 
FOR INSERT 
WITH CHECK (true);

-- Allow anyone to view approved comments
CREATE POLICY "Anyone can view approved comments" 
ON public.comments 
FOR SELECT 
USING (approved = true);

-- Allow admins to manage all comments
CREATE POLICY "Admins can manage all comments" 
ON public.comments 
FOR ALL 
TO authenticated
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role IN ('admin_artikel', 'super_admin')
));

-- Add foreign key reference to articles
ALTER TABLE public.comments 
ADD CONSTRAINT comments_article_id_fkey 
FOREIGN KEY (article_id) 
REFERENCES public.articles(id) 
ON DELETE CASCADE;