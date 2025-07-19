-- GEKRAFS Kampus Jabar - Supabase Initial Schema (Tanpa Dummy Data)
--
-- Jalankan file ini di SQL Editor Supabase untuk setup database baru

-- 1. Tabel utama dan relasi dasar
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'anggota_biasa' CHECK (role IN ('super_admin', 'admin_artikel', 'seller', 'anggota_biasa')),
  campus TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  avatar_url TEXT
);

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

CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  user_id UUID,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  approved BOOLEAN DEFAULT false
);

CREATE TABLE public.programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  max_participants INTEGER DEFAULT 50,
  current_participants INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  image_url TEXT,
  google_form_url TEXT,
  benefits TEXT,
  requirements TEXT,
  duration TEXT,
  schedule TEXT,
  location TEXT
);

-- 2. Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;

-- 3. Policy & Security Function
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT
LANGUAGE SQL
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

-- Profiles
CREATE POLICY "Super admins or users can view profiles" ON public.profiles FOR SELECT TO authenticated USING (
  (select public.get_current_user_role()) = 'super_admin'
  OR
  (select auth.uid()) = id
);
CREATE POLICY "Super admins can delete profiles" ON public.profiles FOR DELETE USING ((select public.get_current_user_role()) = 'super_admin');
CREATE POLICY "Super admins or users can update profiles" ON public.profiles FOR UPDATE TO authenticated USING (
  (select public.get_current_user_role()) = 'super_admin'
  OR
  (select auth.uid()) = id
);
CREATE POLICY "Allow profile creation during signup" ON public.profiles FOR INSERT WITH CHECK ((select auth.uid()) = id);

-- Articles
CREATE POLICY "Articles: select for all allowed" ON public.articles FOR SELECT TO authenticated USING (
  published = true
  OR (select public.get_current_user_role()) IN ('admin_artikel', 'super_admin')
  OR (select auth.uid()) = author_id
  OR (select auth.uid()) IS NOT NULL
);
CREATE POLICY "Authors, admins, or authenticated can manage articles" ON public.articles FOR ALL TO authenticated USING (
  (select auth.uid()) = author_id
  OR (select public.get_current_user_role()) IN ('admin_artikel', 'super_admin')
  OR (select auth.uid()) IS NOT NULL
);

-- Products
CREATE POLICY "Products: select for all allowed" ON public.products FOR SELECT USING (
  active = true
  OR (select auth.uid()) = seller_id
  OR (select public.get_current_user_role()) = 'super_admin'
  OR (select auth.uid()) IS NOT NULL
);
CREATE POLICY "Sellers or super admins can manage products" ON public.products FOR ALL USING (
  (select auth.uid()) = seller_id
  OR (select public.get_current_user_role()) = 'super_admin'
);

-- Orders
CREATE POLICY "Super admins or users can view orders" ON public.orders FOR SELECT USING (
  (select public.get_current_user_role()) = 'super_admin'
  OR
  (select auth.uid()) = user_id
);
CREATE POLICY "Users can create their own orders" ON public.orders FOR INSERT WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "Super admins and sellers can update orders" ON public.orders FOR UPDATE USING (
  (select public.get_current_user_role()) = 'super_admin'
  OR
  (select public.get_current_user_role()) = 'seller'
);

-- Order Items
CREATE POLICY "Users can view or create their order items" ON public.order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.orders WHERE id = order_id AND user_id = (select auth.uid()))
);
CREATE POLICY "Users can create order items for their orders" ON public.order_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.orders WHERE id = order_id AND user_id = (select auth.uid()))
);

-- Contact Messages
CREATE POLICY "Super admins can view all contact messages" ON public.contact_messages FOR SELECT USING ((select public.get_current_user_role()) = 'super_admin');
CREATE POLICY "Anyone can create contact messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Super admins can update contact messages" ON public.contact_messages FOR UPDATE USING ((select public.get_current_user_role()) = 'super_admin');

-- Comments
CREATE POLICY "Comments: insert for all allowed" ON public.comments FOR INSERT TO authenticated WITH CHECK (
  true
);
CREATE POLICY "Comments: select for all allowed" ON public.comments FOR SELECT TO authenticated USING (
  approved = true
  OR (select public.get_current_user_role()) IN ('admin_artikel', 'super_admin')
);
CREATE POLICY "Admins can manage all comments" ON public.comments FOR ALL TO authenticated USING ((select public.get_current_user_role()) IN ('admin_artikel', 'super_admin'));

-- Programs
CREATE POLICY "Programs: select for all allowed" ON public.programs FOR SELECT USING (
  active = true
  OR (select public.get_current_user_role()) = 'super_admin'
);
CREATE POLICY "Super admins can manage all programs" ON public.programs FOR ALL USING ((select public.get_current_user_role()) = 'super_admin');

-- 4. Function & Trigger untuk profile signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, campus)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'anggota_biasa'),
    COALESCE(NEW.raw_user_meta_data->>'campus', 'Tidak diketahui')
  );
  RETURN NEW;
END;
$function$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. Function & Trigger untuk update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_programs_updated_at
BEFORE UPDATE ON public.programs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- 6. (Opsional) Enable realtime untuk orders dan programs
ALTER TABLE public.orders REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.orders;
ALTER TABLE public.programs REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.programs; 

-- 7. Indexes for Foreign Keys (Performance Optimization)
CREATE INDEX IF NOT EXISTS idx_articles_author_id ON public.articles(author_id);
CREATE INDEX IF NOT EXISTS idx_comments_article_id ON public.comments(article_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON public.order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_products_seller_id ON public.products(seller_id); 

-- 8. Drop unused indexes (if not needed for your workload)
DROP INDEX IF EXISTS idx_articles_author_id;
DROP INDEX IF EXISTS idx_comments_article_id;
DROP INDEX IF EXISTS idx_order_items_order_id;
DROP INDEX IF EXISTS idx_order_items_product_id;
DROP INDEX IF EXISTS idx_orders_user_id;
DROP INDEX IF EXISTS idx_products_seller_id; 