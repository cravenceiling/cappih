'use client';

import React, { useState } from 'react';

import CategoryBadge from './CategoryBadge';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { Card } from './ui/card';
import { formatCurrency } from '@/lib/utils';

interface TransactionProps {
  transaction: Transaction;
}

import EditTransactionForm from './edit-transaction-btn';
import { Transaction } from '@/types/transaction';
import DeleteTransactionBtn from './delete-transaction-btn';


const TransactionCard: React.FC<TransactionProps> = ({
  transaction,
}) => {
  const { id, type, concept, amount, date, categoryId } = transaction;
  const [open, setOpen] = useState(false);

  const formattedDate = new Date(date).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });


  return (
    <Card className="bg-secondary-background p-4 mb-4">
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="flex flex-col items-start space-x-3">
          <div className='flex flex-row items-center gap-2'>
            {type === 'income' ? (
              <ArrowUpCircle size={24} />) : (<ArrowDownCircle size={24} />
            )}
            <h3 className="font-semibold text-lg">{concept}</h3>
          </div>

          <div className='flex flex-col'>
            <div className="flex items-center mt-1 space-x-2">
              <span className="text-xs text-foreground">{formattedDate}</span>
              <CategoryBadge categoryId={categoryId} />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between mt-3 sm:mt-0 mr-3">
          <span className={`font-mono font-bold text-lg ${type === 'income' ? 'text-income' : 'text-expense'}`}>
            {type === 'income' ? '+' : '-'}{formatCurrency(amount)}
          </span>

          <div className="flex space-x-2 mt-2">
            <EditTransactionForm open={open} setOpen={setOpen} transaction={transaction} />
            <DeleteTransactionBtn id={id} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TransactionCard;
