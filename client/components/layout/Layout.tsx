import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col relative bg-background">
      <Header />
      <main className="flex-grow relative z-10">{children}</main>

      {/* Footer with Divider */}
      <div className="relative">
        {/* Wavy Divider */}
        <div className="bg-gradient-to-t from-gray-900 to-transparent h-20 absolute bottom-full w-full" />
        <Footer />
      </div>
    </div>
  );
}
