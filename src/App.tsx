import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorBoundary from "@/components/ErrorBoundary";
import RouterErrorBoundary from "@/components/RouterErrorBoundary";
import { HelmetProvider } from "react-helmet-async";
import { NavigationProvider } from "@/contexts/NavigationContext";
import ScrollToTop from "@/components/ScrollToTop";
import PageTransition from "@/components/PageTransition";

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

// Configure QueryClient with better error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: unknown) => {
        // Don't retry on 4xx errors (client errors)
        const err = error as { status?: number };
        if (err?.status && err.status >= 400 && err.status < 500) {
          return false;
        }
        // Retry up to 2 times for other errors
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      retry: (failureCount, error: unknown) => {
        // Don't retry mutations on 4xx errors
        const err = error as { status?: number };
        if (err?.status && err.status >= 400 && err.status < 500) {
          return false;
        }
        return failureCount < 1;
      }
    }
  },
  queryCache: undefined, // Will be set up if needed
  mutationCache: undefined, // Will be set up if needed
});

// Set up global error handlers
if (typeof window !== 'undefined') {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: `Unhandled rejection: ${event.reason?.toString() || 'Unknown error'}`,
        fatal: false
      });
    }
  });

  // Handle general errors
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: `Global error: ${event.error?.toString() || 'Unknown error'}`,
        fatal: false
      });
    }
  });
}

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
              <PageTransition>
                <Suspense fallback={<PageLoader />}>
                  <RouterErrorBoundary>
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
                  </RouterErrorBoundary>
                </Suspense>
              </PageTransition>
            </BrowserRouter>
          </NavigationProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </HelmetProvider>
);

export default App;
