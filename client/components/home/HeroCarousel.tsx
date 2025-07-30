import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Zap, Star } from "lucide-react";
import SnowEffect from "../effects/SnowEffect";

const heroSlides = [
  {
    id: 1,
    image: "/poster_snowy.jpg",
    title: "Top Up Game",
    subtitle: "Cepat & Hemat",
    description:
      "Platform top up game terpercaya dengan harga terbaik dan proses yang super cepat.",
    cta: "Mulai Top Up",
    gradient: "from-blue-600/70 via-purple-600/60 to-cyan-500/70",
    imageClassName: "object-center",
  },
  {
    id: 2,
    image: "/ic_ml.jpg",
    title: "Mobile Legends",
    subtitle: "Diamond Termurah",
    description:
      "Dapatkan diamond Mobile Legends dengan harga termurah dan proses tercepat di Snowy Store.",
    cta: "Top Up Sekarang",
    gradient: "from-cyan-500/70 via-blue-500/60 to-purple-600/70",
    imageClassName: "object-top",
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
    imageClassName: "object-center",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const currentSlideData = heroSlides[currentSlide];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
        <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "tween", ease: [0.4, 0, 0.2, 1], duration: 1.2 },
            opacity: { duration: 0.5 },
          }}
          className="absolute inset-0"
        >
          {/* Background Image & Overlays */}
          <img
            src={currentSlideData.image}
            alt={currentSlideData.title}
            className={`w-full h-full object-cover ${currentSlideData.imageClassName}`}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.gradient}`}
          />
          <div className="absolute inset-0 bg-black/30" />

          {/* Content Overlay - Now inside the sliding div */}
          <div className="absolute inset-0 z-10 h-full flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
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
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

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
            onClick={() => {
              if (index > currentSlide) setDirection(1);
              else if (index < currentSlide) setDirection(-1);
              setCurrentSlide(index);
            }}
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
        <div className="bg-gradient-to-t from-white to-transparent pt-12 pb-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
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
      <div className="absolute inset-0 z-30 pointer-events-none">
        <SnowEffect />
      </div>
    </section>
  );
}
