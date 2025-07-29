import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, Shield, Clock, Star } from "lucide-react";

export default function HeroSection() {
  const features = [
    {
      icon: Zap,
      title: "Proses Cepat",
      description: "Top up dalam hitungan detik",
    },
    {
      icon: Shield,
      title: "100% Aman",
      description: "Transaksi terjamin keamanannya",
    },
    {
      icon: Clock,
      title: "24/7 Service",
      description: "Layanan tersedia sepanjang waktu",
    },
    {
      icon: Star,
      title: "Harga Terbaik",
      description: "Dijamin harga termurah",
    },
  ];

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-snowy-50 via-ice-50 to-snowy-100 dark:from-snowy-900 dark:via-snowy-800 dark:to-snowy-900" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-snowy-200/30 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-ice-200/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 mb-12"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-snowy-600 via-ice-500 to-snowy-700 bg-clip-text text-transparent">
                Top Up Game
              </span>
              <br />
              <span className="text-foreground">Cepat & Hemat</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Platform top up game terpercaya dengan harga terbaik dan proses
              yang super cepat. Nikmati pengalaman bermain tanpa batas!
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-snowy-500 to-ice-500 hover:from-snowy-600 hover:to-ice-600 text-white font-semibold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg"
              onClick={() =>
                document
                  .getElementById("games-catalog")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Zap className="w-5 h-5 mr-2" />
              Mulai Top Up
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-snowy-300 text-snowy-600 hover:bg-snowy-50 dark:border-snowy-600 dark:text-snowy-400 dark:hover:bg-snowy-900 font-semibold px-8 py-4 rounded-xl text-lg"
            >
              Pelajari Lebih Lanjut
            </Button>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-snowy-200/50 dark:border-snowy-700/50"
              >
                <feature.icon className="w-8 h-8 text-snowy-500 mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
