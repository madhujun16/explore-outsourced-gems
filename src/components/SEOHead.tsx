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
  title = "Outsource Smarter | GDPR-Compliant BPO & Virtual Assistant Services – NovalSquad",
  description = "Scale faster with NovalSquad's GDPR-compliant outsourcing. Get 24/7 virtual assistants, IT helpdesk, and back-office support — ready in 5 days, cost-effective, and audit-ready.",
  keywords = "outsourcing, BPO, virtual assistants, GDPR compliant outsourcing, IT helpdesk, customer support outsourcing, back office support, 24/7 operations, startup outsourcing, NovalSquad",
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
