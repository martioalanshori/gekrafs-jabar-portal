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
import ProgramRegistrations from "@/components/dashboard/sections/ProgramRegistrations";

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
          <DashboardOverview
            user={user}
            profile={profile}
            stats={stats}
            statsLoading={statsLoading}
            error={error}
            isSuperAdmin={isSuperAdmin}
          />
        );
      
      case 'articles':
      case 'article-management':
        return canManageArticles ? <ArticleManagement /> : <div>Tidak memiliki akses</div>;
      
      case 'comments':
        return canManageArticles ? <CommentsManagement /> : <div>Tidak memiliki akses</div>;
      
      case 'products':
        return canManageProducts ? <ProductManagement /> : <div>Tidak memiliki akses</div>;
      
      case 'orders':
        return canManageProducts ? <OrderManagement /> : <div>Tidak memiliki akses</div>;
      
      case 'programs':
        return isSuperAdmin ? <ProgramManagement /> : <div>Tidak memiliki akses</div>;
      
      case 'program-registrations':
        return isSuperAdmin ? <ProgramRegistrations /> : <div>Tidak memiliki akses</div>;
      
      case 'user-management':
        return isSuperAdmin ? <UserManagement /> : <div>Tidak memiliki akses</div>;
      
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
