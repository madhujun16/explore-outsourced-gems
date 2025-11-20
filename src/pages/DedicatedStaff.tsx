import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import NovalSquadLogo from "@/components/NovalSquadLogo";
import EnhancedNavigation from "@/components/EnhancedNavigation";
import ScrollProgress from "@/components/ScrollProgress";
import SkipNavigation from "@/components/SkipNavigation";
import ChatBot from "@/components/ChatBot";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import Lottie from "lottie-react";
import rippleAnimation from "@/assets/ripple-animation.json";
import { generateOrganizationSchema, generateItemListSchema, generateServiceSchema } from "@/lib/structuredData";
import { 
  Calculator,
  Settings,
  Headphones,
  Users,
  HardDrive,
  Shield,
  Cloud,
  CheckCircle,
  ArrowRight,
  Clock,
  Globe,
  Award,
  TrendingUp,
  Zap,
  Lock,
  PenTool,
  Brain
} from "lucide-react";

const DedicatedStaff = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const services = [
    {
      icon: Calculator,
      title: "Accounting & Finance",
      description: "Complete book keeping, financial reporting, accounts payable/receivable and account management solutions.",
      features: [
        "Financial reporting and analysis",
        "Accounts payable and receivable",
        "Bookkeeping and reconciliation",
        "Tax preparation support",
        "Budgeting and forecasting",
        "Payroll processing"
      ],
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Settings,
      title: "Back Office Support",
      description: "Efficient HR, admin, payroll, compliance, document management, and process optimization for streamlined operations.",
      features: [
        "HR administration and support",
        "Document management",
        "Data entry and processing",
        "Compliance management",
        "Process optimization",
        "Administrative support"
      ],
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Headphones,
      title: "Customer Support",
      description: "24/7 multilingual customer support worldwide with technical assistance, order processing, and customer relationship management.",
      features: [
        "24/7 customer service",
        "Multilingual support (6+ languages)",
        "Technical support",
        "Order processing",
        "Customer relationship management",
        "Live chat and email support"
      ],
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      icon: PenTool,
      title: "Architect",
      description: "Expert architecture and design services including system architecture, solution design, technical blueprints, and infrastructure planning for scalable solutions.",
      features: [
        "System architecture design",
        "Solution architecture consulting",
        "Technical blueprints and documentation",
        "Infrastructure planning",
        "Scalability and performance design",
        "Technology stack recommendations"
      ],
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: HardDrive,
      title: "IT Helpdesk",
      description: "Secure and scalable infrastructure support with 24/7 monitoring, troubleshooting, and technical assistance.",
      features: [
        "24/7 technical support",
        "Infrastructure monitoring",
        "Troubleshooting and resolution",
        "User support and training",
        "System maintenance",
        "Ticket management"
      ],
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: Shield,
      title: "Virtual CISO",
      description: "Cybersecurity leadership and compliance management with risk assessment, policy development, and security oversight.",
      features: [
        "Security strategy and roadmap",
        "Risk assessment and management",
        "Compliance oversight (GDPR, ISO)",
        "Security policy development",
        "Incident response planning",
        "Security awareness training"
      ],
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: Cloud,
      title: "Cloud Services",
      description: "Migration, management, and optimization solutions for cloud infrastructure with cost optimization and security.",
      features: [
        "Cloud migration planning",
        "Infrastructure management",
        "Cost optimization",
        "Security and compliance",
        "Backup and disaster recovery",
        "Performance monitoring"
      ],
      color: "text-cyan-600",
      bgColor: "bg-cyan-50"
    },
    {
      icon: Brain,
      title: "AI Solutions",
      description: "Advanced AI and machine learning solutions including RAG implementation, LLM integration, intelligent automation, and custom AI development for business transformation.",
      features: [
        "RAG (Retrieval Augmented Generation)",
        "LLM integration and customization",
        "AI chatbots and virtual assistants",
        "Intelligent process automation",
        "Machine learning model development",
        "Natural language processing (NLP)"
      ],
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Quick Deployment",
      description: "Get your dedicated team up and running in just 5 business days",
      color: "text-green-600"
    },
    {
      icon: TrendingUp,
      title: "Cost-Effective",
      description: "Save up to 40~50% on operational costs compared to in-house teams",
      color: "text-blue-600"
    },
    {
      icon: Lock,
      title: "GDPR Compliant",
      description: "All operations adhere to strict GDPR and data protection standards",
      color: "text-red-600"
    },
    {
      icon: Globe,
      title: "24/7 Availability",
      description: "Round-the-clock support across multiple time zones",
      color: "text-indigo-600"
    }
  ];

  const faqs = [
    {
      question: "How quickly can you deploy dedicated staff for our business?",
      answer: "We can deploy fully-trained dedicated staff within 5 business days. Our rapid onboarding process includes skills assessment, cultural fit evaluation, comprehensive training on your specific requirements, and integration with your existing systems and workflows."
    },
    {
      question: "What makes your dedicated staff different from traditional outsourcing?",
      answer: "Our dedicated staff work exclusively for your business, functioning as an extension of your team. Unlike traditional outsourcing where resources are shared, you get committed professionals who understand your business, follow your processes, and align with your company culture. They use your tools, attend your meetings, and report directly to you."
    },
    {
      question: "Can we scale our dedicated staff team up or down as needed?",
      answer: "Yes, absolutely. We offer flexible scaling options that allow you to increase or decrease your team size based on your business needs. Whether you need to add specialists during peak seasons or optimize your team during slower periods, we can adjust within days, not months."
    },
    {
      question: "How do you ensure quality and productivity of dedicated staff?",
      answer: "We maintain quality through continuous performance monitoring, regular quality audits, custom SLAs tailored to your requirements, dedicated account managers, ongoing training and development, and real-time reporting dashboards. Our teams are measured against KPIs that you define and approve."
    },
    {
      question: "What industries do your dedicated staff services support?",
      answer: "We serve diverse industries including Finance, Healthcare, Retail, Technology, Travel, Education, Real Estate, Gaming, Manufacturing, and Logistics. Our staff receive industry-specific training and understand sector-specific compliance requirements, regulations, and best practices."
    },
    {
      question: "Is all data handled by dedicated staff GDPR compliant?",
      answer: "Yes, all our operations are fully GDPR compliant. We implement strict data protection measures including encryption, access controls, regular audits, data processing agreements, privacy impact assessments, and staff training on data protection. We can also provide data residency options to meet specific compliance requirements."
    }
  ];

  // Generate structured data
  const organizationSchema = generateOrganizationSchema();
  
  const servicesListSchema = generateItemListSchema(
    "Dedicated Staff Services",
    services.map(service => ({
      name: service.title,
      url: "https://novalsquad.com/dedicated-staff",
      description: service.description
    }))
  );

  const dedicatedStaffSchema = generateServiceSchema({
    name: "Dedicated Staff Services",
    description: "Professional dedicated staff and virtual teams for businesses worldwide. GDPR-compliant, cost-effective, and ready to deploy in 5 days.",
    url: "https://novalsquad.com/dedicated-staff",
    provider: "NovalSquad",
    areaServed: "Worldwide"
  });

  return (
    <>
      <SEOHead
        title="Dedicated Staff Services - Virtual Teams & Remote Professionals | NovalSquad"
        description="Hire dedicated staff and virtual teams in 5 days. GDPR-compliant professionals for accounting, customer support, IT, back office, and more. Save up to 40~50% on costs."
        keywords="dedicated staff, virtual staffing, remote teams, virtual assistants, outsourced staff, offshore teams, BPO services, dedicated resources, GDPR compliant staffing"
        url="https://novalsquad.com/dedicated-staff"
        structuredData={[organizationSchema, dedicatedStaffSchema, servicesListSchema]}
        breadcrumbs={[
          { name: "Home", url: "https://novalsquad.com" },
          { name: "Dedicated Staff", url: "https://novalsquad.com/dedicated-staff" }
        ]}
        faqData={faqs}
      />
      
      <SkipNavigation />
      <ScrollProgress />
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
        {/* Enhanced Navigation */}
        <EnhancedNavigation 
          onContactClick={() => navigate('/contact')}
        />

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 py-16 md:py-24 border-b-2 border-indigo-200">
          <div className="absolute inset-0 opacity-10">
            <Lottie
              animationData={rippleAnimation}
              loop={true}
              autoplay={true}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
                <Award className="h-4 w-4 mr-2 inline" />
                Professional Dedicated Staff Services
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
                <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Dedicated Staff & Virtual Teams
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                Scale your business with dedicated professionals. Get GDPR-compliant, fully-trained remote staff in 5 days. Save up to 40~50% on operational costs.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Button 
                  onClick={() => navigate('/contact')}
                  size="lg"
                  className="group relative bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold px-8 py-6 h-auto transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span className="relative z-10 flex items-center">
                    <span>Get Started Today</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 text-gray-700">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-600" />
                  <span className="font-medium">5-Day Deployment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">GDPR Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-cyan-500" />
                  <span className="font-medium">40~50% Cost Savings</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-20 bg-white/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose Our Dedicated Staff Services?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Experience the advantages of working with professional, committed remote teams
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                  <CardContent className="pt-8">
                    <div className={`w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4`}>
                      <benefit.icon className={`h-8 w-8 ${benefit.color}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section id="services" className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <Lottie
              animationData={rippleAnimation}
              loop={true}
              autoplay={true}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  Our Dedicated Staff Services
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Comprehensive staffing solutions tailored to your business needs
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/50 cursor-pointer transform hover:-translate-y-2"
                >
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-xl ${service.bgColor} flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      <service.icon className={`h-7 w-7 ${service.color}`} />
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold text-sm text-gray-700 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection 
          faqs={faqs}
          title="Dedicated Staff - Common Questions"
          subtitle="Everything you need to know about our dedicated staff services"
          className="bg-gradient-to-br from-indigo-50 to-blue-50"
        />

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Build Your Dedicated Team?
              </h2>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                Get started today and scale your business with professional remote staff in just 5 days
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  onClick={() => navigate('/contact')}
                  size="lg"
                  variant="secondary"
                  className="font-semibold px-8 py-6 h-auto hover:scale-105 transition-all duration-300"
                >
                  Contact Us Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
        
        {/* ChatBot */}
        <ChatBot />
      </div>
    </>
  );
};

export default DedicatedStaff;

