-- Fix articles that are not published
-- Update all articles to be published if they have content
UPDATE public.articles 
SET published = true 
WHERE published = false 
AND content IS NOT NULL 
AND content != '';

-- Insert some sample articles if none exist
INSERT INTO public.articles (title, excerpt, content, image_url, category, published, views) 
SELECT 
  'Inovasi Mahasiswa GEKRAFS dalam Bidang Teknologi',
  'Mahasiswa GEKRAFS menciptakan aplikasi inovatif untuk membantu UMKM lokal...',
  'Mahasiswa GEKRAFS Jawa Barat terus menunjukkan kreativitas dan inovasi yang luar biasa dalam bidang teknologi. Dalam berbagai kompetisi dan program pengembangan, mereka berhasil menciptakan solusi-solusi teknologi yang tidak hanya inovatif tetapi juga memberikan dampak positif bagi masyarakat.

Salah satu contoh inovasi terbaru adalah aplikasi mobile yang dikembangkan oleh tim mahasiswa dari berbagai kampus di Jawa Barat. Aplikasi ini dirancang khusus untuk membantu UMKM lokal dalam digitalisasi bisnis mereka. Dengan fitur-fitur yang user-friendly dan terintegrasi, aplikasi ini memungkinkan UMKM untuk mengelola inventori, melakukan transaksi digital, dan memasarkan produk mereka secara online.',
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

"Kami sangat senang melihat antusiasme mahasiswa yang begitu tinggi. Ini menunjukkan bahwa minat terhadap kewirausahaan di kalangan mahasiswa Jawa Barat sangat besar," ungkap ketua panitia workshop.',
  'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'Kewirausahaan',
  true,
  89
WHERE NOT EXISTS (SELECT 1 FROM public.articles WHERE title = 'Workshop Kewirausahaan: Membangun Startup dari Kampus'); 