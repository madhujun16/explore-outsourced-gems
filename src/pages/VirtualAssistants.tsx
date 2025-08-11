import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, Shield, Clock, Globe, Euro, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import logoImage from "@/assets/novalsquad-logo.png";

const VirtualAssistants = () => {
  const { t } = useTranslation();
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

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

    const sections = document.querySelectorAll('section[id], .scroll-animate');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Shield,
      title: "GDPR Compliant",
      description: "Full compliance with European data protection regulations"
    },
    {
      icon: Users,
      title: "European Talent",
      description: "Skilled virtual assistants from across Europe"
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Round-the-clock support for your business needs"
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Support in English, German, French, Spanish, and Italian"
    },
    {
      icon: Euro,
      title: "Cost Effective",
      description: "Save up to 60% compared to local hiring"
    },
    {
      icon: CheckCircle,
      title: "Ready in 5 Days",
      description: "Quick onboarding and immediate productivity"
    }
  ];

  const services = [
    {
      title: "Administrative Support",
      description: "Email management, calendar scheduling, document preparation, and data entry"
    },
    {
      title: "Customer Service",
      description: "Multilingual customer support, order processing, and client communication"
    },
    {
      title: "Research & Analysis",
      description: "Market research, competitor analysis, and data compilation"
    },
    {
      title: "Content Creation",
      description: "Blog writing, social media management, and content editing"
    },
    {
      title: "Project Management",
      description: "Task coordination, progress tracking, and team communication"
    },
    {
      title: "Technical Support",
      description: "Basic IT support, software assistance, and technical documentation"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src={logoImage} alt="NovalSquad" className="h-8 w-auto" />
            <span className="text-lg font-semibold">NovalSquad</span>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <Button asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              GDPR-Compliant Virtual Assistants
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              European virtual assistants for startups and enterprises. Multilingual, cost-effective, and ready in 5 days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose European Virtual Assistants?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our European virtual assistants provide the perfect blend of expertise, compliance, and cost-effectiveness for your business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Virtual Assistant Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive virtual assistant services tailored to your business needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get your GDPR-compliant European virtual assistant in just 5 days. Contact us today for a free consultation.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="text-lg px-8 py-4"
            onClick={() => window.location.href = '/'}
          >
            Contact Us Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default VirtualAssistants;
