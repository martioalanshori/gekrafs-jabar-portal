import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SupabaseTester = () => {
  const [connectionStatus, setConnectionStatus] = useState<string>('Testing...');
  const [articlesData, setArticlesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    setLoading(true);
    try {
      console.log('Testing Supabase connection...');
      
      // Test basic connection
      const { data, error } = await supabase
        .from('articles')
        .select('count')
        .limit(1);
      
      if (error) {
        console.error('Connection error:', error);
        setConnectionStatus(`Error: ${error.message}`);
      } else {
        console.log('Connection successful');
        setConnectionStatus('Connected successfully');
        fetchAllArticles();
      }
    } catch (error) {
      console.error('Test failed:', error);
      setConnectionStatus(`Failed: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllArticles = async () => {
    try {
      console.log('Fetching all articles...');
      
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Fetch error:', error);
        setArticlesData([]);
      } else {
        console.log('Articles fetched:', data);
        setArticlesData(data || []);
      }
    } catch (error) {
      console.error('Fetch failed:', error);
      setArticlesData([]);
    }
  };

  const fetchPublishedArticles = async () => {
    try {
      console.log('Fetching published articles...');
      
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Fetch published error:', error);
      } else {
        console.log('Published articles:', data);
        setArticlesData(data || []);
      }
    } catch (error) {
      console.error('Fetch published failed:', error);
    }
  };

  return (
    <div className="fixed top-4 left-4 bg-white p-4 rounded-lg shadow-lg border max-w-md max-h-96 overflow-auto z-50">
      <h3 className="font-bold mb-2">Supabase Tester</h3>
      
      <div className="space-y-2 mb-4">
        <div className="text-sm">
          <strong>Status:</strong> {connectionStatus}
        </div>
        
        <div className="flex gap-2">
          <Button size="sm" onClick={testConnection} disabled={loading}>
            Test Connection
          </Button>
          <Button size="sm" onClick={fetchAllArticles} disabled={loading}>
            Fetch All
          </Button>
          <Button size="sm" onClick={fetchPublishedArticles} disabled={loading}>
            Fetch Published
          </Button>
        </div>
      </div>
      
      <div className="text-sm">
        <strong>Articles ({articlesData.length}):</strong>
        <div className="mt-2 space-y-1 max-h-48 overflow-auto">
          {articlesData.map(article => (
            <Card key={article.id} className="p-2 text-xs">
              <CardHeader className="p-2">
                <CardTitle className="text-xs">{article.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <div>ID: {article.id}</div>
                <div>Published: {article.published ? 'Yes' : 'No'}</div>
                <div>Category: {article.category || 'None'}</div>
                <div>Created: {article.created_at}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupabaseTester; 