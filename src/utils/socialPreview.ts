// Utility untuk generate social media preview URLs
export const generateSocialPreviewUrl = (articleId: string, title: string, description: string, imageUrl?: string) => {
  const baseUrl = 'https://gekrafskampusjabar.my.id';
  
  // Untuk artikel yang sudah ada file HTML statis
  if (articleId === '4713beeb-5dc6-4d66-8757-ba39c1521ec7') {
    return `${baseUrl}/artikel/lokatifest-2025.html`;
  }
  
  // Fallback untuk artikel lain
  const params = new URLSearchParams({
    id: articleId,
    title: encodeURIComponent(title),
    description: encodeURIComponent(description),
    image: imageUrl || '',
    type: 'article'
  });
  
  return `${baseUrl}/social-preview.html?${params.toString()}`;
};

// Function untuk update meta tags secara manual
export const updateMetaTagsForArticle = (title: string, description: string, imageUrl?: string, articleUrl?: string) => {
  const baseUrl = 'https://gekrafskampusjabar.my.id';
  const defaultImage = `${baseUrl}/assets/img/gekrafslogo.png`;
  const imageUrlFinal = imageUrl ? (imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`) : defaultImage;
  
  // Update existing meta tags
  const metaTags = [
    { property: 'og:title', content: title },
    { property: 'twitter:title', content: title },
    { name: 'description', content: description },
    { property: 'og:description', content: description },
    { property: 'twitter:description', content: description },
    { property: 'og:image', content: imageUrlFinal },
    { property: 'twitter:image', content: imageUrlFinal },
    { property: 'og:url', content: articleUrl || window.location.href },
    { property: 'twitter:url', content: articleUrl || window.location.href },
    { property: 'og:type', content: 'article' },
    { property: 'article:published_time', content: new Date().toISOString() },
    { property: 'article:section', content: 'Artikel' },
    { property: 'article:tag', content: 'GEKRAFS, Kampus, Jawa Barat' }
  ];
  
  metaTags.forEach(({ property, content, name }) => {
    const attr = name ? 'name' : 'property';
    const prop = name || property;
    
    let meta = document.querySelector(`meta[${attr}="${prop}"]`) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attr, prop);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  });
  
  // Update document title
  document.title = title;
}; 