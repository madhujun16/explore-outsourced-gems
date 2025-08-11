import { useState, useEffect, useRef } from "react";
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
import ChatBot from "@/components/ChatBot";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import logoImage from "@/assets/novalsquad-logo.png";
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
  ArrowLeft
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
  const { toast } = useToast();

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

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      toast({
        title: "Consent required",
        description: "Please agree to our Privacy Policy and Terms & Conditions.",
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
      color: "text-purple-600",
      bgColor: "bg-purple-50 group-hover:bg-purple-100"
    },
    {
      icon: Users,
      title: "Virtual Staff",
      description: "On-demand trained remote teams with specialized skills, project management, and dedicated account support for your business needs.",
      color: "text-orange-600",
      bgColor: "bg-orange-50 group-hover:bg-orange-100"
    },
    {
      icon: HardDrive,
      title: "IT Helpdesk",
      description: "Secure and scalable infrastructure support.",
      color: "text-red-600",
      bgColor: "bg-red-50 group-hover:bg-red-100"
    },
    {
      icon: CheckCircle,
      title: "Virtual CISO",
      description: "Cybersecurity leadership and compliance management.",
      color: "text-teal-600",
      bgColor: "bg-teal-50 group-hover:bg-teal-100"
    },
    {
      icon: Database,
      title: "Cloud Services",
      description: "Migration, management, and optimization solutions.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 group-hover:bg-indigo-100"
    }
  ];

  const digitalServices = [
    {
      icon: Code2,
      title: "Web Dev",
      description: "Landing pages, CMS, ecommerce, globally hosted.",
      color: "text-cyan-600",
      bgColor: "bg-cyan-50 group-hover:bg-cyan-100"
    },
    {
      icon: Megaphone,
      title: "Marketing",
      description: "SEO, paid ads, multilingual content strategy.",
      color: "text-pink-600",
      bgColor: "bg-pink-50 group-hover:bg-pink-100"
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
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 group-hover:bg-emerald-100"
    }
  ];

  const industries = [
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
      color: "text-purple-600",
      bgColor: "bg-purple-50 group-hover:bg-purple-100"
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
      icon: Factory,
      title: "Manufacturing",
      description: "Supply chain support, quality control, documentation.",
      color: "text-gray-600",
      bgColor: "bg-gray-50 group-hover:bg-gray-100"
    },
    {
      icon: Truck,
      title: "Logistics",
      description: "Shipment tracking, inventory management, delivery support.",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 group-hover:bg-emerald-100"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center hover:scale-105 transition-transform duration-200">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors duration-200">NovalSquad</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-muted-foreground hover:text-primary transition-colors duration-200">{t('navigation.services')}</a>
              <a href="#digital" className="text-muted-foreground hover:text-primary transition-colors duration-200">Digital</a>
              <a href="#industries" className="text-muted-foreground hover:text-primary transition-colors duration-200">{t('navigation.industries')}</a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors duration-200">{t('navigation.contact')}</a>
            </div>
            <div className="flex items-center space-x-3">
              <LanguageSwitcher />
              <Button 
                variant="outline" 
                size="sm"
                className="px-4 py-2 h-9"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('hero.cta')}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/90 via-primary to-primary/80 text-primary-foreground">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center bg-no-repeat animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-primary/95" />
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-in slide-in-from-bottom-4 duration-1000">
              <span className="block">{t('hero.title').split(' for ')[0]}</span>
              <span className="block text-accent">{t('hero.title').split(' for ')[1]}</span>
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-primary-foreground/80 animate-in slide-in-from-bottom-4 duration-1000 delay-200">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-primary-foreground/70 animate-in slide-in-from-bottom-4 duration-1000 delay-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>{t('hero.trustSignals.gdpr')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>{t('hero.trustSignals.support')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>{t('hero.trustSignals.multilingual')}</span>
              </div>
            </div>
            <Button 
              size="lg" 
              variant="secondary"
              className="animate-in slide-in-from-bottom-4 duration-1000 delay-400 hover:scale-105 transition-transform duration-300 hover:shadow-xl"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get a Free Consultation
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="py-10 bg-background scroll-animate">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('whyChooseUs.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('whyChooseUs.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group hover:scale-105">
              <CardHeader className="text-center pb-3">
                <div className="mx-auto mb-3 p-2 rounded-full w-12 h-12 flex items-center justify-center bg-green-50 group-hover:bg-green-100 transition-colors group-hover:scale-110 duration-300">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">{t('whyChooseUs.items.onboarding.title')}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-center text-sm">
                  {t('whyChooseUs.items.onboarding.description')}
                </CardDescription>
              </CardContent>
            </Card>
            

            
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group hover:scale-105">
              <CardHeader className="text-center pb-3">
                <div className="mx-auto mb-3 p-2 rounded-full w-12 h-12 flex items-center justify-center bg-purple-50 group-hover:bg-purple-100 transition-colors group-hover:scale-110 duration-300">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">{t('whyChooseUs.items.operations.title')}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-center text-sm">
                  {t('whyChooseUs.items.operations.description')}
                </CardDescription>
              </CardContent>
            </Card>
            

            
            <Card className={`border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group hover:scale-105 ${
              visibleSections.has('why-choose-us') ? 'animate-in slide-in-from-bottom-4 duration-700 delay-400' : 'opacity-0 translate-y-8'
            }`}>
              <CardHeader className="text-center pb-3">
                <div className="mx-auto mb-3 p-2 rounded-full w-12 h-12 flex items-center justify-center bg-teal-50 group-hover:bg-teal-100 transition-colors group-hover:scale-110 duration-300">
                  <Calculator className="h-6 w-6 text-teal-600" />
                </div>
                <CardTitle className="text-lg">{t('whyChooseUs.items.pricing.title')}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-center text-sm">
                  {t('whyChooseUs.items.pricing.description')}
                </CardDescription>
              </CardContent>
            </Card>
            

          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-8 bg-muted/30 scroll-animate">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-1000 ${
              visibleSections.has('services') ? 'animate-in slide-in-from-bottom-4 opacity-100' : 'opacity-0 translate-y-8'
            }`}>
              {t('services.title')}
            </h2>
            <p className={`text-xl text-muted-foreground max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
              visibleSections.has('services') ? 'animate-in slide-in-from-bottom-4 opacity-100' : 'opacity-0 translate-y-8'
            }`}>
              {t('services.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className={`border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group hover:scale-105 ${
                visibleSections.has('services') ? `animate-in slide-in-from-bottom-4 duration-700 delay-${(index + 1) * 100}` : 'opacity-0 translate-y-8'
              }`}>
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

      {/* Digital Services Section */}
      <section id="digital" className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('digitalServices.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('digitalServices.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {digitalServices.map((service, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
                <CardHeader className="text-center">
                  <div className={`mx-auto mb-4 p-3 rounded-full w-16 h-16 flex items-center justify-center transition-colors ${service.bgColor}`}>
                    <service.icon className={`h-8 w-8 ${service.color}`} />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
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

      {/* Testimonials Section */}
      <section id="testimonials" className="py-10 bg-background scroll-animate">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-1000 ${
              visibleSections.has('testimonials') ? 'animate-in slide-in-from-bottom-4 opacity-100' : 'opacity-0 translate-y-8'
            }`}>
              Trusted by European Businesses
            </h2>
            <p className={`text-xl text-muted-foreground max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
              visibleSections.has('testimonials') ? 'animate-in slide-in-from-bottom-4 opacity-100' : 'opacity-0 translate-y-8'
            }`}>
              See what our clients say about working with NovalSquad Outsourcing
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg animate-in slide-in-from-bottom-4 duration-700 delay-100 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4">
                    EM
                  </div>
                  <div>
                    <h4 className="font-semibold">Elena M.</h4>
                    <p className="text-sm text-muted-foreground">COO, SaaS Company (London)</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "NovalSquad Outsourcing helped us reduce ticket backlog by 60% in the first month. Their support team is exceptional."
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4">
                    PL
                  </div>
                  <div>
                    <h4 className="font-semibold">Pierre L.</h4>
                    <p className="text-sm text-muted-foreground">CEO, E-commerce (Paris)</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "The GDPR compliance and European data handling gave us peace of mind. Cost savings of 40% compared to local options."
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4">
                    MS
                  </div>
                  <div>
                    <h4 className="font-semibold">Maria S.</h4>
                    <p className="text-sm text-muted-foreground">Operations Manager (Madrid)</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "24/7 support with no timezone issues. Our customer satisfaction scores improved by 35% within weeks."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Industries We Serve</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Specialized expertise across key global business sectors
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
                <CardHeader className="text-center">
                  <div className={`mx-auto mb-4 p-3 rounded-full w-16 h-16 flex items-center justify-center transition-colors ${industry.bgColor}`}>
                    <industry.icon className={`h-8 w-8 ${industry.color}`} />
                  </div>
                  <CardTitle className="text-xl">{industry.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base">
                    {industry.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
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
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                required
                                className="h-12 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                              />
                            </div>
                                                         <div className="space-y-2">
                               <label className="text-sm font-medium text-muted-foreground">{t('contact.form.fields.email')} *</label>
                               <Input
                                 type="email"
                                 placeholder={t('contact.form.placeholders.email')}
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                required
                                className="h-12 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                              />
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
                              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                              className="min-h-32 transition-all duration-200 focus:ring-2 focus:ring-primary/20 resize-none"
                              required
                            />
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
                              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, consent: !!checked }))}
                              className="mt-1"
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
                        </div>
                        
                        <Button 
                          type="submit" 
                          size="lg" 
                          className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                          disabled={isSubmitting}
                                                 >
                           {isSubmitting ? (
                             <div className="flex items-center space-x-2">
                               <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                               <span>{t('contact.form.buttons.processing')}</span>
                             </div>
                           ) : (
                             <>
                               {t('contact.form.buttons.reviewSubmit')}
                               <ArrowRight className="ml-2 h-5 w-5" />
                             </>
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
                                <p className="text-sm font-medium text-muted-foreground">Email</p>
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
                            variant="outline" 
                            onClick={() => setShowReview(false)}
                            className="flex-1 h-12"
                          >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Edit Information
                          </Button>
                          <Button 
                            onClick={handleFinalSubmit}
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
                                Submit Information
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
                      <CardTitle className="text-2xl mb-3">Thank You!</CardTitle>
                      <CardDescription className="text-lg">
                        Your message has been submitted to our team. We will get in touch with you soon.
                      </CardDescription>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Expect a response within 24 hours.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Check your email for confirmation.
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsSubmitted(false)}
                      className="mt-4"
                    >
                      Send Another Message
                    </Button>
                  </div>
                </Card>
              )}

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">European Support Team</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <Mail className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-muted-foreground">admin@novalsquad.com</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Globe className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <p className="font-medium">Languages</p>
                        <p className="text-muted-foreground">English, French and Japanese</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Clock className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <p className="font-medium">Response Time</p>
                        <p className="text-muted-foreground">Within 24 hours</p>
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
      <footer className="bg-background border-t py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-4">NovalSquad</div>
            <p className="text-muted-foreground mb-6">
              Your trusted global outsourcing partner for scalable business growth.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-6 mb-4">
              <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms-conditions" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Terms & Conditions
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 NovalSquad Outsourcing. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      
      {/* ChatBot */}
      <ChatBot />
    </div>
  );
};

export default Index;
