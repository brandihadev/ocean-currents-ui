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
    bg: "bg-amber-50",
    text: "text-amber-500",
    icon: "text-amber-400/30"
  },
  teal: {
    bg: "bg-teal-50",
    text: "text-teal-500",
    icon: "text-teal-400/30"
  },
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-500",
    icon: "text-blue-400/30"
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
      className={`relative ${colors.bg} rounded-2xl p-6 overflow-hidden hover-lift`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      {/* Large background icon */}
      <div className={`absolute top-4 left-4 text-8xl font-bold ${colors.icon} select-none`}>
        {icon}
      </div>

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
            <div className={`flex items-center gap-1 text-sm font-medium
              ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}
            >
              {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {isPositive ? '+' : ''}{change}%
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CryptoCard;