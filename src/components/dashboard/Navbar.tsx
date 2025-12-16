import { motion } from "framer-motion";
import { SearchNormal1, Notification, ArrowDown2, Magicpen } from "iconsax-react";
import { useState } from "react";
import AnimatedIcon from "../ocean/AnimatedIcon";

const Navbar = () => {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <motion.header
      className="fixed top-0 left-20 lg:left-64 right-0 h-16 z-30
        backdrop-blur-xl border-b border-border/20
        bg-gradient-to-r from-background/80 to-background/60"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="h-full px-6 flex items-center justify-between gap-4">
        {/* Breadcrumb / Title */}
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
          <motion.span
            className="px-2 py-1 text-xs font-mono rounded-md bg-primary/10 text-primary border border-primary/20 flex items-center gap-1"
            animate={{
              boxShadow: [
                "0 0 10px hsla(189, 94%, 43%, 0.2)",
                "0 0 20px hsla(189, 94%, 43%, 0.3)",
                "0 0 10px hsla(189, 94%, 43%, 0.2)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <AnimatedIcon size={14} variant="pulse" glowColor="cyan">
              <Magicpen size={12} variant="Bold" color="hsl(var(--primary))" />
            </AnimatedIcon>
            Live
          </motion.span>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className={`
            relative flex-1 max-w-md
            transition-all duration-500
            ${searchFocused ? "max-w-lg" : ""}
          `}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className={`
            relative flex items-center rounded-xl
            border backdrop-blur-lg transition-all duration-300
            ${searchFocused 
              ? "border-primary/50 bg-secondary/50 shadow-glow" 
              : "border-border/30 bg-secondary/30 hover:border-border/50"
            }
          `}>
            <AnimatedIcon 
              size={20} 
              variant={searchFocused ? "breathe" : "float"} 
              glowColor="cyan"
              className="ml-3"
            >
              <SearchNormal1 
                size={16} 
                variant={searchFocused ? "Bold" : "TwoTone"}
                color={searchFocused ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
              />
            </AnimatedIcon>
            <input
              type="text"
              placeholder="Search protocols, tokens, wallets..."
              className="w-full bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <div className="hidden sm:flex items-center gap-1 pr-3">
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-muted text-muted-foreground border border-border/50">
                ⌘
              </kbd>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-muted text-muted-foreground border border-border/50">
                K
              </kbd>
            </div>
          </div>
          
          {/* Search glow effect */}
          {searchFocused && (
            <motion.div
              className="absolute inset-0 rounded-xl pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                background: "radial-gradient(ellipse at center, hsla(189, 94%, 43%, 0.1) 0%, transparent 70%)",
              }}
            />
          )}
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          {/* Notification Bell */}
          <motion.button
            className="relative p-2.5 rounded-xl bg-secondary/30 border border-border/30 
              hover:bg-secondary/50 hover:border-primary/30 transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatedIcon size={24} variant="wave" glowColor="cyan">
              <Notification 
                size={20} 
                variant="TwoTone" 
                color="hsl(var(--muted-foreground))"
                className="group-hover:text-primary transition-colors"
              />
            </AnimatedIcon>
            
            {/* Notification dot */}
            <motion.span
              className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-bio-emerald"
              animate={{
                scale: [1, 1.2, 1],
                boxShadow: [
                  "0 0 5px hsla(158, 64%, 52%, 0.5)",
                  "0 0 15px hsla(158, 64%, 52%, 0.8)",
                  "0 0 5px hsla(158, 64%, 52%, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>

          {/* Network Selector */}
          <motion.button
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl 
              bg-secondary/30 border border-border/30
              hover:bg-secondary/50 hover:border-primary/30 transition-all duration-300 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="w-2.5 h-2.5 rounded-full bg-bio-teal"
              animate={{
                boxShadow: [
                  "0 0 5px hsla(168, 76%, 42%, 0.5)",
                  "0 0 15px hsla(168, 76%, 42%, 0.8)",
                  "0 0 5px hsla(168, 76%, 42%, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-foreground">Ethereum</span>
            <AnimatedIcon size={20} variant="float" glowColor="teal">
              <ArrowDown2 
                size={16} 
                variant="TwoTone" 
                color="hsl(var(--muted-foreground))"
                className="group-hover:text-primary transition-colors"
              />
            </AnimatedIcon>
          </motion.button>

          {/* Connect Wallet Button */}
          <motion.button
            className="relative px-5 py-2.5 rounded-xl font-medium text-sm
              bg-gradient-current text-primary-foreground
              shadow-glow overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ["-200%", "200%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <span className="relative z-10">Connect Wallet</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom shimmer line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, hsla(189, 94%, 43%, 0.3), transparent)",
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["200% 0%", "-200% 0%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.header>
  );
};

export default Navbar;
