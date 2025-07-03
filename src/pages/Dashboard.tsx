
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, ShoppingBag, FileText, Calendar, MessageSquare } from "lucide-react";
import { Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useDashboardData } from "@/hooks/useDashboardData";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import ArticleManagement from "@/components/dashboard/ArticleManagement";
import ProductManagement from "@/components/dashboard/ProductManagement";
import ContactMessagesManagement from "@/components/dashboard/ContactMessagesManagement";

const Dashboard = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const { stats, loading: statsLoading } = useDashboardData();

  if (authLoading || statsLoading) {
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

          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {isSuperAdmin && (
              <Card className="shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers}</div>
                  <p className="text-xs text-muted-foreground">
                    +{stats.activeAccounts} akun aktif
                  </p>
                </CardContent>
              </Card>
            )}

            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Artikel</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalArticles}</div>
                <p className="text-xs text-muted-foreground">
                  Artikel yang dikelola
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Produk</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalProducts}</div>
                <p className="text-xs text-muted-foreground">
                  Produk tersedia
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pesanan</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalOrders}</div>
                <p className="text-xs text-muted-foreground">
                  Pesanan masuk
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Booking Meeting</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.bookingMeetings}</div>
                <p className="text-xs text-muted-foreground">
                  Pesan kontak
                </p>
              </CardContent>
            </Card>

            {isSuperAdmin && (
              <Card className="shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Akun Aktif</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeAccounts}</div>
                  <p className="text-xs text-muted-foreground">
                    Pengguna aktif bulan ini
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Charts */}
          {isSuperAdmin && (
            <DashboardCharts 
              monthlyData={stats.monthlyData}
              ordersByStatus={stats.ordersByStatus}
            />
          )}

          {/* Management Sections */}
          <div className="space-y-8">
            {/* Articles Management */}
            {canManageArticles && <ArticleManagement />}

            {/* Products Management */}
            {canManageProducts && <ProductManagement />}

            {/* Contact Messages Management */}
            {isSuperAdmin && <ContactMessagesManagement />}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
