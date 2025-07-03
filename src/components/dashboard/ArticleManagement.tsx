
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url?: string;
  category: string;
  published: boolean;
  views: number;
  created_at: string;
}

const ArticleManagement = () => {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image_url: '',
    category: '',
    published: false
  });

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast.error('Gagal memuat artikel');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const articleData = {
        ...formData,
        author_id: user.id
      };

      if (editingArticle) {
        const { error } = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', editingArticle.id);

        if (error) throw error;
        toast.success('Artikel berhasil diperbarui');
      } else {
        const { error } = await supabase
          .from('articles')
          .insert([articleData]);

        if (error) throw error;
        toast.success('Artikel berhasil dibuat');
      }

      setIsDialogOpen(false);
      setEditingArticle(null);
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        image_url: '',
        category: '',
        published: false
      });
      fetchArticles();
    } catch (error) {
      console.error('Error saving article:', error);
      toast.error('Gagal menyimpan artikel');
    }
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      image_url: article.image_url || '',
      category: article.category,
      published: article.published
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus artikel ini?')) return;

    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Artikel berhasil dihapus');
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
      toast.error('Gagal menghapus artikel');
    }
  };

  const togglePublished = async (article: Article) => {
    try {
      const { error } = await supabase
        .from('articles')
        .update({ published: !article.published })
        .eq('id', article.id);

      if (error) throw error;
      toast.success(`Artikel ${!article.published ? 'dipublikasikan' : 'dijadikan draft'}`);
      fetchArticles();
    } catch (error) {
      console.error('Error updating article:', error);
      toast.error('Gagal mengubah status artikel');
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Kelola Artikel</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingArticle(null);
                setFormData({
                  title: '',
                  excerpt: '',
                  content: '',
                  image_url: '',
                  category: '',
                  published: false
                });
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Buat Artikel Baru
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingArticle ? 'Edit Artikel' : 'Buat Artikel Baru'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Judul Artikel"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
                <Input
                  placeholder="Kategori"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
                <Input
                  placeholder="URL Gambar"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                />
                <Textarea
                  placeholder="Ringkasan artikel..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="min-h-20"
                />
                <Textarea
                  placeholder="Konten artikel..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="min-h-40"
                  required
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  />
                  <label htmlFor="published">Publikasikan artikel</label>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button type="submit">
                    {editingArticle ? 'Perbarui' : 'Buat'} Artikel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {articles.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Belum ada artikel</p>
          ) : (
            articles.map((article) => (
              <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium">{article.title}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-1">{article.excerpt}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge 
                      variant={article.published ? "default" : "secondary"}
                      className="cursor-pointer"
                      onClick={() => togglePublished(article)}
                    >
                      {article.published ? "Published" : "Draft"}
                    </Badge>
                    <Badge variant="outline">{article.category}</Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Eye className="h-3 w-3 mr-1" />
                      {article.views}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(article)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDelete(article.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleManagement;
