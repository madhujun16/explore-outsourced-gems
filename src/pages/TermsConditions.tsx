import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
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
        
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Terms and Conditions</CardTitle>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using NovalSquad's website and services, you accept and agree to be bound 
                by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Use License</h2>
              <p className="text-muted-foreground">
                Permission is granted to temporarily download one copy of the materials on NovalSquad's 
                website for personal, non-commercial transitory viewing only.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Service Description</h2>
              <p className="text-muted-foreground">
                NovalSquad provides digital transformation, software development, and technology consulting 
                services. We reserve the right to modify or discontinue any service at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. User Responsibilities</h2>
              <p className="text-muted-foreground">
                Users are responsible for maintaining the confidentiality of their account information 
                and for all activities that occur under their account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                In no event shall NovalSquad be liable for any damages arising from the use or 
                inability to use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Governing Law</h2>
              <p className="text-muted-foreground">
                These terms and conditions are governed by and construed in accordance with the laws 
                of the jurisdiction in which NovalSquad operates.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Contact Information</h2>
              <p className="text-muted-foreground">
                For questions about these Terms and Conditions, please contact us at legal@novalsquad.com
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsConditions;