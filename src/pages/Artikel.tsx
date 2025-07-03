
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Eye, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Artikel = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = ["Semua", "Teknologi", "Kewirausahaan", "Leadership", "Workshop", "Event", "Kerjasama"];

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter((article: any) => 
    selectedCategory === "Semua" || article.category === selectedCategory
  );

  const featuredArticles = filteredArticles.filter((article: any) => 
    article.views > 200 || article.category === 'Event'
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      <div className="pt-16">
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
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                className="mb-2"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Featured Articles */}
          {featuredArticles.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">Artikel Unggulan</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredArticles.slice(0, 2).map((article: any) => (
                  <Card key={article.id} className="shadow-xl border-0 bg-white hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
                    <div className="relative">
                      <img 
                        src={article.image_url} 
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
                          <span>Admin</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(article.created_at).toLocaleDateString('id-ID')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{article.views}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>
                      <Button variant="outline" className="group">
                        Baca Selengkapnya 
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* All Articles */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Semua Artikel</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article: any) => (
                <Card key={article.id} className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  <div className="relative">
                    <img 
                      src={article.image_url} 
                      alt={article.title}
                      className="w-full h-40 object-cover"
                    />
                    <Badge className="absolute top-3 left-3 text-xs">{article.category}</Badge>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg hover:text-blue-600 transition-colors cursor-pointer leading-tight line-clamp-2">
                      {article.title}
                    </CardTitle>
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>Admin</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(article.created_at).toLocaleDateString('id-ID')}</span>
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

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Tidak ada artikel untuk kategori ini.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Artikel;
