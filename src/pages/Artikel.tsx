
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Article } from "@/types/database";

const Artikel = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Data dummy artikel
  const dummyArticles: Article[] = [
    {
      id: "1",
      title: "Inovasi Mahasiswa GEKRAFS dalam Bidang Teknologi",
      excerpt: "Mahasiswa GEKRAFS menciptakan aplikasi inovatif untuk membantu UMKM lokal dalam digitalisasi bisnis mereka dengan menggunakan teknologi terkini...",
      content: "Content lengkap artikel...",
      image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author_id: "1",
      category: "Teknologi",
      published: true,
      views: 125,
      created_at: "2024-01-15T10:00:00Z"
    },
    {
      id: "2",
      title: "Workshop Kewirausahaan: Membangun Startup dari Kampus",
      excerpt: "Event workshop kewirausahaan yang diselenggarakan GEKRAFS berhasil menarik lebih dari 200 mahasiswa dari berbagai kampus di Jawa Barat...",
      content: "Content lengkap artikel...",
      image_url: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author_id: "1",
      category: "Kewirausahaan",
      published: true,
      views: 89,
      created_at: "2024-01-12T14:30:00Z"
    },
    {
      id: "3",
      title: "Festival Ekonomi Kreatif Jawa Barat 2024",
      excerpt: "GEKRAFS Jawa Barat menyelenggarakan festival ekonomi kreatif tahunan yang menampilkan karya-karya inovatif mahasiswa dari seluruh provinsi...",
      content: "Content lengkap artikel...",
      image_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author_id: "1",
      category: "Event",
      published: true,
      views: 234,
      created_at: "2024-01-10T09:15:00Z"
    },
    {
      id: "4",
      title: "Program Beasiswa GEKRAFS untuk Mahasiswa Berprestasi",
      excerpt: "GEKRAFS membuka program beasiswa untuk mahasiswa berprestasi dengan latar belakang ekonomi kurang mampu sebagai bentuk komitmen dalam pendidikan...",
      content: "Content lengkap artikel...",
      image_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author_id: "1",
      category: "Beasiswa", 
      published: true,
      views: 156,
      created_at: "2024-01-08T11:45:00Z"
    },
    {
      id: "5",
      title: "Kolaborasi GEKRAFS dengan Pemerintah Daerah",
      excerpt: "Kerjasama strategis GEKRAFS dengan Pemerintah Provinsi Jawa Barat dalam pengembangan ekonomi kreatif dan pemberdayaan mahasiswa...",
      content: "Content lengkap artikel...",
      image_url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author_id: "1",
      category: "Kerjasama",
      published: true,
      views: 78,
      created_at: "2024-01-05T16:20:00Z"
    },
    {
      id: "6",
      title: "Pelatihan Leadership untuk Pengurus GEKRAFS",
      excerpt: "Program pelatihan kepemimpinan intensif untuk meningkatkan kapasitas pengurus GEKRAFS di seluruh Jawa Barat dalam mengelola organisasi...",
      content: "Content lengkap artikel...",
      image_url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author_id: "1",
      category: "Leadership",
      published: true,
      views: 102,
      created_at: "2024-01-03T13:10:00Z"
    }
  ];

  const categories = ["All", "Teknologi", "Kewirausahaan", "Event", "Beasiswa", "Kerjasama", "Leadership"];

  useEffect(() => {
    // Simulate API call with dummy data
    setArticles(dummyArticles);
  }, []);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory && article.published;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <div className="pt-16">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Artikel GEKRAFS</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Informasi terbaru, berita, dan insight seputar kegiatan GEKRAFS Jawa Barat
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-12 space-y-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Cari artikel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="mb-2"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="shadow-lg hover:shadow-xl transition-shadow border-0 bg-white overflow-hidden">
                <div className="relative">
                  <img 
                    src={article.image_url} 
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-3 left-3">{article.category}</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">{article.excerpt}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>{new Date(article.created_at || '').toLocaleDateString('id-ID')}</span>
                    <span>{article.views} views</span>
                  </div>
                  <Button className="w-full">
                    Baca Selengkapnya
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Tidak ada artikel yang ditemukan.</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Artikel;
