import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://skill-mento-x-frontend.vercel.app'
  
  const routes = [
    '',
    '/landing',
    '/features',
    '/mentors',
    '/About',
    '/premium',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
 
  return routes
}
