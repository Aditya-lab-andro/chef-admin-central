import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Dashboard } from "@/components/Dashboard";
import { ProviderManagement } from "@/components/ProviderManagement";
import { MenuManagement } from "@/components/MenuManagement";
import { MenuBuilder } from "@/components/MenuBuilder";
import { ProviderDetails } from "@/components/ProviderDetails";
import { ReviewManagement } from "@/components/ReviewManagement";
import { OrderManagement } from "@/components/OrderManagement";
import { ServiceZones } from "@/components/ServiceZones";
import { AssignmentDashboard } from "@/components/AssignmentDashboard";
import { RequestManagementDashboard } from "@/components/RequestManagementDashboard";
import { OrderAssignmentSystem } from '@/components/OrderAssignmentSystem';
import { KitchenManagement } from '@/components/KitchenManagement';
import { LocationZoneManagement } from '@/components/LocationZoneManagement';
import { SubscriptionPlans } from '@/components/SubscriptionPlans';
import { PromoCodeManagement } from '@/components/PromoCodeManagement';
import { TransactionManagement } from '@/components/TransactionManagement';
import UserManagement from './components/UserManagement';
import Analytics from './components/Analytics';
import UserCreditTracker from './components/UserCreditTracker';
import ReferralManagement from './components/ReferralManagement';
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
                <ProviderManagement />
              </Layout>
            } />
            <Route path="/menu" element={
              <Layout>
                <MenuManagement />
              </Layout>
            } />
            <Route path="/calendar" element={
              <Layout>
                <MenuBuilder />
              </Layout>
            } />
            <Route path="/users" element={
              <Layout>
                <UserManagement />
              </Layout>
            } />
            <Route path="/requests" element={
              <Layout>
                <RequestManagementDashboard />
              </Layout>
            } />
            <Route path="/credits" element={
              <Layout>
                <UserCreditTracker />
              </Layout>
            } />
            <Route path="/provider-details" element={
              <Layout>
                <ProviderDetails />
              </Layout>
            } />
            <Route path="/reviews" element={
              <Layout>
                <ReviewManagement />
              </Layout>
            } />
            <Route path="/analytics" element={
              <Layout>
                <Analytics />
              </Layout>
            } />
            <Route path="/order-assignment" element={
              <Layout>
                <OrderAssignmentSystem />
              </Layout>
            } />
            <Route path="/kitchen-management" element={
              <Layout>
                <KitchenManagement />
              </Layout>
            } />
            <Route path="/location-zones" element={
              <Layout>
                <LocationZoneManagement />
              </Layout>
            } />
            <Route path="/subscriptions" element={
              <Layout>
                <SubscriptionPlans />
              </Layout>
            } />
            <Route path="/promo-codes" element={
              <Layout>
                <PromoCodeManagement />
              </Layout>
            } />
            <Route path="/transactions" element={
              <Layout>
                <TransactionManagement />
              </Layout>
            } />
            <Route path="/referrals" element={
              <Layout>
                <ReferralManagement />
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