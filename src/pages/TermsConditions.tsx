import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, Users, Clock, Building, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const TermsConditions = () => {
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
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-3xl text-primary">Terms and Conditions</CardTitle>
                <p className="text-muted-foreground">Last updated: July 28, 2025</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            
            <section className="bg-muted/30 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 text-primary mr-2" />
                1. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using NovalSquad Outsourcing's website and services, you accept and agree to be bound 
                by these terms and conditions. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="bg-muted/30 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Building className="h-5 w-5 text-primary mr-2" />
                2. Service Description
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                NovalSquad Outsourcing provides comprehensive business process outsourcing services including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Back office operations and administrative support</li>
                <li>Customer service and technical support</li>
                <li>IT services and digital transformation</li>
                <li>Virtual staffing and remote team management</li>
                <li>Accounting and financial services</li>
                <li>Data processing and analysis</li>
              </ul>
            </section>

            <section className="bg-muted/30 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Users className="h-5 w-5 text-primary mr-2" />
                3. Service Agreement
              </h2>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  <strong>3.1 Service Delivery:</strong> We commit to delivering services according to agreed-upon 
                  service level agreements (SLAs) and quality standards.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>3.2 Data Protection:</strong> All client data is handled in accordance with GDPR and 
                  European data protection regulations.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>3.3 Confidentiality:</strong> We maintain strict confidentiality of all client information 
                  and business processes.
                </p>
              </div>
            </section>

            <section className="bg-muted/30 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Clock className="h-5 w-5 text-primary mr-2" />
                4. Payment and Billing
              </h2>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  <strong>4.1 Payment Terms:</strong> Payment is due within 30 days of invoice date unless otherwise 
                  specified in the service agreement.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>4.2 Pricing:</strong> Service pricing is transparent with no hidden fees. All costs are 
                  clearly outlined in service proposals.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>4.3 Currency:</strong> All prices are quoted in EUR unless otherwise specified.
                </p>
              </div>
            </section>

            <section className="bg-muted/30 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">5. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All intellectual property developed during the course of our services remains the property of 
                NovalSquad Outsourcing unless explicitly transferred in writing. Client data and proprietary 
                information remain the property of the client.
              </p>
            </section>

            <section className="bg-muted/30 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">6. Limitation of Liability</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  <strong>6.1 Service Limitations:</strong> Our liability is limited to the amount paid for the 
                  specific service in question.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>6.2 Force Majeure:</strong> We are not liable for delays or failures due to circumstances 
                  beyond our reasonable control.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>6.3 Indirect Damages:</strong> We are not liable for indirect, incidental, or consequential 
                  damages arising from our services.
                </p>
              </div>
            </section>

            <section className="bg-muted/30 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">7. Termination</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  <strong>7.1 Notice Period:</strong> Either party may terminate services with 30 days written notice.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>7.2 Immediate Termination:</strong> Services may be terminated immediately for breach of 
                  these terms or non-payment.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>7.3 Data Return:</strong> Upon termination, we will return all client data and materials 
                  within 14 days.
                </p>
              </div>
            </section>

            <section className="bg-muted/30 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">8. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of the 
                European Union and the jurisdiction in which NovalSquad Outsourcing operates. Any disputes 
                will be resolved through mediation or arbitration as specified in the service agreement.
              </p>
            </section>

            <section className="bg-muted/30 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">9. Contact Information</h2>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  <strong>Email:</strong> legal@novalsquad.com
                </p>
                <p className="text-muted-foreground">
                  <strong>Response Time:</strong> We will respond to legal inquiries within 48 hours.
                </p>
                <p className="text-muted-foreground">
                  <strong>Updates:</strong> These terms may be updated periodically. Continued use of our services 
                  constitutes acceptance of updated terms.
                </p>
              </div>
            </section>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsConditions;