import React from 'react';
import { Transaction as TransactionType } from '@/lib/types';
import { formatCurrency } from '@/lib/sampleData';
import CategoryBadge from './CategoryBadge';
import { ArrowDownCircle, ArrowUpCircle, Edit, Trash } from 'lucide-react';

interface TransactionProps {
  transaction: TransactionType;
  onEdit?: (transaction: TransactionType) => void;
  onDelete?: (id: string) => void;
}

const Transaction: React.FC<TransactionProps> = ({
  transaction,
  onEdit,
  onDelete,
}) => {
  const { id, type, concept, description, amount, date, categoryId } = transaction;

  const formattedDate = new Date(date).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="neobrutalism-card p-4 mb-4">
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="flex items-start space-x-3">
          <div className={`mt-1 ${type === 'income' ? 'text-income' : 'text-expense'}`}>
            {type === 'income' ? <ArrowUpCircle size={24} /> : <ArrowDownCircle size={24} />}
          </div>

          <div>
            <h3 className="font-semibold text-lg">{concept}</h3>
            {description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-[300px] truncate">{description}</p>
            )}
            <div className="flex items-center mt-1 space-x-2">
              <span className="text-xs text-gray-500">{formattedDate}</span>
              <CategoryBadge categoryId={categoryId} />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between mt-3 sm:mt-0">
          <span className={`font-mono font-bold text-lg ${type === 'income' ? 'text-income' : 'text-expense'}`}>
            {type === 'income' ? '+' : '-'} {formatCurrency(amount)}
          </span>

          <div className="flex space-x-2 mt-2">
            {onEdit && (
              <button
                onClick={() => onEdit(transaction)}
                className="neobrutalism-button p-1"
              >
                <Edit size={16} />
              </button>
            )}

            {onDelete && (
              <button
                onClick={() => onDelete(id)}
                className="neobrutalism-button p-1"
              >
                <Trash size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
