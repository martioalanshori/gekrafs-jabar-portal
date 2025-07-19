-- Fix Article Views System
-- Jalankan script ini di Supabase SQL Editor

-- 1. Drop existing trigger if exists
DROP TRIGGER IF EXISTS increment_article_views_trigger ON public.articles;

-- 2. Create or replace the increment function
CREATE OR REPLACE FUNCTION public.increment_article_views()
RETURNS TRIGGER AS $$
BEGIN
  -- Only increment if this is a new view (not an update)
  IF TG_OP = 'INSERT' THEN
    UPDATE public.articles 
    SET views = COALESCE(views, 0) + 1 
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. Create trigger for automatic view increment
CREATE TRIGGER increment_article_views_trigger
  AFTER INSERT ON public.article_views
  FOR EACH ROW
  EXECUTE FUNCTION public.increment_article_views();

-- 4. Create article_views table for tracking views
CREATE TABLE IF NOT EXISTS public.article_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  session_id TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Add RLS policies for article_views
ALTER TABLE public.article_views ENABLE ROW LEVEL SECURITY;

-- Allow anyone to create view records
CREATE POLICY "Anyone can create article views" 
ON public.article_views 
FOR INSERT 
WITH CHECK (true);

-- Allow admins to view all view records
CREATE POLICY "Admins can view article views" 
ON public.article_views 
FOR SELECT 
TO authenticated
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role IN ('admin_artikel', 'super_admin')
));

-- 6. Create function to record article view
CREATE OR REPLACE FUNCTION public.record_article_view(
  p_article_id UUID,
  p_session_id TEXT DEFAULT NULL,
  p_ip_address TEXT DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  -- Check if this session has already viewed this article
  IF p_session_id IS NOT NULL THEN
    IF EXISTS (
      SELECT 1 FROM public.article_views 
      WHERE article_id = p_article_id 
      AND session_id = p_session_id
      AND created_at > NOW() - INTERVAL '24 hours'
    ) THEN
      RETURN; -- Already viewed in this session
    END IF;
  END IF;
  
  -- Record the view
  INSERT INTO public.article_views (
    article_id, 
    session_id, 
    ip_address, 
    user_agent
  ) VALUES (
    p_article_id, 
    p_session_id, 
    p_ip_address, 
    p_user_agent
  );
END;
$$ LANGUAGE plpgsql;

-- 7. Update existing articles to have proper view counts
UPDATE public.articles 
SET views = COALESCE(views, 0) 
WHERE views IS NULL;

-- 8. Create index for better performance
CREATE INDEX IF NOT EXISTS idx_article_views_article_id ON public.article_views(article_id);
CREATE INDEX IF NOT EXISTS idx_article_views_session_id ON public.article_views(session_id);
CREATE INDEX IF NOT EXISTS idx_article_views_created_at ON public.article_views(created_at);

-- 9. Verify the setup
SELECT 
  'ARTICLES WITH VIEWS:' as info,
  COUNT(*) as total_articles,
  SUM(COALESCE(views, 0)) as total_views
FROM public.articles 
WHERE published = true;

-- 10. Show current view counts
SELECT 
  id,
  title,
  views,
  created_at
FROM public.articles 
WHERE published = true
ORDER BY views DESC; 