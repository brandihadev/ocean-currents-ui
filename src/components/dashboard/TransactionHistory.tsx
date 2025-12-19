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
  "Pending": "text-amber-600 bg-amber-50",
  "Completed": "text-emerald-600 bg-emerald-50",
  "Failed": "text-red-600 bg-red-50"
};

const typeColors: Record<string, string> = {
  "Buy": "text-emerald-600",
  "Sell": "text-red-500",
  "Swap": "text-blue-600"
};

const TransactionHistory = ({ delay = 0 }: TransactionHistoryProps) => {
  return (
    <motion.div
      className="bg-card rounded-2xl border border-border shadow-card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <h2 className="text-lg font-semibold text-foreground">Transaction History</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
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
                className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + index * 0.05 }}
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
                <td className="py-4 px-6 text-sm font-medium text-foreground">
                  {tx.asset}
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[tx.status]}`}>
                    {tx.status}
                  </span>
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