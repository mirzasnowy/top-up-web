import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

const posters = [
  {
    id: 1,
    image: "/poster_snowy.jpg",
    alt: "Promo Top Up Game",
  },
  {
    id: 2,
    image: "/poster2.jpg",
    alt: "Promo Lainnya",
  },
  {
    id: 3,
    image: "/poster3.jpg",
    alt: "Promo Spesial",
  },
];

export default function PosterCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (scrollRef.current) {
      setCanScrollLeft(scrollRef.current.scrollLeft > 0);
      setCanScrollRight(
        scrollRef.current.scrollLeft + scrollRef.current.offsetWidth <
          scrollRef.current.scrollWidth
      );
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * 0.8; // Scroll 80% of the visible width
      if (direction === "left") {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  // Check scrollability on mount and on scroll
  // Using a timeout to ensure layout is stable before checking scrollWidth
  useState(() => {
    const timeout = setTimeout(checkScrollability, 100);
    return () => clearTimeout(timeout);
  });

  return (
    <section className="relative py-8 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={checkScrollability}
            className="flex overflow-x-scroll snap-x snap-mandatory scroll-smooth hide-scrollbar"
          >
            {posters.map((poster) => (
              <div
                key={poster.id}
                className="flex-shrink-0 w-full snap-center p-2"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full pb-[40%] md:pb-[45%] rounded-xl overflow-hidden shadow-lg"

                >
                  <img
                    src={poster.image}
                    alt={poster.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-2 shadow-md z-10 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-2 shadow-md z-10 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
