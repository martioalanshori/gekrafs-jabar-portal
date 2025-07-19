
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Package } from 'lucide-react';
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

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  category: string;
  stock: number;
  active: boolean;
  created_at: string;
  seller_id: string;
}

const ProductManagement = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category: '',
    stock: '',
    active: true
  });

  const fetchProducts = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        toast.error('Gagal memuat produk: ' + error.message);
        return;
      }
      
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Gagal memuat produk');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [user]);

  // Real-time subscription
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('products-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'products' },
        () => {
          fetchProducts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      image_url: '',
      category: '',
      stock: '',
      active: true
    });
    setEditingProduct(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Anda harus login terlebih dahulu');
      return;
    }

    if (!formData.name.trim() || !formData.price || !formData.stock) {
      toast.error('Nama, harga, dan stok produk wajib diisi');
      return;
    }

    const price = parseFloat(formData.price);
    const stock = parseInt(formData.stock);

    if (isNaN(price) || price <= 0) {
      toast.error('Harga harus berupa angka positif');
      return;
    }

    if (isNaN(stock) || stock < 0) {
      toast.error('Stok harus berupa angka non-negatif');
      return;
    }

    try {
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: price,
        image_url: formData.image_url.trim() || null,
        category: formData.category.trim(),
        stock: stock,
        active: formData.active,
        seller_id: user.id
      };

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);

        if (error) throw error;
        toast.success('Produk berhasil diperbarui');
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData]);

        if (error) throw error;
        toast.success('Produk berhasil dibuat');
      }

      setIsDialogOpen(false);
      resetForm();
      fetchProducts();
    } catch (error: any) {
      console.error('Error saving product:', error);
      toast.error('Gagal menyimpan produk: ' + (error.message || 'Unknown error'));
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      image_url: product.image_url || '',
      category: product.category || '',
      stock: product.stock.toString(),
      active: product.active
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus produk ini?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Produk berhasil dihapus');
      fetchProducts();
    } catch (error: any) {
      console.error('Error deleting product:', error);
      toast.error('Gagal menghapus produk: ' + (error.message || 'Unknown error'));
    }
  };

  const toggleActive = async (product: Product) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ active: !product.active })
        .eq('id', product.id);

      if (error) throw error;
      toast.success(`Produk ${!product.active ? 'diaktifkan' : 'dinonaktifkan'}`);
      fetchProducts();
    } catch (error: any) {
      console.error('Error updating product:', error);
      toast.error('Gagal mengubah status produk: ' + (error.message || 'Unknown error'));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Memuat produk...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Kelola Produk</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={resetForm}
              className="hover-lift smooth-transition"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Produk Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl animate-scale-in">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Nama Produk"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                placeholder="Kategori"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  placeholder="Harga"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  min="0"
                  step="0.01"
                />
                <Input
                  type="number"
                  placeholder="Stok"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  required
                  min="0"
                />
              </div>
              <Input
                placeholder="URL Gambar"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              />
              <Textarea
                placeholder="Deskripsi produk..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="min-h-20"
              />
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                />
                <label htmlFor="active">Produk aktif</label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Batal
                </Button>
                <Button type="submit">
                  {editingProduct ? 'Perbarui' : 'Tambah'} Produk
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="hover-lift smooth-transition">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Daftar Produk
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {products.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Belum ada produk</p>
                <p className="text-sm mt-2">Klik tombol "Tambah Produk Baru" untuk memulai</p>
              </div>
            ) : (
              products.map((product) => (
                <div key={product.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border rounded-lg hover:bg-gray-50 smooth-transition gap-1 sm:gap-0">
                  <div className="flex-1 w-full">
                    <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                      {product.image_url && (
                        <img src={product.image_url} alt={product.name} className="w-10 h-10 sm:w-14 sm:h-14 object-cover rounded border" />
                      )}
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base text-gray-800">{product.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
                      <span className="bg-gray-800 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full font-semibold text-xs sm:text-sm">Rp {product.price.toLocaleString('id-ID')}</span>
                      <span className="bg-gray-200 text-gray-700 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full font-medium text-xs sm:text-sm">Stock: {product.stock}</span>
                      <span className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full font-medium text-xs sm:text-sm ${product.active ? 'bg-gray-100 text-gray-800' : 'bg-gray-200 text-gray-400'}`}>{product.active ? 'Active' : 'Inactive'}</span>
                      <span className="bg-gray-100 text-gray-500 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full font-medium text-xs sm:text-xs">{product.category}</span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-1 sm:gap-2 mt-2 sm:mt-0 sm:ml-4">
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="w-7 h-7 sm:w-9 sm:h-9 hover:scale-105 smooth-transition"
                      onClick={() => handleEdit(product)}
                    >
                      <Edit className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="w-7 h-7 sm:w-9 sm:h-9 text-red-600 hover:text-red-700 hover:scale-105 smooth-transition"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductManagement;
