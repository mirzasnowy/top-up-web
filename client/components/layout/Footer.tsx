import { Link } from "react-router-dom";
import {
  Snowflake,
  Mail,
  MessageCircle,
  Send,
  Instagram,
  Facebook,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#212A3D] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="Snowy Store Logo" className="h-20 w-auto" />
              <div>
                <h3 className="text-lg font-bold text-white">Snowy Store</h3>
                <p className="text-sm text-gray-300">
                  Top Up Cepat, Harga Hemat
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-300 max-w-sm">
              Platform top up game terpercaya dengan harga terbaik dan proses
              yang cepat. Nikmati pengalaman bermain game tanpa batas.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Navigasi Cepat</h4>
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-sm text-gray-300 hover:text-snowy-400 transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                to="/how-to-topup"
                className="text-sm text-gray-300 hover:text-snowy-400 transition-colors font-medium"
              >
                Cara Top Up
              </Link>
              <Link
                to="/transaction-status"
                className="text-sm text-gray-300 hover:text-snowy-400 transition-colors font-medium"
              >
                Status Transaksi
              </Link>
              <Link
                to="/contact"
                className="text-sm text-gray-300 hover:text-snowy-400 transition-colors font-medium"
              >
                Kontak
              </Link>
            </nav>
          </div>

          {/* Contact Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Kontak Support</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-snowy-400" />
                <span className="text-sm text-gray-300 font-medium">
                  support@snowystore.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm text-gray-300 font-medium">
                  +62 812-3456-7890
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Send className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-gray-300 font-medium">
                  @SnowyStoreCS
                </span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Media Sosial</h4>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/snowystore"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:scale-110 transition-transform"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/snowystore"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-600 text-white rounded-lg hover:scale-110 transition-transform"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://tiktok.com/@snowystore"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-black text-white rounded-lg hover:scale-110 transition-transform"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
            <p className="text-xs text-gray-400">
              Follow untuk update promo terbaru!
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {currentYear} Snowy Store. Semua hak dilindungi.
            </p>
            <div className="flex items-center space-x-6">
              <Link
                to="/terms"
                className="text-sm text-gray-400 hover:text-snowy-400 transition-colors"
              >
                Syarat & Ketentuan
              </Link>
              <Link
                to="/privacy"
                className="text-sm text-gray-400 hover:text-snowy-400 transition-colors"
              >
                Kebijakan Privasi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
