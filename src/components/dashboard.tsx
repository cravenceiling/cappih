import React from 'react';
import { Transaction as TransactionType, DashboardSummary } from '@/lib/types';
import { formatCurrency } from '@/lib/sampleData';
import { ArrowUpCircle, ArrowDownCircle, BarChart3, PiggyBank } from 'lucide-react';
import Transaction from './transaction';

interface DashboardProps {
  summary: DashboardSummary;
  onEditTransaction?: (transaction: TransactionType) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  summary,
  onEditTransaction,
}) => {
  const { totalIncome, totalExpense, balance, recentTransactions } = summary;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="neobrutalism-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Ingresos totales</h3>
              <p className="font-mono text-2xl font-bold text-income">
                {formatCurrency(totalIncome)}
              </p>
            </div>
            <div className="bg-green-50 p-3 border-2 border-black">
              <ArrowUpCircle size={30} className="text-income" />
            </div>
          </div>
        </div>

        <div className="neobrutalism-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Gastos totales</h3>
              <p className="font-mono text-2xl font-bold text-expense">
                {formatCurrency(totalExpense)}
              </p>
            </div>
            <div className="bg-red-50 p-3 border-2 border-black">
              <ArrowDownCircle size={30} className="text-expense" />
            </div>
          </div>
        </div>

        <div className="neobrutalism-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Saldo</h3>
              <p className={`font-mono text-2xl font-bold ${balance >= 0 ? 'text-income' : 'text-expense'}`}>
                {formatCurrency(balance)}
              </p>
            </div>
            <div className={`${balance >= 0 ? 'bg-green-50' : 'bg-red-50'} p-3 border-2 border-black`}>
              <PiggyBank size={30} className={balance >= 0 ? 'text-income' : 'text-expense'} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="neobrutalism-card p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Transacciones recientes</h3>
          </div>

          <div className="space-y-4">
            {recentTransactions.length === 0 ? (
              <p className="text-center py-8 text-gray-500">No hay transacciones recientes</p>
            ) : (
              recentTransactions.map(transaction => (
                <div key={transaction.id} className="border-b-2 border-black last:border-b-0 pb-3 last:pb-0">
                  <Transaction
                    transaction={transaction}
                    onEdit={onEditTransaction}
                  />
                </div>
              ))
            )}
          </div>
        </div>

        <div className="neobrutalism-card p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Distribución de gastos</h3>
            <BarChart3 size={20} />
          </div>

          <div className="h-64 flex items-center justify-center">
            <div className="p-8 border-2 border-gray-300 border-dashed rounded-md text-center">
              <p className="text-gray-500 mb-2">Distribución de gastos por categoría</p>
              <p className="text-sm text-gray-400">Se mostrará aquí cuando haya suficientes datos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
