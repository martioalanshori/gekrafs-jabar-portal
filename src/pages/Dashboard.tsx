import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { useDashboardData } from "@/hooks/useDashboardData";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import ArticleManagement from "@/components/dashboard/ArticleManagement";
import ProductManagement from "@/components/dashboard/ProductManagement";
import ContactMessagesManagement from "@/components/dashboard/ContactMessagesManagement";
import ProgramManagement from "@/components/dashboard/sections/ProgramManagement";
import ProfileSection from "@/components/dashboard/sections/ProfileSection";
import OrderManagement from "@/components/dashboard/sections/OrderManagement";
import ProgramRegistrations from "@/components/dashboard/sections/ProgramRegistrations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, ShoppingBag, FileText, Calendar, MessageSquare } from "lucide-react";

const Dashboard = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const { stats, loading: statsLoading, error } = useDashboardData();
  const [activeSection, setActiveSection] = useState('overview');

  // Listen for section changes from header
  useEffect(() => {
    const handleSectionChange = (event: CustomEvent) => {
      setActiveSection(event.detail);
    };
    
    window.addEventListener('setDashboardSection', handleSectionChange as EventListener);
    return () => window.removeEventListener('setDashboardSection', handleSectionChange as EventListener);
  }, []);

  // Show loading for auth only
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading authentication...</p>
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

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Dashboard Overview
              </h1>
              <p className="text-gray-600">
                Selamat datang, {profile?.full_name || user.email}
              </p>
              {error && (
                <p className="text-red-600 text-sm mt-2">
                  Error: {error}. Data mungkin tidak akurat.
                </p>
              )}
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
              {isSuperAdmin && (
                <Card className="shadow-lg hover-lift smooth-transition">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    {statsLoading ? (
                      <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                      </div>
                    ) : (
                      <>
                        <div className="text-2xl font-bold">{stats.totalUsers}</div>
                        <p className="text-xs text-muted-foreground">
                          +{stats.activeAccounts} akun aktif
                        </p>
                      </>
                    )}
                  </CardContent>
                </Card>
              )}
              
              <Card className="shadow-lg hover-lift smooth-transition">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Artikel</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  {statsLoading ? (
                    <div className="animate-pulse">
                      <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </div>
                  ) : (
                    <>
                      <div className="text-2xl font-bold">{stats.totalArticles}</div>
                      <p className="text-xs text-muted-foreground">
                        Artikel yang dikelola
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-lg hover-lift smooth-transition">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Produk</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  {statsLoading ? (
                    <div className="animate-pulse">
                      <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </div>
                  ) : (
                    <>
                      <div className="text-2xl font-bold">{stats.totalProducts}</div>
                      <p className="text-xs text-muted-foreground">
                        Produk tersedia
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-lg hover-lift smooth-transition">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Pesanan</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  {statsLoading ? (
                    <div className="animate-pulse">
                      <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </div>
                  ) : (
                    <>
                      <div className="text-2xl font-bold">{stats.totalOrders}</div>
                      <p className="text-xs text-muted-foreground">
                        Pesanan masuk
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-lg hover-lift smooth-transition">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Booking Meeting</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  {statsLoading ? (
                    <div className="animate-pulse">
                      <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </div>
                  ) : (
                    <>
                      <div className="text-2xl font-bold">{stats.bookingMeetings}</div>
                      <p className="text-xs text-muted-foreground">
                        Pesan kontak
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>

              {isSuperAdmin && (
                <Card className="shadow-lg hover-lift smooth-transition">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Akun Aktif</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    {statsLoading ? (
                      <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                      </div>
                    ) : (
                      <>
                        <div className="text-2xl font-bold">{stats.activeAccounts}</div>
                        <p className="text-xs text-muted-foreground">
                          Pengguna aktif bulan ini
                        </p>
                      </>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Charts */}
            {isSuperAdmin && !statsLoading && (
              <DashboardCharts 
                monthlyData={stats.monthlyData}
                ordersByStatus={stats.ordersByStatus}
              />
            )}
          </div>
        );
      
      case 'articles':
      case 'article-management':
        return canManageArticles ? <ArticleManagement /> : <div>Tidak memiliki akses</div>;
      
      case 'products':
        return canManageProducts ? <ProductManagement /> : <div>Tidak memiliki akses</div>;
      
      case 'orders':
        return canManageProducts ? <OrderManagement /> : <div>Tidak memiliki akses</div>;
      
      case 'programs':
        return isSuperAdmin ? <ProgramManagement /> : <div>Tidak memiliki akses</div>;
      
      case 'program-registrations':
        return isSuperAdmin ? <ProgramRegistrations /> : <div>Tidak memiliki akses</div>;
      
      case 'contacts':
        return isSuperAdmin ? <ContactMessagesManagement /> : <div>Tidak memiliki akses</div>;
      
      case 'profile':
        return <ProfileSection />;
      
      default:
        return <div>Halaman tidak ditemukan</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      {/* Main Content with proper margin for fixed sidebar */}
      <div className="flex-1 ml-64 p-8 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
