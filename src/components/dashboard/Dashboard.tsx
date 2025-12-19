import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Sun, Zap } from "lucide-react";
import Sidebar from "./Sidebar";
import CryptoCard from "./CryptoCard";
import BalanceCard from "./BalanceCard";
import ChartCard from "./ChartCard";
import CryptoTable from "./CryptoTable";
import TransactionHistory from "./TransactionHistory";

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Layout */}
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      {/* Main content */}
      <motion.main 
        className="lg:ml-64 min-h-screen"
        animate={{ marginLeft: sidebarCollapsed ? 0 : undefined }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Search */}
            <div className="flex items-center gap-3 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border
                    text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Theme toggle */}
              <button className="p-2.5 rounded-xl hover:bg-secondary transition-colors">
                <Sun size={18} className="text-muted-foreground" />
              </button>
              
              {/* Notification */}
              <button className="p-2.5 rounded-xl hover:bg-secondary transition-colors relative">
                <Zap size={18} className="text-muted-foreground" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
              </button>

              {/* Connect Button */}
              <motion.button 
                className="px-5 py-2.5 bg-foreground text-background rounded-xl font-medium text-sm
                  hover:opacity-90 transition-opacity"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
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