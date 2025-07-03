
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, ShoppingBag, FileText, Plus, Edit, Trash2 } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Article, Product } from "@/types/database";

const Dashboard = () => {
  const { user, profile, loading } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalArticles: 0,
    totalProducts: 0,
    totalOrders: 0
  });

  useEffect(() => {
    if (user && profile) {
      fetchDashboardData();
    }
  }, [user, profile]);

  const fetchDashboardData = async () => {
    try {
      // Fetch articles if user can manage them
      if (profile?.role === 'admin_artikel' || profile?.role === 'super_admin') {
        const { data: articlesData } = await supabase
          .from('articles' as any)
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);
        
        if (articlesData) setArticles(articlesData);

        const { data: productsData } = await supabase
          .from('products' as any)
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);
        
        if (productsData) setProducts(productsData);

        // Fetch stats for super admin
        if (profile?.role === 'super_admin') {
          const [usersResult, articlesResult, productsResult, ordersResult] = await Promise.all([
            supabase.from('profiles' as any).select('id', { count: 'exact' }),
            supabase.from('articles' as any).select('id', { count: 'exact' }),
            supabase.from('products' as any).select('id', { count: 'exact' }),
            supabase.from('orders' as any).select('id', { count: 'exact' })
          ]);

          setStats({
            totalUsers: usersResult.count || 0,
            totalArticles: articlesResult.count || 0,
            totalProducts: productsResult.count || 0,
            totalOrders: ordersResult.count || 0
          });
        }
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  const canManageArticles = profile?.role === 'admin_artikel' || profile?.role === 'super_admin';
  const canManageProducts = profile?.role === 'seller' || profile?.role === 'super_admin';
  const isSuperAdmin = profile?.role === 'super_admin';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Dashboard {profile?.role === 'super_admin' ? 'Super Admin' : 
                       profile?.role === 'admin_artikel' ? 'Admin Artikel' :
                       profile?.role === 'seller' ? 'Seller' : 'User'}
            </h1>
            <p className="text-gray-600">
              Selamat datang, {profile?.full_name || user.email}
            </p>
          </div>

          {/* Stats Cards for Super Admin */}
          {isSuperAdmin && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                  <CardTitle className="text-sm font-medium">Total Artikel</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalArticles}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Produk</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalProducts}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Pesanan</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalOrders}</div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Articles Management */}
          {canManageArticles && (
            <Card className="mb-8">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Kelola Artikel</CardTitle>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Buat Artikel Baru
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {articles.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Belum ada artikel</p>
                  ) : (
                    articles.map((article) => (
                      <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-medium">{article.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{article.excerpt}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant={article.published ? "default" : "secondary"}>
                              {article.published ? "Published" : "Draft"}
                            </Badge>
                            <Badge variant="outline">{article.category}</Badge>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Products Management */}
          {canManageProducts && (
            <Card className="mb-8">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Kelola Produk</CardTitle>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Produk Baru
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Belum ada produk</p>
                  ) : (
                    products.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge>Rp {product.price.toLocaleString()}</Badge>
                            <Badge variant="outline">Stock: {product.stock}</Badge>
                            <Badge variant={product.active ? "default" : "secondary"}>
                              {product.active ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Aksi Cepat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link to="/profile">
                  <Button variant="outline" className="w-full">
                    <Users className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                {canManageArticles && (
                  <Link to="/artikel">
                    <Button variant="outline" className="w-full">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Artikel
                    </Button>
                  </Link>
                )}
                {canManageProducts && (
                  <Link to="/ecommerce">
                    <Button variant="outline" className="w-full">
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Ecommerce
                    </Button>
                  </Link>
                )}
                <Link to="/contact">
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Kontak
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
