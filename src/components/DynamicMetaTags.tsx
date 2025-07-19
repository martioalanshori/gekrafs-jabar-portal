import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface DynamicMetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  url?: string;
}

const DynamicMetaTags = ({ 
  title, 
  description, 
  image, 
  type = 'website',
  url 
}: DynamicMetaTagsProps) => {
  const location = useLocation();

  useEffect(() => {
    const updateMetaTags = () => {
      const baseUrl = 'https://gekrafskampusjabar.my.id';
      const currentUrl = url || `${baseUrl}${location.pathname}`;
      const defaultImage = `${baseUrl}/assets/img/gekrafslogo.png`;
      

      
      // Update title
      if (title) {
        document.title = title;
        updateMetaTag('property', 'og:title', title);
        updateMetaTag('property', 'twitter:title', title);
      }

      // Update description
      if (description) {
        updateMetaTag('name', 'description', description);
        updateMetaTag('property', 'og:description', description);
        updateMetaTag('property', 'twitter:description', description);
      }

      // Update image
      const imageUrl = image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : defaultImage;
      updateMetaTag('property', 'og:image', imageUrl);
      updateMetaTag('property', 'twitter:image', imageUrl);

      // Update URL
      updateMetaTag('property', 'og:url', currentUrl);
      updateMetaTag('property', 'twitter:url', currentUrl);

      // Update type
      updateMetaTag('property', 'og:type', type);

      // Force social media crawlers to re-fetch
      if (type === 'article') {
        // Add article-specific meta tags
        updateMetaTag('property', 'article:published_time', new Date().toISOString());
        updateMetaTag('property', 'article:section', 'Artikel');
        updateMetaTag('property', 'article:tag', 'GEKRAFS, Kampus, Jawa Barat');
      }


    };

    const updateMetaTag = (attr: string, property: string, content: string) => {
      let meta = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateMetaTags();
  }, [title, description, image, type, url, location.pathname]);

  return null; // This component doesn't render anything
};

export default DynamicMetaTags; 