-- Query untuk verifikasi data artikel
-- Jalankan query ini di Supabase SQL Editor untuk memastikan data ada

-- 1. Cek semua artikel yang published
SELECT 
  id,
  title,
  excerpt,
  category,
  published,
  views,
  created_at
FROM public.articles 
WHERE published = true 
ORDER BY created_at DESC;

-- 2. Cek artikel dengan ID spesifik (ganti dengan ID yang bermasalah)
-- SELECT * FROM public.articles WHERE id = '9022a6cc-6436-xxxx-xxxx-xxxxxxxxxxxx';

-- 3. Cek komentar untuk artikel
SELECT 
  c.id,
  c.article_id,
  c.name,
  c.email,
  c.comment,
  c.approved,
  c.created_at,
  a.title as article_title
FROM public.comments c
JOIN public.articles a ON c.article_id = a.id
WHERE a.published = true
ORDER BY c.created_at DESC;

-- 4. Cek RLS policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename IN ('articles', 'comments');

-- 5. Test query yang sama dengan yang digunakan di aplikasi
-- SELECT * FROM public.articles WHERE id = '9022a6cc-6436-xxxx-xxxx-xxxxxxxxxxxx' AND published = true; 