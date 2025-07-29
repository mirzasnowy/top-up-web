import Header from "./Header";
import Footer from "./Footer";
import SnowEffect from "@/components/effects/SnowEffect";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-premium-gradient relative">
      <SnowEffect />
      <Header />
      <main className="flex-1 relative">{children}</main>
      <Footer />
    </div>
  );
}
