import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Gamepad2, Star, Zap } from "lucide-react";

interface GameCardProps {
  id: string;
  name: string;
  icon: string;
  category: string;
  rating: number;
  isPopular?: boolean;
  description: string;
}

export default function GameCard({
  id,
  name,
  icon,
  category,
  rating,
  isPopular = false,
  description,
}: GameCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="group relative h-full"
    >
      {/* Popular Badge */}
      {isPopular && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1 shadow-lg"
        >
          <Star className="h-3 w-3 fill-current" />
          <span>POPULER</span>
        </motion.div>
      )}

      <div className="relative overflow-hidden rounded-xl bg-white/95 backdrop-blur-sm border border-snowy-200/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

        <div className="p-6 flex flex-col h-full">
          {/* Game Icon */}
          <div className="flex items-center justify-center mb-4">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-snowy-100 to-ice-100 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow border border-snowy-200/30">
                <img
                  src={icon}
                  alt={name}
                  className="w-14 h-14 rounded-lg object-cover"
                  onError={(e) => {
                    // Fallback to icon if image fails to load
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextElementSibling?.classList.remove(
                      "hidden",
                    );
                  }}
                />
                <Gamepad2 className="w-14 h-14 text-snowy-500 hidden" />
              </div>
            </motion.div>
          </div>

          {/* Game Info - Fixed height to ensure consistency */}
          <div className="text-center space-y-2 mb-4 flex-grow">
            <h3 className="font-bold text-lg text-foreground group-hover:text-snowy-600 transition-colors min-h-[28px] flex items-center justify-center">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground font-medium">
              {category}
            </p>
            <p className="text-xs text-muted-foreground line-clamp-3 min-h-[48px] px-2">
              {description}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-center space-x-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-2">
              {rating}.0
            </span>
          </div>

          {/* Action Button - Always at bottom */}
          <div className="mt-auto">
            <Link to={`/topup/${id}`}>
              <Button className="w-full bg-gradient-to-r from-snowy-500 to-purple-500 hover:from-snowy-600 hover:to-purple-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <Zap className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                Top Up Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
