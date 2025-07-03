
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, ShoppingCart, BarChart3, Plus, Edit, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    totalArticles: 0,
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/signin');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user && profile) {
      fetchDashboardData();
    }
  }, [user, profile]);

  const fetchDashboardData = async () => {
    try {
      // Fetch articles if admin_artikel or super_admin
      if (profile?.role === 'admin_artikel' || profile?.role === 'super_admin') {
        const { data: articlesData } = await supabase
          .from('articles')
          .select('*')
          .order('created_at', { ascending: false });
        setArticles(articlesData || []);
      }

      // Fetch products if seller or super_admin
      if (profile?.role === 'seller' || profile?.role === 'super_admin') {
        const { data: productsData } = await supabase
          .from('products')
          .select('*')
          .eq('seller_id', user.id)
          .order('created_at', { ascending: false });
        setProducts(productsData || []);
      }

      // Fetch stats for super_admin
      if (profile?.role === 'super_admin') {
        const [articlesCount, productsCount, usersCount, ordersCount] = await Promise.all([
          supabase.from('articles').select('*', { count: 'exact', head: true }),
          supabase.from('products').select('*', { count: 'exact', head: true }),
          supabase.from('profiles').select('*', { count: 'exact', head: true }),
          supabase.from('orders').select('*', { count: 'exact', head: true }),
        ]);

        setStats({
          totalArticles: articlesCount.count || 0,
          totalProducts: productsCount.count || 0,
          totalUsers: usersCount.count || 0,
          totalOrders: ordersCount.count || 0,
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const getRoleDisplay = (role: string) => {
    const roleMap = {
      'super_admin': 'Super Admin',
      'admin_artikel': 'Admin Artikel',
      'seller': 'Seller',
      'anggota_biasa': 'Anggota Biasa'
    };
    return roleMap[role] || role;
  };

  const getRoleBadgeColor = (role: string) => {
    const colorMap = {
      'super_admin': 'bg-red-100 text-red-800',
      'admin_artikel': 'bg-blue-100 text-blue-800',
      'seller': 'bg-green-100 text-green-800',
      'anggota_biasa': 'bg-gray-100 text-gray-800'
    };
    return colorMap[role] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Selamat Datang, {profile?.full_name || user.email}!
            </h1>
            <Badge className={getRoleBadgeColor(profile?.role || '')}>
              {getRoleDisplay(profile?.role || '')}
            </Badge>
          </div>

          {/* Stats Cards for Super Admin */}
          {profile?.role === 'super_admin' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Artikel</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalArticles}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Produk</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalProducts}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Pesanan</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalOrders}</div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Articles Management */}
          {(profile?.role === 'admin_artikel' || profile?.role === 'super_admin') && (
            <Card className="mb-8">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Manajemen Artikel</CardTitle>
                <Button className="bg-gradient-to-r from-blue-600 to-green-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Artikel
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {articles.map((article: any) => (
                    <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{article.title}</h4>
                        <p className="text-sm text-gray-600">{article.category}</p>
                        <Badge variant={article.published ? "default" : "secondary"}>
                          {article.published ? "Published" : "Draft"}
                        </Badge>
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Products Management */}
          {(profile?.role === 'seller' || profile?.role === 'super_admin') && (
            <Card className="mb-8">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Manajemen Produk</CardTitle>
                <Button className="bg-gradient-to-r from-blue-600 to-green-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Produk
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product: any) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{product.name}</h4>
                        <p className="text-sm text-gray-600">Rp {product.price.toLocaleString()}</p>
                        <Badge variant={product.active ? "default" : "secondary"}>
                          {product.active ? "Aktif" : "Nonaktif"}
                        </Badge>
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Regular User Dashboard */}
          {profile?.role === 'anggota_biasa' && (
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Program Saya</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Belum ada program yang diikuti.</p>
                  <Button className="mt-4" onClick={() => navigate('/program')}>
                    Lihat Program Tersedia
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pesanan Saya</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Belum ada pesanan.</p>
                  <Button className="mt-4" onClick={() => navigate('/ecommerce')}>
                    Mulai Berbelanja
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
