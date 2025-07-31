import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col relative bg-background">
      <Header />
      <main className="flex-1 relative">{children}</main>
      <Footer />
    </div>
  );
}
