import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorBoundary from "@/components/ErrorBoundary";
import { HelmetProvider } from "react-helmet-async";
import { NavigationProvider } from "@/contexts/NavigationContext";
import ScrollToTop from "@/components/ScrollToTop";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Contact = lazy(() => import("./pages/Contact"));
const AIServices = lazy(() => import("./pages/AIServices"));
const About = lazy(() => import("./pages/About"));
const DedicatedStaff = lazy(() => import("./pages/DedicatedStaff"));
const VendorManagement = lazy(() => import("./pages/VendorManagement"));
const VendorManagementBlog = lazy(() => import("./pages/VendorManagementBlog"));
const VendorComplianceTrackingBlog = lazy(() => import("./pages/VendorComplianceTrackingBlog"));
const VendorRiskManagementBlog = lazy(() => import("./pages/VendorRiskManagementBlog"));
const VendorLifecycleManagementBlog = lazy(() => import("./pages/VendorLifecycleManagementBlog"));
const VendorComplianceMistakesBlog = lazy(() => import("./pages/VendorComplianceMistakesBlog"));
const VendorOwnershipBlog = lazy(() => import("./pages/VendorOwnershipBlog"));
const VendorDataManagementBlog = lazy(() => import("./pages/VendorDataManagementBlog"));
const VendorAuditRequirementsBlog = lazy(() => import("./pages/VendorAuditRequirementsBlog"));
const Blog = lazy(() => import("./pages/Blog"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));

// Loading component for suspense fallback
const PageLoader = () => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center">
    <div className="space-y-4 w-full max-w-md p-6">
      <Skeleton className="h-8 w-3/4 mx-auto" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <NavigationProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/ai-services" element={<AIServices />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/dedicated-staff" element={<DedicatedStaff />} />
                  <Route path="/vendor-management" element={<VendorManagement />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/vendor-management-excel" element={<VendorManagementBlog />} />
                  <Route path="/blog/vendor-compliance-tracking" element={<VendorComplianceTrackingBlog />} />
                  <Route path="/blog/vendor-risk-management" element={<VendorRiskManagementBlog />} />
                  <Route path="/blog/vendor-lifecycle-management" element={<VendorLifecycleManagementBlog />} />
                  <Route path="/blog/vendor-compliance-mistakes" element={<VendorComplianceMistakesBlog />} />
                  <Route path="/blog/vendor-management-ownership" element={<VendorOwnershipBlog />} />
                  <Route path="/blog/vendor-data-management" element={<VendorDataManagementBlog />} />
                  <Route path="/blog/vendor-audit-requirements" element={<VendorAuditRequirementsBlog />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-conditions" element={<TermsConditions />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </NavigationProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </HelmetProvider>
);

export default App;
