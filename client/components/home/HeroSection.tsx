import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
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
    initial={{ y: 0, opacity: 0, scale: 0, rotateY: 0, rotateX: 0 }}
    animate={{
      y: [0, -15, 0],
      opacity: 1,
      scale: [0, 1, 1.05, 1],
      rotateY: [0, 10, -10, 0],
      rotateX: [0, 5, -5, 0],
      filter: [
        "brightness(1) drop-shadow(0 0 2px rgba(255, 255, 255, 0.5))",
        "brightness(1.2) drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))",
        "brightness(1) drop-shadow(0 0 2px rgba(255, 255, 255, 0.5))",
      ],
    }}
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
      {/* Floating Game Elements */}
      <FloatingGameElements />

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-900 opacity-90 backdrop-blur-xl" />

      {isMobile ? (
        // ================= MOBILE & TABLET LAYOUT (Vertikal: Gambar atas, Teks bawah) =================
        <div className="container mx-auto px-4 sm:px-6 relative z-20 flex flex-col items-center justify-center text-center">
          {/* Maskot + Aura + Emoji - Di atas */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center mb-6 sm:mb-8">
            {/* Aura GIF Effect */}
            <motion.img
              src="/dark-aura.gif"
              alt="Mascot Aura"
              className="absolute inset-0 w-full h-full object-cover scale-150 blur-sm opacity-70 z-0 pointer-events-none"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{
                opacity: 0.7,
                scale: 1.5,
                y: [0, -15, 0],
              }}
              transition={{
                opacity: { duration: 1.5, ease: "easeInOut", delay: 0.5 },
                scale: { duration: 1.5, ease: "easeInOut", delay: 0.5 },
                y: {
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: 1,
                },
              }}
            />

            <FloatingEmoji emoji="✨" className="-top-2 sm:-top-4 left-4 sm:left-6" duration={1.8} />
            <FloatingEmoji emoji="🛒" className="top-8 sm:top-12 right-0 sm:right-2" duration={2.2} delay={0.3} />
            <FloatingEmoji emoji="👑" className="bottom-12 sm:bottom-16 -left-4 sm:-left-6" duration={2.0} delay={0.6} />
            <FloatingEmoji emoji="💎" className="bottom-0 sm:bottom-2 -right-2 sm:right-0" duration={1.7} delay={0.9} />

            {/* Mascot Image */}
            <motion.img
              src="/maskot.png"
              alt="Snowy Store Mascot"
              className="relative h-full w-full object-contain z-10 pointer-events-none"
              initial={{ y: -50, opacity: 0 }}
              animate={{
                y: [0, -15, 0],
                opacity: 1,
              }}
              transition={{
                y: {
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: 1,
                },
                opacity: { duration: 1, ease: "easeOut" },
              }}
            />
          </div>

          {/* Text - Di bawah */}
          <div className="max-w-xs sm:max-w-md md:max-w-2xl space-y-3 sm:space-y-4">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block font-montserrat text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent pb-1">
                Snowy Store
              </span>
              <span className="block font-inter text-lg sm:text-xl md:text-2xl font-semibold leading-normal tracking-normal text-white mt-0">
                Top Up Game
              </span>
              <span className="block font-inter text-lg sm:text-xl md:text-2xl font-semibold leading-normal tracking-normal bg-gradient-to-r from-pink-400 to-red-600 bg-clip-text text-transparent">
                Cepat & Hemat
              </span>
            </motion.h1>

            <motion.p
              className="font-inter text-sm sm:text-base md:text-lg font-normal leading-relaxed tracking-wide text-gray-300 px-2 sm:px-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Diamond ML, UC PUBG, Free Fire? Aman, legal, langsung masuk! Harga hemat, proses kilat. Gas main sekarang!
            </motion.p>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4"
            >
              <Button
                size="default"
                className="font-inter font-bold text-sm sm:text-base bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105"
                onClick={() =>
                  document.getElementById("games-catalog")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Beli Diamond ML
              </Button>
              <Button
                size="default"
                variant="outline"
                className="font-inter font-bold text-sm sm:text-base border-2 border-white/50 text-white hover:bg-white/10 px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105 backdrop-blur-sm"
                onClick={() =>
                  document.getElementById("games-catalog")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Lihat Game Lainnya
              </Button>
            </motion.div>
          </div>
        </div>
      ) : (
        // ================= DESKTOP LAYOUT (Horizontal: Teks kiri, Gambar kanan) =================
        <>
          {/* Floating Emoji for Desktop */}
          <FloatingEmoji emoji="✨" className="top-24 right-64" duration={1.8} />
          <FloatingEmoji emoji="🛒" className="top-40 right-32" duration={2.2} delay={0.3} />
          <FloatingEmoji emoji="👑" className="bottom-48 right-72" duration={2.0} delay={0.6} />
          <FloatingEmoji emoji="💎" className="bottom-24 right-40" duration={1.7} delay={0.9} />

          {/* Mascot + Aura */}
          <motion.div
            className="absolute right-0 bottom-0 h-3/4 lg:h-full z-10 pointer-events-none"
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <div className="relative w-full h-full">
              {/* Aura GIF Effect */}
              <motion.img
                src="/dark-aura.gif"
                alt="Mascot Aura"
                className="absolute inset-0 w-full h-full object-contain scale-125 blur-sm opacity-80 z-0"
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 0.8, scale: 1.25 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              />
              {/* Mascot Image */}
              <motion.img
                src="/maskot.png"
                alt="Snowy Store Mascot"
                className="relative h-full w-full object-contain z-10"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: "0%", opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </motion.div>

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
                Diamond ML, UC PUBG, Free Fire? Aman, legal, langsung masuk!
Harga hemat, proses kilat. Gas main sekarang!
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
                  Beli Diamond ML 
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="font-inter font-bold text-lg border-2 border-white/50 text-white hover:bg-white/10 px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105 backdrop-blur-sm"
                  onClick={() =>
                    document.getElementById("games-catalog")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Lihat Daftar Game 
                </Button>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
