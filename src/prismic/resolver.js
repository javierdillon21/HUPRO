

// Link Resolver
export function linkResolver(doc) {
  
    // Define the url depending on the document type
    if (doc.type === 'Proyecto') {
      return '/Proyecto/' + doc.uid;
    } else if (doc.type === 'blog_post') {
      return '/blog/' + doc.uid;
    }
    
    // Default to homepage
    return '/';
  }