
-- Create profiles table for user management
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'anggota_biasa' CHECK (role IN ('super_admin', 'admin_artikel', 'seller', 'anggota_biasa')),
  campus TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create articles table
CREATE TABLE public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  category TEXT,
  published BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  seller_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  category TEXT,
  stock INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
  payment_method TEXT,
  shipping_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_messages table for booking meetings
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Super admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- RLS Policies for articles
CREATE POLICY "Everyone can view published articles" ON public.articles
  FOR SELECT USING (published = true);

CREATE POLICY "Authors can view their own articles" ON public.articles
  FOR SELECT USING (auth.uid() = author_id);

CREATE POLICY "Admin artikel can manage articles" ON public.articles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin_artikel', 'super_admin')
    )
  );

CREATE POLICY "Authors can create articles" ON public.articles
  FOR INSERT WITH CHECK (auth.uid() = author_id);

-- RLS Policies for products
CREATE POLICY "Everyone can view active products" ON public.products
  FOR SELECT USING (active = true);

CREATE POLICY "Sellers can view their own products" ON public.products
  FOR SELECT USING (auth.uid() = seller_id);

CREATE POLICY "Sellers can manage their products" ON public.products
  FOR ALL USING (
    auth.uid() = seller_id OR 
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- RLS Policies for orders
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Super admins can view all orders" ON public.orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- RLS Policies for order_items
CREATE POLICY "Users can view their order items" ON public.order_items
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.orders WHERE id = order_id AND user_id = auth.uid())
  );

CREATE POLICY "Users can create order items for their orders" ON public.order_items
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.orders WHERE id = order_id AND user_id = auth.uid())
  );

-- RLS Policies for contact_messages
CREATE POLICY "Super admins can view all contact messages" ON public.contact_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

CREATE POLICY "Anyone can create contact messages" ON public.contact_messages
  FOR INSERT WITH CHECK (true);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, campus)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    CASE 
      WHEN NEW.email = 'mar.tio9000@gmail.com' THEN 'super_admin'
      ELSE 'anggota_biasa'
    END,
    COALESCE(NEW.raw_user_meta_data->>'campus', 'Tidak diketahui')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert dummy data for articles
INSERT INTO public.articles (title, excerpt, content, image_url, author_id, category, published, views) VALUES
('Inovasi Mahasiswa GEKRAFS dalam Bidang Teknologi', 'Mahasiswa GEKRAFS menciptakan aplikasi inovatif untuk membantu UMKM lokal...', 'Content lengkap artikel tentang inovasi teknologi...', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', (SELECT id FROM auth.users LIMIT 1), 'Teknologi', true, 125),
('Workshop Kewirausahaan: Membangun Startup dari Kampus', 'Event workshop kewirausahaan yang diselenggarakan GEKRAFS berhasil menarik lebih dari 200 mahasiswa...', 'Content lengkap artikel tentang workshop kewirausahaan...', 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', (SELECT id FROM auth.users LIMIT 1), 'Kewirausahaan', true, 89),
('Festival Ekonomi Kreatif Jawa Barat 2024', 'GEKRAFS Jawa Barat menyelenggarakan festival ekonomi kreatif tahunan...', 'Content lengkap artikel tentang festival ekonomi kreatif...', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', (SELECT id FROM auth.users LIMIT 1), 'Event', true, 234);

-- Insert dummy data for products
INSERT INTO public.products (name, description, price, image_url, seller_id, category, stock, active) VALUES
('Kerajinan Tangan Tradisional', 'Kerajinan tangan buatan mahasiswa dengan sentuhan tradisional modern', 150000, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', (SELECT id FROM auth.users LIMIT 1), 'Kerajinan', 10, true),
('Tas Rajut Handmade', 'Tas rajut berkualitas tinggi dengan desain unik dan fungsional', 85000, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', (SELECT id FROM auth.users LIMIT 1), 'Fashion', 15, true),
('Lukisan Canvas Modern', 'Lukisan canvas dengan tema modern minimalis cocok untuk dekorasi', 200000, 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', (SELECT id FROM auth.users LIMIT 1), 'Seni', 5, true);

-- Insert dummy contact messages
INSERT INTO public.contact_messages (name, email, subject, message, status) VALUES
('Ahmad Sudirman', 'ahmad@email.com', 'Konsultasi Bisnis', 'Saya ingin berkonsultasi tentang pengembangan bisnis startup...', 'new'),
('Siti Rahmawati', 'siti@email.com', 'Kerjasama Event', 'Kami tertarik untuk bekerjasama dalam penyelenggaraan event...', 'read'),
('Budi Prakoso', 'budi@email.com', 'Program Beasiswa', 'Bagaimana cara mendaftar program beasiswa GEKRAFS?', 'replied');
