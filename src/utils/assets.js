/**
 * Resolves any image asset path safely, whether on localhost or GitHub Pages (/MoregMakeup/).
 * Handles data URLs, full external URLs, and local asset paths seamlessly.
 */
export const resolveAssetUrl = (src) => {
  if (!src) return '';
  
  // Return as-is for data URLs, blobs, or external links
  if (
    src.startsWith('data:') || 
    src.startsWith('blob:') || 
    src.startsWith('http://') || 
    src.startsWith('https://')
  ) {
    return src;
  }

  // Clean any leading slashes or existing repo base prefix
  const cleaned = src.replace(/^\/?(MoregMakeup\/)?/, '');
  
  // Use Vite base URL dynamically
  const baseUrl = import.meta.env?.BASE_URL || '/';
  const prefix = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  return `${prefix}${cleaned}`;
};
