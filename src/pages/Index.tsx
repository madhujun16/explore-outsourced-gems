import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
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
  CheckCircle
} from "lucide-react";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company_name: "",
    industry: "",
    message: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });
      
      setFormData({ 
        name: "", 
        email: "", 
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
      icon: Settings,
      title: "Back Office",
      description: "Efficient HR, admin, payroll, and compliance.",
      color: "text-blue-600",
      bgColor: "bg-blue-50 group-hover:bg-blue-100"
    },
    {
      icon: Headphones,
      title: "Support",
      description: "24/7 multilingual customer care for EU markets.",
      color: "text-green-600",
      bgColor: "bg-green-50 group-hover:bg-green-100"
    },
    {
      icon: Users,
      title: "Virtual Staff",
      description: "On-demand trained remote teams.",
      color: "text-purple-600",
      bgColor: "bg-purple-50 group-hover:bg-purple-100"
    },
    {
      icon: HardDrive,
      title: "IT Helpdesk",
      description: "Secure and scalable infrastructure support.",
      color: "text-orange-600",
      bgColor: "bg-orange-50 group-hover:bg-orange-100"
    },
    {
      icon: CheckCircle,
      title: "Virtual CISO",
      description: "Cybersecurity leadership and compliance management.",
      color: "text-red-600",
      bgColor: "bg-red-50 group-hover:bg-red-100"
    },
    {
      icon: Database,
      title: "Cloud Services",
      description: "Migration, management, and optimization solutions.",
      color: "text-teal-600",
      bgColor: "bg-teal-50 group-hover:bg-teal-100"
    }
  ];

  const digitalServices = [
    {
      icon: Code2,
      title: "Web Dev",
      description: "Landing pages, CMS, ecommerce, EU-hosted.",
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
            <div className="text-2xl font-bold text-primary">NovalSquad</div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Services</a>
              <a href="#digital" className="text-muted-foreground hover:text-primary transition-colors">Digital</a>
              <a href="#industries" className="text-muted-foreground hover:text-primary transition-colors">Industries</a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/90 via-primary to-primary/80 text-primary-foreground">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-in slide-in-from-bottom-4 duration-1000">
              Your Trusted European
              <span className="block text-accent">Outsourcing Partner</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/80 animate-in slide-in-from-bottom-4 duration-1000 delay-200">
              GDPR-compliant back office, IT, and support services built for European growth.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="animate-in slide-in-from-bottom-4 duration-1000 delay-400"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get a Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive business solutions designed for European companies
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
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

      {/* Digital Services Section */}
      <section id="digital" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Digital Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Modern digital solutions to accelerate your business growth
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

      {/* Industries Section */}
      <section id="industries" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Industries We Serve</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Specialized expertise across key European business sectors
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
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Connect</h2>
              <p className="text-xl text-muted-foreground">
                Ready to scale your business with trusted European outsourcing?
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Form */}
              <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className="h-12"
                    />
                    <Input
                      type="email"
                      placeholder="Your Email *"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="h-12"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Company Name (Optional)"
                      value={formData.company_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
                      className="h-12"
                    />
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select Industry (Optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="automotive">Automotive</SelectItem>
                        <SelectItem value="real-estate">Real Estate</SelectItem>
                        <SelectItem value="gaming">Gaming</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="logistics">Logistics</SelectItem>
                        <SelectItem value="entertainment">Entertainment</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Textarea
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="min-h-32"
                      required
                    />
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, consent: !!checked }))}
                    />
                    <label htmlFor="consent" className="text-sm text-muted-foreground leading-5">
                      I agree to the{" "}
                      <Link to="/privacy-policy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>{" "}
                      and{" "}
                      <Link to="/terms-conditions" className="text-primary hover:underline">
                        Terms & Conditions
                      </Link>
                    </label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full h-12"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Get in Touch with NovalSquad
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </Card>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Get in Touch with NovalSquad</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <Mail className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-muted-foreground">contact@novalsquad.com</p>
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
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-4">NovalSquad</div>
            <p className="text-muted-foreground mb-6">
              Your trusted European outsourcing partner for scalable business growth.
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
              © 2024 NovalSquad. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
