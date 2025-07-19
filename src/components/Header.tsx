
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X, User, LogOut, ShoppingCart, Store } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      console.log('Attempting to sign out...');
      await signOut();
      console.log('Sign out successful, navigating to home...');
      navigate('/', { replace: true });
      // Force reload to clear any cached state
      window.location.reload();
    } catch (error) {
      console.error('Error signing out:', error);
      // Even if there's an error, try to navigate away
      navigate('/', { replace: true });
      window.location.reload();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b smooth-transition">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2">
              <img src="assets/img/gekrafslogo.png" alt="MUC Logo" className="h-8 w-8" />
            </div>
            <span className="font-bold text-base sm:text-xl text-gray-800">GEKRAFS Kampus Jawa Barat</span>
            </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Beranda
            </Link>
            
            {/* Tentang Kami Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Tentang Kami
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                <DropdownMenuItem asChild>
                  <Link to="/organisasi">Organisasi</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/ad-art">AD/ART</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/kepengurusan">Kepengurusan</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dewan-pembina">Dewan Pengarah</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/program" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Program
            </Link>
            <Link to="/artikel" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Artikel
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Kontak
            </Link>
          </nav>

          {/* User Menu & Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Ecommerce Button (desktop only) */}
            <Link to="/ecommerce" className="hidden lg:block">
              <Button className="bg-green-600 to-green-500 hover:from-green-700 hover:to-yellow-900 text-white flex items-center space-x-2 transition-colors duration-300 ease-in-out">
                <Store className="h-4 w-4" />
                <span className="hidden sm:block">E-Commerce</span>
              </Button>
            </Link>

            {/* User Menu (desktop only) */}
            {user ? (
              <div className="hidden lg:flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span className="hidden sm:block">{profile?.full_name || user.email}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white">
                    {profile?.role === 'anggota_biasa' ? (
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard" onClick={() => {
                          // Navigate to dashboard and set active section to orders for members
                          setTimeout(() => {
                            const event = new CustomEvent('setDashboardSection', { detail: 'orders' });
                            window.dispatchEvent(event);
                          }, 100);
                        }}>Pesanan Saya</Link>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                    )}
                    {(profile?.role === 'admin_artikel' || profile?.role === 'super_admin') && (
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard" onClick={() => {
                          // This will navigate to dashboard and then set active section to articles
                          setTimeout(() => {
                            const event = new CustomEvent('setDashboardSection', { detail: 'articles' });
                            window.dispatchEvent(event);
                          }, 100);
                        }}>Kelola Artikel</Link>
                      </DropdownMenuItem>
                    )}
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
            ) : (
              <Link to="/signin" className="hidden lg:block">
                <Button className="bg-sky-600 to-yellow-6000 hover:from-sky-700 hover:to-yellow-700 flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Masuk</span>
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t bg-white">
            <nav className="py-4 space-y-2 flex flex-col min-h-[60vh]">
              <Link
                to="/"
                className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Beranda
              </Link>
              <Link
                to="/organisasi"
                className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Organisasi
              </Link>
              <Link
                to="/ad-art"
                className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                AD/ART
              </Link>
              <Link
                to="/kepengurusan"
                className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Kepengurusan
              </Link>
              <Link
                to="/dewan-pembina"
                className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Dewan Pengarah
              </Link>
              <Link
                to="/program"
                className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Program
              </Link>
              <Link
                to="/artikel"
                className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Artikel
              </Link>
              <Link
                to="/contact"
                className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Kontak
              </Link>
              <div className="flex-1" /> {/* Spacer untuk dorong tombol ke bawah */}
              <Link
                to="/ecommerce"
                className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors border-t"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center"><Store className="h-4 w-4 mr-2" />E-Commerce</span>
              </Link>
              {user ? (
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors border-t"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="flex items-center"><User className="h-4 w-4 mr-2" />{profile?.full_name || user.email}</span>
                </Link>
              ) : (
                <Link
                  to="/signin"
                  className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors border-t"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="flex items-center"><User className="h-4 w-4 mr-2" />Masuk</span>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
