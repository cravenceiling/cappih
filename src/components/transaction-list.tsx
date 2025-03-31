import React, { useState } from 'react';
import { Transaction as TransactionType } from '@/lib/types';
import { Search } from 'lucide-react';
import Transaction from './transaction';

interface TransactionListProps {
  transactions: TransactionType[];
  onEditTransaction?: (transaction: TransactionType) => void;
  onDeleteTransaction?: (id: string) => void;
}

type FilterType = 'all' | 'income' | 'expense';

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onEditTransaction,
  onDeleteTransaction,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterType, setFilterType] = useState<FilterType>('all');

  // Filter and sort transactions
  const filteredTransactions = transactions
    .filter(t => {
      // Apply type filter
      if (filterType !== 'all' && t.type !== filterType) return false;

      // Apply search filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return (
          t.concept.toLowerCase().includes(term) ||
          (t.description?.toLowerCase().includes(term) || false)
        );
      }
      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortBy === 'date') {
        return sortDirection === 'desc'
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return sortDirection === 'desc'
          ? b.amount - a.amount
          : a.amount - b.amount;
      }
    });

  const toggleSort = (key: 'date' | 'amount') => {
    if (sortBy === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortDirection('desc');
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Buscar transacciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="neobrutalism-input pl-10 w-full"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as FilterType)}
            className="neobrutalism-selector px-3 py-2"
          >
            <option value="all">Todas</option>
            <option value="income">Ingresos</option>
            <option value="expense">Gastos</option>
          </select>

          <button
            onClick={() => toggleSort('date')}
            className={`neobrutalism-button ${sortBy === 'date' ? 'bg-black text-white' : ''}`}
          >
            Fecha {sortBy === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
          </button>

          <button
            onClick={() => toggleSort('amount')}
            className={`neobrutalism-button ${sortBy === 'amount' ? 'bg-black text-white' : ''}`}
          >
            Monto {sortBy === 'amount' && (sortDirection === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {filteredTransactions.length === 0 ? (
          <div className="neobrutalism-card p-8 text-center">
            <p>No se encontraron transacciones</p>
          </div>
        ) : (
          filteredTransactions.map(transaction => (
            <Transaction
              key={transaction.id}
              transaction={transaction}
              onEdit={onEditTransaction}
              onDelete={onDeleteTransaction}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionList;
