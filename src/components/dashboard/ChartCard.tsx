import { motion } from "framer-motion";
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface ChartCardProps {
  title: string;
  value: string;
  date: string;
  type: "area" | "bar";
  delay?: number;
}

const generateData = () => {
  return Array.from({ length: 19 }, (_, i) => ({
    day: i + 1,
    value: Math.floor(Math.random() * 60) + 20,
  }));
};

const ChartCard = ({ title, value, date, type, delay = 0 }: ChartCardProps) => {
  const data = generateData();

  return (
    <motion.div
      className="bg-card rounded-2xl p-6 border border-border shadow-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="mb-6">
        <p className="text-xs font-medium text-muted-foreground tracking-widest mb-1">
          {title}
        </p>
        <p className="font-mono text-2xl font-bold text-foreground">
          {value}
        </p>
        <p className="font-mono text-xs text-muted-foreground mt-1">
          {date}
        </p>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          {type === "area" ? (
            <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(168, 76%, 42%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(168, 76%, 42%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'hsl(220, 9%, 46%)' }} dy={10} />
              <YAxis hide />
              <Area type="monotone" dataKey="value" stroke="hsl(168, 76%, 42%)" strokeWidth={2} fill="url(#areaGradient)" />
            </AreaChart>
          ) : (
            <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'hsl(220, 9%, 46%)' }} dy={10} />
              <YAxis hide />
              <Bar dataKey="value" fill="hsl(168, 76%, 42%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ChartCard;
