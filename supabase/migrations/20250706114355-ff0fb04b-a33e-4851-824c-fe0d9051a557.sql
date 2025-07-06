-- Add new fields to programs table
ALTER TABLE public.programs 
ADD COLUMN image_url TEXT,
ADD COLUMN google_form_url TEXT,
ADD COLUMN benefits TEXT,
ADD COLUMN requirements TEXT;

-- Update articles table to make views increment work properly
-- Add trigger to increment views when articles are viewed
CREATE OR REPLACE FUNCTION public.increment_article_views()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.articles 
  SET views = COALESCE(views, 0) + 1 
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;