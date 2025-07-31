import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import GenerateCertificate from "@/pages/generate-certificate";
import Dashboard from "@/pages/dashboard";
import Navigation from "@/components/navigation";
import LoadingModal from "@/components/loading-modal";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/generar" component={GenerateCertificate} />
      <Route path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="bg-slate-50 min-h-screen font-sans">
          <Navigation />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Router />
          </main>
          <LoadingModal isOpen={false} />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
