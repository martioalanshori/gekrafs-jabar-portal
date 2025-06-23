
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Eye, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Artikel = () => {
  const articles = [
    {
      id: 1,
      title: "Inovasi Mahasiswa GEKRAFS dalam Bidang Teknologi",
      excerpt: "Mahasiswa GEKRAFS Jawa Barat berhasil menciptakan aplikasi inovatif untuk membantu UMKM lokal dalam digitalisasi bisnis mereka. Aplikasi ini telah digunakan oleh lebih dari 100 UMKM...",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      author: "Ahmad Rizki",
      date: "15 Desember 2024",
      category: "Teknologi",
      views: 256,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: 2,
      title: "Workshop Kewirausahaan: Membangun Startup dari Kampus",
      excerpt: "Event workshop kewirausahaan yang diselenggarakan GEKRAFS berhasil menarik lebih dari 200 mahasiswa dari berbagai kampus di Jawa Barat untuk belajar tentang dunia startup...",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      author: "Siti Nurhaliza",
      date: "10 Desember 2024",
      category: "Kewirausahaan",
      views: 189,
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false
    },
    {
      id: 3,
      title: "Kolaborasi GEKRAFS dengan Industri Kreatif",
      excerpt: "Kerjasama strategis dengan berbagai perusahaan kreatif untuk membuka peluang magang dan pekerjaan bagi mahasiswa anggota GEKRAFS. Program ini telah memberikan dampak positif...",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      author: "Budi Santoso",
      date: "5 Desember 2024",
      category: "Kerjasama",
      views: 142,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false
    },
    {
      id: 4,
      title: "Program Leadership Development: Mencetak Pemimpin Masa Depan",
      excerpt: "Program unggulan GEKRAFS dalam mengembangkan soft skill kepemimpinan mahasiswa telah meluluskan 100+ alumni yang kini berperan aktif di berbagai organisasi...",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      author: "Dewi Lestari", 
      date: "1 Desember 2024",
      category: "Leadership",
      views: 98,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false
    },
    {
      id: 5,
      title: "Festival Ekonomi Kreatif Jawa Barat 2024",
      excerpt: "GEKRAFS Jawa Barat menyelenggarakan festival ekonomi kreatif tahunan yang menampilkan karya-karya inovatif mahasiswa dari berbagai bidang seperti desain, teknologi, dan seni...",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      author: "Agus Setiawan",
      date: "25 November 2024",
      category: "Event",
      views: 324,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: 6,
      title: "Digital Marketing untuk UMKM: Workshop Praktis",
      excerpt: "Workshop digital marketing yang diselenggarakan GEKRAFS memberikan pelatihan praktis kepada pelaku UMKM tentang cara memanfaatkan media sosial dan platform digital...",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      author: "Maya Sari",
      date: "20 November 2024",
      category: "Workshop",
      views: 167,
      image: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false
    }
  ];

  const categories = ["Semua", "Teknologi", "Kewirausahaan", "Leadership", "Workshop", "Event", "Kerjasama"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Artikel GEKRAFS Jawa Barat</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Berita, informasi, dan insight terbaru seputar kegiatan dan program GEKRAFS Kampus Jawa Barat
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category, index) => (
            <Button 
              key={index}
              variant={index === 0 ? "default" : "outline"}
              size="sm"
              className="mb-2"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Articles */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Artikel Unggulan</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {articles.filter(article => article.featured).map((article) => (
              <Card key={article.id} className="shadow-xl border-0 bg-white hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
                <div className="relative">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-blue-600">{article.category}</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl hover:text-blue-600 transition-colors cursor-pointer">
                    {article.title}
                  </CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{article.views}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed mb-4">{article.excerpt}</p>
                  <Button variant="outline" className="group">
                    Baca Selengkapnya 
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Articles */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Semua Artikel</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Card key={article.id} className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="relative">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-40 object-cover"
                  />
                  <Badge className="absolute top-3 left-3 text-xs">{article.category}</Badge>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg hover:text-blue-600 transition-colors cursor-pointer leading-tight">
                    {article.title}
                  </CardTitle>
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{article.date}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <Button variant="outline" size="sm">
                      Baca Artikel
                    </Button>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Eye className="h-3 w-3" />
                      <span>{article.views}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
            Muat Artikel Lainnya
          </Button>
        </div>

        <div className="text-center mt-8">
          <Link to="/">
            <Button variant="outline">
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Artikel;
