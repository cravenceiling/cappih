import { Transaction } from "@/types/transaction";

export type DashboardSummary = {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  recentTransactions: Transaction[];
};
