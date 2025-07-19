import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { useDashboardData } from "@/hooks/useDashboardData";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import ArticleManagement from "@/components/dashboard/ArticleManagement";
import ProductManagement from "@/components/dashboard/ProductManagement";
import ContactMessagesManagement from "@/components/dashboard/ContactMessagesManagement";
import CommentsManagement from "@/components/dashboard/CommentsManagement";
import UserManagement from "@/components/dashboard/UserManagement";
import ProgramManagement from "@/components/dashboard/sections/ProgramManagement";
import ProfileSection from "@/components/dashboard/sections/ProfileSection";
import OrderManagement from "@/components/dashboard/sections/OrderManagement";
import { Menu } from 'lucide-react';

const Dashboard = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const { stats, loading: statsLoading, error } = useDashboardData();
  
  // Set default section based on user role
  const getDefaultSection = () => {
    if (profile?.role === 'anggota_biasa') {
      return 'orders';
    }
    return 'overview';
  };
  
  const [activeSection, setActiveSection] = useState(getDefaultSection());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Listen for section changes from header
  useEffect(() => {
    const handleSectionChange = (event: CustomEvent) => {
      setActiveSection(event.detail);
    };
    
    window.addEventListener('setDashboardSection', handleSectionChange as EventListener);
    return () => window.removeEventListener('setDashboardSection', handleSectionChange as EventListener);
  }, []);

  // Update active section when profile loads (for role-based default)
  useEffect(() => {
    if (profile && activeSection === 'overview' && profile.role === 'anggota_biasa') {
      setActiveSection('orders');
    }
  }, [profile, activeSection]);

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
  const canViewOrders = profile?.role === 'seller' || profile?.role === 'super_admin' || profile?.role === 'anggota_biasa';
  const canViewDashboard = profile?.role === 'super_admin' || profile?.role === 'admin_artikel' || profile?.role === 'seller';
  const isSuperAdmin = profile?.role === 'super_admin';

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return canViewDashboard ? (
          <DashboardOverview
            user={user}
            profile={profile}
            stats={stats}
            statsLoading={statsLoading}
            error={error}
            isSuperAdmin={isSuperAdmin}
          />
        ) : (
          <div className="p-8 text-center text-gray-500">
            <h2 className="text-2xl font-bold mb-4">Selamat Datang!</h2>
            <p className="text-lg mb-6">Silakan pilih menu di sidebar untuk mengakses fitur yang tersedia.</p>
            <div className="bg-blue-50 p-6 rounded-lg max-w-md mx-auto">
              <h3 className="font-semibold text-blue-800 mb-2">Fitur yang tersedia:</h3>
              <ul className="text-blue-700 text-left space-y-1">
                <li>• Pesanan Saya - Lihat dan kelola pesanan Anda</li>
                <li>• Edit Profile - Update informasi profil Anda</li>
              </ul>
            </div>
          </div>
        );
      
      case 'articles':
        return canManageArticles ? <ArticleManagement /> : <div className="p-8 text-center text-gray-500">Tidak memiliki akses untuk mengelola artikel</div>;
      
      case 'comments':
        return canManageArticles ? <CommentsManagement /> : <div className="p-8 text-center text-gray-500">Tidak memiliki akses untuk moderasi komentar</div>;
      
      case 'products':
        return canManageProducts ? <ProductManagement /> : <div className="p-8 text-center text-gray-500">Tidak memiliki akses untuk mengelola produk</div>;
      
      case 'orders':
        return canViewOrders ? <OrderManagement /> : <div className="p-8 text-center text-gray-500">Tidak memiliki akses untuk melihat pesanan</div>;
      
      case 'programs':
        return isSuperAdmin ? <ProgramManagement /> : <div className="p-8 text-center text-gray-500">Tidak memiliki akses untuk mengelola program</div>;
      
      case 'user-management':
        return isSuperAdmin ? <UserManagement /> : <div className="p-8 text-center text-gray-500">Tidak memiliki akses untuk mengelola pengguna</div>;
      
      case 'contacts':
        return isSuperAdmin ? <ContactMessagesManagement /> : <div className="p-8 text-center text-gray-500">Tidak memiliki akses untuk booking meeting</div>;
      
      case 'profile':
        return <ProfileSection />;
      
      default:
        return <div className="p-8 text-center text-gray-500">Halaman tidak ditemukan</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-x-hidden">
      {/* Sidebar overlay for mobile */}
      <div className="lg:hidden">
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setSidebarOpen(false)} />
        )}
        <div className={`fixed z-50 top-0 left-0 h-full w-64 bg-white shadow-lg border-r transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden`} style={{ maxWidth: '100vw' }}>
          <DashboardSidebar 
            activeSection={activeSection} 
            onSectionChange={(section) => {
              setActiveSection(section);
              setSidebarOpen(false); // close sidebar on mobile after select
            }}
          />
        </div>
      </div>
      {/* Sidebar for desktop */}
      <div className="hidden lg:block">
        <DashboardSidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
      </div>
      {/* Main Content with proper margin for fixed sidebar */}
      <div className="flex-1 p-4 sm:p-8 overflow-auto max-w-full lg:ml-64">
        {/* Topbar for mobile */}
        <div className="lg:hidden flex items-center justify-between mb-4">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-md bg-blue-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-400">
            <Menu className="h-6 w-6" />
          </button>
          <span className="font-bold text-lg text-gray-700">Dashboard</span>
          <div style={{ width: 40 }} />
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
