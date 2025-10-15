import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import NovalSquadLogo from "@/components/NovalSquadLogo";
import LottieBackground from "@/components/LottieBackground";
import SkipNavigation from "@/components/SkipNavigation";
import SEOHead from "@/components/SEOHead";
import ChatBot from "@/components/ChatBot";
import EnhancedNavigation from "@/components/EnhancedNavigation";
import ScrollProgress from "@/components/ScrollProgress";
import { useFormValidation } from "@/hooks/useFormValidation";
import { usePerformanceMonitoring, trackFormSubmission } from "@/hooks/usePerformanceMonitoring";
import Lottie from "lottie-react";
import rippleAnimation from "@/assets/ripple-animation.json";
import { 
  Mail,
  Globe,
  Clock,
  ArrowRight,
  CheckCircle,
  ArrowLeft,
  Sparkles
} from "lucide-react";
import { Helmet } from "react-helmet-async";

const Contact = () => {
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
      trackFormSubmission('contact_form', false);
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

  return (
    <>
      <Helmet>
        <title>Contact Us - Get Your Free Consultation | NovalSquad Outsourcing</title>
        <meta name="description" content="Contact NovalSquad for expert outsourcing solutions. Get your free consultation today. GDPR-compliant, 24/7 support, onboard in 3-5 days." />
        <meta name="keywords" content="contact outsourcing, business consultation, BPO contact, outsourcing inquiry, free consultation" />
        <link rel="canonical" href="https://novalsquad.com/contact" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:title" content="Contact NovalSquad - Free Consultation" />
        <meta property="og:description" content="Get in touch with NovalSquad for expert outsourcing solutions. Free consultation available." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novalsquad.com/contact" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact NovalSquad - Free Consultation" />
        <meta name="twitter:description" content="Get in touch with NovalSquad for expert outsourcing solutions." />
      </Helmet>
      
      <SkipNavigation />
      <ScrollProgress />
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
        {/* Enhanced Navigation */}
        <EnhancedNavigation 
          onContactClick={() => {
            // Navigate to contact page or scroll to form
            if (window.location.pathname !== '/contact') {
              window.location.href = '/contact';
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        />

        {/* Contact Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-50 py-8 md:py-12 border-b-2 border-indigo-200">
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
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-semibold">Free Consultation Available</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
                <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Outsource Smarter. Build Faster. Spend Less.
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-700 mb-4 leading-relaxed">
                From back-office to internal tools and digital solutions — NovalSquad helps you scale efficiently, securely, and affordably.
              </p>
              
              <p className="text-base md:text-lg text-gray-600 mb-8 whitespace-nowrap">
                Our team is here to answer your questions and discuss how we can support your business goals.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 text-gray-700">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-600" />
                  <span className="font-medium">24h Response Time</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">{t('contact.info.labels.multilingualSupport')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-cyan-500" />
                  <span className="font-medium">{t('contact.info.gdpr.title')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="main-content" className="py-6 md:py-8 relative overflow-hidden" tabIndex={-1}>
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
            <div className="max-w-5xl mx-auto">
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
                        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                          {t('contact.form.title') || 'Send Us a Message'}
                        </h2>
                        <p className="text-muted-foreground max-w-md mx-auto">
                          {t('contact.form.subtitle') || 'Fill out the form below and our team will get back to you within 24 hours'}
                        </p>
                      </div>
                      
                      {!showReview ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                          {/* Personal Information Section */}
                          <div className="space-y-4">
                            <div className="mb-4">
                              <h4 className="text-sm font-semibold text-primary uppercase tracking-wide">
                                {t('contact.form.sections.personalInfo') || 'Personal Information'}
                              </h4>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">
                                  {t('contact.form.fields.fullName') || 'Full Name'} *
                                </label>
                                <Input
                                  placeholder={t('contact.form.placeholders.fullName') || 'John Doe'}
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
                                <label className="text-sm font-medium text-muted-foreground">
                                  {t('contact.form.fields.email') || 'Email'} *
                                </label>
                                <Input
                                  type="email"
                                  placeholder={t('contact.form.placeholders.email') || 'john@company.com'}
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
                                <label className="text-sm font-medium text-muted-foreground">
                                  {t('contact.form.fields.phone') || 'Phone Number'}
                                </label>
                                <Input
                                  type="tel"
                                  placeholder={t('contact.form.placeholders.phone') || '+1 (555) 000-0000'}
                                  value={formData.phone}
                                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                  className="h-12 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">
                                  {t('contact.form.fields.company') || 'Company Name'}
                                </label>
                                <Input
                                  placeholder={t('contact.form.placeholders.company') || 'Your Company'}
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
                              <h4 className="text-sm font-semibold text-primary uppercase tracking-wide">
                                {t('contact.form.sections.projectDetails') || 'Project Details'}
                              </h4>
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-muted-foreground">
                                {t('contact.form.fields.industry') || 'Industry'}
                              </label>
                              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}>
                                <SelectTrigger className="h-12 transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                                  <SelectValue placeholder={t('contact.form.placeholders.industry') || 'Select your industry'} />
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
                              <label className="text-sm font-medium text-muted-foreground">
                                {t('contact.form.fields.projectDescription') || 'How can we help you?'} *
                              </label>
                              <Textarea
                                placeholder={t('contact.form.placeholders.projectDescription') || 'Tell us about your project, requirements, or questions...'}
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
                                {t('contact.form.helpText.projectDescription') || 'Please provide as much detail as possible to help us understand your needs'}
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
                                        {t('footer.links.privacy') || 'Privacy Policy'}
                                      </Link>
                                      {parts[1].split('Terms & Conditions')[0]}
                                      <Link to="/terms-conditions" className="text-primary hover:underline font-medium">
                                        {t('footer.links.terms') || 'Terms & Conditions'}
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
                                <span>{t('contact.form.buttons.processing') || 'Sending...'}</span>
                              </div>
                            ) : (
                              <span className="relative z-10 flex items-center justify-center">
                                <span>{t('contact.form.buttons.reviewSubmit') || 'Send Message'}</span>
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
                  <Card className="p-8 text-center border-2 border-green-200 bg-green-50/50">
                    <div className="space-y-6">
                      <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-in zoom-in-50">
                        <CheckCircle className="h-10 w-10 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-3xl mb-4 text-green-900">Thank You!</CardTitle>
                        <CardDescription className="text-lg text-gray-700">
                          Your message has been successfully submitted to our team. We'll get in touch with you soon.
                        </CardDescription>
                      </div>
                      <div className="space-y-3 bg-white p-6 rounded-lg">
                        <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                          <Clock className="h-5 w-5 text-primary" />
                          <p className="text-sm font-medium">
                            Expect a response within 24 hours
                          </p>
                        </div>
                        <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                          <Mail className="h-5 w-5 text-primary" />
                          <p className="text-sm font-medium">
                            Check your email for confirmation
                          </p>
                        </div>
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
                    <h3 className="text-2xl md:text-3xl font-semibold mb-6">{t('contact.info.title')}</h3>
                    <div className="space-y-6">
                      <Card className="p-6 border-2 hover:border-primary/50 transition-all">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <Mail className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-lg mb-1">{t('contact.info.labels.emailUs')}</p>
                            <p className="text-muted-foreground">{t('contact.info.email')}</p>
                            <p className="text-sm text-muted-foreground mt-1">{t('contact.info.labels.weReplyWithin')}</p>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className="p-6 border-2 hover:border-primary/50 transition-all">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <Globe className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-lg mb-1">{t('contact.info.labels.multilingualSupport')}</p>
                            <p className="text-muted-foreground">{t('contact.info.languages')}</p>
                            <p className="text-sm text-muted-foreground mt-1">{t('contact.info.labels.communicateInLanguage')}</p>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className="p-6 border-2 hover:border-primary/50 transition-all">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <Clock className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-lg mb-1">{t('contact.info.labels.quickResponse')}</p>
                            <p className="text-muted-foreground">{t('contact.info.responseTime')}</p>
                            <p className="text-sm text-muted-foreground mt-1">{t('contact.info.labels.fastReliableSupport')}</p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>

                  <Card className="bg-primary/5 border-2 border-primary/20 p-6">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-lg mb-2">{t('contact.info.gdpr.title')}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {t('contact.info.gdpr.longDescription')}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white/60 border-t py-8">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <NovalSquadLogo variant="dark" size="lg" />
              </div>
            <p className="text-muted-foreground mb-6">
              {t('footer.tagline')}
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-6 mb-4">
              <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                {t('footer.links.privacy')}
              </Link>
              <Link to="/terms-conditions" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                {t('footer.links.terms')}
              </Link>
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                {t('footer.links.home')}
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('footer.copyright')}
            </p>
            </div>
          </div>
        </footer>
        
        {/* ChatBot */}
        <ChatBot />
      </div>
    </>
  );
};

export default Contact;

