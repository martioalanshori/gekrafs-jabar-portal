import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Eye, Package, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface Order {
  id: string;
  total_amount: number;
  status: string;
  created_at: string;
  shipping_address: string;
  payment_method: string;
  user_id: string;
  order_items: Array<{
    id: string;
    product_id: string;
    quantity: number;
    price: number;
    products: {
      name: string;
      image_url: string;
    };
  }>;
  profiles?: {
    email: string;
  };
}

const OrderManagement = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { profile, user } = useAuth();
  const queryClient = useQueryClient();

  const isMember = profile?.role === 'anggota_biasa';
  const isAdminOrSeller = profile?.role === 'super_admin' || profile?.role === 'seller';

  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders', user?.id, profile?.role],
    queryFn: async () => {
      let selectString = `
        *,
        order_items(
          id,
          product_id,
          quantity,
          price,
          products(name, image_url)
        )
      `;
      // Clean up select string
      selectString = selectString.replace(/\s+/g, ' ').replace(/,\s*,/g, ',').trim();
      let query = supabase
        .from('orders')
        .select(selectString)
        .order('created_at', { ascending: false });
      if (isMember && user) {
        query = query.eq('user_id', user.id);
      }
      const { data, error } = await query;
      if (error) throw error;
      if (!Array.isArray(data)) return [];
      const validOrders = data
        .filter((item) => typeof item === 'object' && item !== null)
        .filter((item) => 'id' in item && 'total_amount' in item)
        .map((item) => item as unknown as Order);
      return validOrders;
    },
  });

  // Real-time subscription for orders
  useEffect(() => {
    const channel = supabase
      .channel('orders-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'orders' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['orders'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      // Refresh orders
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      
      toast({
        title: "Status Updated",
        description: `Status pesanan berhasil diubah menjadi ${newStatus}`,
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: "Error",
        description: "Gagal mengubah status pesanan",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  // Filter orders for member (anggota_biasa) to only their own (now handled in query)
  const filteredOrders = orders || [];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <ShoppingCart className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold">
            {isMember ? 'Pesanan Saya' : 'Semua Pesanan'}
          </h1>
        </div>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <ShoppingCart className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold">
            {isMember ? 'Pesanan Saya' : 'Semua Pesanan'}
          </h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <p className="text-red-600">Error loading orders: {(error as Error).message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShoppingCart className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold">
            {isMember ? 'Pesanan Saya' : 'Semua Pesanan'}
          </h1>
        </div>
        <div className="text-sm text-gray-600">
          Total {filteredOrders.length} pesanan
        </div>
      </div>

      <div className="grid gap-6">
        {filteredOrders.length === 0 ? (
          <div className="text-center text-gray-500 py-12 flex flex-col items-center">
            <ShoppingCart className="h-12 w-12 mb-4 text-gray-300" />
            <p className="text-lg">Tidak ada pesanan.</p>
            <div className="mt-4 text-sm text-gray-400 max-w-md">
              Belum ada pesanan yang masuk. Silakan lakukan pembelian produk untuk melihat riwayat pesanan di sini.
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="text-xs text-gray-500">Keterangan status pesanan:</span>
              <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
              <span className="text-xs text-gray-500">= Menunggu pembayaran/konfirmasi</span>
              <Badge className="bg-blue-100 text-blue-800">Processing</Badge>
              <span className="text-xs text-gray-500">= Sedang diproses/dikirim</span>
              <Badge className="bg-green-100 text-green-800">Completed</Badge>
              <span className="text-xs text-gray-500">= Selesai</span>
              <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
              <span className="text-xs text-gray-500">= Dibatalkan</span>
            </div>
            {filteredOrders.map((order) => (
              <Card key={order.id} className="shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      Pesanan #{order.id.slice(0, 8)}
                    </CardTitle>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Date(order.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Informasi Pesanan</h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Total:</span> {formatCurrency(order.total_amount)}</p>
                        <p><span className="font-medium">Metode Pembayaran:</span> {order.payment_method || 'Belum dipilih'}</p>
                        <p><span className="font-medium">Alamat Pengiriman:</span> {order.shipping_address || 'Belum diisi'}</p>
                        {isAdminOrSeller && (
                          <p><span className="font-medium">Email:</span> {order.profiles?.email || '-'}</p>
                        )}
                        {isAdminOrSeller && (
                          <p><span className="font-medium">User ID:</span> {order.user_id}</p>
                        )}
                        {isMember && (
                          <p><span className="font-medium">Email:</span> {user?.email || '-'}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Item Pesanan ({order.order_items?.length || 0})</h4>
                      <div className="space-y-2">
                        {order.order_items?.slice(0, 2).map((item) => (
                          <div key={item.id} className="flex items-center space-x-2 text-sm">
                            <Package className="h-4 w-4 text-gray-400" />
                            <span>{item.products?.name || 'Produk tidak ditemukan'}</span>
                            <span className="text-gray-500">x{item.quantity}</span>
                          </div>
                        ))}
                        {(order.order_items?.length || 0) > 2 && (
                          <p className="text-sm text-gray-500">
                            +{(order.order_items?.length || 0) - 2} item lainnya
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    {isAdminOrSeller && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Status:</span>
                        <Select value={order.status} onValueChange={(value) => updateOrderStatus(order.id, value)}>
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Detail Pesanan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredOrders.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Belum Ada Pesanan</h3>
                  <p className="text-gray-500">Pesanan akan muncul di sini ketika ada yang memesan produk</p>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
      {/* Modal Detail Pesanan */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={() => setSelectedOrder(null)}>&times;</button>
            <h2 className="text-xl font-bold mb-4">Detail Pesanan #{selectedOrder.id.slice(0,8)}</h2>
            <div className="mb-2 text-sm text-gray-600">Tanggal: {new Date(selectedOrder.created_at).toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</div>
            <div className="mb-2 text-sm"><span className="font-medium">Status:</span> <Badge className={getStatusColor(selectedOrder.status)}>{selectedOrder.status}</Badge></div>
            <div className="mb-2 text-sm"><span className="font-medium">Total:</span> {formatCurrency(selectedOrder.total_amount)}</div>
            <div className="mb-2 text-sm"><span className="font-medium">Metode Pembayaran:</span> {selectedOrder.payment_method}</div>
            <div className="mb-2 text-sm"><span className="font-medium">Alamat Pengiriman:</span> {selectedOrder.shipping_address}</div>
            {isAdminOrSeller && (
              <div className="mb-2 text-sm"><span className="font-medium">Email:</span> {selectedOrder.profiles?.email || '-'}</div>
            )}
            {isAdminOrSeller && (
              <div className="mb-2 text-sm"><span className="font-medium">User ID:</span> {selectedOrder.user_id}</div>
            )}
            {isMember && (
              <div className="mb-2 text-sm"><span className="font-medium">Email:</span> {user?.email || '-'}</div>
            )}
            <div className="mb-2 text-sm font-semibold">Item Pesanan:</div>
            <ul className="mb-2 pl-4 list-disc text-sm">
              {selectedOrder.order_items.map(item => (
                <li key={item.id}>
                  {item.products?.name} x{item.quantity} @ {formatCurrency(item.price)}
                </li>
              ))}
            </ul>
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setSelectedOrder(null)}>Tutup</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
