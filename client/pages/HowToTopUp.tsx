import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { HelpCircle, Zap, Shield, Star, CheckCircle } from "lucide-react";

export default function HowToTopUp() {
  const steps = [
    {
      title: "Pilih Game & Nominal",
      description: "Pilih game favoritmu dari daftar dan pilih nominal top-up yang kamu inginkan.",
      icon: Zap,
    },
    {
      title: "Masukkan ID Game",
      description: "Isi data akun game kamu, seperti User ID dan Server ID (jika diperlukan).",
      icon: Shield,
    },
    {
      title: "Pilih Metode Pembayaran",
      description: "Pilih metode pembayaran yang paling nyaman untukmu, kami mendukung banyak opsi.",
      icon: Star,
    },
    {
      title: "Selesaikan Pembayaran",
      description: "Lakukan pembayaran sesuai instruksi, dan diamond atau item akan langsung masuk ke akunmu!",
      icon: CheckCircle,
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <HelpCircle className="w-8 h-8 text-snowy-500" />
              <span className="text-sm font-semibold text-snowy-600 uppercase tracking-wide">
                Panduan
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Cara Top Up di Snowy Store
            </h1>
            <p className="text-lg text-muted-foreground">
              Hanya butuh beberapa langkah mudah untuk top up game favoritmu.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 h-full w-0.5 bg-snowy-200" />

              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-start mb-12 relative"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-snowy-400 to-ice-400 flex items-center justify-center text-white shadow-lg">
                      <step.icon className="w-8 h-8" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}