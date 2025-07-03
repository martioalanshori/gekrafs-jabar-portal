
// Temporary database types until SQL migration is run
export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  role: 'super_admin' | 'seller' | 'anggota_biasa' | 'admin_artikel';
  campus?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  image_url?: string;
  author_id: string;
  category?: string;
  published: boolean;
  views?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  seller_id: string;
  category?: string;
  stock: number;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: string;
  payment_method?: string;
  shipping_address?: string;
  created_at?: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
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
