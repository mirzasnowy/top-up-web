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
        whileHover={{ scale: 1.03, y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="relative h-[450px] rounded-xl overflow-hidden shadow-lg"
      >
        {/* Background Artwork */}
        <img
          src={artwork}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

        {/* Popular Badge */}
        {isPopular && (
          <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1 shadow-lg">
            <Star className="h-3 w-3 fill-current" />
            <span>POPULER</span>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
          <div className="space-y-3">
            {/* Category & Rating */}
            <div className="flex items-center justify-between text-sm">
              <p className="font-semibold text-gray-300">{category}</p>
              <div className="flex items-center space-x-1.5">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="font-bold text-base">{rating.toFixed(1)}</span>
              </div>
            </div>

            {/* Game Name */}
            <h3 className="font-bold text-2xl text-white drop-shadow-md">
              {name}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-200 line-clamp-2 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}