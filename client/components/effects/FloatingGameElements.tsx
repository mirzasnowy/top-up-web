import { motion } from "framer-motion";

const floatingVariants = {
  initial: {
    y: "0%",
    opacity: 0,
    scale: 0.5,
  },
  animate: (i: number) => ({
    y: ["0%", `${(i % 2 === 0 ? -1 : 1) * 10}%`, "0%"],
    x: ["0%", `${(i % 3 === 0 ? -1 : 1) * 5}%`, "0%"],
    opacity: [0, 0.3, 0.3, 0.3, 0], // Fade in, stay, fade out
    scale: [0.5, 1, 1, 1, 0.5],
    transition: {
      duration: 8 + Math.random() * 5, // Random duration for natural feel
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: Math.random() * 3,
      delay: i * 0.5, // Staggered delay
    },
  }),
};

const FloatingGameElement = ({ children, className, custom }: { children: React.ReactNode; className?: string; custom: number }) => (
  <motion.div
    className={`absolute pointer-events-none ${className}`}
    variants={floatingVariants}
    initial="initial"
    animate="animate"
    custom={custom}
  >
    {children}
  </motion.div>
);

export default function FloatingGameElements() {
  const elements = [
    { emoji: "💰", position: "top-[20%] left-[60%]", size: "text-2xl" },
    { emoji: "💎", position: "top-[40%] left-[75%]", size: "text-3xl" },
    { emoji: "✨", position: "top-[10%] left-[85%]", size: "text-xl" },
    { emoji: "🛡️", position: "top-[60%] left-[65%]", size: "text-2xl" },
    { emoji: "⚔️", position: "top-[70%] left-[80%]", size: "text-xl" },
    { emoji: "🔮", position: "top-[30%] left-[90%]", size: "text-3xl" },
    { emoji: "🌟", position: "top-[50%] left-[55%]", size: "text-2xl" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {elements.map((el, i) => (
        <FloatingGameElement key={i} className={`${el.position} ${el.size}`} custom={i}>
          {el.emoji}
        </FloatingGameElement>
      ))}
    </div>
  );
}
