import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  FileText, 
  Calendar, 
  MessageSquare, 
  User, 
  LogOut,
  Settings,
  ShoppingCart,
  Users,
  BookOpen,
  Phone
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface DashboardSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const DashboardSidebar = ({ activeSection, onSectionChange }: DashboardSidebarProps) => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      console.log('Dashboard sidebar: Attempting to sign out...');
      await signOut();
      console.log('Dashboard sidebar: Sign out successful, navigating to home...');
      navigate('/', { replace: true });
      window.location.reload();
    } catch (error) {
      console.error('Dashboard sidebar: Error signing out:', error);
      navigate('/', { replace: true });
      window.location.reload();
    }
  };

  // Debug current user role
  console.log('Sidebar Debug - Profile:', profile);
  console.log('Sidebar Debug - User Email:', user?.email);
  console.log('Sidebar Debug - User Role:', profile?.role);

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard, roles: ['super_admin', 'admin_artikel', 'seller'] },
    { id: 'products', label: 'Kelola Produk', icon: ShoppingBag, roles: ['super_admin', 'seller'] },
    { id: 'orders', label: profile?.role === 'anggota_biasa' ? 'Pesanan Saya' : 'Semua Pesanan', icon: ShoppingCart, roles: ['super_admin', 'seller', 'anggota_biasa'] },
    { id: 'articles', label: 'Kelola Artikel', icon: FileText, roles: ['super_admin', 'admin_artikel'] },
    { id: 'comments', label: 'Moderasi Komentar', icon: MessageSquare, roles: ['super_admin', 'admin_artikel'] },
    { id: 'programs', label: 'Kelola Program', icon: Calendar, roles: ['super_admin'] },
    { id: 'user-management', label: 'Kelola Pengguna', icon: User, roles: ['super_admin'] },
    { id: 'contacts', label: 'Booking Meeting', icon: Phone, roles: ['super_admin'] },
  ];

  const userRole = profile?.role || 'anggota_biasa';
  const filteredItems = menuItems.filter(item => 
    item.roles.includes(userRole)
  );

  console.log('Filtered menu items:', filteredItems.map(item => item.label));

  return (
    <div className="fixed left-0 top-0 z-40 w-64 bg-white shadow-lg h-screen flex flex-col border-r overflow-x-hidden">
      {/* Header */}
      <div className="p-6 border-b bg-blue-600 text-white">
        <h1 className="text-xl font-bold">Dashboard GEKRAFS</h1>
      </div>

      {/* User Info */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={profile?.avatar_url || ''} />
              <AvatarFallback className="bg-blue-500 text-white">
                {profile?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm text-gray-800">{profile?.full_name || user?.email || 'User'}</p>
              <p className="text-xs text-gray-500 capitalize">
                {profile?.role === 'super_admin' ? 'Super Admin' : 
                 profile?.role === 'admin_artikel' ? 'Admin Artikel' :
                 profile?.role === 'seller' ? 'Seller' :
                 profile?.role === 'anggota_biasa' ? 'Anggota Biasa' :
                 'Member'}
              </p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onSectionChange('profile')}>
                <User className="h-4 w-4 mr-2" />
                Edit Profile
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleSignOut}
                className="cursor-pointer text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Keluar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-hidden">
        <ul className="space-y-2">
          <li className="mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider pl-2">Menu Utama</li>
          {filteredItems.map((item, idx) => {
            const Icon = item.icon;
            // Section separator untuk admin
            const isAdminSection = idx > 0 && filteredItems[idx-1].roles[0] !== item.roles[0];
            return (
              <>
                {isAdminSection && (
                  <li className="mt-4 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider pl-2">Admin</li>
                )}
                <li key={item.id}>
                  <button
                    onClick={() => onSectionChange(item.id)}
                    title={item.label}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left smooth-transition hover:scale-105 group relative transition-all duration-200
                      ${activeSection === item.id
                        ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600 shadow-md animate-scale-in'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'}
                    `}
                  >
                    <Icon className={`h-5 w-5 flex-shrink-0 transition-all duration-200 ${activeSection === item.id ? 'scale-125 text-blue-600' : ''}`} />
                    <span className="font-medium">{item.label}</span>
                    {/* Contoh badge fitur baru */}
                    {item.id === 'orders' && (
                      <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 animate-bounce" style={{ display: 'none' }}>Baru</span>
                    )}
                    {/* Tooltip custom */}
                    <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50 whitespace-nowrap">
                      {item.label}
                    </span>
                  </button>
                </li>
              </>
            );
          })}
        </ul>
        

      </nav>

      {/* Footer */}
      <div className="p-4 border-t bg-gray-50">
        <Link
          to="/"
          className="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
};

export default DashboardSidebar;
