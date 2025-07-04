import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, Eye } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import DOMPurify from 'dompurify';

interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image_url: string;
  category: string;
  created_at: string;
  author_id: string;
  published: boolean;
  views: number;
}

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        if (!id) {
          navigate('/artikel');
          return;
        }

        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('id', id)
          .eq('published', true)
          .single();

        if (error) throw error;

        setArticle(data);

        // Increment view count
        await supabase
          .from('articles')
          .update({ views: (data.views || 0) + 1 })
          .eq('id', id);

      } catch (error) {
        console.error('Error fetching article:', error);
        toast({
          title: "Error",
          description: "Artikel tidak ditemukan",
          variant: "destructive",
        });
        navigate('/artikel');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, navigate]);

  // Sanitize content to prevent XSS attacks
  const sanitizeContent = (content: string) => {
    return DOMPurify.sanitize(content, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote'],
      ALLOWED_ATTR: [],
      FORBID_TAGS: ['script', 'object', 'embed', 'iframe', 'form'],
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Header />
        <div className="pt-16">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
                <div className="h-64 bg-gray-200 rounded mb-6"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Header />
        <div className="pt-16">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Artikel Tidak Ditemukan</h1>
              <Button onClick={() => navigate('/artikel')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke Artikel
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <div className="pt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Button 
              variant="outline" 
              onClick={() => navigate('/artikel')}
              className="mb-6 animate-fade-in-up"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Artikel
            </Button>

            <Card className="shadow-xl border-0 bg-white animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-0">
                {/* Hero Image */}
                {article.image_url && (
                  <div className="relative h-64 md:h-96 overflow-hidden rounded-t-lg">
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-gray-800">
                        {article.category}
                      </Badge>
                    </div>
                  </div>
                )}

                {/* Article Content */}
                <div className="p-6 md:p-8">
                  {/* Title */}
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                    {article.title}
                  </h1>

                  {/* Article Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8 pb-6 border-b">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(article.created_at).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-2" />
                      {article.views || 0} views
                    </div>
                  </div>

                  {/* Article Content - Now properly sanitized */}
                  <div className="prose prose-lg max-w-none">
                    <div 
                      className="text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ 
                        __html: sanitizeContent(article.content.replace(/\n/g, '<br/>'))
                      }}
                    />
                  </div>

                  {/* Share Section */}
                  <div className="mt-8 pt-6 border-t">
                    <h3 className="text-lg font-semibold mb-4">Bagikan Artikel</h3>
                    <div className="flex space-x-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          toast({
                            title: "Link Disalin",
                            description: "Link artikel berhasil disalin ke clipboard",
                          });
                        }}
                      >
                        Salin Link
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ArticleDetail;
