import { motion } from "framer-motion";

interface TransactionHistoryProps {
  delay?: number;
}

const transactions = [
  { 
    id: 0, 
    type: "Buy", 
    date: "12 january 2022", 
    asset: "BTC", 
    status: "Pending",
    address: "0898hshiw36...",
    amount: "0.2231345BTC",
    usdValue: "$11,032.24"
  },
  { 
    id: 1, 
    type: "Sell", 
    date: "08 january 2022", 
    asset: "ETH", 
    status: "Completed",
    address: "0898hshiw36...",
    amount: "2.5ETH",
    usdValue: "$4,032.24"
  },
  { 
    id: 2, 
    type: "Buy", 
    date: "01 january 2022", 
    asset: "ADA", 
    status: "Completed",
    address: "0898hshiw36...",
    amount: "500ADA",
    usdValue: "$289.50"
  },
  { 
    id: 3, 
    type: "Swap", 
    date: "28 december 2021", 
    asset: "USDT", 
    status: "Completed",
    address: "0898hshiw36...",
    amount: "1,000USDT",
    usdValue: "$1,000.00"
  },
];

const statusColors: Record<string, string> = {
  "Pending": "text-amber-400 bg-amber-500/10 border border-amber-500/20",
  "Completed": "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20",
  "Failed": "text-red-400 bg-red-500/10 border border-red-500/20"
};

const typeColors: Record<string, string> = {
  "Buy": "text-emerald-400",
  "Sell": "text-red-400",
  "Swap": "text-blue-400"
};

const TransactionHistory = ({ delay = 0 }: TransactionHistoryProps) => {
  return (
    <motion.div
      className="bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 
        overflow-hidden shimmer"
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Header */}
      <div className="p-6 pb-4 border-b border-border/30">
        <h2 className="text-lg font-semibold text-foreground">Transaction History</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/30">
              <th className="text-left text-xs font-medium text-muted-foreground py-3 px-6">ID</th>
              <th className="text-left text-xs font-medium text-muted-foreground py-3 px-6">Type</th>
              <th className="text-left text-xs font-medium text-muted-foreground py-3 px-6">Date</th>
              <th className="text-left text-xs font-medium text-muted-foreground py-3 px-6">Asset</th>
              <th className="text-left text-xs font-medium text-muted-foreground py-3 px-6">Status</th>
              <th className="text-left text-xs font-medium text-muted-foreground py-3 px-6">Address</th>
              <th className="text-right text-xs font-medium text-muted-foreground py-3 px-6">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <motion.tr 
                key={tx.id}
                className="border-b border-border/20 hover:bg-secondary/30 transition-colors group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + index * 0.05 }}
                whileHover={{ backgroundColor: "hsla(217, 33%, 12%, 0.5)" }}
              >
                <td className="py-4 px-6 font-mono text-sm text-muted-foreground">
                  {tx.id}
                </td>
                <td className={`py-4 px-6 text-sm font-medium ${typeColors[tx.type]}`}>
                  {tx.type}
                </td>
                <td className="py-4 px-6 text-sm text-muted-foreground">
                  {tx.date}
                </td>
                <td className="py-4 px-6 text-sm font-medium text-foreground group-hover:text-glow transition-all">
                  {tx.asset}
                </td>
                <td className="py-4 px-6">
                  <motion.span 
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[tx.status]}`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {tx.status}
                  </motion.span>
                </td>
                <td className="py-4 px-6 font-mono text-sm text-muted-foreground">
                  {tx.address}
                </td>
                <td className="py-4 px-6 text-right">
                  <div>
                    <p className="font-mono text-sm font-semibold text-foreground">{tx.amount}</p>
                    <p className="font-mono text-xs text-muted-foreground">{tx.usdValue}</p>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default TransactionHistory;