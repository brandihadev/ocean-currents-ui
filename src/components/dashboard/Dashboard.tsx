import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Moon, Zap, Wallet } from "lucide-react";
import Sidebar from "./Sidebar";
import CryptoCard from "./CryptoCard";
import BalanceCard from "./BalanceCard";
import ChartCard from "./ChartCard";
import CryptoTable from "./CryptoTable";
import TransactionHistory from "./TransactionHistory";
import WaveCursor from "../cursor/WaveCursor";
import AnimatedIcon from "../icons/AnimatedIcon";

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Custom Wave Cursor */}
      <WaveCursor />

      {/* Background ambient effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, hsla(168, 76%, 46%, 0.08) 0%, transparent 70%)"
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, hsla(189, 94%, 43%, 0.06) 0%, transparent 70%)"
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Layout */}
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      {/* Main content */}
      <motion.main 
        className="lg:ml-64 min-h-screen relative z-10"
        animate={{ marginLeft: sidebarCollapsed ? 0 : undefined }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-background/60 backdrop-blur-2xl border-b border-border/50">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Search */}
            <div className="flex items-center gap-3 flex-1 max-w-md">
              <motion.div 
                className="relative flex-1"
                whileFocus={{ scale: 1.01 }}
              >
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text"
                  placeholder="Search assets, transactions..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-card/60 backdrop-blur-xl border border-border/50
                    text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30
                    focus:border-primary/50 transition-all duration-300"
                />
              </motion.div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Theme toggle */}
              <motion.button 
                className="p-3 rounded-xl bg-card/60 backdrop-blur-xl border border-border/50
                  hover:border-primary/30 transition-all duration-300 group wave-button"
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px hsla(168, 76%, 46%, 0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatedIcon icon={Moon} size={18} variant="float" />
              </motion.button>
              
              {/* Notification */}
              <motion.button 
                className="p-3 rounded-xl bg-card/60 backdrop-blur-xl border border-border/50
                  hover:border-primary/30 transition-all duration-300 relative group wave-button"
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px hsla(168, 76%, 46%, 0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatedIcon icon={Zap} size={18} variant="pulse" />
                <motion.span 
                  className="absolute top-2 right-2 w-2.5 h-2.5 bg-primary rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      "0 0 5px hsla(168, 76%, 46%, 0.5)",
                      "0 0 15px hsla(168, 76%, 46%, 0.8)",
                      "0 0 5px hsla(168, 76%, 46%, 0.5)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.button>

              {/* Connect Button */}
              <motion.button 
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm
                  bg-gradient-to-r from-primary to-accent text-primary-foreground
                  hover:opacity-90 transition-opacity wave-button"
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: "0 0 25px hsla(168, 76%, 46%, 0.4)" 
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Wallet size={16} />
                CONNECT
              </motion.button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 lg:p-8">
          {/* Top row - Crypto cards + Balance */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CryptoCard 
                  name="BITCOIN"
                  symbol="BTC"
                  amount="0.2231345"
                  usdValue="11,032.24"
                  change={12.5}
                  icon="₿"
                  color="amber"
                  delay={0}
                />
                <CryptoCard 
                  name="TETHER"
                  symbol="USDT"
                  amount="1.2345"
                  usdValue="1,032.24"
                  change={-1.5}
                  icon="₮"
                  color="teal"
                  delay={0.1}
                />
                <CryptoCard 
                  name="CARDANO"
                  symbol="ADA"
                  amount="1.2370"
                  usdValue="532.94"
                  change={12.5}
                  icon="◈"
                  color="blue"
                  delay={0.2}
                />
              </div>
            </div>
            <BalanceCard delay={0.3} />
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ChartCard 
              title="LIQUIDITY"
              value="547.8M"
              date="June 19, 2021"
              type="area"
              delay={0.4}
            />
            <ChartCard 
              title="VOLUME 24H"
              value="547.8M"
              date="June 19, 2021"
              type="bar"
              delay={0.5}
            />
          </div>

          {/* Crypto Table */}
          <CryptoTable delay={0.6} />

          {/* Transaction History */}
          <TransactionHistory delay={0.7} />
        </div>
      </motion.main>
    </div>
  );
};

export default Dashboard;