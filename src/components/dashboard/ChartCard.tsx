import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import LiquidCard from "../ocean/LiquidCard";

const data = [
  { name: "Jan", value: 12000, volume: 4000 },
  { name: "Feb", value: 19000, volume: 3000 },
  { name: "Mar", value: 15000, volume: 5000 },
  { name: "Apr", value: 22000, volume: 4500 },
  { name: "May", value: 18000, volume: 6000 },
  { name: "Jun", value: 25000, volume: 5500 },
  { name: "Jul", value: 32000, volume: 7000 },
  { name: "Aug", value: 28000, volume: 6500 },
  { name: "Sep", value: 35000, volume: 8000 },
  { name: "Oct", value: 42000, volume: 7500 },
  { name: "Nov", value: 38000, volume: 9000 },
  { name: "Dec", value: 48000, volume: 8500 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="backdrop-blur-xl bg-card/90 border border-primary/30 rounded-xl p-4 shadow-glow"
    >
      <p className="text-sm text-muted-foreground mb-2">{label}</p>
      {payload.map((item: any, index: number) => (
        <p key={index} className="text-sm font-medium" style={{ color: item.color }}>
          {item.name}: ${item.value.toLocaleString()}
        </p>
      ))}
    </motion.div>
  );
};

interface ChartCardProps {
  delay?: number;
}

const ChartCard = ({ delay = 0 }: ChartCardProps) => {
  return (
    <LiquidCard delay={delay} className="p-6 col-span-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Portfolio Performance</h3>
          <p className="text-sm text-muted-foreground">Total Value Locked over time</p>
        </div>
        
        {/* Time filters */}
        <div className="flex gap-2">
          {["1D", "1W", "1M", "1Y", "ALL"].map((period, i) => (
            <motion.button
              key={period}
              className={`
                px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300
                ${i === 3 
                  ? "bg-primary/20 text-primary border border-primary/30 shadow-glow" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {period}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <motion.div
        className="h-72"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.3 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(189, 94%, 43%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(189, 94%, 43%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(168, 76%, 42%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(168, 76%, 42%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsla(217, 33%, 18%, 0.5)" 
              vertical={false}
            />
            <XAxis 
              dataKey="name" 
              stroke="hsl(199, 20%, 55%)"
              tick={{ fill: "hsl(199, 20%, 55%)", fontSize: 12 }}
              axisLine={{ stroke: "hsla(217, 33%, 18%, 0.5)" }}
            />
            <YAxis 
              stroke="hsl(199, 20%, 55%)"
              tick={{ fill: "hsl(199, 20%, 55%)", fontSize: 12 }}
              axisLine={{ stroke: "hsla(217, 33%, 18%, 0.5)" }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="volume"
              stroke="hsl(168, 76%, 42%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorVolume)"
              name="Volume"
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(189, 94%, 43%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
              name="TVL"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Stats row */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        {[
          { label: "24h Change", value: "+12.4%", positive: true },
          { label: "7d Average", value: "$42.3K", positive: true },
          { label: "ATH", value: "$48.2K", positive: true },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="text-center p-3 rounded-xl bg-secondary/30 border border-border/20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.5 + i * 0.1 }}
          >
            <p className={`text-lg font-bold ${stat.positive ? "text-bio-emerald" : "text-destructive"}`}>
              {stat.value}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </LiquidCard>
  );
};

export default ChartCard;
