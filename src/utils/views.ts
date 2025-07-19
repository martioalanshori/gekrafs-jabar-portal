import { supabase } from '@/integrations/supabase/client';

/**
 * Record article view with session management
 * @param articleId - The article ID
 */
export const recordArticleView = async (articleId: string): Promise<boolean> => {
  try {
    // Check if user has already viewed this article in this session
    const viewKey = `article_view_${articleId}`;
    const hasViewed = sessionStorage.getItem(viewKey);
    
    if (hasViewed) {
      return false; // Already viewed in this session
    }
    
    // Get current views and increment
    const currentViews = await getCurrentViews(articleId);
    const { error } = await supabase
      .from('articles')
      .update({ views: currentViews + 1 })
      .eq('id', articleId);
    
    if (error) {
      console.error('Error updating views:', error);
      return false;
    }
    
    // Mark as viewed in session storage
    sessionStorage.setItem(viewKey, 'true');
    
    return true;
  } catch (error) {
    console.error('Error in recordArticleView:', error);
    return false;
  }
};

/**
 * Get current views count for an article
 * @param articleId - The article ID
 */
export const getCurrentViews = async (articleId: string): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('views')
      .eq('id', articleId)
      .single();
    
    if (error) {
      console.error('Error getting views:', error);
      return 0;
    }
    
    return data?.views || 0;
  } catch (error) {
    console.error('Error in getCurrentViews:', error);
    return 0;
  }
};

/**
 * Reset view tracking for testing
 * @param articleId - The article ID
 */
export const resetViewTracking = (articleId: string): void => {
  const viewKey = `article_view_${articleId}`;
  sessionStorage.removeItem(viewKey);
};

/**
 * Get view statistics for admin
 */
export const getViewStatistics = async () => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('id, title, views, created_at')
      .eq('published', true)
      .order('views', { ascending: false })
      .limit(100);
    
    if (error) {
      console.error('Error getting view statistics:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in getViewStatistics:', error);
    return [];
  }
};

/**
 * Force increment views (for testing)
 * @param articleId - The article ID
 */
export const forceIncrementViews = async (articleId: string): Promise<boolean> => {
  try {
    const currentViews = await getCurrentViews(articleId);
    const { error } = await supabase
      .from('articles')
      .update({ views: currentViews + 1 })
      .eq('id', articleId);
    
    if (error) {
      console.error('Error force incrementing views:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in forceIncrementViews:', error);
    return false;
  }
}; 