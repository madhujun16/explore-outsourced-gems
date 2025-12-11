import { useState, useEffect } from "react";
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
import { generateServiceSchema, generateOrganizationSchema } from "@/lib/structuredData";
import { useGeolocationPricing } from "@/hooks/useGeolocationPricing";
import { 
  Shield,
  BarChart3,
  FileCheck,
  Users,
  Wallet,
  Bot,
  ArrowRight,
  CheckCircle,
  X,
  Building2,
  Calculator,
  HardHat,
  LineChart,
  Lock,
  ClipboardList,
  Zap,
  TrendingUp,
  Clock,
  Sparkles,
  Play,
  ChevronRight,
  Star,
  FileText,
  AlertTriangle,
  IndianRupee,
  PieChart,
  ListTodo,
  FolderOpen,
  UserCheck,
  Bell
} from "lucide-react";

const VendorManagement = () => {
  const navigate = useNavigate();
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Geolocation-based pricing
  const { location, pricing, isLoading: isPricingLoading, formatPrice } = useGeolocationPricing();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            const type = entry.target.getAttribute('data-type');
            if (type === 'step') {
              setVisibleSteps(prev => new Set([...prev, index]));
            } else {
              setVisibleCards(prev => new Set([...prev, index]));
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.feature-card, .step-card').forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: BarChart3,
      title: "Executive Dashboard",
      description: "Real-time KPIs showing Total Vendors, Avg Performance Score, Compliance Rate & Pending Payments. 6-month performance trends, vendor category distribution, top performers & critical alerts.",
      gradient: "from-indigo-500 to-blue-600",
      glowColor: "indigo"
    },
    {
      icon: Users,
      title: "Vendor Management",
      description: "Complete vendor directory with advanced filters by Category, Cuisine, Location & Status. Track HSEQ scores, performance ratings, KYC status & manage vendor relationships.",
      gradient: "from-blue-500 to-cyan-600",
      glowColor: "blue"
    },
    {
      icon: LineChart,
      title: "Analytics & Insights",
      description: "Comprehensive analytics with Avg HSEQ, Compliance %, Complaints tracking & Total Spend. Performance trends, radar charts for metrics, spend by category & compliance status.",
      gradient: "from-purple-500 to-indigo-600",
      glowColor: "purple"
    },
    {
      icon: FolderOpen,
      title: "Document Management",
      description: "Centralised document repository for contracts, certifications & policies. Track document validity, last-reviewed dates & ownership with quick search & filters.",
      gradient: "from-cyan-500 to-blue-600",
      glowColor: "cyan"
    },
    {
      icon: Wallet,
      title: "Finance & Payments",
      description: "Track Pending Approvals, Ready to Pay, Paid This Month & Overdue amounts. Monthly spend trends, spend by category analysis, invoice management & PO tracking.",
      gradient: "from-green-500 to-teal-600",
      glowColor: "green"
    },
    {
      icon: ListTodo,
      title: "Task Management",
      description: "Kanban-style task board with To Do, In Progress & Completed columns. Assign tasks to vendors, set priorities, due dates & track completion rates.",
      gradient: "from-orange-500 to-amber-600",
      glowColor: "orange"
    },
    {
      icon: UserCheck,
      title: "Client Management",
      description: "Manage client relationships, track client-vendor mappings, monitor service delivery and maintain client communication history.",
      gradient: "from-indigo-500 to-purple-600",
      glowColor: "indigo"
    },
    {
      icon: Shield,
      title: "Compliance Manager",
      description: "Monitor Compliance Rate, Valid Certificates, Expiring & Expired docs. Track FSSAI, Fire Safety, Insurance certificates with automated reminders & status badges.",
      gradient: "from-rose-500 to-red-600",
      glowColor: "rose"
    }
  ];

  const oldWay = [
    "Vendor data scattered across 5+ systems",
    "No unified view of HSEQ or performance scores",
    "Missed certificate renewals & FSSAI expirations",
    "Manual payment tracking in spreadsheets",
    "Zero visibility into compliance status"
  ];

  const newWay = [
    "Single dashboard for all vendor data",
    "Real-time HSEQ scores & performance ratings",
    "Automated alerts for expiring certificates",
    "Integrated finance with spend analytics",
    "56%+ compliance tracking at a glance"
  ];

  const steps = [
    {
      number: "01",
      title: "Configure",
      subtitle: "Categories & Roles",
      description: "Set up vendor categories (Food, Service, Equipment), cuisines, locations & team access roles.",
      icon: Shield
    },
    {
      number: "02",
      title: "Import",
      subtitle: "Vendor Data",
      description: "Bulk import via Excel or add vendors with complete profiles - contacts, GSTIN, banking & certificates.",
      icon: FileText
    },
    {
      number: "03",
      title: "Track",
      subtitle: "Performance & Compliance",
      description: "Monitor HSEQ scores, compliance rates, pending payments & certificate expiries in real-time.",
      icon: BarChart3
    },
    {
      number: "04",
      title: "Manage",
      subtitle: "Tasks & Actions",
      description: "Create tasks, send reminders, track corrective actions & maintain vendor relationships.",
      icon: TrendingUp
    }
  ];

  const userCards = [
    {
      icon: Users,
      title: "Procurement & Ops",
      description: "View all vendors, filter by category & cuisine, track HSEQ scores and performance ratings.",
      stat: "11+ vendors managed"
    },
    {
      icon: Calculator,
      title: "Finance Teams",
      description: "Track pending approvals, overdue payments (₹1.81L), spend trends & invoice management.",
      stat: "₹12.5L spend visibility"
    },
    {
      icon: HardHat,
      title: "HSEQ & Compliance",
      description: "Monitor 56% compliance rate, track expired certificates, send reminders & manage audits.",
      stat: "5 valid certificates"
    },
    {
      icon: Building2,
      title: "Leadership",
      description: "Executive dashboards with performance trends, compliance rates & critical alerts overview.",
      stat: "8.2 avg performance"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: formatPrice(pricing.starter),
      originalPrice: formatPrice(pricing.starterOriginal),
      priceLabel: "/month",
      description: "For teams managing up to 100 vendors",
      features: [
        "Vendor master directory",
        "Basic compliance tracking",
        "3 user roles",
        "Email support",
        "Standard reports"
      ]
    },
    {
      name: "Growth",
      price: formatPrice(pricing.growth),
      originalPrice: formatPrice(pricing.growthOriginal),
      priceLabel: "/month",
      description: "For scaling operations across locations",
      features: [
        "Unlimited vendors",
        "Full HSEQ module",
        "Finance & payments",
        "Task management",
        "Advanced analytics",
        "Priority support"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: pricing.enterprise,
      originalPrice: null,
      priceLabel: "",
      description: "For organizations with strict governance",
      features: [
        "Custom workflows",
        "SSO integration",
        "Dedicated success manager",
        "ERP integrations",
        "Custom SLAs",
        "On-premise option"
      ]
    }
  ];

  // Generate structured data
  const organizationSchema = generateOrganizationSchema();
  const vmServiceSchema = generateServiceSchema({
    name: "VMtool - Vendor Management Platform",
    description: "Centralise all your vendors, documents, compliance, payments, and performance into one clean dashboard with role-based access for Ops, Finance, HSEQ, and Compliance teams.",
    url: "https://novalsquad.com/vendor-management",
    provider: "NovalSquad",
    areaServed: "Worldwide"
  });

  const vmFaqs = [
    {
      question: "What is VMtool and how does it help with vendor management?",
      answer: "VMtool is NovalSquad's vendor management platform that centralises all vendor data, documents, compliance tracking, payments, and performance metrics into one dashboard. It provides role-based access for different teams including Ops, Finance, HSEQ, and Compliance, ensuring each team sees only what they need."
    },
    {
      question: "What modules are available in VMtool?",
      answer: "VMtool includes Dashboard, Vendors, Analytics, Documents, Finance, Tasks, Clients, and Compliance modules. Each module is designed for specific team needs - from vendor onboarding to payment tracking to certificate management."
    },
    {
      question: "Can VMtool track document expiries and compliance?",
      answer: "Yes, VMtool provides comprehensive compliance tracking including FSSAI, Fire Safety, Insurance, and other certificates. It shows compliance rates, valid certificates count, expiring documents, and expired items with automated reminders."
    },
    {
      question: "How does the Finance module work?",
      answer: "The Finance module tracks Pending Approvals, Ready to Pay amounts, Paid This Month, Overdue payments, and Active POs. It includes monthly spend trends, spend by category analysis, and complete invoice management."
    }
  ];

  return (
    <>
      <SEOHead
        title="VMtool - Vendor Management Platform | NovalSquad"
        description="Centralise your vendors, documents, compliance, payments, and performance into one clean dashboard. Role-based access for Ops, Finance, HSEQ, and Compliance teams. Built by NovalSquad."
        keywords="vendor management, vendor compliance, HSEQ tracking, vendor onboarding, compliance management, vendor dashboard, procurement software, vendor risk management, VMtool, NovalSquad"
        url="https://novalsquad.com/vendor-management"
        structuredData={[organizationSchema, vmServiceSchema]}
        breadcrumbs={[
          { name: "Home", url: "https://novalsquad.com" },
          { name: "Vendor Management", url: "https://novalsquad.com/vendor-management" }
        ]}
        faqData={vmFaqs}
      />
      
      <SkipNavigation />
      <ScrollProgress />
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 text-gray-900 overflow-hidden">
        {/* Enhanced Navigation */}
        <EnhancedNavigation 
          onContactClick={() => navigate('/contact')}
        />

        {/* SECTION 1 - HERO */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50">
          {/* Animated gradient orbs */}
          <div 
            className="absolute w-[600px] h-[600px] rounded-full opacity-30 blur-[120px] transition-all duration-1000 ease-out"
            style={{
              background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
              left: `${mousePosition.x * 0.02}px`,
              top: `${mousePosition.y * 0.02}px`,
            }}
          />
          <div 
            className="absolute w-[500px] h-[500px] rounded-full opacity-30 blur-[100px] transition-all duration-1000 ease-out"
            style={{
              background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
              right: `${mousePosition.x * 0.01}px`,
              bottom: `${mousePosition.y * 0.01}px`,
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Left content */}
              <div className="space-y-6">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-indigo-200 backdrop-blur-sm shadow-sm">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm text-gray-600">NovalSquad Product</span>
                  <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-[10px] font-bold uppercase tracking-wider text-white">
                    VMtool
                  </span>
                </div>

                {/* Main headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                  <span className="text-gray-900">Vendor Management</span>
                  <br />
                  <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    Done the Right Way
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                  One intelligent platform to manage vendors, track HSEQ scores, 
                  monitor compliance, handle payments & give every team the visibility they need.
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-3">
                  {['Dashboard', 'Vendors', 'Analytics', 'Finance', 'Tasks', 'Compliance'].map((feature, i) => (
                    <span 
                      key={i}
                      className="px-4 py-2 rounded-full bg-white/80 border border-indigo-100 text-sm text-gray-700 backdrop-blur-sm hover:bg-indigo-50 hover:border-indigo-200 transition-colors cursor-default shadow-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button 
                    onClick={() => window.open('https://vendor.novalsquad.com/signup', '_blank')}
                    size="lg"
                    className="group relative px-8 py-6 h-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 hover:scale-105"
                  >
                    Sign Up Free
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    onClick={() => navigate('/contact')}
                    size="lg"
                    className="group relative px-8 py-6 h-auto bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-105"
                  >
                    <Play className="w-5 h-5 mr-2 fill-current" />
                    Book Live Demo
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                    size="lg"
                    variant="outline"
                    className="px-8 py-6 h-auto border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 rounded-xl"
                  >
                    Explore Platform
                  </Button>
                  <Button 
                    onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                    size="lg"
                    variant="ghost"
                    className="px-6 py-6 h-auto text-indigo-600 hover:bg-indigo-50 rounded-xl"
                  >
                    View Pricing
                  </Button>
                </div>

                {/* Social proof */}
                <div className="flex items-center gap-6 pt-6 border-t border-indigo-100">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 border-2 border-white flex items-center justify-center text-xs font-medium text-white shadow-md">
                        {['NS', 'VM', 'OP', 'FN'][i]}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-900 font-medium">Trusted by operations teams</p>
                    <p className="text-gray-500">Powering NovalSquad projects daily</p>
                  </div>
                </div>
              </div>

              {/* Right - Dashboard Preview */}
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl" />
                
                {/* Dashboard card */}
                <div className="relative bg-white/90 backdrop-blur-xl border border-indigo-100 rounded-3xl p-6 shadow-2xl shadow-indigo-500/10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                        <BarChart3 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Welcome back! 👋</p>
                        <p className="text-xs text-gray-500">Here's your vendor ecosystem</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs text-green-700 font-medium">Live</span>
                    </div>
                  </div>

                  {/* Stats grid - matching actual tool */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-4 border border-indigo-100 hover:border-indigo-200 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-indigo-600" />
                        <p className="text-[11px] uppercase tracking-wider text-gray-500">Total Vendors</p>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">141</p>
                      <p className="text-xs mt-1 text-green-600">114 Active</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-100 hover:border-blue-200 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <p className="text-[11px] uppercase tracking-wider text-gray-500">Avg Performance</p>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">8/10</p>
                      <p className="text-xs mt-1 text-green-600">+0.2 from last month</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-4 border border-green-100 hover:border-green-200 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-green-600" />
                        <p className="text-[11px] uppercase tracking-wider text-gray-500">Compliance Rate</p>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">87.5%</p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                        <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '87.5%' }}></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-100 hover:border-amber-200 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <IndianRupee className="w-4 h-4 text-amber-600" />
                        <p className="text-[11px] uppercase tracking-wider text-gray-500">Pending Payments</p>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">₹60.6L</p>
                      <p className="text-xs mt-1 text-amber-600">3 invoices pending</p>
                    </div>
                  </div>

                  {/* Performance Trend Chart */}
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Performance Trends</p>
                        <p className="text-xs text-gray-500">Last 6 months vendor performance</p>
                      </div>
                      <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">Monthly</span>
                    </div>
                    <div className="h-20 flex items-end justify-between gap-1 relative">
                      {/* Y-axis labels */}
                      <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[9px] text-gray-400 -ml-6">
                        <span>100</span>
                        <span>75</span>
                        <span>50</span>
                      </div>
                      {/* Chart bars */}
                      {[85, 85, 87, 88, 87, 90].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div 
                            className="w-full rounded-t bg-gradient-to-t from-indigo-500 to-blue-400 transition-all duration-500 hover:from-indigo-600 hover:to-blue-500"
                            style={{ height: `${h}%` }}
                          />
                          <span className="text-[9px] text-gray-500">
                            {['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'][i]}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                        <span className="text-[10px] text-gray-500">Avg Score</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                        <span className="text-[10px] text-gray-500">SLA %</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom row - Critical Alerts & Top Performers */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-rose-50 rounded-2xl p-3 border border-rose-100">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-medium text-gray-900">Critical Alerts</p>
                        <Badge className="bg-rose-100 text-rose-700 border-rose-200 text-[10px]">1</Badge>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-rose-100">
                        <AlertTriangle className="w-3 h-3 text-rose-500" />
                        <span className="text-[10px] text-rose-700">FSSAI Certificate Expiring</span>
                      </div>
                    </div>
                    <div className="bg-indigo-50 rounded-2xl p-3 border border-indigo-100">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-medium text-gray-900">Top Performer</p>
                        <span className="text-xs text-indigo-600">View All</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] text-indigo-600 font-bold">1</div>
                        <div>
                          <p className="text-[11px] text-gray-900">Royal Kitchen Catering</p>
                          <p className="text-[10px] text-green-600">Score: 8.9</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <span className="text-xs text-gray-500">Scroll to explore</span>
            <ChevronRight className="w-5 h-5 text-gray-400 rotate-90" />
          </div>
        </section>

        {/* SECTION 2 - PROBLEM → SOLUTION */}
        <section className="relative py-12 lg:py-16 bg-white">
          <div className="relative z-10 max-w-6xl mx-auto px-6">
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-rose-100 text-rose-700 border-rose-200 px-4 py-1.5">
                The Problem
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Why Teams Are Still Stuck in
                <br />
                <span className="text-gray-400">Spreadsheets & Email</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Most organisations manage vendors through scattered systems. 
                That makes it nearly impossible to track HSEQ scores, ensure compliance, 
                or identify top performers.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Old Way */}
              <div className="relative group">
                <Card className="border-2 border-rose-200 bg-rose-50/50 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center">
                        <X className="w-6 h-6 text-rose-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-rose-900">The Old Way</CardTitle>
                        <p className="text-sm text-gray-500">Manual & Error-Prone</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {oldWay.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-700">
                          <X className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* New Way */}
              <div className="relative group">
                <Card className="border-2 border-green-200 bg-green-50/50 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-green-900">With VMtool</CardTitle>
                        <p className="text-sm text-gray-500">Automated & Intelligent</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {newWay.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 - FEATURES */}
        <section id="features" className="relative py-12 lg:py-16 bg-gradient-to-br from-indigo-50 to-blue-50" tabIndex={-1}>
          {/* Gradient orbs */}
          <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-indigo-300/30 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-blue-300/30 rounded-full blur-[150px]" />

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-indigo-100 text-indigo-700 border-indigo-200 px-4 py-1.5">
                Platform Modules
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                8 Powerful Modules for
                <br />
                <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  Complete Vendor Control
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                From dashboard to compliance - every module designed for real operational needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  data-index={index}
                  className={`feature-card group relative transition-all duration-700 ${
                    visibleCards.has(index) 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Card className="h-full bg-white/80 backdrop-blur-xl border-2 border-white hover:border-indigo-200 transition-all duration-300 hover:shadow-xl group-hover:shadow-indigo-500/10">
                    <CardHeader className="pb-3">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>

                      {/* Content */}
                      <CardTitle className="text-lg text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4 - HOW IT WORKS */}
        <section className="relative py-12 lg:py-16 bg-white overflow-hidden">
          <div className="relative z-10 max-w-6xl mx-auto px-6">
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200 px-4 py-1.5">
                How It Works
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                From Chaos to Clarity
                <br />
                <span className="text-gray-400">in 4 Simple Steps</span>
              </h2>
            </div>

            <div className="relative">
              {/* Connection line */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-200 to-transparent -translate-y-1/2" />

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    data-index={index}
                    data-type="step"
                    className={`step-card relative transition-all duration-700 ${
                      visibleSteps.has(index) 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-12'
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <Card className="h-full bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-100 hover:border-indigo-300 transition-all duration-300 hover:shadow-xl group">
                      <CardHeader>
                        {/* Step number */}
                        <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-lg font-bold text-white shadow-lg shadow-indigo-500/30">
                          {step.number}
                        </div>

                        {/* Icon */}
                        <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <step.icon className="w-7 h-7 text-indigo-600" />
                        </div>

                        {/* Content */}
                        <CardTitle className="text-xl text-gray-900 mb-1">{step.title}</CardTitle>
                        <p className="text-sm text-indigo-600 mb-3">{step.subtitle}</p>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-gray-600">{step.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5 - WHO USES THIS */}
        <section className="relative py-12 lg:py-16 bg-gradient-to-br from-indigo-50 to-blue-50">
          <div className="relative z-10 max-w-6xl mx-auto px-6">
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-cyan-100 text-cyan-700 border-cyan-200 px-4 py-1.5">
                Built For Teams
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Every Team Gets Their
                <br />
                <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                  Perfect View
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {userCards.map((card, index) => (
                <Card key={index} className="text-center bg-white/80 backdrop-blur-xl border-2 border-white hover:border-indigo-200 transition-all duration-300 hover:shadow-xl group">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <card.icon className="w-8 h-8 text-indigo-600" />
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{card.description}</p>
                    
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-xs text-indigo-600 font-medium">{card.stat}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6 - PRICING */}
        <section id="pricing" className="relative py-12 lg:py-16 bg-white scroll-mt-20">
          <div className="relative z-10 max-w-6xl mx-auto px-6">
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-indigo-100 text-indigo-700 border-indigo-200 px-4 py-1.5">
                Pricing
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Simple, Transparent
                <br />
                <span className="text-gray-400">Pricing for Every Scale</span>
              </h2>
              {/* Location indicator */}
              {location && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 text-sm text-green-700">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Prices shown in {location.currency} for {location.country}
                </div>
              )}
              {isPricingLoading && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-sm text-gray-500">
                  <span className="w-4 h-4 border-2 border-gray-300 border-t-indigo-500 rounded-full animate-spin"></span>
                  Detecting your location...
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <div key={index} className="relative group">
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full text-xs font-bold text-white shadow-lg z-10">
                      Most Popular
                    </div>
                  )}
                  
                  <Card className={`h-full ${
                    plan.popular 
                      ? 'border-2 border-indigo-500 shadow-xl shadow-indigo-500/10' 
                      : 'border-2 border-gray-100 hover:border-indigo-200'
                  } transition-all duration-300`}>
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-2xl text-gray-900">{plan.name}</CardTitle>
                      <CardDescription className="text-gray-500 mt-2">
                        {plan.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center mb-8">
                        {isPricingLoading ? (
                          <div className="h-10 w-32 mx-auto bg-gray-200 rounded animate-pulse"></div>
                        ) : (
                          <div className="space-y-1">
                            {plan.originalPrice && (
                              <div className="text-lg text-gray-400 line-through">
                                {plan.originalPrice}
                              </div>
                            )}
                            <div>
                              <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                              {plan.priceLabel && (
                                <span className="text-lg text-gray-500">{plan.priceLabel}</span>
                              )}
                            </div>
                            {plan.originalPrice && (
                              <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                                Save {Math.round((1 - (parseFloat(plan.price.replace(/[^0-9.]/g, '')) / parseFloat(plan.originalPrice.replace(/[^0-9.]/g, '')))) * 100)}%
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>

                      <ul className="space-y-4 mb-8">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                            <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <Button 
                        onClick={() => navigate('/contact')}
                        className={`w-full py-6 h-auto rounded-xl font-semibold ${
                          plan.popular 
                            ? 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg shadow-indigo-500/25' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                        } transition-all duration-300`}
                      >
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            <p className="text-center text-gray-500 mt-8">
              Not sure which plan fits?{' '}
              <button 
                onClick={() => navigate('/contact')}
                className="text-indigo-600 hover:text-indigo-700 transition-colors font-medium"
              >
                Talk to our team →
              </button>
            </p>
          </div>
        </section>

        {/* SECTION 7 - FINAL CTA */}
        <section className="relative py-12 lg:py-16 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.3)'%3e%3cpath d='m0 .5h32m-32 32v-32'/%3e%3c/svg%3e")`
            }} />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
              <Zap className="w-4 h-4 text-yellow-300" />
              <span className="text-sm text-white/90">Ready to transform your operations?</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Get Your Vendor Ecosystem
              <br />
              Under Control
            </h2>

            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Whether you're managing 11 vendors or 1,100, VMtool brings everything 
              into one intelligent dashboard with real-time HSEQ scores, compliance tracking & analytics.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button 
                onClick={() => window.open('https://vendor.novalsquad.com/signup', '_blank')}
                size="lg"
                className="group px-10 py-7 h-auto bg-gradient-to-r from-green-400 to-emerald-500 text-white hover:from-green-500 hover:to-emerald-600 font-bold text-lg rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Sign Up Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                onClick={() => navigate('/contact')}
                size="lg"
                className="group px-10 py-7 h-auto bg-white text-indigo-600 hover:bg-gray-100 font-bold text-lg rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Play className="w-5 h-5 mr-2 fill-current" />
                Book a Demo
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                onClick={() => navigate('/contact')}
                size="lg"
                variant="outline"
                className="px-10 py-7 h-auto border-2 border-white/30 text-white hover:bg-white/10 font-semibold text-lg rounded-2xl backdrop-blur-sm bg-transparent"
              >
                Request Sandbox
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { icon: Shield, label: 'HSEQ Tracking' },
                { icon: Clock, label: 'Quick Setup' },
                { icon: Star, label: '8.2 Avg Performance' },
                { icon: TrendingUp, label: '87.5% Compliance' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-white/70">
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </div>
              ))}
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

export default VendorManagement;
