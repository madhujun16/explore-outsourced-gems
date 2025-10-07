import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "GDPR-Compliant Outsourcing Services | NovalSquad BPO Solutions",
  description = "NovalSquad provides GDPR-compliant outsourcing services. Virtual assistants, 24/7 customer support, IT helpdesk, and back office solutions for startups and enterprises. Ready in 5 days, cost-effective local talent.",
  keywords = "GDPR-compliant outsourcing, virtual assistants, customer support outsourcing, IT helpdesk, back office outsourcing, virtual staff, BPO services, startup outsourcing, 24/7 support, remote teams",
  image = "https://novalsquad.com/novalsquad-thumbnail.png",
  url = "https://novalsquad.com",
  type = "website",
  structuredData
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="NovalSquad - Your Growth Partner in Outsourcing & Digital Solutions" />
      <meta property="og:site_name" content="NovalSquad Outsourcing" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="NovalSquad - Your Growth Partner in Outsourcing & Digital Solutions" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
