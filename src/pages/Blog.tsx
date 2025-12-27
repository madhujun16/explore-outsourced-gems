import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import EnhancedNavigation from "@/components/EnhancedNavigation";
import ScrollProgress from "@/components/ScrollProgress";
import SkipNavigation from "@/components/SkipNavigation";
import ChatBot from "@/components/ChatBot";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import { 
  ArrowRight,
  Calendar,
  Clock,
  FileText,
  Search,
  Tag,
  TrendingUp,
  Users,
  BookOpen
} from "lucide-react";
import { useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedDate: string;
  image?: string;
  tags: string[];
  featured?: boolean;
  url: string;
}

const Blog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: "vendor-management-excel",
      title: "Why Excel Fails for Vendor Management at Scale",
      excerpt: "Discover why Excel spreadsheets break down when managing vendors at scale. Learn about vendor tracking challenges, manual vendor management limitations, and why you need a dedicated vendor management platform.",
      category: "Vendor Management",
      readTime: "8 min read",
      publishedDate: "2025-01-15",
      tags: ["vendor management", "excel", "vendor tracking", "procurement"],
      featured: true,
      url: "/blog/vendor-management-excel"
    },
    {
      id: "vendor-compliance-tracking",
      title: "How to Track Vendor Compliance Without Chaos",
      excerpt: "Learn how to track vendor compliance efficiently with automated compliance management processes, vendor audit readiness tools, and comprehensive compliance tracking systems. Discover best practices for vendor compliance checklists.",
      category: "Compliance",
      readTime: "10 min read",
      publishedDate: "2025-01-20",
      tags: ["vendor compliance", "compliance tracking", "audit readiness", "compliance management"],
      featured: false,
      url: "/blog/vendor-compliance-tracking"
    },
    {
      id: "vendor-risk-management",
      title: "Vendor Risk Management: A Practical Guide for Ops Teams",
      excerpt: "Learn how to implement effective vendor risk management strategies for operations teams. Discover vendor risk assessment frameworks, operational risk management best practices, vendor compliance risk mitigation, and third party risk management approaches.",
      category: "Risk Management",
      readTime: "12 min read",
      publishedDate: "2025-01-25",
      tags: ["vendor risk management", "operational risk management", "vendor compliance risk", "third party risk management", "vendor risk assessment"],
      featured: false,
      url: "/blog/vendor-risk-management"
    },
    {
      id: "vendor-lifecycle-management",
      title: "From Onboarding to Payments: The Complete Vendor Lifecycle Explained",
      excerpt: "Master vendor lifecycle management from onboarding to payments. Learn about vendor onboarding process, vendor approval process, vendor payments process, and vendor management workflow best practices.",
      category: "Vendor Management",
      readTime: "15 min read",
      publishedDate: "2025-01-30",
      tags: ["vendor lifecycle management", "vendor onboarding process", "vendor payments process", "vendor management workflow", "vendor approval process"],
      featured: false,
      url: "/blog/vendor-lifecycle-management"
    },
    {
      id: "vendor-compliance-mistakes",
      title: "5 Common Vendor Compliance Mistakes (And How to Fix Them)",
      excerpt: "Discover the 5 most common vendor compliance mistakes that lead to compliance failures, audit findings, and vendor documentation issues. Learn compliance best practices to avoid costly violations and ensure vendor audit readiness.",
      category: "Compliance",
      readTime: "12 min read",
      publishedDate: "2025-01-30",
      tags: ["vendor compliance mistakes", "compliance failures", "audit findings", "vendor documentation issues", "compliance best practices"],
      featured: false,
      url: "/blog/vendor-compliance-mistakes"
    },
    {
      id: "vendor-management-ownership",
      title: "Who Owns Vendor Management? Ops vs Finance vs Compliance",
      excerpt: "Discover who should own vendor management in your organization. Learn about ops vs finance responsibilities, compliance accountability, vendor governance models, and cross-functional ownership approaches for effective vendor management.",
      category: "Vendor Governance",
      readTime: "10 min read",
      publishedDate: "2025-02-05",
      tags: ["vendor management ownership", "vendor governance", "vendor management responsibilities", "cross-functional ownership", "vendor management structure"],
      featured: false,
      url: "/blog/vendor-management-ownership"
    },
    {
      id: "vendor-data-management",
      title: "How Poor Vendor Data Impacts Payments, Audits, and Growth",
      excerpt: "Discover how poor vendor data management causes payment errors, audit data gaps, and stunts business growth. Learn about vendor master data quality issues, data quality problems, payment errors, and audit data gaps. Get solutions for effective vendor data management.",
      category: "Data Management",
      readTime: "14 min read",
      publishedDate: "2025-02-10",
      tags: ["vendor data management", "data quality issues", "vendor master data", "payment errors", "audit data gaps", "vendor data quality"],
      featured: false,
      url: "/blog/vendor-data-management"
    },
    {
      id: "vendor-audit-requirements",
      title: "What Auditors Expect From Vendor Records (But Teams Miss)",
      excerpt: "Discover what auditors expect from vendor records during compliance audits. Learn about vendor audit requirements, compliance documentation standards, audit readiness checklist, vendor records management, and audit compliance best practices.",
      category: "Compliance",
      readTime: "14 min read",
      publishedDate: "2025-02-10",
      tags: ["vendor audit requirements", "compliance documentation", "audit readiness checklist", "vendor records management", "audit compliance"],
      featured: false,
      url: "/blog/vendor-audit-requirements"
    }
    // Add more blog posts here as you create them
  ];

  // Filter blog posts based on search
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  // Generate Blog structured data
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "NovalSquad Blog",
    "description": "Insights, guides, and best practices on vendor management, outsourcing, and business operations.",
    "url": "https://novalsquad.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "NovalSquad",
      "logo": {
        "@type": "ImageObject",
        "url": "https://novalsquad.com/novalsquad-thumbnail.png"
      }
    }
  };

  const blogFaqs = [
    {
      question: "What topics does the NovalSquad blog cover?",
      answer: "Our blog covers vendor management, procurement best practices, compliance tracking, outsourcing strategies, business operations, and technology solutions for scaling businesses."
    },
    {
      question: "How often are new blog posts published?",
      answer: "We publish new articles regularly covering vendor management, procurement strategies, compliance best practices, and operational insights. Subscribe to stay updated with our latest content."
    },
    {
      question: "Can I share blog posts from NovalSquad?",
      answer: "Yes! All our blog posts can be shared. We encourage sharing our content to help others learn about vendor management, procurement, and business operations best practices."
    }
  ];

  return (
    <>
      <SEOHead
        title="Blog | Vendor Management & Business Operations Insights | NovalSquad"
        description="Read expert insights on vendor management, procurement, compliance tracking, and business operations. Learn why Excel fails for vendor management at scale and discover best practices."
        keywords="vendor management blog, procurement blog, vendor tracking, compliance management, business operations, vendor management excel, vendor management software"
        url="https://novalsquad.com/blog"
        structuredData={blogSchema}
        breadcrumbs={[
          { name: "Home", url: "https://novalsquad.com" },
          { name: "Blog", url: "https://novalsquad.com/blog" }
        ]}
        faqData={blogFaqs}
      />
      
      <SkipNavigation />
      <ScrollProgress />
      
      <div className="min-h-screen bg-white text-gray-900">
        {/* Navigation */}
        <EnhancedNavigation 
          onContactClick={() => navigate('/contact')}
        />

        {/* Blog Header */}
        <section className="relative pt-24 pb-16 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-indigo-100 text-indigo-700 border-indigo-200 px-4 py-1.5">
                <BookOpen className="w-4 h-4 mr-2 inline" />
                Insights & Guides
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                NovalSquad Blog
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Expert insights on vendor management, procurement, compliance tracking, and business operations. Learn from real-world scenarios and best practices.
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles by topic, keyword, or tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-indigo-200 focus:border-indigo-500 focus:outline-none text-lg bg-white shadow-sm"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          {/* Featured Post */}
          {featuredPost && (
            <section className="mb-16">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-900">Featured Article</h2>
              </div>
              <Card className="border-2 border-indigo-200 hover:border-indigo-300 transition-all duration-300 hover:shadow-xl overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-8 flex items-center justify-center">
                    <FileText className="w-24 h-24 text-white opacity-80" />
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200">
                        {featuredPost.category}
                      </Badge>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(featuredPost.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                    <CardTitle className="text-3xl mb-4 text-gray-900">
                      {featuredPost.title}
                    </CardTitle>
                    <CardDescription className="text-lg text-gray-600 mb-6">
                      {featuredPost.excerpt}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredPost.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      onClick={() => navigate(featuredPost.url)}
                      className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white"
                    >
                      Read Full Article
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </section>
          )}

          {/* All Posts */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                {searchQuery ? `Search Results (${filteredPosts.length})` : "All Articles"}
              </h2>
              {searchQuery && (
                <Button
                  variant="ghost"
                  onClick={() => setSearchQuery("")}
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  Clear Search
                </Button>
              )}
            </div>

            {filteredPosts.length === 0 ? (
              <Card className="border-2 border-gray-200">
                <CardContent className="p-12 text-center">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">No articles found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search terms or browse all articles.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSearchQuery("")}
                  >
                    View All Articles
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="border-2 border-gray-100 hover:border-indigo-200 transition-all duration-300 hover:shadow-lg cursor-pointer group"
                    onClick={() => navigate(post.url)}
                  >
                    <div className="bg-gradient-to-br from-indigo-100 to-blue-100 h-48 flex items-center justify-center">
                      <FileText className="w-16 h-16 text-indigo-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200 text-xs">
                          {post.category}
                        </Badge>
                        {post.featured && (
                          <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{post.tags.length - 3} more
                          </Badge>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        className="w-full group-hover:text-indigo-600 group-hover:bg-indigo-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(post.url);
                        }}
                      >
                        Read Article
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          {/* Categories Section */}
          <section className="mt-16 pt-12 border-t border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Browse by Category</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {["Vendor Management", "Procurement", "Compliance", "Risk Management", "Data Management"].map((category) => {
                const categoryPosts = blogPosts.filter(post => 
                  post.category.toLowerCase() === category.toLowerCase()
                );
                return (
                  <Card
                    key={category}
                    className="border-2 border-gray-100 hover:border-indigo-200 transition-all cursor-pointer"
                    onClick={() => {
                      setSearchQuery(category);
                      document.querySelector('main')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-indigo-600 mb-2">
                        {categoryPosts.length}
                      </div>
                      <div className="text-sm text-gray-600">{category}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Newsletter CTA */}
          <section className="mt-16">
            <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2 text-gray-900">
                  Stay Updated
                </h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Get the latest insights on vendor management, procurement, and business operations delivered to your inbox.
                </p>
                <Button
                  onClick={() => navigate('/contact')}
                  className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white"
                >
                  Subscribe to Newsletter
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </section>
        </main>

        {/* Footer */}
        <Footer />
        
        {/* ChatBot */}
        <ChatBot />
      </div>
    </>
  );
};

export default Blog;

