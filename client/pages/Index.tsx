import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import HeroCarousel from "@/components/home/HeroCarousel";
import GameCard from "@/components/game/GameCard";
import { Gamepad2, TrendingUp } from "lucide-react";

export default function Index() {
  const games = [
    {
      id: "mobile-legends",
      name: "Mobile Legends",
      artwork: "/ml_game.webp",
      category: "MOBA",
      rating: 5,
      isPopular: true,
      description:
        "Top up Diamond Mobile Legends dengan harga termurah dan proses tercepat!",
    },
    {
      id: "pubg-mobile",
      name: "PUBG Mobile",
      artwork: "/pubg_game.webp",
      category: "Battle Royale",
      rating: 5,
      isPopular: true,
      description: "Beli UC PUBG Mobile untuk upgrade gear dan skin keren!",
    },
    {
      id: "free-fire",
      name: "Free Fire",
      artwork: "/ff_game.webp",
      category: "Battle Royale",
      rating: 4,
      isPopular: true,
      description:
        "Top up Diamond Free Fire untuk skin dan karakter eksklusif!",
    },
    {
      id: "genshin-impact",
      name: "Genshin Impact",
      artwork: "/genshin_game.jpg",
      category: "RPG",
      rating: 5,
      isPopular: false,
      description:
        "Beli Genesis Crystal untuk Primo Gem dan dapatkan karakter impian!",
    },
    {
      id: "roblox",
      name: "Roblox",
      artwork: "/roblox_game.jpg",
      category: "Sandbox",
      rating: 4,
      isPopular: false,
      description:
        "Top up Robux untuk membeli item dan aksesoris keren di Roblox!",
    },
    {
      id: "valorant",
      name: "Valorant",
      artwork: "/valorant_game.webp",
      category: "FPS",
      rating: 5,
      isPopular: false,
      description: "Beli VP Valorant untuk skin senjata dan agent terbaru!",
    },
  ];

  return (
    <Layout>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Games Catalog Section */}
      <section id="games-catalog" className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Gamepad2 className="w-8 h-8 text-snowy-500" />
              <span className="text-sm font-semibold text-snowy-600 uppercase tracking-wide">
                Katalog Game
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Pilih Game Favorit Kamu
            </h2>
            <p className="text-lg text-muted-foreground">
              Top up berbagai game populer dengan harga terbaik dan proses yang
              super cepat
            </p>
          </motion.div>

          {/* Popular Games Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center justify-center space-x-2 mb-8"
          >
            <TrendingUp className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-medium text-muted-foreground">
              Game Populer Minggu Ini
            </span>
          </motion.div>

          {/* Games Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-full" // Ensure full height for consistent card sizing
              >
                <GameCard {...game} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
