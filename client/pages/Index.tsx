import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import GameCard from "@/components/game/GameCard";
import FAQSection from "@/components/FAQSection"; // Import FAQSection
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
      <div className="bg-background">
        {/* Hero Section */}
        <HeroSection />

        {/* Games Catalog Section */}
        <section id="games-catalog" className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-10"
            >
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Gamepad2 className="w-7 h-7 text-snowy-500" />
                <span className="font-inter text-sm font-semibold text-snowy-600 uppercase tracking-wider">
                  Katalog Game
                </span>
              </div>
              <h2 className="font-montserrat text-3xl lg:text-4xl font-extrabold text-white mb-3 leading-tight">
                Pilih Game Favorit Kamu
              </h2>
              <p className="font-inter text-base text-gray-400 leading-relaxed">
                Top up berbagai game populer dengan harga terbaik dan proses
                yang super cepat
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
              <span className="font-inter text-sm font-medium text-gray-400">
                Game Populer Minggu Ini
              </span>
            </motion.div>

            {/* Games Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 lg:gap-8"
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

        {/* FAQ Section */}
        <FAQSection />
      </div>
    </Layout>
  );
}