// Database types that match the actual Supabase schema
export interface Profile {
  id: string;
  email: string;
  full_name?: string | null;
  role: 'super_admin' | 'admin_artikel' | 'seller' | 'anggota_biasa' | null;
  campus?: string | null;
  avatar_url?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface Article {
  id: string;
  title: string;
  excerpt?: string | null;
  content: string;
  image_url?: string | null;
  author_id: string | null;
  category?: string | null;
  published: boolean | null;
  views?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface Product {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  image_url?: string | null;
  seller_id: string | null;
  category?: string | null;
  stock: number | null;
  active: boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface Order {
  id: string;
  user_id: string | null;
  total_amount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | null;
  payment_method?: string | null;
  shipping_address?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface OrderItem {
  id: string;
  order_id: string | null;
  product_id: string | null;
  quantity: number;
  price: number;
  created_at?: string | null;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  status: 'new' | 'read' | 'replied' | 'closed' | null;
  created_at?: string | null;
}

export interface ProgramRegistration {
  id: string;
  user_id: string;
  program_name: string;
  full_name: string;
  email: string;
  phone: string;
  campus: string;
  motivation?: string;
  status: string;
  created_at?: string;
}

export interface Program {
  id: string;
  name: string;
  description?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  duration?: string | null;
  schedule?: string | null;
  location?: string | null;
  max_participants: number | null;
  current_participants: number | null;
  active: boolean | null;
  image_url?: string | null;
  google_form_url?: string | null;
  benefits?: string | null;
  requirements?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}
