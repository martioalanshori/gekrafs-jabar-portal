
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardStats {
  totalUsers: number;
  totalArticles: number;
  totalArticleViews: number;
  totalProducts: number;
  totalOrders: number;
  activeAccounts: number;
  bookingMeetings: number;
  monthlyData: Array<{
    month: string;
    articles: number;
    products: number;
    orders: number;
  }>;
  ordersByStatus: Array<{
    status: string;
    count: number;
  }>;
}

export const useDashboardData = () => {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalArticles: 0,
    totalArticleViews: 0,
    totalProducts: 0,
    totalOrders: 0,
    activeAccounts: 0,
    bookingMeetings: 0,
    monthlyData: [],
    ordersByStatus: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    if (!user || !profile) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log('Fetching dashboard data for user:', user.id, 'role:', profile.role);
      
      // Use Promise.all untuk parallel queries dan batasi hanya query yang diperlukan
      const queries = [];

      // Fetch total users (only for super admin)
      if (profile.role === 'super_admin') {
        queries.push(
          supabase.from('profiles').select('id', { count: 'exact', head: true })
        );
      } else {
        queries.push(Promise.resolve({ count: 0 }));
      }

      // Fetch articles dengan filter berdasarkan role
      let articlesQuery = supabase.from('articles').select('id', { count: 'exact', head: true });
      if (profile.role === 'admin_artikel') {
        articlesQuery = articlesQuery.eq('author_id', user.id);
      }
      queries.push(articlesQuery);

      // Fetch total article views
      let articleViewsQuery = supabase.from('articles').select('views');
      if (profile.role === 'admin_artikel') {
        articleViewsQuery = articleViewsQuery.eq('author_id', user.id);
      }
      queries.push(articleViewsQuery);

      // Fetch products dengan filter berdasarkan role
      let productsQuery = supabase.from('products').select('id', { count: 'exact', head: true });
      if (profile.role === 'seller') {
        productsQuery = productsQuery.eq('seller_id', user.id);
      }
      queries.push(productsQuery);

      // Fetch orders dengan filter berdasarkan role
      let ordersQuery = supabase.from('orders').select('id', { count: 'exact', head: true });
      if (profile.role !== 'super_admin') {
        ordersQuery = ordersQuery.eq('user_id', user.id);
      }
      queries.push(ordersQuery);

      // Fetch contact messages (hanya untuk super admin)
      if (profile.role === 'super_admin') {
        queries.push(
          supabase.from('contact_messages').select('id', { count: 'exact', head: true })
        );
      } else {
        queries.push(Promise.resolve({ count: 0 }));
      }

      // Execute all queries in parallel
      const [
        { count: usersCount },
        { count: articlesCount },
        { data: articleViewsData },
        { count: productsCount },
        { count: ordersCount },
        { count: contactCount }
      ] = await Promise.all(queries);

      // Calculate total article views
      const totalArticleViews = (articleViewsData || []).reduce((sum: number, article: any) => {
        return sum + (article.views || 0);
      }, 0);

      console.log('Query results:', {
        usersCount,
        articlesCount,
        totalArticleViews,
        productsCount,
        ordersCount,
        contactCount
      });

      // Calculate active accounts (simplified)
      const activeAccounts = profile.role === 'super_admin' ? Math.floor((usersCount || 0) * 0.8) : 0;

      // Ambil data 6 bulan terakhir untuk setiap tabel
      const now = new Date();
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
      // Articles
      let articlesQuerySupabase = supabase.from('articles').select('id, created_at');
      if (profile.role === 'admin_artikel') {
        articlesQuerySupabase = articlesQuerySupabase.eq('author_id', user.id);
      }
      articlesQuerySupabase = articlesQuerySupabase.gte('created_at', sixMonthsAgo.toISOString());
      const { data: articlesData, error: articlesError } = await articlesQuerySupabase;
      if (articlesError) throw articlesError;
      // Products
      let productsQuerySupabase = supabase.from('products').select('id, created_at');
      if (profile.role === 'seller') {
        productsQuerySupabase = productsQuerySupabase.eq('seller_id', user.id);
      }
      productsQuerySupabase = productsQuerySupabase.gte('created_at', sixMonthsAgo.toISOString());
      const { data: productsData, error: productsError } = await productsQuerySupabase;
      if (productsError) throw productsError;
      // Orders
      let ordersQuerySupabase = supabase.from('orders').select('id, created_at, status');
      if (profile.role !== 'super_admin') {
        ordersQuerySupabase = ordersQuerySupabase.eq('user_id', user.id);
      }
      ordersQuerySupabase = ordersQuerySupabase.gte('created_at', sixMonthsAgo.toISOString());
      const { data: ordersData, error: ordersError } = await ordersQuerySupabase;
      if (ordersError) throw ordersError;
      // Group by bulan di JS
      const monthlyData: Array<{ month: string; articles: number; products: number; orders: number }> = [];
      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const month = d.getMonth();
        const year = d.getFullYear();
        const monthLabel = monthNames[month] + ' ' + year.toString().slice(-2);
        const articlesCount = (articlesData || []).filter(a => {
          const dt = new Date(a.created_at);
          return dt.getMonth() === month && dt.getFullYear() === year;
        }).length;
        const productsCount = (productsData || []).filter(p => {
          const dt = new Date(p.created_at);
          return dt.getMonth() === month && dt.getFullYear() === year;
        }).length;
        const ordersCount = (ordersData || []).filter(o => {
          const dt = new Date(o.created_at);
          return dt.getMonth() === month && dt.getFullYear() === year;
        }).length;
        monthlyData.push({
          month: monthLabel,
          articles: articlesCount,
          products: productsCount,
          orders: ordersCount
        });
      }
      // Status pesanan asli
      const statusMap: Record<string, number> = {};
      (ordersData || []).forEach((row: any) => {
        if (row.status) statusMap[row.status] = (statusMap[row.status] || 0) + 1;
      });
      const ordersByStatus = Object.entries(statusMap).map(([status, count]) => ({ status, count }));

      setStats({
        totalUsers: usersCount || 0,
        totalArticles: articlesCount || 0,
        totalArticleViews: totalArticleViews,
        totalProducts: productsCount || 0,
        totalOrders: ordersData?.length || 0,
        activeAccounts,
        bookingMeetings: contactCount || 0,
        monthlyData,
        ordersByStatus
      });

      console.log('Dashboard stats updated successfully');

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to fetch dashboard data: ' + (err?.message || err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user, profile]);

  // Simplified realtime subscriptions - hanya 1 channel untuk mengurangi overhead
  useEffect(() => {
    if (!user || !profile) return;

    console.log('Setting up realtime subscription');
    
    // Single channel untuk semua perubahan database
    const channel = supabase
      .channel('dashboard-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'articles' },
        () => {
          console.log('Articles changed, refreshing data');
          fetchDashboardData();
        }
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        () => {
          console.log('Products changed, refreshing data');
          fetchDashboardData();
        }
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        () => {
          console.log('Orders changed, refreshing data');
          fetchDashboardData();
        }
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'contact_messages' },
        () => {
          console.log('Contact messages changed, refreshing data');
          fetchDashboardData();
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up realtime subscription');
      supabase.removeChannel(channel);
    };
  }, [user, profile]);

  return { stats, loading, error, refetch: fetchDashboardData };
};
