// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://novalsquad.com',
      lastModified: new Date(),
    },
    {
      url: 'https://novalsquad.com/blog',
      lastModified: new Date(),
    },
  ];
}

