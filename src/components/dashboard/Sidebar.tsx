import { motion, AnimatePresence } from "framer-motion";
import { 
  Category,
  Chart,
  Wallet,
  People,
  Setting2,
  Notification,
  Layer,
  Flash,
  ShieldTick,
  HambergerMenu,
  CloseSquare
} from "iconsax-react";
import AnimatedIcon from "../ocean/AnimatedIcon";
import { useState } from "react";

const menuItems = [
  { icon: Category, label: "Dashboard", active: true, variant: "float" as const },
  { icon: Chart, label: "Analytics", variant: "pulse" as const },
  { icon: Wallet, label: "Wallet", variant: "breathe" as const },
  { icon: Layer, label: "Protocols", variant: "wave" as const },
  { icon: People, label: "Community", variant: "float" as const },
  { icon: Flash, label: "Staking", variant: "pulse" as const },
  { icon: ShieldTick, label: "Security", variant: "breathe" as const },
  { icon: Notification, label: "Alerts", variant: "wave" as const },
  { icon: Setting2, label: "Settings", variant: "float" as const },
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
        className="fixed top-4 left-4 z-50 p-2 rounded-xl 
          backdrop-blur-xl border border-border/30
          bg-card/80 hover:bg-card transition-colors
          shadow-glow"
        onClick={onToggle}
        whileHover={{ scale: 1.05 }}
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
              <HambergerMenu size={20} color="hsl(var(--primary))" variant="Bold" />
            </motion.div>
          ) : (
            <motion.div
              key="close"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CloseSquare size={20} color="hsl(var(--primary))" variant="Bold" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {!collapsed && (
          <motion.aside
            className="fixed left-0 top-0 h-screen w-20 lg:w-64 
              backdrop-blur-2xl border-r border-border/20
              bg-gradient-to-b from-sidebar/90 to-sidebar/70
              z-40 flex flex-col"
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Logo area */}
            <motion.div 
              className="p-6 pt-16 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <motion.div
                className="w-10 h-10 rounded-xl bg-gradient-current flex items-center justify-center shadow-glow"
                animate={{ 
                  boxShadow: [
                    "0 0 20px hsla(189, 94%, 43%, 0.3)",
                    "0 0 40px hsla(189, 94%, 43%, 0.5)",
                    "0 0 20px hsla(189, 94%, 43%, 0.3)",
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Flash size={24} color="hsl(var(--primary-foreground))" variant="Bold" />
              </motion.div>
              <span className="hidden lg:block text-xl font-semibold text-glow gradient-text">
                OceanDAO
              </span>
            </motion.div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto scrollbar-hide">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.label}
                    className={`
                      relative w-full flex items-center gap-4 px-4 py-3 rounded-xl
                      transition-all duration-300 group
                      ${item.active 
                        ? "bg-primary/10 border border-primary/30 shadow-glow" 
                        : "hover:bg-secondary/50 border border-transparent hover:border-border/30"
                      }
                    `}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Wave propagation effect */}
                    {hoveredIndex === index && (
                      <motion.div
                        className="absolute inset-0 rounded-xl border border-primary/20"
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 1.1, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                      />
                    )}
                    
                    <AnimatedIcon 
                      size={24}
                      delay={index * 0.1}
                      glowColor={item.active ? "cyan" : "teal"}
                      variant={item.variant}
                    >
                      <Icon 
                        size={20} 
                        variant={item.active ? "Bold" : "TwoTone"}
                        color={item.active ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                      />
                    </AnimatedIcon>
                    
                    <span className={`
                      hidden lg:block font-medium text-sm
                      ${item.active ? "text-primary text-glow" : "text-sidebar-foreground/80 group-hover:text-foreground"}
                    `}>
                      {item.label}
                    </span>

                    {/* Active indicator */}
                    {item.active && (
                      <motion.div
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-gradient-current"
                        layoutId="activeIndicator"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </nav>

            {/* Neural connection line */}
            <div className="absolute right-0 top-20 bottom-20 w-px">
              <motion.div
                className="h-full w-full bg-gradient-to-b from-transparent via-primary/30 to-transparent"
                animate={{
                  backgroundPosition: ["0% 0%", "0% 200%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "100% 200%",
                }}
              />
            </div>

            {/* Bottom user section */}
            <motion.div
              className="p-4 border-t border-border/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-secondary/30 transition-colors cursor-pointer group">
                <motion.div
                  className="w-10 h-10 rounded-full bg-gradient-bio flex items-center justify-center"
                  animate={{ 
                    boxShadow: [
                      "0 0 10px hsla(158, 64%, 52%, 0.3)",
                      "0 0 20px hsla(158, 64%, 52%, 0.5)",
                      "0 0 10px hsla(158, 64%, 52%, 0.3)",
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <span className="text-sm font-bold text-primary-foreground">JD</span>
                </motion.div>
                <div className="hidden lg:block flex-1">
                  <p className="text-sm font-medium text-foreground group-hover:text-glow transition-all">
                    John Doe
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">0x1234...5678</p>
                </div>
              </div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
