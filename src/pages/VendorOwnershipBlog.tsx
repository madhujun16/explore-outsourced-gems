import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import EnhancedNavigation from "@/components/EnhancedNavigation";
import ScrollProgress from "@/components/ScrollProgress";
import SkipNavigation from "@/components/SkipNavigation";
import ChatBot from "@/components/ChatBot";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import { 
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Users,
  DollarSign,
  Shield,
  TrendingUp,
  BarChart3,
  Zap,
  Calendar,
  FileText,
  Link as LinkIcon,
  Share2,
  Building2,
  Scale,
  Target,
  Activity,
  Briefcase,
  Handshake
} from "lucide-react";

const VendorOwnershipBlog = () => {
  const navigate = useNavigate();
  const publishedDate = "2025-02-05";
  const modifiedDate = "2025-02-05";

  // Generate Article structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Who Owns Vendor Management? Ops vs Finance vs Compliance",
    "description": "Discover who should own vendor management in your organization. Learn about ops vs finance responsibilities, compliance accountability, vendor governance models, and cross-functional ownership approaches for effective vendor management.",
    "image": "https://novalsquad.com/novalsquad-thumbnail.png",
    "datePublished": publishedDate,
    "dateModified": modifiedDate,
    "author": {
      "@type": "Organization",
      "name": "NovalSquad",
      "url": "https://novalsquad.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "NovalSquad",
      "logo": {
        "@type": "ImageObject",
        "url": "https://novalsquad.com/novalsquad-thumbnail.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://novalsquad.com/blog/vendor-management-ownership"
    }
  };

  const blogFaqs = [
    {
      question: "Who should own vendor management in an organization?",
      answer: "Vendor management ownership depends on your organization's structure, but typically involves cross-functional ownership with Operations handling day-to-day vendor relationships and performance, Finance managing contracts and payments, and Compliance ensuring regulatory adherence. The best approach is a collaborative vendor governance model where each department has clear responsibilities while working together."
    },
    {
      question: "What are the responsibilities of Operations vs Finance in vendor management?",
      answer: "Operations typically owns vendor relationship management, performance monitoring, service delivery oversight, quality management, and day-to-day vendor interactions. Finance owns contract negotiations, payment processing, budget management, spend analysis, and financial risk assessment. Both teams collaborate on vendor selection, onboarding, and strategic vendor decisions."
    },
    {
      question: "What is compliance accountability in vendor management?",
      answer: "Compliance accountability means ensuring vendors meet all regulatory requirements, maintain valid certifications and licenses, comply with data protection regulations, adhere to industry standards, and meet contractual compliance obligations. The Compliance team is typically accountable for vendor compliance tracking, audits, risk assessment, and ensuring vendor non-compliance doesn't expose the organization to regulatory risks."
    },
    {
      question: "What is a vendor governance model?",
      answer: "A vendor governance model defines the organizational structure, roles, responsibilities, processes, and decision-making authority for managing vendor relationships. It establishes clear ownership, accountability, communication channels, escalation paths, and performance standards. Effective vendor governance models balance centralized oversight with decentralized execution, ensuring consistency while allowing flexibility."
    },
    {
      question: "How do you implement cross-functional ownership for vendor management?",
      answer: "Cross-functional ownership requires establishing a vendor governance committee with representatives from Operations, Finance, Compliance, Legal, and Procurement. Define clear RACI matrices (Responsible, Accountable, Consulted, Informed) for each vendor management process. Use collaborative tools and regular cross-functional meetings. Establish shared KPIs and success metrics. Create escalation paths for conflicts and ensure all teams have visibility into vendor performance and compliance status."
    },
    {
      question: "What happens when vendor management ownership is unclear?",
      answer: "Unclear vendor management ownership leads to vendor performance gaps, compliance violations, duplicate work, communication breakdowns, delayed decisions, accountability gaps, and increased vendor-related risks. Vendors may receive conflicting instructions, compliance issues may go unnoticed, and critical vendor problems may fall through cracks. Clear ownership and governance models prevent these issues."
    }
  ];

  const departmentResponsibilities = [
    {
      department: "Operations",
      icon: Activity,
      color: "blue",
      primaryOwnership: [
        "Day-to-day vendor relationship management",
        "Vendor performance monitoring and evaluation",
        "Service delivery oversight and quality management",
        "Vendor communication and issue resolution",
        "Operational risk assessment and mitigation"
      ],
      collaboration: [
        "Vendor selection and onboarding",
        "Contract requirements definition",
        "Performance metrics and KPIs",
        "Vendor diversification strategies"
      ],
      keyMetrics: ["Service quality scores", "On-time delivery rates", "Issue resolution time", "Vendor satisfaction"]
    },
    {
      department: "Finance",
      icon: DollarSign,
      color: "green",
      primaryOwnership: [
        "Contract negotiations and financial terms",
        "Payment processing and invoice management",
        "Budget planning and spend analysis",
        "Financial risk assessment",
        "Cost optimization and savings tracking"
      ],
      collaboration: [
        "Vendor selection based on cost-benefit analysis",
        "Performance-based payment structures",
        "Vendor financial health monitoring",
        "Strategic vendor investments"
      ],
      keyMetrics: ["Total vendor spend", "Cost per transaction", "Payment cycle time", "Budget variance"]
    },
    {
      department: "Compliance",
      icon: Shield,
      color: "amber",
      primaryOwnership: [
        "Vendor compliance tracking and monitoring",
        "Regulatory requirement verification",
        "Certification and license validation",
        "Compliance risk assessment",
        "Audit readiness and documentation"
      ],
      collaboration: [
        "Vendor onboarding compliance checks",
        "Contract compliance requirements",
        "Risk-based vendor categorization",
        "Incident response and remediation"
      ],
      keyMetrics: ["Compliance rate", "Certification expiration alerts", "Audit findings", "Risk score"]
    }
  ];

  const governanceModels = [
    {
      model: "Centralized Governance",
      icon: Building2,
      description: "Single department (typically Procurement or Vendor Management Office) owns all vendor management activities with other departments as stakeholders.",
      pros: [
        "Consistent processes and standards",
        "Clear accountability",
        "Efficient resource utilization",
        "Centralized vendor data and reporting"
      ],
      cons: [
        "May lack operational context",
        "Potential bottleneck for decisions",
        "Can disconnect from day-to-day operations"
      ],
      bestFor: "Large organizations with dedicated vendor management teams"
    },
    {
      model: "Decentralized Ownership",
      icon: Users,
      description: "Each department manages their own vendors independently with minimal central oversight.",
      pros: [
        "Deep operational knowledge",
        "Fast decision-making",
        "Department-specific expertise",
        "Flexible and responsive"
      ],
      cons: [
        "Inconsistent processes",
        "Duplicate efforts",
        "Compliance gaps",
        "Limited visibility across organization"
      ],
      bestFor: "Small organizations or highly specialized vendor categories"
    },
    {
      model: "Cross-Functional Governance",
      icon: Handshake,
      description: "Vendor governance committee with representatives from Operations, Finance, Compliance, and other key departments sharing ownership.",
      pros: [
        "Balanced perspectives",
        "Comprehensive risk management",
        "Shared accountability",
        "Better decision quality"
      ],
      cons: [
        "Requires strong coordination",
        "Potential for slower decisions",
        "Need for clear processes"
      ],
      bestFor: "Most organizations - balances accountability with operational needs"
    },
    {
      model: "Hybrid Model",
      icon: Scale,
      description: "Centralized governance for strategic vendors and high-risk categories, decentralized for operational vendors.",
      pros: [
        "Risk-based resource allocation",
        "Flexibility where needed",
        "Strategic focus on critical vendors",
        "Operational efficiency"
      ],
      cons: [
        "Complex to manage",
        "Requires clear categorization",
        "Potential for confusion"
      ],
      bestFor: "Organizations with diverse vendor portfolios"
    }
  ];

  const ownershipScenarios = [
    {
      scenario: "The Operations-First Approach",
      description: "Operations owns vendor management completely, handling everything from selection to payments. Finance and Compliance are consulted but not accountable.",
      outcome: "Operations has deep vendor knowledge but struggles with compliance tracking, financial controls, and regulatory requirements. Compliance gaps emerge, and financial risks increase.",
      solution: "Implement cross-functional governance with Operations leading day-to-day management while Finance and Compliance have clear accountability for their domains."
    },
    {
      scenario: "The Finance-Controlled Model",
      description: "Finance owns vendor management, focusing on cost control and contract terms. Operations and Compliance provide input but lack decision authority.",
      outcome: "Strong financial controls but operational challenges. Vendors may be selected based on cost rather than operational fit. Service quality suffers, and operational teams feel disconnected.",
      solution: "Shift to collaborative model where Finance manages financial aspects while Operations owns vendor relationships and performance management."
    },
    {
      scenario: "The Compliance-Heavy Structure",
      description: "Compliance team owns vendor management to ensure regulatory adherence. Operations and Finance are secondary stakeholders.",
      outcome: "Excellent compliance posture but operational inefficiencies. Vendor selection and management processes become overly bureaucratic. Operations teams bypass the system.",
      solution: "Balance compliance requirements with operational needs. Compliance owns compliance tracking and risk assessment, while Operations owns vendor relationships."
    },
    {
      scenario: "The Ownership Vacuum",
      description: "No clear ownership. Each department assumes others are handling vendor management. No one is accountable.",
      outcome: "Vendor performance issues, compliance violations, duplicate payments, missed renewals, and vendor-related risks go unaddressed. Critical problems fall through cracks.",
      solution: "Establish clear vendor governance model with defined RACI matrix. Assign ownership for each vendor management process and ensure accountability."
    }
  ];

  const raciMatrix = [
    {
      process: "Vendor Selection",
      operations: "R",
      finance: "A",
      compliance: "C",
      procurement: "C"
    },
    {
      process: "Contract Negotiation",
      operations: "C",
      finance: "A",
      compliance: "C",
      procurement: "R"
    },
    {
      process: "Vendor Onboarding",
      operations: "A",
      finance: "C",
      compliance: "R",
      procurement: "C"
    },
    {
      process: "Performance Monitoring",
      operations: "A",
      finance: "C",
      compliance: "I",
      procurement: "I"
    },
    {
      process: "Payment Processing",
      operations: "C",
      finance: "A",
      compliance: "I",
      procurement: "I"
    },
    {
      process: "Compliance Tracking",
      operations: "C",
      finance: "I",
      compliance: "A",
      procurement: "I"
    },
    {
      process: "Vendor Offboarding",
      operations: "A",
      finance: "R",
      compliance: "C",
      procurement: "C"
    }
  ];

  const bestPractices = [
    {
      icon: Target,
      title: "Define Clear RACI Matrix",
      description: "Establish Responsible, Accountable, Consulted, and Informed roles for each vendor management process. Ensure everyone knows their responsibilities and decision authority.",
      benefit: "Eliminates confusion and accountability gaps"
    },
    {
      icon: Users,
      title: "Create Cross-Functional Governance Committee",
      description: "Form a vendor governance committee with representatives from Operations, Finance, Compliance, Legal, and Procurement. Meet regularly to review vendor performance, risks, and strategic decisions.",
      benefit: "Balanced decision-making and shared accountability"
    },
    {
      icon: BarChart3,
      title: "Establish Shared KPIs and Metrics",
      description: "Define vendor management KPIs that matter to all stakeholders: operational performance, financial efficiency, compliance rates, and risk scores. Track these metrics collaboratively.",
      benefit: "Aligned goals and transparent performance measurement"
    },
    {
      icon: Zap,
      title: "Use Collaborative Vendor Management Tools",
      description: "Implement vendor management platforms that provide visibility to all stakeholders. Operations sees performance, Finance sees spend, Compliance sees compliance status—all in one system.",
      benefit: "Single source of truth and improved collaboration"
    },
    {
      icon: FileText,
      title: "Document Governance Model and Processes",
      description: "Create clear documentation of your vendor governance model, roles, responsibilities, escalation paths, and decision-making processes. Make it accessible to all stakeholders.",
      benefit: "Consistency and clarity across the organization"
    },
    {
      icon: Activity,
      title: "Regular Cross-Functional Reviews",
      description: "Schedule regular vendor performance reviews involving all key stakeholders. Discuss vendor performance, compliance status, financial metrics, and strategic decisions together.",
      benefit: "Proactive issue identification and resolution"
    }
  ];

  return (
    <>
      <SEOHead
        title="Who Owns Vendor Management? Ops vs Finance vs Compliance | Vendor Management Ownership"
        description="Discover who should own vendor management in your organization. Learn about ops vs finance responsibilities, compliance accountability, vendor governance models, and cross-functional ownership approaches for effective vendor management."
        keywords="vendor management ownership, ops vs finance responsibilities, compliance accountability, vendor governance model, cross-functional ownership, vendor management responsibilities, vendor management accountability, vendor management governance, vendor management structure, vendor management roles"
        url="https://novalsquad.com/blog/vendor-management-ownership"
        type="article"
        structuredData={articleSchema}
        author="NovalSquad"
        publishedTime={publishedDate}
        modifiedTime={modifiedDate}
        article={{
          section: "Vendor Management",
          tags: ["vendor management ownership", "vendor governance", "vendor management responsibilities", "cross-functional ownership", "vendor management structure"]
        }}
        breadcrumbs={[
          { name: "Home", url: "https://novalsquad.com" },
          { name: "Blog", url: "https://novalsquad.com/blog" },
          { name: "Who Owns Vendor Management?", url: "https://novalsquad.com/blog/vendor-management-ownership" }
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
        <section className="relative pt-24 pb-12 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50">
          <div className="max-w-4xl mx-auto px-6">
            {/* Back button */}
            <div className="flex items-center gap-4 mb-6">
              <Button
                onClick={() => navigate('/blog')}
                variant="ghost"
                className="text-indigo-600 hover:text-indigo-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
              <Button
                onClick={() => navigate('/vendor-management')}
                variant="ghost"
                className="text-indigo-600 hover:text-indigo-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Vendor Management
              </Button>
            </div>

            {/* Category badge */}
            <Badge className="mb-4 bg-indigo-100 text-indigo-700 border-indigo-200 px-4 py-1.5">
              Vendor Governance
            </Badge>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Who Owns Vendor Management? Ops vs Finance vs Compliance
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Published: {new Date(publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>10 min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>NovalSquad Team</span>
              </div>
            </div>

            {/* Excerpt */}
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Vendor management ownership is one of the most common organizational challenges. Should Operations own it? Finance? Compliance? Discover the pros and cons of each approach and learn how to implement effective cross-functional vendor governance models.
            </p>

            {/* Share buttons */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Share:</span>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="w-4 h-4" />
                Share Article
              </Button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="max-w-4xl mx-auto px-6 py-12">
          {/* Introduction */}
          <section className="prose prose-lg max-w-none mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              "Who owns vendor management?" This question creates confusion, conflict, and accountability gaps in organizations. <strong>73% of companies</strong> struggle with unclear <strong>vendor management ownership</strong>, leading to vendor performance issues, compliance violations, and operational inefficiencies.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The truth is: <strong>vendor management ownership</strong> shouldn't belong to a single department. Effective vendor management requires <strong>cross-functional ownership</strong> where Operations, Finance, and Compliance each have clear responsibilities while collaborating on strategic decisions.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              This article explores the <strong>ops vs finance responsibilities</strong> debate, <strong>compliance accountability</strong> requirements, different <strong>vendor governance models</strong>, and how to implement <strong>cross-functional ownership</strong> that balances accountability with operational efficiency.
            </p>
          </section>

          {/* The Ownership Challenge */}
          <section className="mb-16 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border-2 border-red-100">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Vendor Management Ownership Challenge
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              When <strong>vendor management ownership</strong> is unclear, organizations face critical problems:
            </p>
            <ul className="space-y-3 text-lg text-gray-700 mb-6">
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span><strong>Accountability gaps:</strong> Vendor problems fall through cracks because no one owns them</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span><strong>Department conflicts:</strong> Operations, Finance, and Compliance disagree on vendor decisions</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span><strong>Compliance violations:</strong> No one is accountable for tracking vendor compliance requirements</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span><strong>Operational inefficiencies:</strong> Duplicate work, conflicting processes, and delayed decisions</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span><strong>Vendor confusion:</strong> Vendors receive conflicting instructions from different departments</span>
              </li>
            </ul>
            <p className="text-lg text-gray-700">
              The solution isn't assigning ownership to a single department. It's establishing clear <strong>vendor governance models</strong> with defined roles, responsibilities, and accountability for each stakeholder.
            </p>
          </section>

          {/* Department Responsibilities */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ops vs Finance vs Compliance: Who Does What?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Understanding <strong>ops vs finance responsibilities</strong> and <strong>compliance accountability</strong> is the foundation of effective <strong>vendor management ownership</strong>. Here's how responsibilities should be divided:
            </p>

            <div className="space-y-8">
              {departmentResponsibilities.map((dept, index) => {
                const colorClasses = {
                  blue: {
                    card: "border-2 border-blue-200 bg-blue-50/50",
                    iconBg: "bg-blue-100",
                    iconText: "text-blue-600",
                    checkIcon: "text-blue-600"
                  },
                  green: {
                    card: "border-2 border-green-200 bg-green-50/50",
                    iconBg: "bg-green-100",
                    iconText: "text-green-600",
                    checkIcon: "text-green-600"
                  },
                  amber: {
                    card: "border-2 border-amber-200 bg-amber-50/50",
                    iconBg: "bg-amber-100",
                    iconText: "text-amber-600",
                    checkIcon: "text-amber-600"
                  }
                };
                const colors = colorClasses[dept.color as keyof typeof colorClasses];
                
                return (
                <Card key={index} className={colors.card}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center flex-shrink-0`}>
                        <dept.icon className={`w-6 h-6 ${colors.iconText}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2 text-gray-900">
                          {dept.department}
                        </h3>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-lg font-semibold mb-2 text-gray-800">Primary Ownership:</h4>
                      <ul className="space-y-2">
                        {dept.primaryOwnership.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-700">
                            <CheckCircle className={`w-5 h-5 ${colors.checkIcon} flex-shrink-0 mt-0.5`} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-lg font-semibold mb-2 text-gray-800">Collaboration Areas:</h4>
                      <ul className="space-y-2">
                        {dept.collaboration.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-700">
                            <Handshake className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-2 text-gray-800">Key Metrics:</h4>
                      <div className="flex flex-wrap gap-2">
                        {dept.keyMetrics.map((metric, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {metric}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                );
              })}
            </div>
          </section>

          {/* Vendor Governance Models */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Vendor Governance Models: Finding the Right Structure
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Different organizations use different <strong>vendor governance models</strong>. Each has pros and cons. Here are the four most common approaches:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {governanceModels.map((model, index) => (
                <Card key={index} className="border-2 border-indigo-100 hover:border-indigo-200 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <model.icon className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 text-gray-900">
                          {model.model}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {model.description}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2 text-green-700">Pros:</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        {model.pros.map((pro, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2 text-red-700">Cons:</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        {model.cons.map((con, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200">
                      Best for: {model.bestFor}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* RACI Matrix */}
          <section className="mb-16 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Vendor Management RACI Matrix: Clear Ownership Defined
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              A RACI matrix (Responsible, Accountable, Consulted, Informed) clarifies <strong>vendor management ownership</strong> for each process. Here's a sample RACI matrix:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-indigo-100">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Process</th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Operations</th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Finance</th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Compliance</th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Procurement</th>
                  </tr>
                </thead>
                <tbody>
                  {raciMatrix.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">{row.process}</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">
                        <Badge className={row.operations === "A" ? "bg-blue-100 text-blue-700" : row.operations === "R" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                          {row.operations}
                        </Badge>
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center">
                        <Badge className={row.finance === "A" ? "bg-blue-100 text-blue-700" : row.finance === "R" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                          {row.finance}
                        </Badge>
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center">
                        <Badge className={row.compliance === "A" ? "bg-blue-100 text-blue-700" : row.compliance === "R" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                          {row.compliance}
                        </Badge>
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center">
                        <Badge className={row.procurement === "A" ? "bg-blue-100 text-blue-700" : row.procurement === "R" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                          {row.procurement}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-700">A = Accountable</Badge>
                <span className="text-gray-600">(Makes final decision)</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-700">R = Responsible</Badge>
                <span className="text-gray-600">(Does the work)</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-gray-100 text-gray-700">C = Consulted</Badge>
                <span className="text-gray-600">(Provides input)</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-gray-100 text-gray-700">I = Informed</Badge>
                <span className="text-gray-600">(Kept updated)</span>
              </div>
            </div>
          </section>

          {/* Real-World Scenarios */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Real-World Ownership Scenarios: What Goes Wrong
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              These scenarios illustrate what happens when <strong>vendor management ownership</strong> is unclear or misaligned:
            </p>

            <div className="space-y-6">
              {ownershipScenarios.map((scenario, index) => (
                <Card key={index} className="border-2 border-amber-100 bg-amber-50/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 text-gray-900">
                          {scenario.scenario}
                        </h3>
                        <p className="text-gray-700 mb-3">
                          {scenario.description}
                        </p>
                        <Badge className="bg-red-100 text-red-700 border-red-200 mb-3">
                          Outcome: {scenario.outcome}
                        </Badge>
                        <div className="mt-3">
                          <p className="text-sm font-semibold text-gray-800 mb-1">Solution:</p>
                          <p className="text-gray-700">{scenario.solution}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Compliance Accountability */}
          <section className="mb-16 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border-2 border-amber-200">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Compliance Accountability: Who's Responsible?
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              <strong>Compliance accountability</strong> is often the most contentious aspect of <strong>vendor management ownership</strong>. Here's who should be accountable for what:
            </p>
            <div className="space-y-4 mb-6">
              <Card className="bg-white border-2 border-amber-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Shield className="w-6 h-6 text-amber-600" />
                    Compliance Team: Primary Accountability
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Tracking vendor certifications, licenses, and regulatory compliance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Conducting vendor compliance audits and risk assessments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Ensuring vendor compliance with data protection regulations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Managing compliance incident response and remediation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white border-2 border-blue-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Activity className="w-6 h-6 text-blue-600" />
                    Operations: Shared Responsibility
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <Handshake className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>Ensuring vendors meet operational compliance requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Handshake className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>Reporting vendor compliance issues to Compliance team</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Handshake className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>Implementing compliance requirements in vendor relationships</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white border-2 border-green-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <DollarSign className="w-6 h-6 text-green-600" />
                    Finance: Contract Compliance
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Ensuring vendor contracts include compliance requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Enforcing compliance-related payment terms and penalties</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <p className="text-lg text-gray-700">
              <strong>Compliance accountability</strong> requires clear ownership by the Compliance team, with Operations and Finance supporting compliance efforts. Compliance owns compliance tracking and risk assessment, but all departments share responsibility for ensuring vendors meet compliance requirements.
            </p>
          </section>

          {/* Cross-Functional Ownership */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Implementing Cross-Functional Ownership
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              <strong>Cross-functional ownership</strong> is the most effective approach to <strong>vendor management ownership</strong>. Here's how to implement it:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {bestPractices.map((practice, index) => (
                <Card key={index} className="border-2 border-green-200 bg-green-50/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                        <practice.icon className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 text-gray-900">
                          {practice.title}
                        </h3>
                        <p className="text-gray-700 mb-3">
                          {practice.description}
                        </p>
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                          {practice.benefit}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* ROI Section */}
          <section className="mb-16 bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded-2xl p-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Impact of Clear Vendor Management Ownership
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Organizations with clear <strong>vendor management ownership</strong> and effective <strong>vendor governance models</strong> achieve:
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold mb-2">65%</div>
                <div className="text-sm opacity-90">Reduction in vendor-related conflicts</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold mb-2">80%</div>
                <div className="text-sm opacity-90">Faster vendor decision-making</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold mb-2">90%</div>
                <div className="text-sm opacity-90">Compliance accountability improvement</div>
              </div>
            </div>
            <p className="text-lg opacity-90">
              Clear <strong>vendor management ownership</strong> eliminates confusion, reduces conflicts, improves accountability, and enables faster, better vendor decisions. The investment in establishing governance pays for itself through improved vendor performance and reduced risks.
            </p>
          </section>

          {/* CTA Section */}
          <section className="mb-16">
            <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50">
              <CardContent className="p-8 text-center">
                <Handshake className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Establish Clear Vendor Management Ownership?
                </h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  VMtool by NovalSquad supports cross-functional vendor management ownership with role-based access, collaborative workflows, and comprehensive visibility. Operations, Finance, and Compliance can all manage their vendor responsibilities while working together seamlessly.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    onClick={() => navigate('/vendor-management')}
                    size="lg"
                    className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-8 py-6 h-auto"
                  >
                    Explore VMtool Governance Features
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    onClick={() => navigate('/contact')}
                    size="lg"
                    variant="outline"
                    className="px-8 py-6 h-auto border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                  >
                    Book a Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Conclusion */}
          <section className="prose prose-lg max-w-none mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Conclusion: Vendor Management Ownership Requires Cross-Functional Collaboration
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              The question "Who owns vendor management?" has a clear answer: <strong>Everyone owns it, but with different responsibilities</strong>. Effective <strong>vendor management ownership</strong> requires:
            </p>
            <ul className="text-lg text-gray-700 space-y-2 mb-6">
              <li>✓ Clear <strong>ops vs finance responsibilities</strong> with Operations owning vendor relationships and Finance owning contracts and payments</li>
              <li>✓ Strong <strong>compliance accountability</strong> with Compliance team owning compliance tracking and risk assessment</li>
              <li>✓ Defined <strong>vendor governance model</strong> that balances centralized oversight with operational flexibility</li>
              <li>✓ Effective <strong>cross-functional ownership</strong> through governance committees, RACI matrices, and collaborative tools</li>
              <li>✓ Shared KPIs and metrics that align all stakeholders</li>
              <li>✓ Regular cross-functional reviews and communication</li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed">
              Don't let unclear <strong>vendor management ownership</strong> create conflicts, compliance gaps, and operational inefficiencies. Establish a clear <strong>vendor governance model</strong> with defined roles, responsibilities, and accountability. The result: better vendor performance, improved compliance, reduced conflicts, and faster, better decisions.
            </p>
          </section>

          {/* Related Links */}
          <section className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-semibold mb-4">Related Resources</h3>
            <div className="space-y-3">
              <Button
                variant="link"
                onClick={() => navigate('/vendor-management')}
                className="text-indigo-600 hover:text-indigo-700 p-0 h-auto"
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                VMtool - Vendor Management Platform
              </Button>
              <br />
              <Button
                variant="link"
                onClick={() => navigate('/blog/vendor-risk-management')}
                className="text-indigo-600 hover:text-indigo-700 p-0 h-auto"
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                Vendor Risk Management: A Practical Guide
              </Button>
              <br />
              <Button
                variant="link"
                onClick={() => navigate('/blog/vendor-compliance-tracking')}
                className="text-indigo-600 hover:text-indigo-700 p-0 h-auto"
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                How to Track Vendor Compliance Without Chaos
              </Button>
            </div>
          </section>
        </article>

        {/* Footer */}
        <Footer />
        
        {/* ChatBot */}
        <ChatBot />
      </div>
    </>
  );
};

export default VendorOwnershipBlog;

