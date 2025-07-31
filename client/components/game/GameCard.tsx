import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface GameCardProps {
  id: string;
  name: string;
  artwork: string;
  category: string;
  rating: number;
  isPopular?: boolean;
  description: string;
}

export default function GameCard({
  id,
  name,
  artwork,
  category,
  rating,
  isPopular = false,
  description,
}: GameCardProps) {
  return (
    <Link to={`/topup/${id}`} className="block h-full group">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          scale: 1.03,
          y: -5,
          boxShadow: "0 0 15px rgba(147, 51, 234, 0.6), 0 0 30px rgba(96, 165, 250, 0.6)", // Added glow effect
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="relative pb-[133.33%] h-0 rounded-xl overflow-hidden shadow-lg"
      >
        {/* Background Artwork */}
        <img
          src={artwork}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-card/50 to-transparent" />

        {/* Popular Badge */}
        {isPopular && (
          <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-inter font-bold px-3 py-1 rounded-full flex items-center space-x-1 shadow-lg hidden sm:flex">
            <Star className="h-3 w-3 fill-current" />
            <span>POPULER</span>
          </div>
        )}

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-3 text-foreground text-center">
          <div className="space-y-1">
            {/* Category & Rating */}
            <div className="hidden sm:flex items-center justify-center text-xs">
              <p className="font-inter font-semibold text-muted-foreground">{category}</p>
              <div className="flex items-center space-x-1 ml-2">
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                <span className="font-inter font-bold text-foreground">{rating.toFixed(1)}</span>
              </div>
            </div>

            {/* Game Name */}
            <h3 className="font-montserrat font-extrabold text-base text-foreground drop-shadow-md">
              {name}
            </h3>

            {/* Description */}
            <p className="font-inter hidden sm:block text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}