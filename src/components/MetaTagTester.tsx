import { useEffect, useState } from 'react';

const MetaTagTester = () => {
  const [metaTags, setMetaTags] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const getAllMetaTags = () => {
      const tags: { [key: string]: string } = {};
      
      // Get all meta tags
      const metaElements = document.querySelectorAll('meta');
      metaElements.forEach((meta) => {
        const property = meta.getAttribute('property') || meta.getAttribute('name');
        const content = meta.getAttribute('content');
        if (property && content) {
          tags[property] = content;
        }
      });

      setMetaTags(tags);
    };

    getAllMetaTags();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border max-w-md max-h-96 overflow-auto z-50">
      <h3 className="font-bold mb-2">Meta Tags Debug</h3>
      <div className="text-xs space-y-1">
        {Object.entries(metaTags).map(([key, value]) => (
          <div key={key} className="border-b pb-1">
            <strong>{key}:</strong>
            <div className="text-gray-600 break-words">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetaTagTester; 