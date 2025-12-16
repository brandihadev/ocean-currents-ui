import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedIconProps {
  children: ReactNode;
  size?: number;
  className?: string;
  delay?: number;
  glowColor?: "cyan" | "teal" | "bio" | "blue";
  variant?: "float" | "pulse" | "breathe" | "wave";
}

const glowColors = {
  cyan: "hsla(189, 94%, 43%, 0.5)",
  teal: "hsla(168, 76%, 42%, 0.5)",
  bio: "hsla(158, 64%, 52%, 0.5)",
  blue: "hsla(217, 91%, 60%, 0.5)",
};

const AnimatedIcon = ({ 
  children,
  size = 24, 
  className = "",
  delay = 0,
  glowColor = "cyan",
  variant = "float"
}: AnimatedIconProps) => {
  
  const getAnimation = () => {
    switch (variant) {
      case "pulse":
        return {
          scale: [1, 1.15, 1],
          opacity: [0.8, 1, 0.8],
        };
      case "breathe":
        return {
          scale: [1, 1.05, 1],
          filter: [
            `drop-shadow(0 0 4px ${glowColors[glowColor].replace("0.5", "0.2")})`,
            `drop-shadow(0 0 12px ${glowColors[glowColor]})`,
            `drop-shadow(0 0 4px ${glowColors[glowColor].replace("0.5", "0.2")})`,
          ],
        };
      case "wave":
        return {
          y: [0, -6, 0, 6, 0],
          x: [0, 3, 0, -3, 0],
          rotate: [0, 5, 0, -5, 0],
        };
      case "float":
      default:
        return {
          y: [0, -4, 0],
          rotate: [0, 2, -2, 0],
        };
    }
  };

  return (
    <motion.div
      className={`relative inline-flex items-center justify-center ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      style={{ width: size, height: size }}
    >
      <motion.div
        animate={getAnimation()}
        transition={{
          duration: variant === "pulse" ? 2 : variant === "breathe" ? 3 : 5 + delay,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.5,
        }}
        whileHover={{
          scale: 1.25,
          y: -8,
          filter: `drop-shadow(0 0 20px ${glowColors[glowColor]})`,
        }}
        className="cursor-pointer flex items-center justify-center"
        style={{
          filter: `drop-shadow(0 0 8px ${glowColors[glowColor].replace("0.5", "0.3")})`,
          color: `hsl(var(--primary))`,
        }}
      >
        {children}
      </motion.div>
      
      {/* Pulse ring on hover */}
      <motion.div
        className="absolute rounded-full border border-primary/30 pointer-events-none"
        initial={{ scale: 1, opacity: 0 }}
        whileHover={{
          scale: [1, 1.5, 2],
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
        }}
        style={{
          width: size * 1.5,
          height: size * 1.5,
        }}
      />
      
      {/* Wave ripple effect */}
      <motion.div
        className="absolute rounded-full bg-primary/10 pointer-events-none"
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        }}
        style={{
          width: size * 1.2,
          height: size * 1.2,
        }}
      />
    </motion.div>
  );
};

export default AnimatedIcon;
