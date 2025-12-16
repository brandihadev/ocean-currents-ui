import { motion } from "framer-motion";
import { TrendUp, TrendDown, Minus } from "iconsax-react";
import { ReactNode } from "react";
import LiquidCard from "../ocean/LiquidCard";
import AnimatedIcon from "../ocean/AnimatedIcon";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: ReactNode;
  delay?: number;
  accentColor?: "cyan" | "teal" | "bio";
}

const accentColors = {
  cyan: {
    gradient: "from-bio-cyan to-primary",
    glow: "hsla(189, 94%, 43%, 0.3)",
    text: "text-bio-cyan",
  },
  teal: {
    gradient: "from-bio-teal to-bio-cyan",
    glow: "hsla(168, 76%, 42%, 0.3)",
    text: "text-bio-teal",
  },
  bio: {
    gradient: "from-bio-emerald to-bio-teal",
    glow: "hsla(158, 64%, 52%, 0.3)",
    text: "text-bio-emerald",
  },
};

const MetricCard = ({
  title,
  value,
  change,
  icon,
  delay = 0,
  accentColor = "cyan",
}: MetricCardProps) => {
  const colors = accentColors[accentColor];
  const isPositive = change > 0;
  const isNeutral = change === 0;

  return (
    <LiquidCard delay={delay} className="p-6 group">
      <div className="flex items-start justify-between">
        {/* Icon with floating animation */}
        <motion.div
          className={`
            p-3 rounded-xl bg-gradient-to-br ${colors.gradient}
            shadow-lg
          `}
          style={{
            boxShadow: `0 8px 24px ${colors.glow}`,
          }}
          animate={{
            y: [0, -4, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay * 2,
          }}
        >
          {icon}
        </motion.div>

        {/* Trend indicator */}
        <motion.div
          className={`
            flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium
            ${isPositive 
              ? "bg-bio-emerald/10 text-bio-emerald" 
              : isNeutral 
                ? "bg-muted text-muted-foreground" 
                : "bg-destructive/10 text-destructive"
            }
          `}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.3 }}
        >
          <AnimatedIcon size={16} variant="pulse" glowColor={isPositive ? "bio" : "cyan"}>
            {isNeutral ? (
              <Minus size={12} color="currentColor" />
            ) : isPositive ? (
              <TrendUp size={12} variant="Bold" color="currentColor" />
            ) : (
              <TrendDown size={12} variant="Bold" color="currentColor" />
            )}
          </AnimatedIcon>
          <span>{isNeutral ? "0" : (isPositive ? "+" : "") + change}%</span>
        </motion.div>
      </div>

      {/* Value */}
      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.2 }}
      >
        <motion.h3
          className={`text-3xl font-bold ${colors.text} text-glow`}
          animate={{
            textShadow: [
              `0 0 20px ${colors.glow.replace("0.3", "0.4")}`,
              `0 0 40px ${colors.glow.replace("0.3", "0.6")}`,
              `0 0 20px ${colors.glow.replace("0.3", "0.4")}`,
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: delay,
          }}
        >
          {value}
        </motion.h3>
        <p className="mt-1 text-sm text-muted-foreground font-medium">
          {title}
        </p>
      </motion.div>

      {/* Sparkline placeholder */}
      <motion.div
        className="mt-4 h-12 flex items-end gap-0.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.4 }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`flex-1 rounded-t bg-gradient-to-t ${colors.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
            style={{
              height: `${20 + Math.sin(i * 0.8) * 15 + Math.random() * 20}%`,
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              delay: delay + 0.4 + i * 0.02,
              duration: 0.3,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>
    </LiquidCard>
  );
};

export default MetricCard;
