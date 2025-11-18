// Structured Data Generator for SEO, AEO, and GEO optimization

export interface Service {
  name: string;
  description: string;
  url?: string;
  provider?: string;
  areaServed?: string;
  availableChannel?: string[];
}

export interface Person {
  name: string;
  jobTitle?: string;
  url?: string;
  sameAs?: string[];
  image?: string;
  description?: string;
}

export interface Review {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished?: string;
}

// Organization Schema - For brand identity and GEO
export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "NovalSquad",
  "alternateName": "NOVAL TECHNOLOGIES PRIVATE LIMITED",
  "legalName": "NOVAL TECHNOLOGIES PRIVATE LIMITED",
  "url": "https://novalsquad.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://novalsquad.com/novalsquad-thumbnail.png",
    "width": 1200,
    "height": 630
  },
  "description": "Leading provider of GDPR-compliant business process outsourcing services including virtual assistants, 24/7 customer support, IT helpdesk, and back office solutions for startups and enterprises worldwide.",
  "foundingDate": "2025",
  "identifier": "U78300KA2025PTC210177",
  "email": "contact@novalsquad.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Bangalore",
    "addressRegion": "Karnataka",
    "addressCountry": "IN"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "contactType": "sales",
      "areaServed": ["EU", "US", "IN", "GB"],
      "availableLanguage": ["en", "es", "fr", "de", "it", "ja"],
      "email": "contact@novalsquad.com"
    },
    {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "areaServed": ["EU", "US", "IN", "GB"],
      "availableLanguage": ["en", "es", "fr", "de", "it", "ja"],
      "email": "support@novalsquad.com"
    }
  ],
  "sameAs": [
    "https://www.linkedin.com/company/novalsquad",
    "https://twitter.com/novalsquad",
    "https://facebook.com/novalsquad"
  ],
  "knowsAbout": [
    "Business Process Outsourcing",
    "Virtual Assistant Services",
    "Customer Support Outsourcing",
    "IT Helpdesk Services",
    "GDPR Compliance",
    "AI and Machine Learning",
    "Digital Transformation",
    "Cloud Services",
    "Cybersecurity"
  ],
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 12.9716,
      "longitude": 77.5946
    },
    "geoRadius": "20000000"
  }
});

// Service Schema - For individual services
export const generateServiceSchema = (service: Service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.name,
  "description": service.description,
  "provider": {
    "@type": "Organization",
    "name": service.provider || "NovalSquad",
    "url": "https://novalsquad.com"
  },
  "serviceType": "Business Process Outsourcing",
  "areaServed": service.areaServed || "Worldwide",
  "availableChannel": service.availableChannel || [
    {
      "@type": "ServiceChannel",
      "serviceUrl": service.url || "https://novalsquad.com",
      "servicePhone": "+91-XXX-XXX-XXXX",
      "availableLanguage": ["en", "es", "fr", "de", "it", "ja"]
    }
  ],
  "termsOfService": "https://novalsquad.com/terms-conditions",
  "audience": {
    "@type": "Audience",
    "audienceType": "Businesses, Startups, Enterprises"
  }
});

// Person Schema - For team members and authors
export const generatePersonSchema = (person: Person) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": person.name,
  ...(person.jobTitle && { "jobTitle": person.jobTitle }),
  ...(person.url && { "url": person.url }),
  ...(person.sameAs && { "sameAs": person.sameAs }),
  ...(person.image && { 
    "image": {
      "@type": "ImageObject",
      "url": person.image
    }
  }),
  ...(person.description && { "description": person.description }),
  "worksFor": {
    "@type": "Organization",
    "name": "NovalSquad"
  }
});

// HowTo Schema - For process guides (AEO optimization)
export const generateHowToSchema = (
  name: string,
  description: string,
  steps: Array<{ name: string; text: string; image?: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": name,
  "description": description,
  "step": steps.map((step, index) => ({
    "@type": "HowToStep",
    "position": index + 1,
    "name": step.name,
    "text": step.text,
    ...(step.image && { 
      "image": {
        "@type": "ImageObject",
        "url": step.image
      }
    })
  }))
});

// Review/Rating Schema - For testimonials
export const generateAggregateRatingSchema = (
  ratingValue: number,
  reviewCount: number,
  bestRating: number = 5
) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "NovalSquad",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": ratingValue,
    "reviewCount": reviewCount,
    "bestRating": bestRating
  }
});

// Article Schema - For blog posts and content (GEO optimization)
export const generateArticleSchema = (
  headline: string,
  description: string,
  author: string,
  datePublished: string,
  dateModified: string,
  image: string,
  url: string
) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": headline,
  "description": description,
  "image": {
    "@type": "ImageObject",
    "url": image,
    "width": 1200,
    "height": 630
  },
  "author": {
    "@type": "Organization",
    "name": author
  },
  "publisher": {
    "@type": "Organization",
    "name": "NovalSquad",
    "logo": {
      "@type": "ImageObject",
      "url": "https://novalsquad.com/novalsquad-thumbnail.png"
    }
  },
  "datePublished": datePublished,
  "dateModified": dateModified,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": url
  }
});

// LocalBusiness Schema - For location-based services
export const generateLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "NovalSquad",
  "image": "https://novalsquad.com/novalsquad-thumbnail.png",
  "url": "https://novalsquad.com",
  "telephone": "+91-XXX-XXX-XXXX",
  "email": "contact@novalsquad.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Bangalore",
    "addressLocality": "Bangalore",
    "addressRegion": "Karnataka",
    "postalCode": "560001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 12.9716,
    "longitude": 77.5946
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  },
  "priceRange": "$$"
});

// BreadcrumbList Schema - For navigation
export const generateBreadcrumbSchema = (
  breadcrumbs: Array<{ name: string; url: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": crumb.url
  }))
});

// ItemList Schema - For service listings (GEO optimization)
export const generateItemListSchema = (
  name: string,
  items: Array<{ name: string; url: string; description: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": name,
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "Service",
      "name": item.name,
      "url": item.url,
      "description": item.description
    }
  }))
});

// FAQ Schema - For AEO optimization
export const generateFAQSchema = (
  faqs: Array<{ question: string; answer: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// VideoObject Schema - For video content
export const generateVideoSchema = (
  name: string,
  description: string,
  thumbnailUrl: string,
  uploadDate: string,
  duration: string,
  contentUrl: string
) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": name,
  "description": description,
  "thumbnailUrl": thumbnailUrl,
  "uploadDate": uploadDate,
  "duration": duration,
  "contentUrl": contentUrl,
  "embedUrl": contentUrl
});

// SoftwareApplication Schema - For web applications
export const generateSoftwareApplicationSchema = (
  name: string,
  description: string,
  applicationCategory: string = "BusinessApplication"
) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": name,
  "description": description,
  "applicationCategory": applicationCategory,
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "100"
  }
});

