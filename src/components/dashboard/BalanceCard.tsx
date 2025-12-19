import { motion } from "framer-motion";
import { ChevronRight, Plus } from "lucide-react";

interface BalanceCardProps {
  delay?: number;
}

const BalanceCard = ({ delay = 0 }: BalanceCardProps) => {
  return (
    <motion.div
      className="bg-card/80 backdrop-blur-xl rounded-2xl p-6 border border-border/50 
        relative overflow-hidden shimmer"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 0 40px hsla(168, 76%, 46%, 0.15)"
      }}
    >
      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        <motion.div 
          className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-primary/30"
          animate={{
            boxShadow: [
              "0 0 15px hsla(168, 76%, 46%, 0.3)",
              "0 0 30px hsla(168, 76%, 46%, 0.5)",
              "0 0 15px hsla(168, 76%, 46%, 0.3)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&fit=crop&crop=face" 
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {/* Balance */}
      <div className="text-center mb-4">
        <p className="text-xs font-medium text-muted-foreground tracking-widest mb-1">
          MY BALANCE
        </p>
        <motion.p 
          className="font-mono text-3xl font-bold gradient-text text-glow-strong"
          animate={{
            textShadow: [
              "0 0 20px hsla(168, 76%, 46%, 0.4)",
              "0 0 40px hsla(168, 76%, 46%, 0.6)",
              "0 0 20px hsla(168, 76%, 46%, 0.4)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          $10,86,000
        </motion.p>
      </div>

      {/* Top Up Button */}
      <motion.button 
        className="w-full flex items-center justify-between px-4 py-3 
          border border-dashed border-primary/30 rounded-xl
          text-muted-foreground hover:border-primary hover:text-primary
          transition-all duration-300 group wave-button bg-primary/5"
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 0 20px hsla(168, 76%, 46%, 0.2)"
        }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 90, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Plus size={18} />
          </motion.div>
          <span className="text-sm font-medium tracking-wide">TOP UP BALANCE</span>
        </div>
        <motion.div
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronRight size={18} />
        </motion.div>
      </motion.button>
    </motion.div>
  );
};

export default BalanceCard;