'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Transaction } from '@/types/transaction';
import TransactionCard from './transaction-card';

interface TransactionListProps {
  transactions: Transaction[];
}

type FilterType = 'all' | 'income' | 'expense';

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterType, setFilterType] = useState<FilterType>('all');

  const filteredTransactions = transactions
    .filter(t => {
      if (filterType !== 'all' && t.type !== filterType) return false;

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
          <Input
            type="text"
            placeholder="Buscar transacciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <div>
            <Select
              value={filterType}
              onValueChange={(value: FilterType) => setFilterType(value)}
            >
              <SelectTrigger>
                <SelectValue defaultValue='all' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="income">Ingresos</SelectItem>
                <SelectItem value="expense">Gastos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={() => toggleSort('date')}
            className={`${sortBy === 'date' ? 'bg-black text-white' : ''}`}
          >
            Fecha {sortBy === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
          </Button>

          <Button
            onClick={() => toggleSort('amount')}
            className={`${sortBy === 'amount' ? 'bg-black text-white' : ''}`}
          >
            Monto {sortBy === 'amount' && (sortDirection === 'asc' ? '↑' : '↓')}
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {filteredTransactions.length === 0 ? (
          <div className="p-8 text-center">
            <p>No se encontraron transacciones</p>
          </div>
        ) : (
          filteredTransactions.map(transaction => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionList;
