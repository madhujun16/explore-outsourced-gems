import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object | object[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  article?: {
    section?: string;
    tags?: string[];
  };
  breadcrumbs?: Array<{ name: string; url: string }>;
  faqData?: Array<{ question: string; answer: string }>;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "NovalSquad | Premium Outsourcing & Remote Teams — Tools Coming Soon",
  description = "Outsourcing, elevated: NovalSquad delivers GDPR-ready remote teams, meticulous ops, and white-glove BPO—without the bloat. New productivity tools are on the way. Book a consult.",
  keywords = "NovalSquad, Noval Squad, premium outsourcing, BPO, remote teams, virtual assistants, GDPR compliant outsourcing, IT helpdesk, customer support outsourcing, back office, business tools, startup scaling",
  image = "https://novalsquad.com/novalsquad-thumbnail.png",
  url = "https://novalsquad.com",
  type = "website",
  structuredData,
  author = "NovalSquad",
  publishedTime,
  modifiedTime,
  article,
  breadcrumbs,
  faqData
}) => {
  // Generate FAQ structured data for AEO
  const faqSchema = faqData ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // Generate breadcrumb structured data
  const breadcrumbSchema = breadcrumbs ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  } : null;

  // Generate WebPage schema for GEO
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": url,
    "image": image,
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "name": "NovalSquad Outsourcing",
      "url": "https://novalsquad.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://novalsquad.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "NovalSquad",
      "url": "https://novalsquad.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://novalsquad.com/novalsquad-thumbnail.png"
      }
    },
    ...(publishedTime && { "datePublished": publishedTime }),
    ...(modifiedTime && { "dateModified": modifiedTime }),
    ...(author && { 
      "author": {
        "@type": "Organization",
        "name": author
      }
    })
  };

  // Combine all schemas
  const allSchemas = [
    webPageSchema,
    ...(breadcrumbSchema ? [breadcrumbSchema] : []),
    ...(faqSchema ? [faqSchema] : []),
    ...(structuredData ? (Array.isArray(structuredData) ? structuredData : [structuredData]) : [])
  ];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />
      
      {/* Robots meta tags for better crawling */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="NovalSquad — premium outsourcing, remote teams, and upcoming productivity tools" />
      <meta property="og:site_name" content="NovalSquad Outsourcing" />
      <meta property="og:locale" content="en_US" />
      {article && (
        <>
          <meta property="article:author" content={author} />
          {article.section && <meta property="article:section" content={article.section} />}
          {article.tags && article.tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="NovalSquad — premium outsourcing, remote teams, and upcoming productivity tools" />
      <meta name="twitter:site" content="@novalsquad" />
      <meta name="twitter:creator" content="@novalsquad" />
      
      {/* Additional SEO tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      
      {/* Structured Data - Multiple schemas */}
      {allSchemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
