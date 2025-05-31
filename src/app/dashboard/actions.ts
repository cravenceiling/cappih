'use server';

import { createClient } from "@/lib/supabase/server";
import { Transaction } from "@/lib/types";
import { revalidatePath } from "next/cache";

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
  console.error('Error creating transaction: ', res);

  if (res.error) {
    return { error: 'Hubo un error creando la transacción, por favor intenta nuevamente.' };
  }

  revalidatePath('/dashboard');
  return { error: null };
}

export const updateTransactionAction = async (transaction: Transaction) => {
  const supabase = await createClient();

  const trx = {
    amount: transaction.amount,
    transaction_type: transaction.type,
    concept: transaction.concept,
    date: transaction.date,
    description: transaction.description,
  };

  const res = await supabase.from('transactions').update(trx).eq('id', transaction.id);
  if (res.error) {
    return {
      error: 'Hubo un error actualizando la transacción, por favor intenta nuevamente.',
    };
  }

  revalidatePath('/dashboard');
  return { error: null };
}

export const deleteTransactionAction = async (id: string) => {
  const supabase = await createClient();

  const res = await supabase.from('transactions').delete().eq('id', id);
  if (res.error) {
    console.error('Error deleting transaction: ', res.error);
    return {
      error: 'Hubo un error eliminando la transacción, por favor intenta nuevamente.',
    };
  }

  revalidatePath('/dashboard');
  return { error: null };
}

export const getTransactions = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('transactions')
    .select(
      'id, concept, amount, type:transaction_type, description, categoryId:category_id, date',
    ).order('date', { ascending: false })
    .limit(5);

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
  const totalIncome = await getTotal('income');
  const totalExpense = await getTotal('expense');
  const balance = totalIncome - totalExpense;
  const recentTransactions = await getTransactions();

  return {
    totalIncome,
    totalExpense,
    balance,
    recentTransactions: recentTransactions || [],
  };
};
