import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Dashboard } from "@/components/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="dark">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <Layout>
                <Dashboard />
              </Layout>
            } />
            <Route path="/providers" element={
              <Layout>
                <div className="text-center text-2xl text-muted-foreground py-12">
                  Provider Management - Coming Soon
                </div>
              </Layout>
            } />
            <Route path="/menu" element={
              <Layout>
                <div className="text-center text-2xl text-muted-foreground py-12">
                  Menu Builder - Coming Soon
                </div>
              </Layout>
            } />
            <Route path="/calendar" element={
              <Layout>
                <div className="text-center text-2xl text-muted-foreground py-12">
                  Meal Calendar - Coming Soon
                </div>
              </Layout>
            } />
            <Route path="/orders" element={
              <Layout>
                <div className="text-center text-2xl text-muted-foreground py-12">
                  Orders Management - Coming Soon
                </div>
              </Layout>
            } />
            <Route path="/users" element={
              <Layout>
                <div className="text-center text-2xl text-muted-foreground py-12">
                  User Management - Coming Soon
                </div>
              </Layout>
            } />
            <Route path="/zones" element={
              <Layout>
                <div className="text-center text-2xl text-muted-foreground py-12">
                  Service Zones - Coming Soon
                </div>
              </Layout>
            } />
            <Route path="/analytics" element={
              <Layout>
                <div className="text-center text-2xl text-muted-foreground py-12">
                  Analytics Dashboard - Coming Soon
                </div>
              </Layout>
            } />
            <Route path="/settings" element={
              <Layout>
                <div className="text-center text-2xl text-muted-foreground py-12">
                  Settings - Coming Soon
                </div>
              </Layout>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
