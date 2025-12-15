import { motion } from "framer-motion";
import LiquidCard from "../ocean/LiquidCard";

const assets = [
  { 
    symbol: "ETH", 
    name: "Ethereum", 
    balance: "12.458", 
    value: "$24,891.45", 
    change: 5.23,
    color: "#627EEA",
    allocation: 45
  },
  { 
    symbol: "BTC", 
    name: "Bitcoin (Wrapped)", 
    balance: "0.842", 
    value: "$18,524.80", 
    change: 2.14,
    color: "#F7931A",
    allocation: 33
  },
  { 
    symbol: "AAVE", 
    name: "Aave", 
    balance: "245.12", 
    value: "$8,175.24", 
    change: -1.87,
    color: "#B6509E",
    allocation: 15
  },
  { 
    symbol: "UNI", 
    name: "Uniswap", 
    balance: "892.50", 
    value: "$3,891.12", 
    change: 8.42,
    color: "#FF007A",
    allocation: 7
  },
];

interface AssetAllocationProps {
  delay?: number;
}

const AssetAllocation = ({ delay = 0 }: AssetAllocationProps) => {
  return (
    <LiquidCard delay={delay} className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Asset Allocation</h3>
        <p className="text-sm text-muted-foreground">Portfolio breakdown by token</p>
      </div>

      {/* Donut chart placeholder */}
      <div className="relative w-48 h-48 mx-auto mb-6">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="hsl(var(--secondary))"
            strokeWidth="12"
          />
          
          {/* Asset segments */}
          {assets.map((asset, i) => {
            const previousOffset = assets
              .slice(0, i)
              .reduce((sum, a) => sum + a.allocation, 0);
            
            return (
              <motion.circle
                key={asset.symbol}
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={asset.color}
                strokeWidth="12"
                strokeDasharray={`${asset.allocation * 2.51} 251`}
                strokeDashoffset={-previousOffset * 2.51}
                initial={{ strokeDasharray: "0 251" }}
                animate={{ strokeDasharray: `${asset.allocation * 2.51} 251` }}
                transition={{ delay: delay + 0.3 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                style={{
                  filter: `drop-shadow(0 0 8px ${asset.color}50)`,
                }}
              />
            );
          })}
        </svg>
        
        {/* Center text */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.5 }}
        >
          <span className="text-2xl font-bold text-foreground">$55.5K</span>
          <span className="text-xs text-muted-foreground">Total Value</span>
        </motion.div>
      </div>

      {/* Asset list */}
      <div className="space-y-3">
        {assets.map((asset, i) => (
          <motion.div
            key={asset.symbol}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/30 transition-colors cursor-pointer group"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.4 + i * 0.1 }}
          >
            {/* Token icon */}
            <motion.div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-background"
              style={{ 
                backgroundColor: asset.color,
                boxShadow: `0 0 12px ${asset.color}50`,
              }}
              whileHover={{ scale: 1.1 }}
            >
              {asset.symbol.slice(0, 2)}
            </motion.div>

            {/* Token details */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground text-sm">{asset.symbol}</span>
                <span className="text-sm text-foreground">{asset.value}</span>
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-xs text-muted-foreground">{asset.balance}</span>
                <span className={`text-xs ${asset.change >= 0 ? "text-bio-emerald" : "text-destructive"}`}>
                  {asset.change >= 0 ? "+" : ""}{asset.change}%
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </LiquidCard>
  );
};

export default AssetAllocation;
