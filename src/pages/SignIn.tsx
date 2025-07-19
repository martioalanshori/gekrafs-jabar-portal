import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Mail, Lock, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Swal from 'sweetalert2';

// Input validation utilities
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string) => {
  return password.length >= 8;
};

// Fixed sanitizeInput function - only remove dangerous characters, keep spaces
const sanitizeInput = (input: string, shouldTrim: boolean = false) => {
  // Remove potentially dangerous characters but keep spaces
  let sanitized = input.replace(/[<>]/g, '');
  
  // Only trim if explicitly requested (like for validation)
  if (shouldTrim) {
    sanitized = sanitized.trim();
  }
  
  return sanitized;
};

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    role: "anggota_biasa"
  });

  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Use trimmed values for validation but don't modify the original formData
    const trimmedEmail = formData.email.trim();
    const trimmedFullName = formData.fullName.trim();
    if (!validateEmail(trimmedEmail)) {
      newErrors.email = "Email tidak valid";
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = "Password minimal 8 karakter";
    }

    if (!isLogin) {
      if (!trimmedFullName) {
        newErrors.fullName = "Nama lengkap wajib diisi";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Password tidak cocok";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Different handling for different field types
    let sanitizedValue = value;
    
    if (name === 'email') {
      // For email, remove spaces and dangerous characters
      sanitizedValue = sanitizeInput(value, true);
    } else if (name === 'fullName') {
      // For name fields, keep spaces but remove dangerous characters
      sanitizedValue = sanitizeInput(value, false);
    } else {
      // For password fields, keep as is (passwords might need special characters)
      sanitizedValue = value;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
    
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      if (isLogin) {
        const { error } = await signIn(formData.email.trim(), formData.password);
        if (error) {
          Swal.fire({
            icon: 'error',
            title: 'Login Gagal',
            text: error.message.includes('Invalid login credentials') ? 'Email atau password salah' : error.message.includes('Email not confirmed') ? 'Silakan konfirmasi email Anda terlebih dahulu' : `Login gagal: ${error.message}`,
          });
        } else {
          navigate('/');
        }
      } else {
        const { error } = await signUp(formData.email.trim(), formData.password, {
          full_name: formData.fullName.trim(), // Trim only when submitting
          role: formData.role
        });
        if (error) {
          Swal.fire({
            icon: 'error',
            title: 'Registrasi Gagal',
            text: error.message.includes('User already registered') ? 'Email sudah terdaftar. Silakan login.' : `Registrasi gagal: ${error.message}`,
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Registrasi Berhasil!',
            text: 'Silakan cek email Anda untuk konfirmasi.',
          });
          setIsLogin(true);
          setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Terjadi Kesalahan',
        text: 'Silakan coba lagi.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col">
      <Header />
      
      {/* Main content container with improved centering */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 pt-20">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-0 bg-white">
            <CardHeader className="text-center pb-6 px-6 pt-8">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <img src="assets/img/gekrafslogo.png" alt="GEKRAFS Logo" className="h-15 w-15" />
              </div>
              <CardTitle className="text-2xl text-gray-800">
                {isLogin ? "Masuk Akun" : "Daftar Akun"}
              </CardTitle>
              <p className="text-gray-600">
                {isLogin ? "Masuk untuk mengakses dashboard" : "Bergabung dengan Kami"}
              </p>
            </CardHeader>
            
            <CardContent className="px-6 pb-8">
              

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
                        className={`mt-1 ${errors.fullName ? 'border-red-500' : ''}`}
                        placeholder="Masukkan nama lengkap"
                      />
                      {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({...prev, role: value}))}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Pilih role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="anggota_biasa">Member Biasa</SelectItem>
                        </SelectContent>
                      </Select>
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
                      className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="nama@email.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
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
                      className={`pl-10 ${errors.password ? 'border-red-500' : ''}`}
                      placeholder="Masukkan password"
                    />
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
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
                        className={`pl-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                        placeholder="Konfirmasi password"
                      />
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                  </div>
                )}

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-sky-600 to-yellow-600 hover:from-sky-700 hover:to-yellow-700 mt-6"
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
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setErrors({});
                    setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
                  }}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {isLogin 
                    ? "Belum punya akun? Daftar di sini" 
                    : "Sudah punya akun? Masuk di sini"}
                </button>
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
      </div>
    </div>
  );
};

export default SignIn;