import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

interface CryptoCardProps {
  name: string;
  symbol: string;
  amount: string;
  usdValue: string;
  change: number;
  icon: string;
  color: "amber" | "teal" | "blue";
  delay?: number;
}

const colorMap = {
  amber: {
    bg: "from-amber-500/10 to-amber-600/5",
    border: "border-amber-500/20",
    icon: "text-amber-400/20",
    glow: "0 0 40px hsla(38, 92%, 50%, 0.15)"
  },
  teal: {
    bg: "from-teal-500/10 to-teal-600/5",
    border: "border-teal-500/20",
    icon: "text-teal-400/20",
    glow: "0 0 40px hsla(168, 76%, 46%, 0.15)"
  },
  blue: {
    bg: "from-blue-500/10 to-blue-600/5",
    border: "border-blue-500/20",
    icon: "text-blue-400/20",
    glow: "0 0 40px hsla(217, 91%, 60%, 0.15)"
  }
};

const CryptoCard = ({ 
  name, 
  symbol, 
  amount, 
  usdValue, 
  change, 
  icon,
  color,
  delay = 0 
}: CryptoCardProps) => {
  const isPositive = change >= 0;
  const colors = colorMap[color];

  return (
    <motion.div
      className={`relative bg-gradient-to-br ${colors.bg} backdrop-blur-xl rounded-2xl p-6 
        border ${colors.border} overflow-hidden group wave-button`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        y: -4, 
        scale: 1.02,
        boxShadow: colors.glow
      }}
    >
      {/* Large background icon */}
      <motion.div 
        className={`absolute top-4 left-4 text-8xl font-bold ${colors.icon} select-none`}
        animate={{
          opacity: [0.15, 0.25, 0.15],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {icon}
      </motion.div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 shimmer" />

      {/* Content */}
      <div className="relative z-10">
        <p className="text-xs font-medium text-muted-foreground tracking-widest mb-12">
          {name}
        </p>

        <div className="space-y-1">
          <p className="font-mono text-2xl font-semibold text-foreground">
            {amount} <span className="text-muted-foreground">{symbol}</span>
          </p>
          
          <div className="flex items-center justify-between">
            <p className="font-mono text-sm text-muted-foreground">
              {usdValue} USD
            </p>
            <motion.div 
              className={`flex items-center gap-1 text-sm font-medium px-2 py-0.5 rounded-md
                ${isPositive 
                  ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' 
                  : 'text-red-400 bg-red-500/10 border border-red-500/20'
                }`}
              whileHover={{ scale: 1.05 }}
            >
              {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {isPositive ? '+' : ''}{change}%
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CryptoCard;