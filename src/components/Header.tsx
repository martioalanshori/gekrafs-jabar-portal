
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
    await signOut();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-800 hidden sm:block">GEKRAFS</span>
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
                  <Link to="/dewan-pembina">Dewan Pembina</Link>
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
            {/* Ecommerce Button */}
            <Link to="/ecommerce">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <Store className="h-4 w-4" />
                <span className="hidden sm:block">Ecommerce</span>
              </Button>
            </Link>

            {user ? (
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span className="hidden sm:block">{profile?.full_name || user.email}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white">
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Keluar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link to="/signin">
                <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 flex items-center space-x-2">
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
            <nav className="py-4 space-y-2">
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
                Dewan Pembina
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
                to="/ecommerce"
                className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Ecommerce
              </Link>
              <Link
                to="/contact"
                className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Kontak
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
