
export type TransactionCategory = 
  | 'Food' 
  | 'Transport' 
  | 'Entertainment' 
  | 'Utilities' 
  | 'Shopping' 
  | 'Health' 
  | 'Income' 
  | 'Other';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: TransactionCategory;
  type: 'income' | 'expense';
}

export interface CategoryBudget {
  category: TransactionCategory;
  limit: number;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  icon: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  categoryBreakdown: Record<TransactionCategory, number>;
}
