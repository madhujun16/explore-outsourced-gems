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
import { generatePersonSchema, generateOrganizationSchema } from "@/lib/structuredData";
import { 
  Users,
  Shield,
  Award,
  Briefcase,
  Target,
  Zap,
  ArrowRight,
  CheckCircle,
  Linkedin,
  Code,
  Globe,
  TrendingUp,
  Lock,
  Server,
  Wrench,
  HeartHandshake,
  Sparkles,
  Brain
} from "lucide-react";

const About = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const expertise = [
    {
      icon: Shield,
      title: t('about.expertise.cybersecurity.title'),
      description: t('about.expertise.cybersecurity.description'),
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: Briefcase,
      title: t('about.expertise.operations.title'),
      description: t('about.expertise.operations.description'),
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Server,
      title: t('about.expertise.infrastructure.title'),
      description: t('about.expertise.infrastructure.description'),
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Brain,
      title: t('about.expertise.development.title'),
      description: t('about.expertise.development.description'),
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const values = [
    {
      icon: Target,
      title: t('about.values.excellence.title'),
      description: t('about.values.excellence.description')
    },
    {
      icon: HeartHandshake,
      title: t('about.values.partnership.title'),
      description: t('about.values.partnership.description')
    },
    {
      icon: TrendingUp,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description')
    },
    {
      icon: Lock,
      title: t('about.values.security.title'),
      description: t('about.values.security.description')
    }
  ];

  // FAQ data for About page - AEO optimization
  const aboutFaqs = [
    {
      question: "Who founded NovalSquad and what is their background?",
      answer: "NovalSquad was founded by Pragathi V, who brings over 10 years of experience in cybersecurity, IT operations, and business transformation. As Founder & CEO, Pragathi leads the company with deep expertise in GDPR compliance, having worked with global enterprises to build secure, scalable outsourcing solutions. Her hands-on experience in IT infrastructure and operations ensures NovalSquad delivers enterprise-grade services."
    },
    {
      question: "What expertise does the NovalSquad team have?",
      answer: "The NovalSquad team comprises experts across four key areas: Cybersecurity (with focus on GDPR compliance and data protection), Business Operations (process optimization and service delivery), IT Infrastructure (cloud services and system architecture), and Software Development (custom solutions and AI integration). Our multidisciplinary team has collectively served clients across 10+ industries globally."
    },
    {
      question: "What are NovalSquad's core values?",
      answer: "NovalSquad operates on four core values: Excellence (delivering exceptional quality in every engagement), Partnership (building long-term collaborative relationships), Innovation (embracing cutting-edge technologies and methodologies), and Security (maintaining the highest standards of data protection and GDPR compliance). These values guide every decision and interaction with our clients."
    },
    {
      question: "How does NovalSquad ensure quality in its services?",
      answer: "We ensure quality through multiple layers: rigorous talent screening and training, continuous performance monitoring with custom SLAs, regular quality audits and compliance checks, client feedback integration, and investment in the latest technologies and tools. Our 10+ years of experience has refined our quality assurance processes to deliver consistently exceptional results."
    },
    {
      question: "What makes NovalSquad's leadership different from other outsourcing companies?",
      answer: "Unlike traditional outsourcing companies, NovalSquad's leadership combines technical depth with business acumen. Our founder's background in cybersecurity and IT operations means we understand both the technical challenges and business requirements our clients face. This dual expertise allows us to provide strategic guidance, not just execute tasks. We're not just service providers—we're true partners in your business growth."
    },
    {
      question: "Where is NovalSquad located and do you serve global clients?",
      answer: "NovalSquad (NOVAL TECHNOLOGIES PRIVATE LIMITED, CIN: U78300KA2025PTC210177) is based in Bangalore, Karnataka, India. We serve clients globally with 24/7 operations across multiple time zones. Our multilingual teams support clients in North America, Europe, Asia, and beyond, with GDPR-compliant operations ensuring data protection for international clients."
    }
  ];

  // Generate structured data for About page
  const founderSchema = generatePersonSchema({
    name: "Pragathi V",
    jobTitle: "Founder & CEO",
    url: "https://www.linkedin.com/in/pragathi-v-693869378/",
    sameAs: ["https://www.linkedin.com/in/pragathi-v-693869378/"],
    description: "Experienced leader with over a decade in cybersecurity, IT operations, and business transformation. Leading NovalSquad to deliver GDPR-compliant outsourcing solutions."
  });

  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <SEOHead
        title="About Us - Leadership & Expertise | NovalSquad Outsourcing"
        description="Meet the experienced team behind NovalSquad. 10+ years of expertise in cybersecurity, operations, IT infrastructure, and business transformation. Learn about our mission and values."
        keywords="about novalsquad, leadership team, cybersecurity experts, IT operations, business transformation, outsourcing expertise, GDPR compliance, Pragathi V"
        url="https://novalsquad.com/about"
        structuredData={[organizationSchema, founderSchema]}
        breadcrumbs={[
          { name: "Home", url: "https://novalsquad.com" },
          { name: "About Us", url: "https://novalsquad.com/about" }
        ]}
        faqData={aboutFaqs}
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
              <div className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 px-4 py-2 rounded-full mb-6">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-semibold">{t('about.hero.badge')}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
                <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  {t('about.hero.title')}
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                {t('about.hero.subtitle')}
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 text-gray-700">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-indigo-600" />
                  <span className="font-medium">{t('about.hero.features.0')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">{t('about.hero.features.1')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-cyan-500" />
                  <span className="font-medium">{t('about.hero.features.2')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Expertise Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('about.team.title')}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t('about.team.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {expertise.map((item, index) => (
                <Card 
                  key={index} 
                  className="text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 hover:-translate-y-2"
                >
                  <CardContent className="pt-8">
                    <div className={`w-16 h-16 rounded-full ${item.bgColor} flex items-center justify-center mx-auto mb-4`}>
                      <item.icon className={`h-8 w-8 ${item.color}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200">
              <CardContent className="p-8">
                <div className="text-center">
                  <Wrench className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    {t('about.team.transformation.title')}
                  </h3>
                  <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                    {t('about.team.transformation.description')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-white/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('about.values.title')}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t('about.values.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {values.map((value, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-2">{value.title}</CardTitle>
                        <CardDescription className="text-base">{value.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-12 md:py-16 bg-white/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-800">
                  {t('about.founder.title')}
                </h2>
                <p className="text-base text-gray-600">
                  {t('about.founder.subtitle')}
                </p>
              </div>

              <div className="bg-white/60 rounded-lg border border-gray-200 p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-100 flex items-center justify-center">
                      <Users className="h-10 w-10 md:h-12 md:w-12 text-gray-600" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <div>
                        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">
                          Pragathi V
                        </h3>
                        <p className="text-sm text-gray-600">Founder & CEO</p>
                      </div>
                      <a 
                        href="https://www.linkedin.com/in/pragathi-v-693869378/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 transition-colors mt-2 md:mt-0 inline-flex items-center text-sm"
                      >
                        <Linkedin className="h-4 w-4 mr-1" />
                        Connect on LinkedIn
                      </a>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed text-sm mb-4">
                      {t('about.founder.description')}
                    </p>
                    
                    <div className="space-y-2">
                      {[
                        t('about.founder.achievements.0'),
                        t('about.founder.achievements.1'),
                        t('about.founder.achievements.2')
                      ].map((achievement, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - AEO Optimization */}
        <FAQSection 
          faqs={aboutFaqs}
          title="About NovalSquad - Common Questions"
          subtitle="Learn more about our team, expertise, values, and commitment to excellence"
          className="bg-gradient-to-br from-indigo-50 to-blue-50"
        />

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('about.cta.title')}
              </h2>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                {t('about.cta.subtitle')}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  onClick={() => navigate('/contact')}
                  size="lg"
                  variant="secondary"
                  className="font-semibold px-8 py-6 h-auto hover:scale-105 transition-all duration-300"
                >
                  {t('about.cta.button')}
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

export default About;

