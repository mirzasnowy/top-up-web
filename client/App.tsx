import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/layout/ScrollToTop";
import Index from "./pages/Index";
import GameTopUp from "./pages/GameTopUp";
import HowToTopUp from "./pages/HowToTopUp";
import TransactionStatus from "./pages/TransactionStatus";
import Contact from "./pages/Contact";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import { useEffect } from "react";
import {
  MessageCircle,
  ClipboardCheck,
  HelpCircle,
  FileText,
  Shield,
} from "lucide-react";
import { ThemeProvider } from "@/hooks/use-theme";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/topup/:gameId" element={<GameTopUp />} />
              <Route path="/how-to-topup" element={<HowToTopUp />} />
              <Route
                path="/transaction-status"
                element={<TransactionStatus />}
              />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/faq"
                element={
                  <PlaceholderPage
                    title="FAQ"
                    description="Pertanyaan yang sering diajukan tentang layanan kami"
                    iconComponent={HelpCircle}
                  />
                }
              />
              <Route
                path="/terms"
                element={
                  <PlaceholderPage
                    title="Syarat & Ketentuan"
                    description="Ketentuan penggunaan layanan Snowy Store"
                    iconComponent={FileText}
                  />
                }
              />
              <Route
                path="/privacy"
                element={
                  <PlaceholderPage
                    title="Kebijakan Privasi"
                    description="Kebijakan privasi dan perlindungan data pengguna"
                    iconComponent={Shield}
                  />
                }
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
