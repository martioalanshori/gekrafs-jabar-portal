
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, ShoppingBag, FileText, Plus, Edit, Trash2, Calendar, MessageSquare } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Dashboard = () => {
  const { user, profile, loading } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 127,
    totalArticles: 45,
    totalProducts: 32,
    totalOrders: 89,
    activeAccounts: 98,
    bookingMeetings: 23
  });

  // Dummy data untuk artikel
  const dummyArticles = [
    {
      id: 1,
      title: "Inovasi Mahasiswa GEKRAFS dalam Bidang Teknologi",
      excerpt: "Mahasiswa GEKRAFS menciptakan aplikasi inovatif...",
      published: true,
      category: "Teknologi",
      created_at: "2024-01-15"
    },
    {
      id: 2,
      title: "Workshop Kewirausahaan di Kampus",
      excerpt: "Event workshop yang berhasil menarik 200+ mahasiswa...",
      published: false,
      category: "Kewirausahaan",
      created_at: "2024-01-14"
    }
  ];

  // Dummy data untuk produk
  const dummyProducts = [
    {
      id: 1,
      name: "Kaos GEKRAFS Official",
      description: "Kaos resmi organisasi GEKRAFS dengan desain eksklusif",
      price: 75000,
      stock: 50,
      active: true,
      category: "Fashion"
    },
    {
      id: 2,
      name: "Tote Bag Eksklusif",
      description: "Tas ramah lingkungan untuk kegiatan sehari-hari",
      price: 45000,
      stock: 25,
      active: true,
      category: "Aksesoris"
    }
  ];

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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                  <CardTitle className="text-sm font-medium">Akun Aktif</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeAccounts}</div>
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

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Booking Meeting</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.bookingMeetings}</div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Navigation Menu for Super Admin */}
          {isSuperAdmin && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Menu Admin</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col items-center space-y-2">
                    <Users className="h-6 w-6" />
                    <span>Akun</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center space-y-2">
                    <BookOpen className="h-6 w-6" />
                    <span>Artikel</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center space-y-2">
                    <Calendar className="h-6 w-6" />
                    <span>Booking Meeting</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center space-y-2">
                    <ShoppingBag className="h-6 w-6" />
                    <span>Ecommerce</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
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
                  {dummyArticles.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Belum ada artikel</p>
                  ) : (
                    dummyArticles.map((article) => (
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
                  {dummyProducts.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Belum ada produk</p>
                  ) : (
                    dummyProducts.map((product) => (
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
                    <MessageSquare className="h-4 w-4 mr-2" />
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
