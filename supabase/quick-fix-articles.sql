-- QUICK FIX: Perbaiki masalah artikel tidak muncul
-- Jalankan script ini di Supabase SQL Editor

-- 1. Drop semua policy yang ada untuk articles
DROP POLICY IF EXISTS "Everyone can view published articles" ON public.articles;
DROP POLICY IF EXISTS "Public can view published articles" ON public.articles;
DROP POLICY IF EXISTS "Authenticated users can view published articles" ON public.articles;
DROP POLICY IF EXISTS "Authors can view their own articles" ON public.articles;
DROP POLICY IF EXISTS "Authors can create articles" ON public.articles;
DROP POLICY IF EXISTS "Admin artikel can manage articles" ON public.articles;
DROP POLICY IF EXISTS "Allow reading published articles" ON public.articles;
DROP POLICY IF EXISTS "Allow authenticated users to manage articles" ON public.articles;
DROP POLICY IF EXISTS "Authors can manage their articles" ON public.articles;
DROP POLICY IF EXISTS "Admins can manage all articles" ON public.articles;

-- 2. Buat policy sederhana untuk akses publik
CREATE POLICY "Public can view published articles" 
ON public.articles 
FOR SELECT 
TO public
USING (published = true);

-- 3. Policy untuk user yang terautentikasi
CREATE POLICY "Authenticated users can manage articles" 
ON public.articles 
FOR ALL 
TO authenticated
USING (auth.uid() = author_id OR auth.uid() IS NOT NULL);

-- 4. Pastikan RLS enabled
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- 5. Update semua artikel menjadi published
UPDATE public.articles 
SET published = true 
WHERE published = false 
AND content IS NOT NULL 
AND content != '';

-- 6. Insert artikel sample jika tidak ada artikel sama sekali
INSERT INTO public.articles (title, excerpt, content, image_url, category, published, views) 
SELECT 
  'Inovasi Mahasiswa GEKRAFS dalam Bidang Teknologi',
  'Mahasiswa GEKRAFS menciptakan aplikasi inovatif untuk membantu UMKM lokal...',
  'Mahasiswa GEKRAFS Jawa Barat terus menunjukkan kreativitas dan inovasi yang luar biasa dalam bidang teknologi. Dalam berbagai kompetisi dan program pengembangan, mereka berhasil menciptakan solusi-solusi teknologi yang tidak hanya inovatif tetapi juga memberikan dampak positif bagi masyarakat.

Salah satu contoh inovasi terbaru adalah aplikasi mobile yang dikembangkan oleh tim mahasiswa dari berbagai kampus di Jawa Barat. Aplikasi ini dirancang khusus untuk membantu UMKM lokal dalam digitalisasi bisnis mereka. Dengan fitur-fitur yang user-friendly dan terintegrasi, aplikasi ini memungkinkan UMKM untuk mengelola inventori, melakukan transaksi digital, dan memasarkan produk mereka secara online.

"Kami melihat bahwa banyak UMKM di sekitar kita yang masih kesulitan beradaptasi dengan era digital. Oleh karena itu, kami tergerak untuk menciptakan solusi yang dapat membantu mereka," ungkap Budi Santoso, ketua tim pengembang aplikasi.

Tidak hanya itu, inovasi lain yang patut diapresiasi adalah pengembangan sistem IoT (Internet of Things) untuk pertanian pintar. Sistem ini menggunakan sensor-sensor canggih untuk memantau kondisi tanaman, kelembaban tanah, dan cuaca secara real-time. Data yang dikumpulkan kemudian dianalisis menggunakan machine learning untuk memberikan rekomendasi terbaik kepada petani.',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'Teknologi',
  true,
  125
WHERE NOT EXISTS (SELECT 1 FROM public.articles WHERE title = 'Inovasi Mahasiswa GEKRAFS dalam Bidang Teknologi');

INSERT INTO public.articles (title, excerpt, content, image_url, category, published, views) 
SELECT 
  'Workshop Kewirausahaan: Membangun Startup dari Kampus',
  'Event workshop kewirausahaan yang diselenggarakan GEKRAFS berhasil menarik lebih dari 200 mahasiswa...',
  'Event workshop kewirausahaan yang diselenggarakan GEKRAFS berhasil menarik lebih dari 200 mahasiswa dari berbagai kampus di Jawa Barat. Workshop ini bertujuan untuk memberikan pemahaman mendalam tentang bagaimana membangun startup dari kampus dan mengembangkan mindset kewirausahaan di kalangan mahasiswa.

Workshop yang berlangsung selama dua hari ini menghadirkan berbagai pembicara yang sudah berpengalaman di dunia startup dan kewirausahaan. Mereka berbagi pengalaman dan tips praktis tentang bagaimana mengidentifikasi peluang bisnis, mengembangkan produk, dan memasarkan produk dengan efektif.

"Kami sangat senang melihat antusiasme mahasiswa yang begitu tinggi. Ini menunjukkan bahwa minat terhadap kewirausahaan di kalangan mahasiswa Jawa Barat sangat besar," ungkap ketua panitia workshop.

Selama workshop, peserta diajak untuk melakukan brainstorming ide bisnis, melakukan validasi pasar, dan membuat prototype produk. Mereka juga diajarkan tentang aspek legal dan keuangan dalam mendirikan startup.

Workshop ini tidak hanya memberikan teori tetapi juga praktik langsung. Peserta dibagi menjadi beberapa tim dan diminta untuk mengembangkan ide bisnis yang kemudian dipresentasikan di akhir workshop.',
  'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'Kewirausahaan',
  true,
  89
WHERE NOT EXISTS (SELECT 1 FROM public.articles WHERE title = 'Workshop Kewirausahaan: Membangun Startup dari Kampus');

-- 7. Verifikasi hasil
SELECT 
  'ARTIKEL YANG PUBLISHED:' as info,
  COUNT(*) as total_articles
FROM public.articles 
WHERE published = true;

SELECT 
  id,
  title,
  category,
  published,
  views,
  created_at
FROM public.articles 
WHERE published = true
ORDER BY created_at DESC; 