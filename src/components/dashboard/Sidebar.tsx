import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  BarChart3, 
  Wallet, 
  Users, 
  Settings, 
  Bell,
  Layers,
  Zap,
  Shield
} from "lucide-react";
import FloatingIcon from "../ocean/FloatingIcon";
import { useState } from "react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: BarChart3, label: "Analytics" },
  { icon: Wallet, label: "Wallet" },
  { icon: Layers, label: "Protocols" },
  { icon: Users, label: "Community" },
  { icon: Zap, label: "Staking" },
  { icon: Shield, label: "Security" },
  { icon: Bell, label: "Alerts" },
  { icon: Settings, label: "Settings" },
];

const Sidebar = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.aside
      className="fixed left-0 top-0 h-screen w-20 lg:w-64 
        backdrop-blur-2xl border-r border-border/20
        bg-gradient-to-b from-sidebar/90 to-sidebar/70
        z-40 flex flex-col"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Logo area */}
      <motion.div 
        className="p-6 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
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
          <Zap className="w-6 h-6 text-primary-foreground" />
        </motion.div>
        <span className="hidden lg:block text-xl font-semibold text-glow gradient-text">
          OceanDAO
        </span>
      </motion.div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto scrollbar-hide">
        {menuItems.map((item, index) => (
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
            
            <FloatingIcon 
              icon={item.icon} 
              size={20}
              delay={index * 0.1}
              glowColor={item.active ? "cyan" : "teal"}
            />
            
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
        ))}
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
  );
};

export default Sidebar;
