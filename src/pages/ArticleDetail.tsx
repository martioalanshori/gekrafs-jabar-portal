import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Calendar, User, Eye, Facebook, Instagram, Twitter, Share2, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import DOMPurify from 'dompurify';
import DynamicMetaTags from "@/components/DynamicMetaTags";
import { generateSocialPreviewUrl } from "@/utils/socialPreview";
import { recordArticleView } from "@/utils/views";

// Function to extract ID from slug
const extractIdFromSlug = (slug: string): string => {
  // Handle case where slug might be just the ID
  if (!slug.includes('-')) {
    return slug;
  }
  
  // Find UUID pattern in the entire slug
  const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
  const uuidMatch = slug.match(uuidRegex);
  
  if (uuidMatch) {
    console.log('Found UUID in slug:', uuidMatch[0]);
    return uuidMatch[0];
  }
  
  // If no UUID found, try to get the last part that might be a shorter ID
  const parts = slug.split('-');
  const lastPart = parts[parts.length - 1];
  
  // Check if last part looks like a UUID (even if incomplete)
  if (lastPart && lastPart.length >= 8) {
    console.log('Using last part as ID:', lastPart);
    return lastPart;
  }
  
  // Fallback: return the original slug
  console.warn('Could not extract valid UUID from slug:', slug);
  return slug;
};

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

interface Comment {
  id: string;
  article_id: string;
  user_id?: string;
  name: string;
  email: string;
  comment: string;
  created_at: string;
  approved: boolean;
}

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentForm, setCommentForm] = useState({
    name: '',
    email: '',
    comment: ''
  });

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        if (!id) {
          navigate('/artikel');
          return;
        }

        // Extract the actual ID from the slug
        const actualId = extractIdFromSlug(id);
        console.log('Extracted ID:', actualId);
        console.log('Original slug:', id);

        // First, let's check if the article exists
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('id', actualId)
          .eq('published', true)
          .single();

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        if (!data) {
          throw new Error('Article not found');
        }

        console.log('Article found:', data);
        setArticle(data);

        // Record article view using utility function
        try {
          const viewRecorded = await recordArticleView(actualId);
          if (viewRecorded) {
            // Update local state if view was recorded
            setArticle(prev => prev ? { ...prev, views: (prev.views || 0) + 1 } : null);
          }
        } catch (viewError) {
          console.error('Error recording view:', viewError);
          // Don't throw error for view count update
        }

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

    const fetchComments = async () => {
      if (!id) return;
      
      setCommentsLoading(true);
      try {
        const actualId = extractIdFromSlug(id);
        console.log('Fetching comments for article ID:', actualId);
        
        const { data, error } = await supabase
          .from('comments')
          .select('*')
          .eq('article_id', actualId)
          .eq('approved', true)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching comments:', error);
          throw error;
        }
        
        console.log('Comments fetched:', data);
        setComments(data || []);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setComments([]);
      } finally {
        setCommentsLoading(false);
      }
    };

    fetchArticle();
    fetchComments();
  }, [id, navigate]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentForm.name || !commentForm.email || !commentForm.comment) {
      toast({
        title: "Error",
        description: "Semua field harus diisi",
        variant: "destructive",
      });
      return;
    }

    try {
      const actualId = extractIdFromSlug(id!);
      const { error } = await supabase
        .from('comments')
        .insert({
          article_id: actualId,
          name: commentForm.name,
          email: commentForm.email,
          comment: commentForm.comment,
        });

      if (error) throw error;

      toast({
        title: "Komentar Berhasil",
        description: "Komentar Anda akan ditampilkan setelah disetujui admin",
      });

      setCommentForm({ name: '', email: '', comment: '' });
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast({
        title: "Error",
        description: "Gagal mengirim komentar",
        variant: "destructive",
      });
    }
  };

  const socialPreviewUrl = article ? generateSocialPreviewUrl(
    article.id,
    article.title,
    article.excerpt || article.content.substring(0, 160),
    article.image_url
  ) : window.location.href;

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(socialPreviewUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(socialPreviewUrl)}&text=${encodeURIComponent(article?.title || '')}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent((article?.title || '') + ' ' + socialPreviewUrl)}`,
    instagram: socialPreviewUrl
  };

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
      {article && (
        <DynamicMetaTags 
          title={`${article.title} - GEKRAFS Kampus Jabar`}
          description={article.excerpt || article.content.substring(0, 160).replace(/<[^>]*>/g, '') + '...'}
          image={article.image_url || 'https://gekrafskampusjabar.my.id/assets/img/gekrafslogo.png'}
          type="article"
          url={`https://gekrafskampusjabar.my.id/artikel/${id}`}
        />
      )}
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
                      {new Date(article.created_at).toLocaleDateString('en-US', {
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
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Share2 className="h-5 w-5 mr-2" />
                      Bagikan Artikel
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(shareUrls.facebook, '_blank')}
                        className="flex items-center space-x-2 hover:bg-blue-50 hover:border-blue-300"
                      >
                        <Facebook className="h-4 w-4" />
                        <span>Facebook</span>
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(shareUrls.twitter, '_blank')}
                        className="flex items-center space-x-2 hover:bg-blue-50 hover:border-blue-300"
                      >
                        <Twitter className="h-4 w-4" />
                        <span>Twitter</span>
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(shareUrls.whatsapp, '_blank')}
                        className="flex items-center space-x-2 hover:bg-green-50 hover:border-green-300"
                      >
                        <span className="h-4 w-4 text-green-600">📱</span>
                        <span>WhatsApp</span>
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          toast({
                            title: "Link Disalin untuk Instagram",
                            description: "Silakan paste link ini di Instagram Story Anda",
                          });
                        }}
                        className="flex items-center space-x-2 hover:bg-pink-50 hover:border-pink-300"
                      >
                        <Instagram className="h-4 w-4" />
                        <span>Instagram</span>
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(socialPreviewUrl);
                          toast({
                            title: "Link Artikel Disalin",
                            description: "Link artikel dengan preview yang benar telah disalin ke clipboard. Gunakan link ini untuk share di social media.",
                          });
                        }}
                        className="flex items-center space-x-2"
                      >
                        <Share2 className="h-4 w-4" />
                        <span>Salin Link</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card className="shadow-xl border-0 bg-white mt-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Komentar ({comments.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Comment Form */}
                <form onSubmit={handleCommentSubmit} className="mb-8 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-4">Tinggalkan Komentar</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <Input
                      placeholder="Nama Anda"
                      value={commentForm.name}
                      onChange={(e) => setCommentForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                    <Input
                      type="email"
                      placeholder="Email Anda"
                      value={commentForm.email}
                      onChange={(e) => setCommentForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <Textarea
                    placeholder="Tulis komentar Anda di sini..."
                    value={commentForm.comment}
                    onChange={(e) => setCommentForm(prev => ({ ...prev, comment: e.target.value }))}
                    className="mb-4"
                    rows={4}
                    required
                  />
                  <Button type="submit" className="w-full md:w-auto">
                    Kirim Komentar
                  </Button>
                  <p className="text-sm text-gray-600 mt-2">
                    Komentar akan ditampilkan setelah disetujui oleh admin.
                  </p>
                </form>

                {/* Comments List */}
                <div className="space-y-6">
                  {commentsLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="mt-2 text-gray-600">Loading komentar...</p>
                    </div>
                  ) : comments.length === 0 ? (
                    <div className="text-center py-8 text-gray-600">
                      <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Belum ada komentar. Jadilah yang pertama berkomentar!</p>
                    </div>
                  ) : (
                    comments.map((comment) => (
                      <div key={comment.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                        <div className="flex items-start space-x-3">
                          <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-semibold">
                            {comment.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h5 className="font-semibold text-gray-800">{comment.name}</h5>
                              <span className="text-sm text-gray-500">
                                {new Date(comment.created_at).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{comment.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
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
