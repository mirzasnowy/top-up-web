import { Link } from 'react-router-dom';
import { Snowflake, Mail, MessageCircle, Shield, FileText } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-snowy-50 to-background border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-snowy-gradient">
                <Snowflake className="h-6 w-6 text-snowy-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-snowy-600 to-ice-500 bg-clip-text text-transparent">
                  Snowy Store
                </h3>
                <p className="text-sm text-muted-foreground">
                  Top Up Cepat, Harga Hemat
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Platform top up game terpercaya dengan harga terbaik dan proses yang cepat. 
              Nikmati pengalaman bermain game tanpa batas bersama Snowy Store.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Link Cepat</h4>
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/how-to-topup" 
                className="text-sm text-muted-foreground hover:text-snowy-600 transition-colors"
              >
                Cara Top Up
              </Link>
              <Link 
                to="/transaction-status" 
                className="text-sm text-muted-foreground hover:text-snowy-600 transition-colors"
              >
                Cek Status Transaksi
              </Link>
              <Link 
                to="/contact" 
                className="text-sm text-muted-foreground hover:text-snowy-600 transition-colors"
              >
                Hubungi Kami
              </Link>
              <Link 
                to="/faq" 
                className="text-sm text-muted-foreground hover:text-snowy-600 transition-colors"
              >
                FAQ
              </Link>
            </nav>
          </div>

          {/* Contact & Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Dukungan</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-snowy-500" />
                <span>support@snowystore.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MessageCircle className="h-4 w-4 text-snowy-500" />
                <span>WhatsApp: +62 812-3456-7890</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span className="text-xs">Jam Operasional: 24/7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Snowy Store. Semua hak dilindungi.
            </p>
            <div className="flex items-center space-x-6">
              <Link 
                to="/terms" 
                className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-snowy-600 transition-colors"
              >
                <FileText className="h-4 w-4" />
                <span>Syarat & Ketentuan</span>
              </Link>
              <Link 
                to="/privacy" 
                className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-snowy-600 transition-colors"
              >
                <Shield className="h-4 w-4" />
                <span>Kebijakan Privasi</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
