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
  X,
  Zap
} from "lucide-react";
import { useState } from "react";
import AnimatedIcon from "../icons/AnimatedIcon";

const menuItems = [
  { icon: Home, label: "Home", active: true, variant: "float" as const },
  { icon: TrendingUp, label: "Live Pricing", variant: "pulse" as const },
  { icon: Bot, label: "Trading Bot", variant: "bounce" as const },
  { icon: Image, label: "NFTs", hasSubmenu: true, variant: "glow" as const },
  { icon: Sprout, label: "Farm", variant: "wave" as const },
  { icon: ArrowLeftRight, label: "Swap", variant: "float" as const },
  { icon: Droplets, label: "Liquidity", variant: "pulse" as const },
  { icon: User, label: "Profile", variant: "bounce" as const },
  { icon: Vote, label: "Vote", hasSubmenu: true, variant: "glow" as const },
  { icon: Shield, label: "Authentication", hasSubmenu: true, variant: "wave" as const },
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
          bg-card/80 backdrop-blur-xl border border-border/50
          hover:border-primary/30 transition-all duration-300
          group wave-button"
        onClick={onToggle}
        whileHover={{ scale: 1.05, boxShadow: "0 0 20px hsla(168, 76%, 46%, 0.3)" }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {collapsed ? (
            <motion.div
              key="open"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={18} className="text-primary" />
            </motion.div>
          ) : (
            <motion.div
              key="close"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={18} className="text-primary" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {!collapsed && (
          <motion.aside
            className="fixed left-0 top-0 h-screen w-64 
              bg-card/90 backdrop-blur-2xl border-r border-border/50
              z-40 flex flex-col shimmer"
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Logo area */}
            <motion.div 
              className="p-6 pt-5 flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <motion.div 
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center"
                animate={{
                  boxShadow: [
                    "0 0 15px hsla(168, 76%, 46%, 0.4)",
                    "0 0 25px hsla(168, 76%, 46%, 0.6)",
                    "0 0 15px hsla(168, 76%, 46%, 0.4)",
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Zap size={18} className="text-primary-foreground" />
              </motion.div>
              <span className="text-lg font-semibold gradient-text text-glow tracking-tight">
                CRIPTIC
              </span>
            </motion.div>

            {/* User Profile */}
            <motion.div
              className="mx-4 mb-4 p-3 rounded-xl bg-secondary/40 border border-border/30 
                flex items-center gap-3 group hover:border-primary/30 transition-all duration-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div 
                className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/30"
                animate={{
                  boxShadow: [
                    "0 0 10px hsla(168, 76%, 46%, 0.3)",
                    "0 0 20px hsla(168, 76%, 46%, 0.5)",
                    "0 0 10px hsla(168, 76%, 46%, 0.3)",
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" 
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate group-hover:text-glow transition-all">
                  CAMERON WILLIAMSON
                </p>
                <p className="text-xs text-muted-foreground font-mono">admin</p>
              </div>
            </motion.div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto scrollbar-hide">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  className={`
                    relative w-full flex items-center justify-between px-4 py-3 rounded-xl
                    transition-all duration-300 group wave-button
                    ${item.active 
                      ? "bg-primary/10 text-primary border border-primary/30" 
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground border border-transparent hover:border-border/50"
                    }
                  `}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index + 0.2, duration: 0.4 }}
                  whileHover={{ x: 6, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    boxShadow: item.active ? "0 0 20px hsla(168, 76%, 46%, 0.15)" : "none"
                  }}
                >
                  {/* Hover glow effect */}
                  {hoveredIndex === index && !item.active && (
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        background: "radial-gradient(ellipse at left, hsla(168, 76%, 46%, 0.1) 0%, transparent 70%)"
                      }}
                    />
                  )}
                  
                  <div className="flex items-center gap-3 relative z-10">
                    <AnimatedIcon 
                      icon={item.icon}
                      size={20}
                      isActive={item.active}
                      variant={item.variant}
                    />
                    <span className={`text-sm tracking-wide ${item.active ? "text-glow" : ""}`}>
                      {item.label}
                    </span>
                  </div>
                  
                  {item.hasSubmenu && (
                    <motion.div
                      animate={{ rotate: hoveredIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={16} className="opacity-50" />
                    </motion.div>
                  )}

                  {/* Active indicator */}
                  {item.active && (
                    <motion.div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
                      style={{
                        background: "linear-gradient(180deg, hsl(168, 76%, 46%) 0%, hsl(189, 94%, 43%) 100%)",
                        boxShadow: "0 0 15px hsla(168, 76%, 46%, 0.6)"
                      }}
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </nav>

            {/* Bottom glow line */}
            <motion.div 
              className="mx-4 h-px mb-4"
              style={{
                background: "linear-gradient(90deg, transparent, hsl(168, 76%, 46%), transparent)"
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Bottom Gradient fade */}
            <div className="h-20 bg-gradient-to-t from-card to-transparent pointer-events-none" />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;