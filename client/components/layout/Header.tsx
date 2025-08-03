import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon, Laptop } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { setTheme } = useTheme();

  // Efek untuk mendeteksi scroll
  useEffect(() => {
    const handleScroll = () => {
      // Set state menjadi true jika scroll lebih dari 10px
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    // Membersihkan event listener saat komponen di-unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/how-to-topup", label: "Cara Top Up" },
    { href: "/transaction-status", label: "Status Transaksi" },
    { href: "/contact", label: "Kontak" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-purple-900/50 backdrop-blur-xl shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* ======================= PERUBAHAN UTAMA DI SINI ======================= */}
          {/* Kiri: Logo dan Brand (DINAMIS) */}
          {/* Kiri: Logo dan Brand + Tagline Subtil (DINAMIS) */}
<div className="flex-1 flex justify-start">
  <Link to="/" className="flex items-center space-x-3 group"> {/* Menambah space-x */}
    {/* Logo selalu tampil */}
    <img src="/logo.png" alt="Snowy Store Logo" className="h-10 w-auto sm:h-12" />
    
    {/* Konten yang muncul saat di-scroll */}
    <AnimatePresence>
  {isScrolled && (
    <motion.div
      className="overflow-hidden"
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -15 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {/* Wrapper untuk layout vertikal */}
      <div className="flex flex-col">
        {/* Baris 1: Nama Toko */}
        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent whitespace-nowrap leading-tight">
          Snowy Store
        </span>
        {/* Baris 2: Tagline Baru */}
        <span className="text-xs text-gray-300 whitespace-nowrap leading-tight">
          Top up cepat & Aman
        </span>
      </div>
    </motion.div>
  )}
</AnimatePresence>
  </Link>
</div>
          {/* ======================= AKHIR DARI PERUBAHAN ======================= */}

          {/* Tengah: Navigasi Desktop */}
          <nav className="hidden md:flex flex-1 justify-center items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-white/80 transition-colors hover:text-white relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Kanan: Tombol Menu Mobile & Theme Toggle */}
          <div className="flex-1 flex justify-end items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full hover:bg-white/10">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Laptop className="mr-2 h-4 w-4" />
                  <span>System</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="w-9 h-9 rounded-full hover:bg-white/10"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 text-white" />
                ) : (
                  <Menu className="h-5 w-5 text-white" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Navigasi Mobile */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-gray-900/80 backdrop-blur-lg rounded-b-lg"
            >
              <nav className="flex flex-col space-y-2 pt-4 pb-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-base font-medium text-white hover:text-purple-300 transition-colors px-3 py-2 rounded-md hover:bg-white/10"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}