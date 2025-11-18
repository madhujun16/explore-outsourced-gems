# SEO/AEO/GEO Quick Start Guide

## 🚀 Quick Reference for Developers

This guide shows you how to use the new SEO, AEO, and GEO tools in your pages.

---

## 1. Basic Page Setup

```tsx
import SEOHead from "@/components/SEOHead";
import { generateOrganizationSchema } from "@/lib/structuredData";

const MyPage = () => {
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <SEOHead
        title="My Page Title - NovalSquad"
        description="Page description for search engines"
        keywords="keyword1, keyword2, keyword3"
        url="https://novalsquad.com/my-page"
        structuredData={[organizationSchema]}
        breadcrumbs={[
          { name: "Home", url: "https://novalsquad.com" },
          { name: "My Page", url: "https://novalsquad.com/my-page" }
        ]}
      />
      
      {/* Your page content */}
    </>
  );
};
```

---

## 2. Adding FAQ Section

```tsx
import FAQSection from "@/components/FAQSection";

const faqs = [
  {
    question: "What is this service?",
    answer: "This service helps you..."
  },
  {
    question: "How does it work?",
    answer: "It works by..."
  }
];

// In your component JSX:
<FAQSection 
  faqs={faqs}
  title="Frequently Asked Questions"
  subtitle="Find answers to common questions"
/>

// Don't forget to add FAQ data to SEOHead:
<SEOHead
  faqData={faqs}
  // ... other props
/>
```

---

## 3. Service Page Schema

```tsx
import { generateServiceSchema } from "@/lib/structuredData";

const serviceSchema = generateServiceSchema({
  name: "Your Service Name",
  description: "Detailed service description",
  url: "https://novalsquad.com/service",
  provider: "NovalSquad",
  areaServed: "Worldwide"
});

<SEOHead structuredData={[serviceSchema]} />
```

---

## 4. Team/About Page with Person Schema

```tsx
import { generatePersonSchema } from "@/lib/structuredData";

const founderSchema = generatePersonSchema({
  name: "Person Name",
  jobTitle: "Job Title",
  url: "https://linkedin.com/in/profile",
  sameAs: ["https://linkedin.com/in/profile"],
  description: "Bio description"
});

<SEOHead structuredData={[founderSchema]} />
```

---

## 5. Adding How-To Content

```tsx
import { generateHowToSchema } from "@/lib/structuredData";

const howToSchema = generateHowToSchema(
  "Deploy Virtual Assistants",
  "Learn how to quickly deploy virtual assistants",
  [
    { 
      name: "Step 1: Consultation", 
      text: "Contact our team for initial consultation",
      image: "https://novalsquad.com/step1.jpg"
    },
    { 
      name: "Step 2: Requirements", 
      text: "Define your requirements and skills needed"
    },
    { 
      name: "Step 3: Deployment", 
      text: "We deploy trained assistants within 5 days"
    }
  ]
);

<SEOHead structuredData={[howToSchema]} />
```

---

## 6. Product/Service Listing

```tsx
import { generateItemListSchema } from "@/lib/structuredData";

const servicesListSchema = generateItemListSchema(
  "Our Services",
  [
    { 
      name: "Virtual Assistants", 
      url: "https://novalsquad.com/services/virtual-assistants",
      description: "Professional virtual assistant services"
    },
    { 
      name: "Customer Support", 
      url: "https://novalsquad.com/services/support",
      description: "24/7 multilingual customer support"
    }
  ]
);

<SEOHead structuredData={[servicesListSchema]} />
```

---

## 7. GEO-Optimized Content

```tsx
import { 
  enrichContextForGEO, 
  generateQuestionBasedHeadings,
  addExpertiseSignals 
} from "@/lib/geoHelpers";

// Generate question-based headings
const headings = generateQuestionBasedHeadings("Virtual Assistants");
// Returns: ["What is Virtual Assistants?", "How does Virtual Assistants work?", ...]

// Enrich content with context
const content = enrichContextForGEO(
  "Virtual Assistants",
  "Professional remote support for your business",
  ["outsourcing", "BPO", "remote work"],
  ["customer service", "data entry", "scheduling"]
);

// Add expertise signals
const expertContent = addExpertiseSignals(content, {
  author: "Pragathi V",
  credentials: "Founder & CEO",
  experience: "10+ years in outsourcing",
  certification: "GDPR Compliance"
});
```

---

## 8. Comparison Pages

```tsx
import { generateComparisonContent } from "@/lib/geoHelpers";

const comparisonText = generateComparisonContent(
  {
    name: "In-House Team",
    pros: ["Direct control", "Same location", "Company culture"],
    cons: ["Higher cost", "Limited scalability"]
  },
  {
    name: "Outsourced Team",
    pros: ["Cost-effective", "24/7 availability", "Easy scaling"],
    cons: ["Remote management", "Time zone differences"]
  },
  "Choosing the right team structure for your business"
);
```

---

## 9. Local SEO

```tsx
import { generateLocalBusinessSchema } from "@/lib/structuredData";

const localBusinessSchema = generateLocalBusinessSchema();

<SEOHead structuredData={[localBusinessSchema]} />
```

---

## 10. Article/Blog Posts

```tsx
import { generateArticleSchema } from "@/lib/structuredData";

const articleSchema = generateArticleSchema(
  "Article Headline",
  "Article description",
  "Author Name",
  "2025-11-18T10:00:00Z", // Published date
  "2025-11-18T15:00:00Z", // Modified date
  "https://novalsquad.com/article-image.jpg",
  "https://novalsquad.com/blog/article"
);

<SEOHead 
  structuredData={[articleSchema]}
  article={{
    section: "Business",
    tags: ["outsourcing", "BPO", "virtual assistants"]
  }}
  publishedTime="2025-11-18T10:00:00Z"
  modifiedTime="2025-11-18T15:00:00Z"
/>
```

---

## 📋 SEO Checklist for New Pages

- [ ] Add SEOHead component with proper title and description
- [ ] Include at least one structured data schema
- [ ] Add breadcrumb navigation
- [ ] Create FAQ section if applicable
- [ ] Use semantic HTML (h1, h2, h3, etc.)
- [ ] Add alt text to all images
- [ ] Include internal links to related pages
- [ ] Optimize meta description (150-160 characters)
- [ ] Add keywords naturally in content
- [ ] Update sitemap.xml with new page

---

## 🎯 SEO Best Practices

### Titles
- **Format:** `Primary Keyword - Secondary Keyword | Brand`
- **Length:** 50-60 characters
- **Example:** `Virtual Assistants - GDPR Compliant | NovalSquad`

### Descriptions
- **Format:** Value proposition + Call to action
- **Length:** 150-160 characters
- **Example:** `Get GDPR-compliant virtual assistants in 5 days. 24/7 support, cost-effective, and scalable. Contact us today for a free consultation.`

### Keywords
- Use 5-10 relevant keywords
- Include long-tail variations
- Natural placement in content
- Don't keyword stuff

### Headings
- One H1 per page (main title)
- Use H2 for major sections
- Use H3 for subsections
- Include keywords naturally
- Make them descriptive

### URLs
- Use hyphens, not underscores
- Keep them short and descriptive
- Include primary keyword
- Use lowercase only
- **Good:** `/virtual-assistants`
- **Bad:** `/page_1` or `/VirtualAssistants`

---

## 🤖 GEO Optimization Tips

### For AI Search Engines
1. **Use Natural Language**
   - Write conversationally
   - Answer questions directly
   - Use complete sentences

2. **Provide Context**
   - Explain industry terms
   - Define acronyms
   - Link related concepts

3. **Add Expertise Signals**
   - Mention credentials
   - Show experience
   - Cite sources
   - Add dates

4. **Structure Information**
   - Use clear headings
   - Create lists
   - Add FAQ sections
   - Include examples

---

## 🔍 Testing Your SEO

### 1. Google Rich Results Test
```
https://search.google.com/test/rich-results
```
Paste your page URL to test structured data

### 2. Schema Validator
```
https://validator.schema.org/
```
Paste your structured data JSON

### 3. PageSpeed Insights
```
https://pagespeed.web.dev/
```
Test page performance and SEO score

### 4. Mobile-Friendly Test
```
https://search.google.com/test/mobile-friendly
```
Ensure mobile optimization

---

## 🆘 Common Issues & Solutions

### Issue: Structured data not showing
**Solution:** 
1. Validate JSON-LD syntax
2. Check for duplicate @type
3. Ensure all required fields are present
4. Wait 24-48 hours for Google to recrawl

### Issue: FAQ not appearing in search
**Solution:**
1. Use FAQSection component
2. Add faqData to SEOHead
3. Ensure at least 3 questions
4. Make answers comprehensive (40+ words)

### Issue: Page not indexed
**Solution:**
1. Check robots.txt
2. Submit sitemap to Search Console
3. Ensure canonical URL is correct
4. Check for noindex tags

---

## 📞 Need Help?

- **Documentation:** See `SEO_AEO_GEO_IMPLEMENTATION.md`
- **Issues:** Create a ticket in the project management system
- **Questions:** Contact the tech team

---

**Quick Reference Created:** November 18, 2025  
**Version:** 1.0

