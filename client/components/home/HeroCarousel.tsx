import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Zap, Star } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&h=800&fit=crop&crop=center",
    title: "Top Up Game",
    subtitle: "Cepat & Hemat",
    description:
      "Platform top up game terpercaya dengan harga terbaik dan proses yang super cepat.",
    cta: "Mulai Top Up",
    gradient: "from-blue-600/70 via-purple-600/60 to-cyan-500/70",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1556438064-2d7646166914?w=1920&h=800&fit=crop&crop=center",
    title: "Mobile Legends",
    subtitle: "Diamond Termurah",
    description:
      "Dapatkan diamond Mobile Legends dengan harga termurah dan proses tercepat di Snowy Store.",
    cta: "Top Up Sekarang",
    gradient: "from-cyan-500/70 via-blue-500/60 to-purple-600/70",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1920&h=800&fit=crop&crop=center",
    title: "PUBG Mobile",
    subtitle: "UC Premium",
    description:
      "Beli UC PUBG Mobile untuk upgrade gear dan skin keren dengan harga terjangkau.",
    cta: "Beli UC",
    gradient: "from-purple-600/70 via-pink-500/60 to-blue-500/70",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
  };

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying]);

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlideData.id}
            initial={{ scale: 1.1, opacity: 0, x: 100 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            exit={{ scale: 0.9, opacity: 0, x: -100 }}
            transition={{
              duration: 1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="absolute inset-0"
          >
            <motion.img
              src={currentSlideData.image}
              alt={currentSlideData.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            {/* Gradient Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.gradient}`}
            />
            {/* Additional semi-transparent overlay for readability */}
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlideData.id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1],
                  delay: 0.2,
                }}
                className="space-y-6"
              >
                {/* Main Title */}
                <div className="space-y-2">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl">
                    {currentSlideData.title}
                  </h1>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent drop-shadow-lg">
                    {currentSlideData.subtitle}
                  </h2>
                </div>

                {/* Description */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mx-auto max-w-2xl border border-white/20">
                  <p className="text-xl text-white leading-relaxed drop-shadow-lg">
                    {currentSlideData.description}
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold px-8 py-4 rounded-xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 text-lg border-2 border-white/20"
                    onClick={() =>
                      document
                        .getElementById("games-catalog")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    {currentSlideData.cta}
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-white bg-white/10 text-white hover:bg-white/25 hover:border-white font-semibold px-8 py-4 rounded-xl backdrop-blur-md text-lg shadow-lg transition-all duration-300"
                  >
                    <Star className="w-5 h-5 mr-2" />
                    Lihat Promo
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-125 shadow-lg"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      {/* Features Preview at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="bg-gradient-to-t from-white/95 to-transparent backdrop-blur-sm py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { icon: Zap, title: "Proses Cepat", desc: "Instan" },
                { icon: Star, title: "Harga Terbaik", desc: "Termurah" },
                { icon: Zap, title: "100% Aman", desc: "Terpercaya" },
                { icon: Star, title: "24/7 Support", desc: "Siap Bantu" },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <feature.icon className="w-6 h-6 text-snowy-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-sm text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-600">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
