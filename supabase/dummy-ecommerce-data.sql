-- =====================================================
-- DUMMY ECOMMERCE DATA FOR GEKRAFS KAMPUS JABAR
-- =====================================================

-- Insert 8 dummy products for ecommerce
INSERT INTO products (
  id,
  name,
  description,
  price,
  stock,
  category,
  image_url,
  seller_id,
  active,
  created_at,
  updated_at
) VALUES 
-- 1. Digital Product - Template Website
(
  gen_random_uuid(),
  'Template Website Portfolio Premium',
  'Template website portfolio profesional dengan desain modern, responsive, dan SEO friendly. Cocok untuk freelancer, startup, dan bisnis kecil. Include 10+ halaman, admin panel, dan dokumentasi lengkap.',
  299000,
  50,
  'Digital Product',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
  (SELECT id FROM auth.users WHERE email = 'admin@gekrafs.com' LIMIT 1),
  true,
  NOW(),
  NOW()
),

-- 2. Digital Product - E-book
(
  gen_random_uuid(),
  'E-book "Strategi Marketing Digital 2024"',
  'Panduan lengkap strategi marketing digital terbaru 2024. Berisi 200+ halaman dengan case study, tips praktis, dan template yang bisa langsung digunakan. Perfect untuk entrepreneur dan marketer.',
  89000,
  100,
  'Digital Product',
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=300&fit=crop',
  (SELECT id FROM auth.users WHERE email = 'admin@gekrafs.com' LIMIT 1),
  true,
  NOW(),
  NOW()
),

-- 3. Merchandise - Kaos
(
  gen_random_uuid(),
  'Kaos GEKRAFS Kampus Jabar Premium',
  'Kaos premium dengan logo GEKRAFS Kampus Jabar. Material cotton combed 30s, desain eksklusif, dan nyaman dipakai. Tersedia ukuran S, M, L, XL. Perfect untuk merchandise kampus.',
  85000,
  75,
  'Merchandise',
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=300&fit=crop',
  (SELECT id FROM auth.users WHERE email = 'admin@gekrafs.com' LIMIT 1),
  true,
  NOW(),
  NOW()
),

-- 4. Merchandise - Hoodie
(
  gen_random_uuid(),
  'Hoodie GEKRAFS Kampus Jabar',
  'Hoodie dengan logo GEKRAFS Kampus Jabar. Material fleece premium, warm dan nyaman. Desain modern dengan zip front, tersedia warna hitam dan abu-abu. Ukuran S, M, L, XL.',
  150000,
  40,
  'Merchandise',
  'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=300&fit=crop',
  (SELECT id FROM auth.users WHERE email = 'admin@gekrafs.com' LIMIT 1),
  true,
  NOW(),
  NOW()
),

-- 5. Digital Product - Course
(
  gen_random_uuid(),
  'Course "Web Development dari Zero to Hero"',
  'Kursus lengkap web development dari dasar hingga advanced. 50+ video tutorial, project-based learning, sertifikat, dan support 24/7. Teknologi: HTML, CSS, JavaScript, React, Node.js.',
  499000,
  25,
  'Digital Product',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop',
  (SELECT id FROM auth.users WHERE email = 'admin@gekrafs.com' LIMIT 1),
  true,
  NOW(),
  NOW()
),

-- 6. Merchandise - Mug
(
  gen_random_uuid(),
  'Mug GEKRAFS Kampus Jabar',
  'Mug keramik dengan logo GEKRAFS Kampus Jabar. Kapasitas 350ml, material keramik berkualitas tinggi, microwave safe. Desain eksklusif dengan warna yang tahan lama.',
  45000,
  60,
  'Merchandise',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop',
  (SELECT id FROM auth.users WHERE email = 'admin@gekrafs.com' LIMIT 1),
  true,
  NOW(),
  NOW()
),

-- 7. Digital Product - Software
(
  gen_random_uuid(),
  'Software "GEKRAFS Task Manager Pro"',
  'Software manajemen tugas profesional dengan fitur kolaborasi tim, tracking progress, dan reporting. Interface user-friendly, cloud sync, dan kompatibel dengan semua platform.',
  199000,
  30,
  'Digital Product',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
  (SELECT id FROM auth.users WHERE email = 'admin@gekrafs.com' LIMIT 1),
  true,
  NOW(),
  NOW()
),

-- 8. Merchandise - Sticker Pack
(
  gen_random_uuid(),
  'Sticker Pack GEKRAFS Kampus Jabar',
  'Pack sticker eksklusif dengan logo dan tagline GEKRAFS Kampus Jabar. 20+ desain unik, material vinyl premium, waterproof, dan tahan lama. Perfect untuk laptop, botol, atau helm.',
  25000,
  120,
  'Merchandise',
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=300&fit=crop',
  (SELECT id FROM auth.users WHERE email = 'admin@gekrafs.com' LIMIT 1),
  true,
  NOW(),
  NOW()
);

-- =====================================================
-- VERIFICATION QUERY
-- =====================================================

-- Check if data was inserted successfully
SELECT 
  id,
  name,
  price,
  stock,
  category,
  active,
  created_at
FROM products 
WHERE active = true 
ORDER BY created_at DESC 
LIMIT 8;

-- =====================================================
-- STATISTICS QUERY
-- =====================================================

-- Get product statistics
SELECT 
  COUNT(*) as total_products,
  COUNT(CASE WHEN category = 'Digital Product' THEN 1 END) as digital_products,
  COUNT(CASE WHEN category = 'Merchandise' THEN 1 END) as merchandise,
  AVG(price) as average_price,
  SUM(stock) as total_stock
FROM products 
WHERE active = true; 