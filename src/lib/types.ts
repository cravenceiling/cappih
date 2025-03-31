export type TransactionType = 'income' | 'expense';

export type Category = {
    id: string;
    name: string;
    color: string;
    icon?: string;
};

export type Transaction = {
    id: string;
    type: TransactionType;
    concept: string;
    description?: string;
    amount: number;
    date: Date;
    categoryId?: string;
};

export type DashboardSummary = {
    totalIncome: number;
    totalExpense: number;
    balance: number;
    recentTransactions: Transaction[];
};
