import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GameTopUp from "./pages/GameTopUp";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";
import {
  MessageCircle,
  ClipboardCheck,
  HelpCircle,
  FileText,
  Shield,
} from "lucide-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/topup/:gameId" element={<GameTopUp />} />
          <Route
            path="/how-to-topup"
            element={
              <PlaceholderPage
                title="Cara Top Up"
                description="Panduan lengkap cara melakukan top up di Snowy Store"
                iconComponent={HelpCircle}
              />
            }
          />
          <Route
            path="/transaction-status"
            element={
              <PlaceholderPage
                title="Status Transaksi"
                description="Cek status transaksi top up Anda"
                iconComponent={ClipboardCheck}
              />
            }
          />
          <Route
            path="/contact"
            element={
              <PlaceholderPage
                title="Hubungi Kami"
                description="Butuh bantuan? Tim support kami siap membantu 24/7"
                iconComponent={MessageCircle}
              />
            }
          />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
