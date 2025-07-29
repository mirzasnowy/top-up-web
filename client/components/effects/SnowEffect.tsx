import { useEffect, useRef } from "react";

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speed: number;
  drift: number;
  opacity: number;
}

export default function SnowEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snowflakes = useRef<Snowflake[]>([]);
  const animationId = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize canvas size
    resizeCanvas();

    // Create snowflakes
    const createSnowflakes = () => {
      const flakeCount = Math.min(
        100,
        Math.max(60, Math.floor(window.innerWidth / 15)),
      ); // Responsive count
      snowflakes.current = [];

      for (let i = 0; i < flakeCount; i++) {
        snowflakes.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1, // 1px - 4px
          speed: Math.random() * 2 + 0.5, // 0.5 - 2.5 pixel/frame
          drift: (Math.random() - 0.5) * 0.5, // Horizontal drift
          opacity: Math.random() * 0.5 + 0.3, // 0.3 - 0.8 opacity
        });
      }
    };

    createSnowflakes();

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw snowflakes
      snowflakes.current.forEach((flake) => {
        // Update position
        flake.y += flake.speed;
        flake.x += flake.drift;

        // Reset flake when it goes off screen
        if (flake.y > canvas.height) {
          flake.y = -10;
          flake.x = Math.random() * canvas.width;
        }

        // Keep flakes within horizontal bounds with wrapping
        if (flake.x > canvas.width + 10) {
          flake.x = -10;
        } else if (flake.x < -10) {
          flake.x = canvas.width + 10;
        }

        // Draw snowflake
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
        ctx.fill();

        // Add subtle glow effect for larger flakes
        if (flake.radius > 2) {
          ctx.beginPath();
          ctx.arc(flake.x, flake.y, flake.radius + 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity * 0.3})`;
          ctx.fill();
        }
      });

      animationId.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Handle window resize
    const handleResize = () => {
      resizeCanvas();
      createSnowflakes();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{
        background: "transparent",
      }}
    />
  );
}
