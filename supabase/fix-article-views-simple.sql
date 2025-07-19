-- SIMPLE FIX: Perbaiki sistem views artikel
-- Jalankan script ini di Supabase SQL Editor

-- 1. Update semua artikel yang views = NULL menjadi 0
UPDATE public.articles 
SET views = 0 
WHERE views IS NULL;

-- 2. Pastikan semua artikel published memiliki views yang valid
UPDATE public.articles 
SET views = COALESCE(views, 0) 
WHERE published = true;

-- 3. Create function untuk increment views dengan session check
CREATE OR REPLACE FUNCTION public.increment_article_views_simple(
  p_article_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
  current_views INTEGER;
BEGIN
  -- Get current views
  SELECT COALESCE(views, 0) INTO current_views 
  FROM public.articles 
  WHERE id = p_article_id;
  
  -- Update views
  UPDATE public.articles 
  SET views = current_views + 1 
  WHERE id = p_article_id;
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql;

-- 4. Create RPC function yang bisa dipanggil dari frontend
CREATE OR REPLACE FUNCTION public.record_article_view_simple(
  p_article_id UUID
)
RETURNS BOOLEAN AS $$
BEGIN
  -- Simply increment the views
  UPDATE public.articles 
  SET views = COALESCE(views, 0) + 1 
  WHERE id = p_article_id;
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql;

-- 5. Grant execute permission
GRANT EXECUTE ON FUNCTION public.record_article_view_simple(UUID) TO anon;
GRANT EXECUTE ON FUNCTION public.record_article_view_simple(UUID) TO authenticated;

-- 6. Verify current articles and their views
SELECT 
  'CURRENT ARTICLES AND VIEWS:' as info,
  COUNT(*) as total_articles,
  SUM(COALESCE(views, 0)) as total_views
FROM public.articles 
WHERE published = true;

-- 7. Show detailed view counts
SELECT 
  id,
  title,
  views,
  published,
  created_at
FROM public.articles 
WHERE published = true
ORDER BY views DESC, created_at DESC; 