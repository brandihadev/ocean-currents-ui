import { motion, AnimatePresence } from "framer-motion";
import { 
  Home,
  TrendingUp,
  Bot,
  Image,
  Sprout,
  ArrowLeftRight,
  Droplets,
  User,
  Vote,
  Shield,
  ChevronDown,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  { icon: Home, label: "Home", active: true },
  { icon: TrendingUp, label: "Live Pricing" },
  { icon: Bot, label: "Trading Bot" },
  { icon: Image, label: "NFTs", hasSubmenu: true },
  { icon: Sprout, label: "Farm" },
  { icon: ArrowLeftRight, label: "Swap" },
  { icon: Droplets, label: "Liquidity" },
  { icon: User, label: "Profile" },
  { icon: Vote, label: "Vote", hasSubmenu: true },
  { icon: Shield, label: "Authentication", hasSubmenu: true },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      {/* Toggle button - always visible */}
      <motion.button
        className="fixed top-5 left-5 z-50 p-2.5 rounded-xl 
          bg-card border border-border shadow-subtle
          hover:bg-secondary transition-colors"
        onClick={onToggle}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <AnimatePresence mode="wait">
          {collapsed ? (
            <motion.div
              key="open"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Menu size={18} className="text-foreground" />
            </motion.div>
          ) : (
            <motion.div
              key="close"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={18} className="text-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {!collapsed && (
          <motion.aside
            className="fixed left-0 top-0 h-screen w-64 
              bg-card border-r border-border
              z-40 flex flex-col"
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Logo area */}
            <motion.div 
              className="p-6 pt-5 flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
                <span className="text-background font-bold text-sm">{"<"}</span>
                <span className="text-background font-bold text-sm">{">"}</span>
              </div>
              <span className="text-lg font-semibold text-foreground tracking-tight">
                CRIPTIC
              </span>
            </motion.div>

            {/* User Profile */}
            <motion.div
              className="mx-4 mb-4 p-3 rounded-xl bg-secondary/50 flex items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-amber-400 to-orange-500">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" 
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  CAMERON WILLIAMSON
                </p>
                <p className="text-xs text-muted-foreground">admin</p>
              </div>
            </motion.div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto scrollbar-hide">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                
                return (
                  <motion.button
                    key={item.label}
                    className={`
                      relative w-full flex items-center justify-between px-4 py-3 rounded-xl
                      transition-all duration-200 group
                      ${item.active 
                        ? "bg-secondary text-foreground font-medium" 
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                      }
                    `}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.3 }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <Icon 
                        size={20} 
                        strokeWidth={item.active ? 2 : 1.5}
                      />
                      <span className="text-sm tracking-wide">
                        {item.label}
                      </span>
                    </div>
                    
                    {item.hasSubmenu && (
                      <ChevronDown size={16} className="opacity-50" />
                    )}
                  </motion.button>
                );
              })}
            </nav>

            {/* Bottom Gradient fade */}
            <div className="h-20 bg-gradient-to-t from-card to-transparent pointer-events-none" />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;