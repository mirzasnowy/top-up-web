import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu, X, Snowflake } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Header({ isDark, toggleTheme }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/how-to-topup', label: 'Cara Top Up' },
    { href: '/transaction-status', label: 'Status Transaksi' },
    { href: '/contact', label: 'Kontak' },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="p-2 rounded-lg bg-snowy-gradient"
            >
              <Snowflake className="h-6 w-6 text-snowy-600" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-snowy-600 to-ice-500 bg-clip-text text-transparent">
                Snowy Store
              </span>
              <span className="text-xs text-muted-foreground hidden sm:block">
                Top Up Cepat, Harga Hemat
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground/80 hover:text-snowy-600 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-snowy-500 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full hover:bg-snowy-100 dark:hover:bg-snowy-800"
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? (
                  <Sun className="h-4 w-4 text-snowy-600" />
                ) : (
                  <Moon className="h-4 w-4 text-snowy-600" />
                )}
              </motion.div>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="w-9 h-9 rounded-full md:hidden hover:bg-snowy-100 dark:hover:bg-snowy-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4 text-snowy-600" />
              ) : (
                <Menu className="h-4 w-4 text-snowy-600" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-border/40 py-4"
          >
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-medium text-foreground/60 hover:text-snowy-600 transition-colors px-2 py-1 rounded-md hover:bg-snowy-50 dark:hover:bg-snowy-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
