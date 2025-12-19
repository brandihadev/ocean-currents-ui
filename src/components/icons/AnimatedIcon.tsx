import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { LucideIcon } from "lucide-react";

interface AnimatedIconProps {
  icon: LucideIcon;
  size?: number;
  isActive?: boolean;
  variant?: "float" | "pulse" | "bounce" | "glow" | "wave";
  className?: string;
}

const AnimatedIcon = ({ 
  icon: Icon, 
  size = 20, 
  isActive = false,
  variant = "float",
  className = ""
}: AnimatedIconProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getVariantAnimation = () => {
    switch (variant) {
      case "float":
        return {
          animate: isHovered ? {
            y: [-2, 2, -2],
            transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          } : {},
        };
      case "pulse":
        return {
          animate: isHovered ? {
            scale: [1, 1.15, 1],
            transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
          } : {},
        };
      case "bounce":
        return {
          animate: isHovered ? {
            y: [0, -6, 0],
            transition: { duration: 0.5, repeat: Infinity, ease: "easeOut" }
          } : {},
        };
      case "glow":
        return {
          animate: isHovered ? {
            filter: ["drop-shadow(0 0 8px hsla(168, 76%, 46%, 0.6))", "drop-shadow(0 0 16px hsla(168, 76%, 46%, 0.8))", "drop-shadow(0 0 8px hsla(168, 76%, 46%, 0.6))"],
            transition: { duration: 1, repeat: Infinity, ease: "easeInOut" }
          } : {},
        };
      case "wave":
        return {
          animate: isHovered ? {
            rotate: [-5, 5, -5],
            transition: { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
          } : {},
        };
      default:
        return {};
    }
  };

  const variantProps = getVariantAnimation();

  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow background */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isHovered || isActive ? 0.3 : 0,
          scale: isHovered || isActive ? 1.5 : 0.8,
          background: "radial-gradient(circle, hsla(168, 76%, 46%, 0.4) 0%, transparent 70%)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Icon */}
      <motion.div
        {...variantProps}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Icon 
          size={size}
          strokeWidth={isActive ? 2.5 : 1.5}
          className={`transition-colors duration-300 ${
            isActive 
              ? "text-primary" 
              : "text-muted-foreground group-hover:text-foreground"
          }`}
          style={{
            filter: isActive ? "drop-shadow(0 0 8px hsla(168, 76%, 46%, 0.5))" : "none"
          }}
        />
      </motion.div>

      {/* Ripple effect on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-lg border border-primary/30"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.div>
  );
};

export default AnimatedIcon;