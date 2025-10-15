import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, Lock, Eye, Database, CheckCircle, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        
        <Card className="shadow-xl border-2 border-primary/10">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Lock className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-3xl text-primary">Privacy Policy</CardTitle>
                <p className="text-muted-foreground">Last updated: July 28, 2025</p>
                <div className="flex items-center mt-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm text-green-600 font-medium">GDPR Compliant</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            
            <section className="bg-muted/30 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Eye className="h-5 w-5 text-primary mr-2" />
                1. Information We Collect
              </h2>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  <strong>1.1 Personal Information:</strong> We collect information you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Name and contact information (email, phone)</li>
                  <li>Company name and industry</li>
                  <li>Project requirements and business needs</li>
                  <li>Communication preferences</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>1.2 Business Data:</strong> When providing outsourcing services, we may process:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Customer data and business processes</li>
                  <li>Financial and accounting information</li>
                  <li>Technical specifications and requirements</li>
                  <li>Performance metrics and service reports</li>
                </ul>
              </div>
            </section>

            <section className="bg-muted/30 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Database className="h-5 w-5 text-primary mr-2" />
                2. How We Use Your Information
              </h2>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  <strong>2.1 Service Delivery:</strong> We use your information to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Provide requested outsourcing services</li>
                  <li>Manage client relationships and communications</li>
                  <li>Ensure service quality and compliance</li>
                  <li>Process payments and billing</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>2.2 Business Operations:</strong> We may use aggregated, anonymized data for:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Service improvement and optimization</li>
                  <li>Industry analysis and trends</li>
                  <li>Compliance reporting and audits</li>
                </ul>
              </div>
            </section>

            <section className="bg-muted/30 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Globe className="h-5 w-5 text-primary mr-2" />
                3. Data Processing and Storage
              </h2>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  <strong>3.1 European Compliance:</strong> All data is processed in accordance with GDPR and 
                  European data protection regulations.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>3.2 Secure Storage:</strong> Data is stored on secure, encrypted servers located 
                  within the European Economic Area (EEA).
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>3.3 Data Retention:</strong> We retain personal data only as long as necessary for 
                  service delivery and legal compliance.
                </p>
              </div>
            </section>

            <section className="bg-muted/30 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Shield className="h-5 w-5 text-primary mr-2" />
                4. Data Security and Protection
              </h2>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  <strong>4.1 Security Measures:</strong> We implement comprehensive security measures including:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>End-to-end encryption for data transmission</li>
                  <li>Secure access controls and authentication</li>
                  <li>Regular security audits and monitoring</li>
                  <li>Employee training on data protection</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>4.2 Breach Notification:</strong> In the event of a data breach, we will notify 
                  affected parties and relevant authorities within 72 hours as required by GDPR.
                </p>
              </div>
            </section>

            <section className="bg-muted/30 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">5. Information Sharing</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  <strong>5.1 No Sale of Data:</strong> We do not sell, trade, or rent your personal information 
                  to third parties for marketing purposes.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>5.2 Service Providers:</strong> We may share data with trusted service providers who 
                  assist in delivering our services, subject to strict confidentiality agreements.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>5.3 Legal Requirements:</strong> We may disclose information when required by law or 
                  to protect our rights and safety.
                </p>
              </div>
            </section>

            <section className="bg-muted/30 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">6. Your Rights (GDPR)</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Under GDPR, you have the following rights:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
                  <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
                  <li><strong>Right to Portability:</strong> Receive your data in a structured format</li>
                  <li><strong>Right to Object:</strong> Object to processing of your data</li>
                  <li><strong>Right to Restriction:</strong> Limit how we process your data</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  To exercise these rights, contact us at privacy@novalsquad.com
                </p>
              </div>
            </section>

            <section className="bg-muted/30 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">7. Cookies and Tracking</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  <strong>7.1 Essential Cookies:</strong> We use necessary cookies for website functionality 
                  and security.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>7.2 Analytics:</strong> We use analytics cookies to improve our website and services. 
                  You can opt out of non-essential cookies.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>7.3 Third-Party Services:</strong> We may use third-party services for analytics 
                  and customer support, subject to their privacy policies.
                </p>
              </div>
            </section>

            <section className="bg-muted/30 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">8. International Transfers</h2>
              <p className="text-muted-foreground leading-relaxed">
                <strong>8.1 European Focus:</strong> Our primary operations are within the European Union, 
                ensuring GDPR compliance. Any international data transfers are conducted with appropriate 
                safeguards and legal protections.
              </p>
            </section>

            <section className="bg-muted/30 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">9. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our services are not intended for individuals under 18 years of age. We do not knowingly 
                collect personal information from children. If you believe we have collected such information, 
                please contact us immediately.
              </p>
            </section>

            <section className="bg-muted/30 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">10. Policy Updates</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  <strong>10.1 Updates:</strong> We may update this privacy policy periodically to reflect 
                  changes in our practices or legal requirements.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>10.2 Notification:</strong> Significant changes will be communicated via email or 
                  website notification.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>10.3 Continued Use:</strong> Continued use of our services after policy updates 
                  constitutes acceptance of the new terms.
                </p>
              </div>
            </section>

            <section className="bg-muted/30 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">11. Contact Information</h2>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  <strong>Data Protection Officer:</strong> privacy@novalsquad.com
                </p>
                <p className="text-muted-foreground">
                  <strong>Response Time:</strong> We will respond to privacy inquiries within 48 hours
                </p>
                <p className="text-muted-foreground">
                  <strong>Supervisory Authority:</strong> You have the right to lodge a complaint with your 
                  local data protection authority
                </p>
              </div>
            </section>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;