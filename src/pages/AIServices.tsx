import { useState, useEffect } from "react";
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
import Footer from "@/components/Footer";
import Lottie from "lottie-react";
import rippleAnimation from "@/assets/ripple-animation.json";
import { generateServiceSchema, generateItemListSchema, generateOrganizationSchema } from "@/lib/structuredData";
import { 
  Bot,
  Brain,
  Database,
  Sparkles,
  Zap,
  MessageSquare,
  FileSearch,
  Globe,
  Shield,
  Workflow,
  ArrowRight,
  CheckCircle,
  Code2,
  Languages,
  Clock,
  TrendingUp,
  Users
} from "lucide-react";

const AIServices = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.service-card').forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const aiServices = [
    {
      icon: Brain,
      title: t('aiServices.items.ragSolutions.title'),
      description: t('aiServices.items.ragSolutions.description'),
      color: "text-purple-600",
      bgColor: "bg-purple-50 group-hover:bg-purple-100",
      features: [
        t('aiServices.items.ragSolutions.features.0'),
        t('aiServices.items.ragSolutions.features.1'),
        t('aiServices.items.ragSolutions.features.2')
      ]
    },
    {
      icon: MessageSquare,
      title: t('aiServices.items.aiChatbots.title'),
      description: t('aiServices.items.aiChatbots.description'),
      color: "text-blue-600",
      bgColor: "bg-blue-50 group-hover:bg-blue-100",
      features: [
        t('aiServices.items.aiChatbots.features.0'),
        t('aiServices.items.aiChatbots.features.1'),
        t('aiServices.items.aiChatbots.features.2')
      ]
    },
    {
      icon: FileSearch,
      title: t('aiServices.items.documentProcessing.title'),
      description: t('aiServices.items.documentProcessing.description'),
      color: "text-green-600",
      bgColor: "bg-green-50 group-hover:bg-green-100",
      features: [
        t('aiServices.items.documentProcessing.features.0'),
        t('aiServices.items.documentProcessing.features.1'),
        t('aiServices.items.documentProcessing.features.2')
      ]
    },
    {
      icon: Database,
      title: t('aiServices.items.knowledgeBase.title'),
      description: t('aiServices.items.knowledgeBase.description'),
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 group-hover:bg-indigo-100",
      features: [
        t('aiServices.items.knowledgeBase.features.0'),
        t('aiServices.items.knowledgeBase.features.1'),
        t('aiServices.items.knowledgeBase.features.2')
      ]
    },
    {
      icon: Languages,
      title: t('aiServices.items.multilingualAI.title'),
      description: t('aiServices.items.multilingualAI.description'),
      color: "text-orange-600",
      bgColor: "bg-orange-50 group-hover:bg-orange-100",
      features: [
        t('aiServices.items.multilingualAI.features.0'),
        t('aiServices.items.multilingualAI.features.1'),
        t('aiServices.items.multilingualAI.features.2')
      ]
    },
    {
      icon: Workflow,
      title: t('aiServices.items.processAutomation.title'),
      description: t('aiServices.items.processAutomation.description'),
      color: "text-cyan-600",
      bgColor: "bg-cyan-50 group-hover:bg-cyan-100",
      features: [
        t('aiServices.items.processAutomation.features.0'),
        t('aiServices.items.processAutomation.features.1'),
        t('aiServices.items.processAutomation.features.2')
      ]
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: t('aiServices.benefits.efficiency.title'),
      description: t('aiServices.benefits.efficiency.description'),
      color: "text-yellow-600"
    },
    {
      icon: TrendingUp,
      title: t('aiServices.benefits.scalability.title'),
      description: t('aiServices.benefits.scalability.description'),
      color: "text-green-600"
    },
    {
      icon: Shield,
      title: t('aiServices.benefits.security.title'),
      description: t('aiServices.benefits.security.description'),
      color: "text-red-600"
    },
    {
      icon: Clock,
      title: t('aiServices.benefits.availability.title'),
      description: t('aiServices.benefits.availability.description'),
      color: "text-blue-600"
    }
  ];

  const useCases = [
    {
      icon: Users,
      title: t('aiServices.useCases.customerSupport.title'),
      description: t('aiServices.useCases.customerSupport.description')
    },
    {
      icon: Database,
      title: t('aiServices.useCases.dataAnalysis.title'),
      description: t('aiServices.useCases.dataAnalysis.description')
    },
    {
      icon: Globe,
      title: t('aiServices.useCases.contentGeneration.title'),
      description: t('aiServices.useCases.contentGeneration.description')
    },
    {
      icon: Code2,
      title: t('aiServices.useCases.codeAssistance.title'),
      description: t('aiServices.useCases.codeAssistance.description')
    }
  ];

  // Generate structured data for AI Services page
  const aiServicesListSchema = generateItemListSchema(
    "AI and Machine Learning Services",
    aiServices.map((service, index) => ({
      name: service.title,
      url: `https://novalsquad.com/ai-services#service-${index}`,
      description: service.description
    }))
  );

  const aiServiceSchema = generateServiceSchema({
    name: "AI & LLM Integration Services",
    description: "Comprehensive AI and machine learning solutions including RAG implementation, LLM integration, AI chatbots, document processing, and intelligent automation for businesses.",
    url: "https://novalsquad.com/ai-services",
    provider: "NovalSquad",
    areaServed: "Worldwide"
  });

  const organizationSchema = generateOrganizationSchema();

  // FAQ data for AI Services
  const aiFaqs = [
    {
      question: "What is RAG (Retrieval Augmented Generation) and how can it benefit my business?",
      answer: "RAG is an advanced AI technique that combines the power of large language models with your company's specific data and knowledge base. It enables AI systems to provide accurate, contextually relevant answers using your proprietary information. This improves customer service, reduces response times, and ensures consistency in communication while maintaining data security and privacy."
    },
    {
      question: "How long does it take to implement an AI chatbot solution?",
      answer: "Our AI chatbot implementation typically takes 2-4 weeks depending on complexity. This includes requirements gathering, data preparation, model training, integration with your systems, testing, and deployment. We provide rapid prototyping in the first week so you can see results quickly and provide feedback for refinement."
    },
    {
      question: "Can your AI solutions work with multiple languages?",
      answer: "Yes, our multilingual AI solutions support 6+ languages including English, Spanish, French, German, Italian, and Japanese. We can train models on your multilingual data to ensure accurate understanding and responses across all supported languages, making your business truly global."
    },
    {
      question: "How do you ensure data security and GDPR compliance in AI implementations?",
      answer: "We implement AI solutions with security-first architecture. All data processing is GDPR-compliant with encryption at rest and in transit, access controls, audit logging, and data residency options. We use private cloud deployments or on-premise solutions for sensitive data, ensuring your information never leaves your control."
    }
  ];

  return (
    <>
      <SEOHead
        title="AI & LLM Services - RAG Solutions | NovalSquad Outsourcing"
        description="Transform your business with AI-powered solutions. Expert RAG implementation, LLM integration, AI chatbots, intelligent automation, and document processing services. GDPR-compliant and multilingual."
        keywords="AI services, LLM solutions, RAG, retrieval augmented generation, AI chatbots, machine learning, automation, NLP, AI outsourcing, GPT integration, document AI"
        url="https://novalsquad.com/ai-services"
        structuredData={[organizationSchema, aiServiceSchema, aiServicesListSchema]}
        breadcrumbs={[
          { name: "Home", url: "https://novalsquad.com" },
          { name: "AI Services", url: "https://novalsquad.com/ai-services" }
        ]}
        faqData={aiFaqs}
      />
      
      <SkipNavigation />
      <ScrollProgress />
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
        {/* Enhanced Navigation */}
        <EnhancedNavigation 
          onContactClick={() => navigate('/contact')}
        />

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 py-16 md:py-24 border-b-2 border-indigo-200">
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
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-4 py-2 rounded-full mb-6">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-semibold">{t('aiServices.hero.badge')}</span>
                <Badge variant="secondary" className="ml-2">AI/ML</Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  {t('aiServices.hero.title')}
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                {t('aiServices.hero.subtitle')}
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/contact');
                  }}
                  size="lg"
                  className="group relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-6 h-auto transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {t('aiServices.hero.cta')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 text-gray-700">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <span className="font-medium">{t('aiServices.hero.features.0')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">{t('aiServices.hero.features.1')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-cyan-500" />
                  <span className="font-medium">{t('aiServices.hero.features.2')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Services Grid */}
        <section id="main-content" className="py-16 md:py-24 relative overflow-hidden" tabIndex={-1}>
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
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {t('aiServices.title')}
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t('aiServices.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {aiServices.map((service, index) => (
                <Card
                  key={index}
                  data-index={index}
                  className={`service-card group hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/50 cursor-pointer transform hover:-translate-y-2 ${
                    visibleCards.has(index) 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 100}ms`,
                    transitionProperty: 'opacity, transform, box-shadow, border-color'
                  }}
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

        {/* Benefits Section */}
        <section className="py-16 md:py-24 bg-white/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('aiServices.benefits.title')}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t('aiServices.benefits.subtitle')}
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

        {/* Use Cases Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('aiServices.useCases.title')}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t('aiServices.useCases.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {useCases.map((useCase, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <useCase.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-2">{useCase.title}</CardTitle>
                        <CardDescription className="text-base">{useCase.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('aiServices.cta.title')}
              </h2>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                {t('aiServices.cta.subtitle')}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/contact');
                  }}
                  size="lg"
                  variant="secondary"
                  className="font-semibold px-8 py-6 h-auto hover:scale-105 transition-all duration-300"
                >
                  {t('aiServices.cta.button')}
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

export default AIServices;

