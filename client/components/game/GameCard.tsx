import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Gamepad2, Star, Zap } from 'lucide-react';

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
  description 
}: GameCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group relative"
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

      <div className="relative overflow-hidden rounded-xl bg-card-gradient dark:bg-card-gradient-dark backdrop-blur-sm border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
        
        <div className="p-6">
          {/* Game Icon */}
          <div className="flex items-center justify-center mb-4">
            <motion.div
              whileHover={{ rotate: 5 }}
              className="relative"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-snowy-100 to-ice-100 dark:from-snowy-800 dark:to-snowy-700 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <img 
                  src={icon} 
                  alt={name}
                  className="w-14 h-14 rounded-lg object-cover"
                  onError={(e) => {
                    // Fallback to icon if image fails to load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <Gamepad2 className="w-14 h-14 text-snowy-500 hidden" />
              </div>
            </motion.div>
          </div>

          {/* Game Info */}
          <div className="text-center space-y-2 mb-4">
            <h3 className="font-bold text-lg text-foreground group-hover:text-snowy-600 transition-colors">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {category}
            </p>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < rating
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-2">
              {rating}.0
            </span>
          </div>

          {/* Action Button */}
          <Link to={`/topup/${id}`}>
            <Button 
              className="w-full bg-gradient-to-r from-snowy-500 to-ice-500 hover:from-snowy-600 hover:to-ice-600 text-white font-semibold py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Zap className="w-4 h-4 mr-2 group-hover:animate-pulse" />
              Top Up Sekarang
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
