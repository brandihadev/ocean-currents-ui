import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, Repeat, ExportSquare } from "iconsax-react";
import LiquidCard from "../ocean/LiquidCard";
import AnimatedIcon from "../ocean/AnimatedIcon";

const transactions = [
  {
    id: 1,
    type: "receive",
    token: "ETH",
    amount: "+2.45",
    value: "$4,891.23",
    from: "0x1a2b...3c4d",
    time: "2 mins ago",
  },
  {
    id: 2,
    type: "send",
    token: "USDC",
    amount: "-1,500",
    value: "$1,500.00",
    to: "0x5e6f...7g8h",
    time: "15 mins ago",
  },
  {
    id: 3,
    type: "swap",
    tokenFrom: "WBTC",
    tokenTo: "ETH",
    amountFrom: "0.15",
    amountTo: "2.4",
    time: "1 hour ago",
  },
  {
    id: 4,
    type: "receive",
    token: "AAVE",
    amount: "+125",
    value: "$9,875.00",
    from: "0x9i0j...1k2l",
    time: "3 hours ago",
  },
  {
    id: 5,
    type: "send",
    token: "ETH",
    amount: "-0.5",
    value: "$998.50",
    to: "0x3m4n...5o6p",
    time: "5 hours ago",
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "receive":
      return <ArrowDown size={16} variant="Bold" color="currentColor" />;
    case "send":
      return <ArrowUp size={16} variant="Bold" color="currentColor" />;
    case "swap":
      return <Repeat size={16} variant="Bold" color="currentColor" />;
    default:
      return null;
  }
};

const getTypeStyles = (type: string) => {
  switch (type) {
    case "receive":
      return {
        bg: "bg-bio-emerald/10",
        text: "text-bio-emerald",
        glow: "hsla(158, 64%, 52%, 0.3)",
        glowColor: "bio" as const,
      };
    case "send":
      return {
        bg: "bg-primary/10",
        text: "text-primary",
        glow: "hsla(189, 94%, 43%, 0.3)",
        glowColor: "cyan" as const,
      };
    case "swap":
      return {
        bg: "bg-bio-teal/10",
        text: "text-bio-teal",
        glow: "hsla(168, 76%, 42%, 0.3)",
        glowColor: "teal" as const,
      };
    default:
      return {
        bg: "bg-muted",
        text: "text-muted-foreground",
        glow: "hsla(217, 33%, 50%, 0.3)",
        glowColor: "cyan" as const,
      };
  }
};

interface TransactionListProps {
  delay?: number;
}

const TransactionList = ({ delay = 0 }: TransactionListProps) => {
  return (
    <LiquidCard delay={delay} className="p-6 col-span-2 lg:col-span-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <p className="text-sm text-muted-foreground">Your latest transactions</p>
        </div>
        
        <motion.button
          className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 font-medium"
          whileHover={{ x: 2 }}
        >
          View All
          <AnimatedIcon size={16} variant="float" glowColor="cyan">
            <ExportSquare size={12} variant="TwoTone" color="currentColor" />
          </AnimatedIcon>
        </motion.button>
      </div>

      {/* Transaction list */}
      <div className="space-y-3">
        {transactions.map((tx, i) => {
          const styles = getTypeStyles(tx.type);
          
          return (
            <motion.div
              key={tx.id}
              className="relative flex items-center gap-4 p-3 rounded-xl 
                bg-secondary/20 border border-border/20
                hover:bg-secondary/40 hover:border-primary/20
                transition-all duration-300 cursor-pointer group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.1 * i }}
              whileHover={{ x: 4 }}
            >
              {/* Type icon */}
              <motion.div
                className={`p-2.5 rounded-xl ${styles.bg} ${styles.text}`}
                animate={{
                  boxShadow: [
                    `0 0 0 ${styles.glow}`,
                    `0 0 10px ${styles.glow}`,
                    `0 0 0 ${styles.glow}`,
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              >
                <AnimatedIcon size={20} variant="pulse" glowColor={styles.glowColor}>
                  {getTypeIcon(tx.type)}
                </AnimatedIcon>
              </motion.div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {tx.type === "swap" ? (
                    <span className="font-medium text-foreground">
                      {tx.amountFrom} {tx.tokenFrom} → {tx.amountTo} {tx.tokenTo}
                    </span>
                  ) : (
                    <span className={`font-medium ${tx.type === "receive" ? "text-bio-emerald" : "text-foreground"}`}>
                      {tx.amount} {tx.token}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">
                  {tx.type === "swap" 
                    ? "Swapped via Uniswap"
                    : tx.type === "receive" 
                      ? `From ${tx.from}`
                      : `To ${tx.to}`
                  }
                </p>
              </div>

              {/* Value & Time */}
              <div className="text-right">
                {tx.value && (
                  <p className="text-sm font-medium text-foreground">{tx.value}</p>
                )}
                <p className="text-xs text-muted-foreground mt-0.5">{tx.time}</p>
              </div>

              {/* Hover wave effect */}
              <motion.div
                className="absolute inset-0 rounded-xl border border-primary/0 pointer-events-none"
                whileHover={{
                  borderColor: "hsla(189, 94%, 43%, 0.3)",
                  boxShadow: "inset 0 0 20px hsla(189, 94%, 43%, 0.05)",
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          );
        })}
      </div>
    </LiquidCard>
  );
};

export default TransactionList;
