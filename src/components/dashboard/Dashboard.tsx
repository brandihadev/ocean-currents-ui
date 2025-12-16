import { motion } from "framer-motion";
import { Wallet, TrendUp, Coin1, Activity } from "iconsax-react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import MetricCard from "./MetricCard";
import ChartCard from "./ChartCard";
import TransactionList from "./TransactionList";
import AssetAllocation from "./AssetAllocation";
import OceanBackground from "../ocean/OceanBackground";
import CursorWave from "../ocean/CursorWave";

const metrics = [
  {
    title: "Total Balance",
    value: "$55,482.32",
    change: 12.4,
    icon: <Wallet size={20} variant="Bold" color="hsl(var(--primary-foreground))" />,
    accentColor: "cyan" as const,
  },
  {
    title: "Monthly Profit",
    value: "$8,942.18",
    change: 23.7,
    icon: <TrendUp size={20} variant="Bold" color="hsl(var(--primary-foreground))" />,
    accentColor: "bio" as const,
  },
  {
    title: "Staked Assets",
    value: "$24,128.00",
    change: 5.2,
    icon: <Coin1 size={20} variant="Bold" color="hsl(var(--primary-foreground))" />,
    accentColor: "teal" as const,
  },
  {
    title: "Active Positions",
    value: "12",
    change: 0,
    icon: <Activity size={20} variant="Bold" color="hsl(var(--primary-foreground))" />,
    accentColor: "cyan" as const,
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ocean immersive effects */}
      <OceanBackground />
      <CursorWave />

      {/* Layout */}
      <Sidebar />
      <Navbar />

      {/* Main content */}
      <main className="ml-20 lg:ml-64 pt-16 min-h-screen relative z-10">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Welcome section */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-3xl lg:text-4xl font-bold text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Welcome back,{" "}
              <span className="gradient-text text-glow-strong">John</span>
            </motion.h1>
            <motion.p
              className="mt-2 text-muted-foreground text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Here's what's happening with your portfolio today.
            </motion.p>
          </motion.div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            {metrics.map((metric, i) => (
              <MetricCard
                key={metric.title}
                {...metric}
                delay={0.2 + i * 0.1}
              />
            ))}
          </div>

          {/* Charts and Lists */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <ChartCard delay={0.5} />
            <TransactionList delay={0.6} />
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AssetAllocation delay={0.7} />
            
            {/* Protocol Stats Card */}
            <motion.div
              className="lg:col-span-2 relative overflow-hidden rounded-xl 
                backdrop-blur-xl border border-border/30
                bg-gradient-to-br from-card/80 to-card/40 shadow-ocean p-6"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {/* Shimmer overlay */}
              <div className="absolute inset-0 shimmer pointer-events-none" />
              
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-foreground mb-4">Protocol Analytics</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Total Protocols", value: "8", sub: "Connected" },
                    { label: "Avg. APY", value: "14.2%", sub: "Across all" },
                    { label: "Gas Saved", value: "$892", sub: "This month" },
                    { label: "Rewards", value: "1,245", sub: "Points earned" },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      className="p-4 rounded-xl bg-secondary/30 border border-border/20 
                        hover:border-primary/20 hover:bg-secondary/40 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + i * 0.1 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                    >
                      <motion.p
                        className="text-2xl font-bold gradient-text"
                        animate={{
                          textShadow: [
                            "0 0 20px hsla(189, 94%, 43%, 0.4)",
                            "0 0 40px hsla(189, 94%, 43%, 0.6)",
                            "0 0 20px hsla(189, 94%, 43%, 0.4)",
                          ],
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                      >
                        {stat.value}
                      </motion.p>
                      <p className="text-sm text-foreground font-medium mt-1">{stat.label}</p>
                      <p className="text-xs text-muted-foreground">{stat.sub}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Neural connection visualization */}
                <div className="mt-6 h-32 relative overflow-hidden rounded-xl bg-secondary/20 border border-border/20">
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    {/* Neural nodes */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 rounded-full bg-primary"
                        style={{
                          left: `${12 + i * 12}%`,
                          top: `${30 + Math.sin(i * 0.8) * 20}%`,
                          boxShadow: "0 0 15px hsla(189, 94%, 43%, 0.6)",
                        }}
                        animate={{
                          y: [0, -5, 0],
                          scale: [1, 1.2, 1],
                          boxShadow: [
                            "0 0 15px hsla(189, 94%, 43%, 0.6)",
                            "0 0 30px hsla(189, 94%, 43%, 0.8)",
                            "0 0 15px hsla(189, 94%, 43%, 0.6)",
                          ],
                        }}
                        transition={{
                          duration: 3 + i * 0.2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                    
                    {/* Connection lines */}
                    <svg className="absolute inset-0 w-full h-full">
                      {[...Array(7)].map((_, i) => (
                        <motion.line
                          key={i}
                          x1={`${12 + i * 12}%`}
                          y1={`${30 + Math.sin(i * 0.8) * 20}%`}
                          x2={`${12 + (i + 1) * 12}%`}
                          y2={`${30 + Math.sin((i + 1) * 0.8) * 20}%`}
                          stroke="url(#neural-gradient)"
                          strokeWidth="1"
                          strokeDasharray="4 2"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.5 }}
                          transition={{ delay: 1.3 + i * 0.1, duration: 0.5 }}
                        />
                      ))}
                      <defs>
                        <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsla(189, 94%, 43%, 0)" />
                          <stop offset="50%" stopColor="hsla(189, 94%, 43%, 0.8)" />
                          <stop offset="100%" stopColor="hsla(189, 94%, 43%, 0)" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Overlay text */}
                    <p className="text-xs text-muted-foreground font-mono z-10">
                      Protocol connections active • Real-time sync enabled
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
