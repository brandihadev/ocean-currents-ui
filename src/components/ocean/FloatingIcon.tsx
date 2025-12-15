import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FloatingIconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
  delay?: number;
  glowColor?: "cyan" | "teal" | "bio";
}

const glowColors = {
  cyan: "hsla(189, 94%, 43%, 0.5)",
  teal: "hsla(168, 76%, 42%, 0.5)",
  bio: "hsla(158, 64%, 52%, 0.5)",
};

const FloatingIcon = ({ 
  icon: Icon, 
  size = 24, 
  className = "",
  delay = 0,
  glowColor = "cyan"
}: FloatingIconProps) => {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
    >
      <motion.div
        animate={{
          y: [0, -4, 0],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 5 + delay,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.5,
        }}
        whileHover={{
          scale: 1.2,
          y: -8,
          filter: `drop-shadow(0 0 20px ${glowColors[glowColor]})`,
        }}
        className="cursor-pointer"
      >
        <Icon 
          size={size} 
          className="text-primary transition-all duration-300"
          style={{
            filter: `drop-shadow(0 0 8px ${glowColors[glowColor].replace("0.5", "0.3")})`,
          }}
        />
      </motion.div>
      
      {/* Pulse ring on hover */}
      <motion.div
        className="absolute inset-0 rounded-full border border-primary/30"
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
          left: -size * 0.25,
          top: -size * 0.25,
        }}
      />
    </motion.div>
  );
};

export default FloatingIcon;
