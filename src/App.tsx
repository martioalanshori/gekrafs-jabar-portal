import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Organisasi from "./pages/Organisasi";
import AdArt from "./pages/AdArt";
import DewanPembina from "./pages/DewaanPembina";
import Program from "./pages/Program";
import Kepengurusan from "./pages/Kepengurusan";
import Artikel from "./pages/Artikel";
import ArticleDetail from "./pages/ArticleDetail";
import Contact from "./pages/Contact";
import Ecommerce from "./pages/Ecommerce";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/organisasi" element={<Organisasi />} />
            <Route path="/ad-art" element={<AdArt />} />
            <Route path="/dewan-pembina" element={<DewanPembina />} />
            <Route path="/program" element={<Program />} />
            <Route path="/artikel" element={<Artikel />} /> 
            <Route path="/kepengurusan" element={<Kepengurusan />} />
            <Route path="/artikel/:id" element={<ArticleDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/ecommerce" element={<Ecommerce />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
