import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

interface LiquidCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  floating?: boolean;
  glowOnHover?: boolean;
}

const LiquidCard = ({ 
  children, 
  className = "", 
  delay = 0, 
  floating = true,
  glowOnHover = true 
}: LiquidCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-xl
        backdrop-blur-xl border border-border/30
        bg-gradient-to-br from-card/80 to-card/40
        shadow-ocean
        ${glowOnHover ? "hover:shadow-glow-lg hover:border-primary/30" : ""}
        transition-all duration-500
        ${className}
      `}
      style={{
        background: `
          radial-gradient(
            circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%,
            hsla(189, 94%, 43%, 0.08) 0%,
            transparent 50%
          ),
          linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)
        `,
      }}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={floating ? { y: -6, scale: 1.01 } : undefined}
      onMouseMove={handleMouseMove}
    >
      {/* Shimmer overlay */}
      <div className="absolute inset-0 shimmer pointer-events-none" />
      
      {/* Inner glow border */}
      <div 
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.1)",
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default LiquidCard;
