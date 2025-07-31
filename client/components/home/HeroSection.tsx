import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import SnowEffect from "@/components/effects/SnowEffect";
import FloatingGameElements from "@/components/effects/FloatingGameElements";

// Floating Emoji Component
const FloatingEmoji = ({
  emoji,
  className,
  duration = 1.5,
  delay = 0,
}: {
  emoji: string;
  className: string;
  duration?: number;
  delay?: number;
}) => (
  <motion.div
    className={`absolute text-2xl sm:text-3xl p-2 bg-white/10 backdrop-blur-md rounded-full shadow-lg z-50 ${className}`}
    initial={{ y: 0, opacity: 0, scale: 0 }}
    animate={{ y: [0, -10, 0], opacity: 1, scale: 1 }}
    transition={{
      duration,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
      delay,
    }}
  >
    {emoji}
  </motion.div>
);

export default function HeroSection() {
  const isMobile = useIsMobile();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white overflow-hidden dynamic-glow">
      {/* Snow Effect */}
      <SnowEffect />

      {/* Floating Game Elements */}
      <FloatingGameElements />

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-900 opacity-90 backdrop-blur-xl" />

      {isMobile ? (
        // ================= MOBILE LAYOUT =================
        <div className="container mx-auto px-4 sm:px-6 relative z-20 flex flex-col items-center justify-center text-center">
          {/* Maskot + Emoji */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center mb-4">
            <FloatingEmoji emoji="👍" className="-top-2 left-4" duration={1.8} />
            <FloatingEmoji emoji="🛒" className="top-8 right-0" duration={2.2} delay={0.3} />
            <FloatingEmoji emoji="✨" className="bottom-12 -left-4" duration={2.0} delay={0.6} />
            <FloatingEmoji emoji="💎" className="bottom-0 -right-2" duration={1.7} delay={0.9} />
            <motion.img
              src="/maskot.png"
              alt="Snowy Store Mascot"
              className="h-full w-full object-contain z-10 pointer-events-none"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>

          {/* Text */}
          <div className="max-w-2xl space-y-2">
            <motion.h1
              className="text-4xl sm:text-5xl font-extrabold leading-tight"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block font-montserrat text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent pb-1">
                Snowy Store
              </span>
              <span className="block font-inter text-xl sm:text-2xl font-semibold leading-normal tracking-normal text-white mt-0">
                Top Up Game
              </span>
              <span className="block font-inter text-xl sm:text-2xl font-semibold leading-normal tracking-normal bg-gradient-to-r from-pink-400 to-red-600 bg-clip-text text-transparent">
                Cepat & Hemat
              </span>
            </motion.h1>

            <motion.p
              className="font-inter text-sm sm:text-base font-normal leading-relaxed tracking-wide text-gray-300 px-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Platform top up game terpercaya, harga terbaik, proses super cepat.
            </motion.p>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-row gap-3 justify-center pt-2"
            >
              <Button
                size="sm"
                className="font-inter font-bold text-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105"
                onClick={() =>
                  document.getElementById("games-catalog")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Top Up
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="font-inter font-bold text-sm border-2 border-white/50 text-white hover:bg-white/10 px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105 backdrop-blur-sm"
                onClick={() =>
                  document.getElementById("games-catalog")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Lainnya
              </Button>
            </motion.div>
          </div>
        </div>
      ) : (
        // ================= DESKTOP LAYOUT =================
        <>
          {/* Floating Emoji for Desktop */}
          <FloatingEmoji emoji="👍" className="top-24 right-64" duration={1.8} />
          <FloatingEmoji emoji="🛒" className="top-40 right-32" duration={2.2} delay={0.3} />
          <FloatingEmoji emoji="✨" className="bottom-48 right-72" duration={2.0} delay={0.6} />
          <FloatingEmoji emoji="💎" className="bottom-24 right-40" duration={1.7} delay={0.9} />

          {/* Maskot */}
          <motion.img
            src="/maskot.png"
            alt="Snowy Store Mascot"
            className="absolute right-0 bottom-0 h-3/4 lg:h-full object-contain z-10 pointer-events-none"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          {/* Text */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 flex flex-col lg:flex-row items-center lg:items-start justify-between">
            <div className="text-center lg:text-left max-w-2xl lg:max-w-xl space-y-3 sm:space-y-4 pt-10 lg:pt-0">
              <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="block font-montserrat text-6xl sm:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tighter bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                  Snowy Store
                </span>
                <span className="block font-inter text-2xl sm:text-3xl lg:text-4xl font-semibold leading-normal tracking-normal text-white mt-0">
                  Top Up Game
                </span>
                <span className="block font-inter text-2xl sm:text-3xl lg:text-4xl font-semibold leading-normal tracking-normal bg-gradient-to-r from-pink-400 to-red-600 bg-clip-text text-transparent">
                  Cepat & Hemat
                </span>
              </motion.h1>

              <motion.p
                className="font-inter text-base sm:text-lg font-normal leading-relaxed tracking-normal text-gray-300"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Platform top up game terpercaya dengan harga terbaik dan proses super cepat. Nikmati
                pengalaman bermain tanpa batas!
              </motion.p>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
              >
                <Button
                  size="lg"
                  className="font-inter font-bold text-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105"
                  onClick={() =>
                    document.getElementById("games-catalog")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Top Up
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="font-inter font-bold text-lg border-2 border-white/50 text-white hover:bg-white/10 px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105 backdrop-blur-sm"
                  onClick={() =>
                    document.getElementById("games-catalog")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Lainnya
                </Button>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
