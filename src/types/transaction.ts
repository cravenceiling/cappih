export type TransactionType = 'income' | 'expense';

export type Transaction = {
  id: string;
  type: TransactionType;
  concept: string;
  description?: string;
  amount: number;
  date: Date;
  categoryId?: string;
};
