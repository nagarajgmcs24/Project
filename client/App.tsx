import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Home from "./pages/Home";
import CitizenLogin from "./pages/CitizenLogin";
import CouncillorLogin from "./pages/CouncillorLogin";
import Signup from "./pages/Signup";
import CitizenDashboard from "./pages/CitizenDashboard";
import CouncillorDashboard from "./pages/CouncillorDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/citizen-login" element={<CitizenLogin />} />
              <Route path="/councillor-login" element={<CouncillorLogin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/citizen-dashboard" element={<CitizenDashboard />} />
              <Route
                path="/councillor-dashboard"
                element={<CouncillorDashboard />}
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
