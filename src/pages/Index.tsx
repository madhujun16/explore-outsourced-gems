import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import NovalSquadLogo from "@/components/NovalSquadLogo";
import LottieBackground from "@/components/LottieBackground";
import LottieSideImage from "@/components/LottieSideImage";
import SkipNavigation from "@/components/SkipNavigation";
import SEOHead from "@/components/SEOHead";
import ChatBot from "@/components/ChatBot";
import EnhancedNavigation from "@/components/EnhancedNavigation";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import { generateOrganizationSchema, generateServiceSchema, generateItemListSchema } from "@/lib/structuredData";
import { useFormValidation } from "@/hooks/useFormValidation";
import { usePerformanceMonitoring, trackUserInteraction, trackFormSubmission } from "@/hooks/usePerformanceMonitoring";
import Lottie from "lottie-react";
import rippleAnimation from "@/assets/ripple-animation.json";
import { 
  Settings, 
  Headphones, 
  Users, 
  HardDrive,
  Code2,
  Megaphone,
  Database,
  Bot,
  Building,
  Heart,
  ShoppingBag,
  Plane,
  GraduationCap,
  Car,
  Home,
  Gamepad2,
  Smartphone,
  Factory,
  Truck,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle,
  Calculator,
  Clock,
  Globe,
  Shield,
  Lock,
  ArrowLeft,
  PenTool,
  Brain
} from "lucide-react";

const Index = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company_name: "",
    industry: "",
    message: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [visibleDigitalCards, setVisibleDigitalCards] = useState<Set<number>>(new Set());
  const [visibleWhyChooseCards, setVisibleWhyChooseCards] = useState<Set<number>>(new Set());
  const [visibleIndustryCards, setVisibleIndustryCards] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { 
    validateForm, 
    validateSingleField, 
    markFieldTouched, 
    getFieldError, 
    hasFieldError,
    clearErrors 
  } = useFormValidation();
  
  // Initialize performance monitoring
  usePerformanceMonitoring();

  const digitalServices = useMemo(() => [
    {
      icon: Code2,
      title: "Web Dev",
      description: "Landing pages, CMS, ecommerce, globally hosted.",
      color: "text-green-600",
      bgColor: "bg-green-50 group-hover:bg-green-100"
    },
    {
      icon: Megaphone,
      title: "Marketing",
      description: "SEO, paid ads, multilingual content strategy.",
      color: "text-blue-600",
      bgColor: "bg-blue-50 group-hover:bg-blue-100"
    },
    {
      icon: Database,
      title: "Data/CRM",
      description: "GDPR-ready CRM setups, analytics dashboards.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 group-hover:bg-indigo-100"
    },
    {
      icon: Bot,
      title: "AI Chatbots",
      description: "Automated support & sales bots, multi-language.",
      color: "text-orange-600",
      bgColor: "bg-orange-50 group-hover:bg-orange-100"
    }
  ], []);

  const industries = useMemo(() => [
    {
      icon: Building,
      title: "Finance",
      description: "Reconciliation, KYC, virtual assistance.",
      color: "text-blue-600",
      bgColor: "bg-blue-50 group-hover:bg-blue-100"
    },
    {
      icon: Heart,
      title: "Healthcare",
      description: "Claims processing, transcription, RCM.",
      color: "text-red-600",
      bgColor: "bg-red-50 group-hover:bg-red-100"
    },
    {
      icon: ShoppingBag,
      title: "Retail",
      description: "Returns, catalog support, logistics helpdesk.",
      color: "text-green-600",
      bgColor: "bg-green-50 group-hover:bg-green-100"
    },
    {
      icon: Plane,
      title: "Travel",
      description: "Concierge support, multilingual bookings.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 group-hover:bg-indigo-100"
    },
    {
      icon: GraduationCap,
      title: "Education",
      description: "Student support, course management, virtual assistance.",
      color: "text-orange-600",
      bgColor: "bg-orange-50 group-hover:bg-orange-100"
    },
    {
      icon: Car,
      title: "Automotive",
      description: "Service scheduling, parts management, customer care.",
      color: "text-teal-600",
      bgColor: "bg-teal-50 group-hover:bg-teal-100"
    },
    {
      icon: Home,
      title: "Real Estate",
      description: "Property management, tenant support, documentation.",
      color: "text-cyan-600",
      bgColor: "bg-cyan-50 group-hover:bg-cyan-100"
    },
    {
      icon: Gamepad2,
      title: "Gaming",
      description: "Player support, community management, QA testing.",
      color: "text-pink-600",
      bgColor: "bg-pink-50 group-hover:bg-pink-100"
    },
    {
      icon: Smartphone,
      title: "Technology",
      description: "Technical support, app development, system integration.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 group-hover:bg-indigo-100"
    },
    {
      icon: Truck,
      title: "Logistics",
      description: "Shipment tracking, inventory management, delivery support.",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 group-hover:bg-emerald-100"
    }
  ], []);

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    // Observe all sections
    const sections = document.querySelectorAll('section[id], .scroll-animate');
    sections.forEach((section) => observer.observe(section));

    // Set loading to false after initial render
    setIsLoading(false);

    return () => observer.disconnect();
  }, []);

  // Sequential animation for digital cards
  useEffect(() => {
    if (visibleSections.has('digital')) {
      const timeouts: NodeJS.Timeout[] = [];
      
      // Clear any existing cards first
      setVisibleDigitalCards(new Set());
      
      // Show cards one by one with 300ms intervals
      digitalServices.forEach((_, index) => {
        const timeout = setTimeout(() => {
          setVisibleDigitalCards(prev => new Set([...prev, index]));
        }, (index + 1) * 300);
        timeouts.push(timeout);
      });

      return () => {
        timeouts.forEach(timeout => clearTimeout(timeout));
      };
    }
  }, [visibleSections, digitalServices]);

  // Sequential animation for why choose us cards
  useEffect(() => {
    if (visibleSections.has('why-choose-us')) {
      const timeouts: NodeJS.Timeout[] = [];
      
      // Clear any existing cards first
      setVisibleWhyChooseCards(new Set());
      
      // Show cards one by one with 300ms intervals
      const whyChooseCards = [0, 1, 2, 3]; // 4 cards
      whyChooseCards.forEach((_, index) => {
        const timeout = setTimeout(() => {
          setVisibleWhyChooseCards(prev => new Set([...prev, index]));
        }, (index + 1) * 300);
        timeouts.push(timeout);
      });

      return () => {
        timeouts.forEach(timeout => clearTimeout(timeout));
      };
    }
  }, [visibleSections]);

  // Sequential animation for industry cards
  useEffect(() => {
    if (visibleSections.has('industries')) {
      const timeouts: NodeJS.Timeout[] = [];
      
      // Clear any existing cards first
      setVisibleIndustryCards(new Set());
      
      // Show cards one by one with 200ms intervals (faster than other sections)
      industries.forEach((_, index) => {
        const timeout = setTimeout(() => {
          setVisibleIndustryCards(prev => new Set([...prev, index]));
        }, (index + 1) * 200);
        timeouts.push(timeout);
      });

      return () => {
        timeouts.forEach(timeout => clearTimeout(timeout));
      };
    }
  }, [visibleSections, industries]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate the entire form
    if (!validateForm(formData)) {
      toast({
        title: "Please fix the errors",
        description: "Please correct the highlighted fields and try again.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://raqkxeahwupzhuyfnsew.supabase.co/functions/v1/send-contact-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      
      setIsSubmitted(true);
      clearErrors();
      
      // Track successful form submission
      trackFormSubmission('contact_form', true);
      
      // Success animation
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      
      setFormData({ 
        name: "", 
        email: "", 
        phone: "",
        company_name: "", 
        industry: "", 
        message: "", 
        consent: false 
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch("https://raqkxeahwupzhuyfnsew.supabase.co/functions/v1/send-contact-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      
      setIsSubmitted(true);
      setShowReview(false);
      
      setFormData({ 
        name: "", 
        email: "", 
        phone: "",
        company_name: "", 
        industry: "", 
        message: "", 
        consent: false 
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      icon: Calculator,
      title: "Accounting & Finance",
      description: "Complete book keeping, financial reporting, accounts payable/receivable and account management solutions.",
      color: "text-blue-600",
      bgColor: "bg-blue-50 group-hover:bg-blue-100"
    },
    {
      icon: Settings,
      title: "Back Office",
      description: "Efficient HR, admin, payroll, compliance, document management, and process optimization for streamlined operations.",
      color: "text-green-600",
      bgColor: "bg-green-50 group-hover:bg-green-100"
    },
    {
      icon: Headphones,
      title: "Support",
      description: "24/7 multilingual customer support worldwide with technical assistance, order processing, and customer relationship management.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 group-hover:bg-indigo-100"
    },
    {
      icon: PenTool,
      title: "Architect",
      description: "Expert architecture and design services including system architecture, solution design, technical blueprints, and infrastructure planning.",
      color: "text-purple-600",
      bgColor: "bg-purple-50 group-hover:bg-purple-100"
    },
    {
      icon: HardDrive,
      title: "IT Helpdesk",
      description: "Comprehensive IT support including infrastructure management, system monitoring, troubleshooting, user support, and secure scalable solutions for seamless operations.",
      color: "text-red-600",
      bgColor: "bg-red-50 group-hover:bg-red-100"
    },
    {
      icon: CheckCircle,
      title: "Virtual CISO",
      description: "Strategic cybersecurity leadership providing security governance, risk assessment, compliance management, incident response, and regulatory adherence guidance.",
      color: "text-teal-600",
      bgColor: "bg-teal-50 group-hover:bg-teal-100"
    },
    {
      icon: Database,
      title: "Cloud Services",
      description: "End-to-end cloud solutions including migration planning, infrastructure management, cost optimization, security implementation, and performance monitoring.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 group-hover:bg-indigo-100"
    },
    {
      icon: Brain,
      title: "AI Solutions",
      description: "Advanced AI and machine learning solutions including RAG, LLM integration, intelligent automation, and custom AI development.",
      color: "text-orange-600",
      bgColor: "bg-orange-50 group-hover:bg-orange-100"
    }
  ];

  // FAQ data for AEO optimization
  const faqs = [
    {
      question: "What is GDPR-compliant outsourcing and why is it important?",
      answer: "GDPR-compliant outsourcing means that all data processing activities adhere to the European Union's General Data Protection Regulation. This is crucial for businesses operating in or serving customers in the EU. At NovalSquad, we ensure all our processes, systems, and staff training meet GDPR standards, protecting your business from potential fines and maintaining customer trust."
    },
    {
      question: "How quickly can NovalSquad deploy virtual assistants for my business?",
      answer: "We can deploy fully-trained virtual assistants within 5 business days. Our rapid onboarding process includes skills assessment, cultural fit evaluation, and comprehensive training on your specific requirements. This means you can scale your team quickly without the typical hiring delays."
    },
    {
      question: "What industries does NovalSquad specialize in?",
      answer: "NovalSquad serves diverse industries including Finance, Healthcare, Retail, Travel, Education, Automotive, Real Estate, Gaming, Technology, and Logistics. Our team has specialized expertise in each sector, understanding industry-specific compliance requirements, workflows, and best practices to deliver tailored solutions."
    },
    {
      question: "How does NovalSquad ensure 24/7 customer support availability?",
      answer: "We operate across multiple time zones with dedicated teams ensuring round-the-clock coverage. Our support infrastructure includes redundant systems, multilingual staff, and escalation protocols to guarantee uninterrupted service delivery. We maintain SLA compliance through sophisticated monitoring and real-time reporting."
    },
    {
      question: "What makes NovalSquad different from other BPO providers?",
      answer: "NovalSquad combines GDPR compliance, rapid deployment (5 days), cost-effectiveness (up to 40~50% savings), and specialized industry expertise. We offer custom SLAs, multilingual support in 6+ languages, and cutting-edge AI integration. Our focus on quality, security, and transparent communication sets us apart in the outsourcing industry."
    },
    {
      question: "Can NovalSquad integrate with our existing business tools and systems?",
      answer: "Yes, we seamlessly integrate with popular business tools including CRM systems (Salesforce, HubSpot), project management platforms (Jira, Asana), communication tools (Slack, Microsoft Teams), and custom enterprise software. Our technical team ensures smooth integration with minimal disruption to your operations."
    }
  ];

  // Generate structured data for SEO/AEO/GEO
  const organizationSchema = generateOrganizationSchema();
  
  const servicesListSchema = generateItemListSchema(
    "Business Process Outsourcing Services",
    services.map(service => ({
      name: service.title,
      url: "https://novalsquad.com#services",
      description: service.description
    }))
  );

  return (
    <>
      <SEOHead 
        structuredData={[organizationSchema, servicesListSchema]}
        faqData={faqs}
        breadcrumbs={[
          { name: "Home", url: "https://novalsquad.com" }
        ]}
      />
      <SkipNavigation />
      <ScrollProgress />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
        {/* Enhanced Navigation */}
        <EnhancedNavigation 
          onContactClick={() => {
            trackUserInteraction('cta_click', 'Navigation', 'Contact CTA');
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

      {/* Hero Section */}
      <section id="main-content" className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-50 py-6 md:py-8" tabIndex={-1}>
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
            {/* Left side - Lottie Animation */}
            <div className="w-full lg:w-2/5">
              <div className="w-full h-[400px] lg:h-[500px]">
                <LottieSideImage />
              </div>
            </div>
            
            {/* Right side - Text content */}
            <div className="flex-1 max-w-2xl text-left">
              <h1 className="mb-6 text-4xl md:text-5xl font-bold text-gray-900 hero-title leading-tight" id="heroTitle">
                <span className="hero-line text-blue-900" style={{ animationDelay: '0.2s' }}>{t('hero.title').split('—')[0]}</span><br />
                <span className="hero-line bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent" style={{ animationDelay: '0.4s' }}>{t('hero.title').split('—')[1] || 'Outsourcing & Digital Solutions'}</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 hero-subtitle mb-6">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-8 text-gray-700 hero-trust-signals">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="text-base md:text-lg lg:text-xl font-medium">{t('hero.trustSignals.gdpr')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-blue-600" />
                  <span className="text-base md:text-lg lg:text-xl font-medium">{t('hero.trustSignals.costEffective')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-cyan-500" />
                  <span className="text-base md:text-lg lg:text-xl font-medium">{t('hero.trustSignals.onboard')}</span>
                </div>
              </div>
              <button 
                type="button"
                className="group relative bg-white border-2 border-indigo-600 text-indigo-600 px-6 md:px-8 py-3 md:py-4 font-semibold text-base md:text-lg rounded-full shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 w-full sm:w-auto overflow-hidden"
                onClick={(e) => {
                  e.preventDefault();
                  trackUserInteraction('cta_click', 'Hero', 'Get Free Consultation');
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-500 rounded-full"></div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-full"></div>
                
                {/* Pulsing ring effect */}
                <div className="absolute inset-0 border-2 border-indigo-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
                
                {/* Button content */}
                <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center justify-center">
                  <span>{t('hero.cta') || 'Get Your Free Consultation'}</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-2 left-4 w-1 h-1 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-4 right-6 w-1 h-1 bg-blue-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
                  <div className="absolute bottom-3 left-8 w-1 h-1 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-600 delay-200"></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="py-16 bg-gradient-to-br from-indigo-50 to-blue-50 border-t-2 border-indigo-200 relative overflow-hidden">
        {/* Ripple Animation Background */}
        <div className="absolute inset-0 opacity-10">
          <Lottie
            animationData={rippleAnimation}
            loop={true}
            autoplay={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-in slide-in-from-bottom-4">
              {t('whyChooseUs.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-in slide-in-from-bottom-4" style={{ animationDelay: '200ms' }}>
              {t('whyChooseUs.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: Clock,
                title: t('whyChooseUs.items.onboarding.title'),
                description: t('whyChooseUs.items.onboarding.description'),
                color: "text-green-600",
                bgColor: "bg-green-50 group-hover:bg-green-100"
              },
              {
                icon: Shield,
                title: t('whyChooseUs.items.operations.title'),
                description: t('whyChooseUs.items.operations.description'),
                color: "text-purple-600",
                bgColor: "bg-purple-50 group-hover:bg-purple-100"
              },
              {
                icon: Calculator,
                title: t('whyChooseUs.items.pricing.title'),
                description: t('whyChooseUs.items.pricing.description'),
                color: "text-teal-600",
                bgColor: "bg-teal-50 group-hover:bg-teal-100"
              },
              {
                icon: Settings,
                title: t('whyChooseUs.items.customSla.title'),
                description: t('whyChooseUs.items.customSla.description'),
                color: "text-orange-600",
                bgColor: "bg-orange-50 group-hover:bg-orange-100"
              }
            ].map((item, index) => (
              <Card key={index} className={`border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group hover:scale-105 rounded-full aspect-[2/1] flex flex-col justify-center w-full max-w-[280px] mx-auto ${visibleWhyChooseCards.has(index) ? 'animate-in slide-in-from-bottom-4' : 'opacity-0 translate-y-4'}`} style={{ animationDelay: `${index * 150}ms` }}>
                <CardHeader className="text-center pb-1">
                  <div className={`mx-auto mb-2 p-2 rounded-full w-12 h-12 flex items-center justify-center transition-colors group-hover:scale-110 duration-300 ${item.bgColor}`}>
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                  <CardTitle className="text-lg font-semibold">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 pb-4">
                  <CardDescription className="text-center text-sm leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gradient-to-br from-indigo-50 to-blue-50 relative overflow-hidden">
        {/* Ripple Animation Background */}
        <div className="absolute inset-0 opacity-15">
          <Lottie
            animationData={rippleAnimation}
            loop={true}
            autoplay={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('services.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group hover:scale-105">
                <CardHeader className="text-center pb-2">
                  <div className={`mx-auto mb-4 p-3 rounded-full w-16 h-16 flex items-center justify-center transition-colors ${service.bgColor}`}>
                    <service.icon className={`h-8 w-8 ${service.color}`} />
                  </div>
                  <CardTitle className="text-xl mb-4">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-center text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Services Section */}
      <section id="digital" className="py-16 bg-gradient-to-br from-indigo-50 to-blue-50 border-t-2 border-indigo-200 relative overflow-hidden">
        {/* Ripple Animation Background */}
        <div className="absolute inset-0 opacity-10">
          <Lottie
            animationData={rippleAnimation}
            loop={true}
            autoplay={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('digitalServices.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('digitalServices.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {digitalServices.map((service, index) => (
              <Card key={index} className={`border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group hover:scale-105 ${visibleDigitalCards.has(index) ? 'animate-in slide-in-from-bottom-4' : 'opacity-0 translate-y-4'}`} style={{ animationDelay: `${index * 150}ms` }}>
                <CardHeader className="text-center">
                  <div className={`mx-auto mb-4 p-3 rounded-full w-16 h-16 flex items-center justify-center transition-colors ${service.bgColor}`}>
                    <service.icon className={`h-8 w-8 ${service.color}`} />
                  </div>
                  <CardTitle className="text-xl">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-20 bg-gradient-to-br from-indigo-50 to-blue-50 border-t-2 border-indigo-200 relative overflow-hidden">
        {/* Ripple Animation Background */}
        <div className="absolute inset-0 opacity-15">
          <Lottie
            animationData={rippleAnimation}
            loop={true}
            autoplay={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          {/* Quality Focus Header */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                  <span className="text-gray-900">{t('industries.title').split(',')[0]},</span>
                  <br />
                  <span className="text-gray-600 text-3xl md:text-4xl font-normal">{t('industries.title').split(',')[1] || 'with specialized expertise'}</span>
                </h2>
              </div>
              <div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t('industries.subtitle')}
                </p>
              </div>
            </div>
          </div>

          {/* Circular Industries Grid */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-12">
              {industries.map((industry, index) => (
                <div 
                  key={index} 
                  className={`group cursor-pointer transition-all duration-700 ${visibleIndustryCards.has(index) ? 'animate-in slide-in-from-bottom-4' : 'opacity-0 translate-y-4'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-center">
                    {/* Circular Industry Card */}
                    <div className="w-32 h-32 md:w-36 md:h-36 mx-auto bg-gray-50 rounded-full flex flex-col items-center justify-center p-4 group-hover:bg-gray-100 transition-all duration-300 group-hover:scale-105 shadow-sm group-hover:shadow-md mb-4">
                      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-3 transition-colors ${industry.bgColor}`}>
                        <industry.icon className={`h-6 w-6 md:h-7 md:w-7 ${industry.color}`} />
                      </div>
                      <h3 className="text-sm md:text-base font-semibold text-gray-900 text-center leading-tight">
                        {industry.title}
                      </h3>
                    </div>
                    
                    {/* Description Below Circle */}
                    <p className="text-xs md:text-sm text-gray-600 text-center leading-relaxed px-2">
                      {industry.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-indigo-50 to-blue-50 border-t-2 border-indigo-200 relative overflow-hidden">
        {/* Ripple Animation Background */}
        <div className="absolute inset-0 opacity-10">
          <Lottie
            animationData={rippleAnimation}
            loop={true}
            autoplay={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                <span className="text-gray-900">{t('testimonials.title')}</span>
                <br />
                <span className="text-gray-600 text-3xl md:text-4xl font-normal">{t('testimonials.acrossGlobe')}</span>
              </h2>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {t('testimonials.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(t('testimonials.items', { returnObjects: true }) as Array<{
              initials: string;
              name: string;
              role: string;
              quote: string;
            }>).map((testimonial, index: number) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:scale-105 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.initials}
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "{testimonial.quote}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-8 relative overflow-hidden">
        <LottieBackground className="opacity-10" />
        {/* Ripple Animation Background */}
        <div className="absolute inset-0 opacity-15">
          <Lottie
            animationData={rippleAnimation}
            loop={true}
            autoplay={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('contact.title')}</h2>
               <p className="text-xl text-muted-foreground">
                 {t('contact.subtitle')}
               </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Form or Thank You Card */}
              {!isSubmitted ? (
                <Card className="p-8 border-2 border-primary/20 shadow-xl bg-gradient-to-br from-background to-muted/30 relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary rounded-full translate-y-12 -translate-x-12"></div>
                  </div>
                  
                  <div className="relative">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-primary mb-2">{t('contact.form.title')}</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        {t('contact.form.subtitle')}
                      </p>
                    </div>
                    
                    {!showReview ? (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Information Section */}
                        <div className="space-y-4">
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-primary uppercase tracking-wide">{t('contact.form.sections.personalInfo')}</h4>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-muted-foreground">{t('contact.form.fields.fullName')} *</label>
                              <Input
                                placeholder={t('contact.form.placeholders.fullName')}
                                value={formData.name}
                                onChange={(e) => {
                                  setFormData(prev => ({ ...prev, name: e.target.value }));
                                  validateSingleField('name', e.target.value);
                                }}
                                onBlur={() => markFieldTouched('name')}
                                required
                                className={`h-12 transition-all duration-200 focus:ring-2 focus:ring-primary/20 ${
                                  hasFieldError('name') ? 'border-destructive focus:ring-destructive/20' : ''
                                }`}
                              />
                              {getFieldError('name') && (
                                <p className="text-sm text-destructive">{getFieldError('name')}</p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-muted-foreground">{t('contact.form.fields.email')} *</label>
                              <Input
                                type="email"
                                placeholder={t('contact.form.placeholders.email')}
                                value={formData.email}
                                onChange={(e) => {
                                  setFormData(prev => ({ ...prev, email: e.target.value }));
                                  validateSingleField('email', e.target.value);
                                }}
                                onBlur={() => markFieldTouched('email')}
                                required
                                className={`h-12 transition-all duration-200 focus:ring-2 focus:ring-primary/20 ${
                                  hasFieldError('email') ? 'border-destructive focus:ring-destructive/20' : ''
                                }`}
                              />
                              {getFieldError('email') && (
                                <p className="text-sm text-destructive">{getFieldError('email')}</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-muted-foreground">{t('contact.form.fields.phone')}</label>
                              <Input
                                type="tel"
                                placeholder={t('contact.form.placeholders.phone')}
                                value={formData.phone}
                                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                className="h-12 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-muted-foreground">{t('contact.form.fields.company')}</label>
                              <Input
                                placeholder={t('contact.form.placeholders.company')}
                                value={formData.company_name}
                                onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
                                className="h-12 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Project Information Section */}
                        <div className="space-y-4">
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-primary uppercase tracking-wide">{t('contact.form.sections.projectDetails')}</h4>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">{t('contact.form.fields.industry')}</label>
                            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}>
                              <SelectTrigger className="h-12 transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                                <SelectValue placeholder={t('contact.form.placeholders.industry')} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="technology">Technology & Software</SelectItem>
                                <SelectItem value="finance">Financial Services & Banking</SelectItem>
                                <SelectItem value="healthcare">Healthcare & Pharmaceuticals</SelectItem>
                                <SelectItem value="retail">Retail & E-commerce</SelectItem>
                                <SelectItem value="manufacturing">Manufacturing & Industrial</SelectItem>
                                <SelectItem value="logistics">Logistics & Transportation</SelectItem>
                                <SelectItem value="real-estate">Real Estate & Property</SelectItem>
                                <SelectItem value="education">Education & Training</SelectItem>
                                <SelectItem value="automotive">Automotive & Mobility</SelectItem>
                                <SelectItem value="energy">Energy & Utilities</SelectItem>
                                <SelectItem value="media">Media & Entertainment</SelectItem>
                                <SelectItem value="gaming">Gaming & Interactive</SelectItem>
                                <SelectItem value="consulting">Consulting & Professional Services</SelectItem>
                                <SelectItem value="legal">Legal & Compliance</SelectItem>
                                <SelectItem value="insurance">Insurance & Risk Management</SelectItem>
                                <SelectItem value="hospitality">Hospitality & Tourism</SelectItem>
                                <SelectItem value="food-beverage">Food & Beverage</SelectItem>
                                <SelectItem value="fashion">Fashion & Apparel</SelectItem>
                                <SelectItem value="construction">Construction & Engineering</SelectItem>
                                <SelectItem value="aerospace">Aerospace & Defense</SelectItem>
                                <SelectItem value="telecommunications">Telecommunications</SelectItem>
                                <SelectItem value="non-profit">Non-Profit & NGO</SelectItem>
                                <SelectItem value="government">Government & Public Sector</SelectItem>
                                <SelectItem value="startup">Startup & Scale-up</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">{t('contact.form.fields.projectDescription')} *</label>
                            <Textarea
                              placeholder={t('contact.form.placeholders.projectDescription')}
                              value={formData.message}
                              onChange={(e) => {
                                setFormData(prev => ({ ...prev, message: e.target.value }));
                                validateSingleField('message', e.target.value);
                              }}
                              onBlur={() => markFieldTouched('message')}
                              className={`min-h-32 transition-all duration-200 focus:ring-2 focus:ring-primary/20 resize-none ${
                                hasFieldError('message') ? 'border-destructive focus:ring-destructive/20' : ''
                              }`}
                              required
                            />
                            {getFieldError('message') && (
                              <p className="text-sm text-destructive">{getFieldError('message')}</p>
                            )}
                            <p className="text-xs text-muted-foreground">
                              {t('contact.form.helpText.projectDescription')}
                            </p>
                          </div>
                        </div>

                        {/* Consent Section */}
                        <div className="space-y-4">
                          <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                            <Checkbox
                              id="consent"
                              checked={formData.consent}
                              onCheckedChange={(checked) => {
                                setFormData(prev => ({ ...prev, consent: !!checked }));
                                validateSingleField('consent', !!checked);
                              }}
                              onBlur={() => markFieldTouched('consent')}
                              className={`mt-1 ${hasFieldError('consent') ? 'border-destructive' : ''}`}
                            />
                            <label htmlFor="consent" className="text-sm text-muted-foreground leading-5">
                              {(() => {
                                const consentText = t('contact.form.fields.consent');
                                if (!consentText) return 'I agree to the ';
                                const parts = consentText.split('Privacy Policy');
                                if (parts.length < 2) return consentText;
                                return (
                                  <>
                                    {parts[0]}
                                    <Link to="/privacy-policy" className="text-primary hover:underline font-medium">
                                      {t('footer.links.privacy')}
                                    </Link>
                                    {parts[1].split('Terms & Conditions')[0]}
                                    <Link to="/terms-conditions" className="text-primary hover:underline font-medium">
                                      {t('footer.links.terms')}
                                    </Link>
                                    {parts[1].split('Terms & Conditions')[1]}
                                  </>
                                );
                              })()}
                              <span className="text-red-500"> *</span>
                            </label>
                          </div>
                          {getFieldError('consent') && (
                            <p className="text-sm text-destructive ml-7">{getFieldError('consent')}</p>
                          )}
                        </div>
                        
                        <Button 
                          type="submit" 
                          size="lg" 
                          className="group relative w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={isSubmitting}
                        >
                          {/* Shimmer effect */}
                          {!isSubmitting && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                          )}
                          
                          {isSubmitting ? (
                            <div className="flex items-center space-x-2">
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              <span>{t('contact.form.buttons.processing')}</span>
                            </div>
                          ) : (
                            <span className="relative z-10 flex items-center justify-center">
                              <span>{t('contact.form.buttons.reviewSubmit')}</span>
                              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                          )}
                        </Button>
                      </form>
                    ) : (
                      <div className="space-y-6">
                        <div className="text-center mb-6">
                          <h4 className="text-xl font-semibold text-primary mb-2">Review Your Information</h4>
                          <p className="text-muted-foreground">Please review your details before submitting</p>
                        </div>
                        
                        <div className="bg-muted/50 rounded-lg p-6 space-y-6">
                          {/* Personal Info Review */}
                          <div>
                            <h5 className="text-sm font-semibold text-primary mb-3">
                              Personal Information
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Name</p>
                                <p className="text-base font-semibold">{formData.name}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">{t('messages.review.fields.email')}</p>
                                <p className="text-base font-semibold">{formData.email}</p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Project Info Review */}
                          <div>
                            <h5 className="text-sm font-semibold text-primary mb-3">
                              Project Information
                            </h5>
                            <div className="space-y-3">
                              {formData.company_name && (
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Company</p>
                                  <p className="text-base font-semibold">{formData.company_name}</p>
                                </div>
                              )}
                              
                              {formData.industry && (
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Industry</p>
                                  <p className="text-base font-semibold capitalize">{formData.industry.replace('-', ' ')}</p>
                                </div>
                              )}
                              
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Project Description</p>
                                <p className="text-base leading-relaxed">{formData.message}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-3">
                          <Button 
                            type="button"
                            variant="outline" 
                            onClick={(e) => {
                              e.preventDefault();
                              setShowReview(false);
                            }}
                            className="flex-1 h-12"
                          >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {t('contact.form.buttons.editInfo')}
                          </Button>
                          <Button 
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              handleFinalSubmit();
                            }}
                            className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Sending...</span>
                              </div>
                            ) : (
                              <>
                                {t('contact.form.buttons.submitInfo')}
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ) : (
                <Card className="p-8 text-center">
                  <div className="space-y-6">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl mb-3">{t('contact.success.title')}</CardTitle>
                      <CardDescription className="text-lg">
                        {t('contact.success.description')}
                      </CardDescription>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        {t('contact.success.expectResponse')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t('contact.success.checkEmail')}
                      </p>
                    </div>
                    <Button 
                      type="button"
                      variant="outline" 
                      onClick={(e) => {
                        e.preventDefault();
                        setIsSubmitted(false);
                      }}
                      className="mt-4"
                    >
                      {t('contact.success.sendAnother')}
                    </Button>
                  </div>
                </Card>
              )}

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">{t('contact.info.title')}</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <Mail className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <p className="font-medium">{t('contact.info.labels.email')}</p>
                        <p className="text-muted-foreground">{t('contact.info.email')}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Globe className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <p className="font-medium">{t('contact.info.labels.multilingualSupport')}</p>
                        <p className="text-muted-foreground">{t('contact.info.languages')}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Clock className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <p className="font-medium">{t('contact.info.labels.responseTime')}</p>
                        <p className="text-muted-foreground">{t('contact.info.responseTime')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-lg p-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">GDPR Compliant</h4>
                      <p className="text-sm text-muted-foreground">
                        Your data is processed securely in accordance with European privacy regulations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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

export default Index;
// Hero animation is now handled by CSS animations in index.css
