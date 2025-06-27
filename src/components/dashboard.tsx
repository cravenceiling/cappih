import React from 'react';
import { DashboardSummary } from '@/lib/types';
import { ArrowUpCircle, ArrowDownCircle, BarChart3, PiggyBank } from 'lucide-react';
import { Card } from './ui/card';
import { formatCurrency } from '@/lib/utils';
import TransactionCard from './transaction-card';

interface DashboardProps {
  summary: DashboardSummary;
}

const Dashboard: React.FC<DashboardProps> = ({
  summary,
}) => {
  const { totalIncome, totalExpense, balance, recentTransactions } = summary;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 bg-secondary-background">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Ingresos totales</h3>
              <p className="font-mono text-2xl font-bold ">
                {formatCurrency(totalIncome)}
              </p>
            </div>
            <div className="bg-[#00cf99] p-3 border-2 border-black">
              <ArrowUpCircle size={30} />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-secondary-background">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Gastos totales</h3>
              <p className="font-mono text-2xl font-bold text-expense">
                {formatCurrency(totalExpense)}
              </p>
            </div>
            <div className="bg-[#fe8a7e] p-3 border-2 border-black">
              <ArrowDownCircle size={30} className="text-expense" />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-secondary-background">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Saldo</h3>
              <p className={`font-mono text-2xl font-bold`}>
                {formatCurrency(balance)}
              </p>
            </div>
            <div className={`${balance >= 0 ? 'bg-[#00cf99]' : 'bg-[#c1554d]'} p-3 border-2 border-black`}>
              <PiggyBank size={30} className={balance >= 0 ? 'text-income' : 'text-expense'} />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-5 bg-main">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Transacciones recientes</h3>
          </div>

          <div className="space-y-4 ">
            {recentTransactions.length === 0 ? (
              <p className="text-center py-8 text-gray-500">No hay transacciones recientes</p>
            ) : (
              recentTransactions.map(transaction => (
                <div key={transaction.id} className="border-b-2 border-black last:border-b-0 pb-3 last:pb-0">
                  <TransactionCard transaction={transaction} />
                </div>
              ))
            )}
          </div>
        </Card>

        <Card className="p-5 bg-main">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Distribución de gastos</h3>
            <BarChart3 size={20} />
          </div>

          <div className="h-64 flex items-center justify-center">
            <div className="p-8 border-2 border-gray-800 border-dashed rounded-md text-center">
              <p className="mb-2">Distribución de gastos por categoría</p>
              <p className="text-sm">Se mostrará aquí cuando haya suficientes datos</p>
            </div>
          </div>
        </Card>
      </div>
    </div >
  );
};

export default Dashboard;
