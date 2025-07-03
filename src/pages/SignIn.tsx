
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Mail, Lock, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    campus: ""
  });

  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          alert(`Login gagal: ${error.message}`);
        } else {
          navigate('/dashboard');
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          alert("Password tidak cocok!");
          return;
        }
        
        const { error } = await signUp(formData.email, formData.password, formData.fullName, formData.campus);
        if (error) {
          alert(`Registrasi gagal: ${error.message}`);
        } else {
          alert("Registrasi berhasil! Silakan cek email Anda untuk konfirmasi.");
          setIsLogin(true);
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      <div className="pt-16 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white">
          <CardHeader className="text-center pb-6">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-gray-800">
              {isLogin ? "Masuk ke GEKRAFS" : "Daftar GEKRAFS"}
            </CardTitle>
            <p className="text-gray-600">
              {isLogin ? "Masuk untuk mengakses dashboard" : "Bergabung dengan komunitas kreatif"}
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <Label htmlFor="fullName">Nama Lengkap</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required={!isLogin}
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="mt-1"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="campus">Kampus/Universitas</Label>
                    <Input
                      id="campus"
                      name="campus"
                      type="text"
                      required={!isLogin}
                      value={formData.campus}
                      onChange={handleInputChange}
                      className="mt-1"
                      placeholder="Nama kampus/universitas"
                    />
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    placeholder="nama@email.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10"
                    placeholder="Masukkan password"
                  />
                </div>
              </div>

              {!isLogin && (
                <div>
                  <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required={!isLogin}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="Konfirmasi password"
                    />
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 mt-6"
              >
                {loading ? "Loading..." : (
                  isLogin ? (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Masuk
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Daftar
                    </>
                  )
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                {isLogin 
                  ? "Belum punya akun? Daftar di sini" 
                  : "Sudah punya akun? Masuk di sini"}
              </button>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Akses Sesuai Role:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Super Admin: Akses penuh sistem</li>
                <li>• Admin Artikel: Kelola artikel dan konten</li>
                <li>• Seller: Kelola produk di ecommerce</li>
                <li>• Anggota Biasa: Akses program dan berbelanja</li>
              </ul>
            </div>

            <div className="mt-6 text-center">
              <Link to="/">
                <Button variant="outline" size="sm">
                  Kembali ke Beranda
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
