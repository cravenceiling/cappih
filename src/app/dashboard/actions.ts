'use server';

import { createClient } from "@/lib/supabase/server";
import { Transaction } from "@/lib/types";

export const createTransactionAction = async (transaction: Omit<Transaction, 'id'>) => {
  const supabase = await createClient();
  const user_id = (await supabase.auth.getUser()).data.user?.id;
  const trx = {
    user_id,
    amount: transaction.amount,
    transaction_type: transaction.type,
    concept: transaction.concept,
    date: transaction.date,
    description: transaction.description,
  };

  const res = await supabase.from('transactions').insert([trx]);
  console.log('create trx res: ', res);
  if (res.error) {
    return { error: 'Hubo un error creando la transacción, por favor intenta nuevamente.' };
  }

  return { error: null };
}

export const getTransactions = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('transactions').select(
    'id, concept, amount, type:transaction_type, description, categoryId:category_id, date',
  );

  if (error) {
    console.error('there was an error getting transactinos: ', error);
    return [];
  }

  return data;
};

const getTotal = async (type: 'income' | 'expense') => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('transactions')
    .select('amount.sum()')
    .eq('transaction_type', type)
    .single();

  if (error || !data) {
    console.error('there was an error getting the total: ', error);
    return 0
  }

  return data.sum;
};

export const getDashboardSummary = async () => {
  const supabase = await createClient();
  const totalIncome = await getTotal('income');
  const totalExpense = await getTotal('expense');
  const balance = totalIncome - totalExpense;
  const { data: recentTransactions } = await supabase
    .from('transactions')
    .select('*')
    .order('date', { ascending: false })
    .limit(5);

  return {
    totalIncome,
    totalExpense,
    balance,
    recentTransactions: recentTransactions || [],
  };

};
