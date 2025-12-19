import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

interface CryptoTableProps {
  delay?: number;
}

const cryptoData = [
  { 
    rank: 1, 
    name: "Bitcoin", 
    symbol: "BTC", 
    price: "$30382.81", 
    change: -4.06, 
    volume: "$43.43 B", 
    marketCap: "$572.34 B",
    trend: [30, 35, 32, 28, 35, 40, 38]
  },
  { 
    rank: 2, 
    name: "Ethereum", 
    symbol: "ETH", 
    price: "$1882.03", 
    change: -6.63, 
    volume: "$21.39 B", 
    marketCap: "$243.87 B",
    trend: [40, 35, 30, 25, 28, 32, 30]
  },
  { 
    rank: 3, 
    name: "Tether USD", 
    symbol: "USDT", 
    price: "$1.01", 
    change: 0.5, 
    volume: "$25.43 B", 
    marketCap: "$72.35 B",
    trend: [30, 31, 30, 31, 30, 31, 31]
  },
  { 
    rank: 4, 
    name: "Binance Coin", 
    symbol: "BNB", 
    price: "$302.45", 
    change: 0.06, 
    volume: "$13.98 B", 
    marketCap: "$42.41 B",
    trend: [35, 38, 36, 40, 42, 41, 40]
  },
  { 
    rank: 5, 
    name: "USD Coin", 
    symbol: "USDC", 
    price: "$1.00", 
    change: 0, 
    volume: "$5.54 B", 
    marketCap: "$28.33 B",
    trend: [30, 30, 30, 30, 30, 30, 30]
  },
  { 
    rank: 6, 
    name: "Cardano", 
    symbol: "ADA", 
    price: "$0.5797", 
    change: 2.6, 
    volume: "$1.5 B", 
    marketCap: "$19.16 B",
    trend: [20, 25, 28, 32, 35, 38, 40]
  },
  { 
    rank: 7, 
    name: "Doge Coin", 
    symbol: "DOGE", 
    price: "$0.0823", 
    change: 1.06, 
    volume: "$345.43 M", 
    marketCap: "$10.77 B",
    trend: [25, 28, 30, 28, 32, 35, 33]
  },
];

const MiniChart = ({ data, isPositive }: { data: number[], isPositive: boolean }) => {
  const chartData = data.map((value, index) => ({ value, index }));
  const color = isPositive ? "hsl(158, 64%, 52%)" : "hsl(0, 84%, 60%)";

  return (
    <ResponsiveContainer width={100} height={40}>
      <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`miniGradient-${isPositive}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#miniGradient-${isPositive})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const CryptoTable = ({ delay = 0 }: CryptoTableProps) => {
  return (
    <motion.div
      className="bg-card rounded-2xl border border-border shadow-card overflow-hidden mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <h2 className="text-lg font-semibold text-foreground">Top Cryptocurrency</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-medium text-muted-foreground py-3 px-6">#</th>
              <th className="text-left text-xs font-medium text-muted-foreground py-3 px-6">Name</th>
              <th className="text-left text-xs font-medium text-muted-foreground py-3 px-6">Price</th>
              <th className="text-left text-xs font-medium text-muted-foreground py-3 px-6">24H Change</th>
              <th className="text-left text-xs font-medium text-muted-foreground py-3 px-6">24H Volume</th>
              <th className="text-left text-xs font-medium text-muted-foreground py-3 px-6">Market Cap</th>
              <th className="text-left text-xs font-medium text-muted-foreground py-3 px-6">7D Chart</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((crypto, index) => {
              const isPositive = crypto.change >= 0;
              
              return (
                <motion.tr 
                  key={crypto.symbol}
                  className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: delay + index * 0.05 }}
                >
                  <td className="py-4 px-6 font-mono text-sm text-muted-foreground">
                    {crypto.rank}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{crypto.name}</span>
                      <span className="text-xs text-muted-foreground">{crypto.symbol}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-mono text-sm text-foreground">
                    {crypto.price}
                  </td>
                  <td className="py-4 px-6">
                    <div className={`inline-flex items-center gap-1 text-sm font-medium
                      ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}
                    >
                      {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      {crypto.change}%
                    </div>
                  </td>
                  <td className="py-4 px-6 font-mono text-sm text-muted-foreground">
                    {crypto.volume}
                  </td>
                  <td className="py-4 px-6 font-mono text-sm text-muted-foreground">
                    {crypto.marketCap}
                  </td>
                  <td className="py-4 px-6">
                    <MiniChart data={crypto.trend} isPositive={isPositive} />
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default CryptoTable;