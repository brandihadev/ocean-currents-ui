import { motion } from "framer-motion";
import { ChevronRight, Plus } from "lucide-react";

interface BalanceCardProps {
  delay?: number;
}

const BalanceCard = ({ delay = 0 }: BalanceCardProps) => {
  return (
    <motion.div
      className="bg-card rounded-2xl p-6 border border-border shadow-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-primary/20">
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&fit=crop&crop=face" 
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Balance */}
      <div className="text-center mb-4">
        <p className="text-xs font-medium text-muted-foreground tracking-widest mb-1">
          MY BALANCE
        </p>
        <p className="font-mono text-3xl font-bold text-foreground">
          $10,86,000
        </p>
      </div>

      {/* Top Up Button */}
      <motion.button 
        className="w-full flex items-center justify-between px-4 py-3 
          border-2 border-dashed border-border rounded-xl
          text-muted-foreground hover:border-primary hover:text-primary
          transition-colors group"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center gap-2">
          <Plus size={18} />
          <span className="text-sm font-medium tracking-wide">TOP UP BALANCE</span>
        </div>
        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </motion.div>
  );
};

export default BalanceCard;