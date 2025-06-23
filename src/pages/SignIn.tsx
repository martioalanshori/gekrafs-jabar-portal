
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Mail, Lock, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    kampus: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    
    if (isLogin) {
      alert("Fitur login akan segera tersedia! Silakan hubungi admin untuk akses.");
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert("Password tidak cocok!");
        return;
      }
      alert("Fitur registrasi akan segera tersedia! Silakan hubungi admin untuk pendaftaran.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white">
        <CardHeader className="text-center pb-6">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-gray-800">
            {isLogin ? "Masuk ke GEKRAFS" : "Daftar GEKRAFS"}
          </CardTitle>
          <p className="text-gray-600">
            {isLogin ? "Masuk untuk mengakses fitur eksklusif" : "Bergabung dengan komunitas kreatif"}
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required={!isLogin}
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                
                <div>
                  <Label htmlFor="kampus">Kampus/Universitas</Label>
                  <Input
                    id="kampus"
                    name="kampus"
                    type="text"
                    required={!isLogin}
                    value={formData.kampus}
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
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 mt-6"
            >
              {isLogin ? (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Masuk
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Daftar
                </>
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

          {isLogin && (
            <div className="mt-4 text-center">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Lupa password?
              </a>
            </div>
          )}

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Akses Eksklusif Member:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Toko online produk mahasiswa</li>
              <li>• Artikel dan konten premium</li>
              <li>• Notifikasi program terbaru</li>
              <li>• Forum diskusi antar member</li>
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
  );
};

export default SignIn;
