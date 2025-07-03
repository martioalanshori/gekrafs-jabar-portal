
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Mail, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'closed';
  created_at: string;
}

const ContactMessagesManagement = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Gagal memuat pesan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const updateMessageStatus = async (id: string, status: ContactMessage['status']) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      toast.success('Status pesan diperbarui');
      fetchMessages();
    } catch (error) {
      console.error('Error updating message status:', error);
      toast.error('Gagal memperbarui status pesan');
    }
  };

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    if (message.status === 'new') {
      updateMessageStatus(message.id, 'read');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-500';
      case 'read': return 'bg-blue-500';
      case 'replied': return 'bg-green-500';
      case 'closed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Baru';
      case 'read': return 'Dibaca';
      case 'replied': return 'Dibalas';
      case 'closed': return 'Ditutup';
      default: return status;
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="h-5 w-5 mr-2" />
          Booking Meeting & Pesan Kontak
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Belum ada pesan</p>
          ) : (
            messages.map((message) => (
              <div key={message.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-medium">{message.name}</h3>
                    <Badge className={getStatusColor(message.status)}>
                      {getStatusText(message.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{message.email}</p>
                  <p className="text-sm font-medium mt-1">{message.subject}</p>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-1">{message.message}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(message.created_at).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewMessage(message)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Detail Pesan</DialogTitle>
                      </DialogHeader>
                      {selectedMessage && (
                        <div className="space-y-4">
                          <div>
                            <label className="font-medium">Nama:</label>
                            <p>{selectedMessage.name}</p>
                          </div>
                          <div>
                            <label className="font-medium">Email:</label>
                            <p>{selectedMessage.email}</p>
                          </div>
                          <div>
                            <label className="font-medium">Subjek:</label>
                            <p>{selectedMessage.subject}</p>
                          </div>
                          <div>
                            <label className="font-medium">Pesan:</label>
                            <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                          </div>
                          <div>
                            <label className="font-medium">Status:</label>
                            <div className="flex space-x-2 mt-2">
                              {['read', 'replied', 'closed'].map((status) => (
                                <Button
                                  key={status}
                                  variant={selectedMessage.status === status ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => updateMessageStatus(selectedMessage.id, status as ContactMessage['status'])}
                                >
                                  {getStatusText(status)}
                                </Button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`mailto:${message.email}?subject=Re: ${message.subject}`)}
                  >
                    <Mail className="h-4 w-4" />
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

export default ContactMessagesManagement;
