'use client';

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Transaction } from "@/lib/types";
import { List, LayoutDashboard } from 'lucide-react';
import TransactionForm from "@/components/transaction-form";
import TransactionList from "@/components/transaction-list";
import Dashboard from "@/components/dashboard";
import { getDashboardSummary } from "./actions";

interface DashboardContainerProps {
  initialTransactions: Transaction[];
  dashboardSummary: Awaited<ReturnType<typeof getDashboardSummary>>;
}

export function DashboardContainer({
  initialTransactions,
  dashboardSummary,
}: DashboardContainerProps) {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>(undefined);
  const [activeView, setActiveView] = useState<'dashboard' | 'list'>('dashboard');
  const [open, setOpen] = useState(false);

  const handleUpdateTransaction = (updatedTransaction: Omit<Transaction, 'id'>) => {
    if (!editingTransaction) return;

    const updatedTransactions = transactions.map(t =>
      t.id === editingTransaction.id
        ? { ...updatedTransaction, id: editingTransaction.id }
        : t
    );

    setTransactions(updatedTransactions);
    setEditingTransaction(undefined);

    toast({
      title: "Transacción actualizada",
      description: "La transacción ha sido actualizada exitosamente",
    });
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));

    toast({
      title: "Transacción eliminada",
      description: "La transacción ha sido eliminada exitosamente",
    });
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  return (
    <div className="flex-1 container py-6 px-4 animate-slideUpAndFade">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
          <p className="text-gray-500">Gestiona tus finanzas de manera sencilla</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex border-2 border-black">
            <button
              className={`p-2 ${activeView === 'dashboard' ? 'bg-black text-white' : 'bg-white'}`}
              onClick={() => setActiveView('dashboard')}
            >
              <LayoutDashboard size={20} />
            </button>
            <button
              className={`p-2 ${activeView === 'list' ? 'bg-black text-white' : 'bg-white'}`}
              onClick={() => setActiveView('list')}
            >
              <List size={20} />
            </button>
          </div>

          <TransactionForm
            setOpen={setOpen}
            open={open}
            editTransaction={editingTransaction}
          />
        </div>
      </div>



      {activeView === 'dashboard' ? (
        <Dashboard
          summary={{
            ...dashboardSummary,
            recentTransactions: transactions
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 5)
          }}
          onEditTransaction={handleEditTransaction}
        />
      ) : (
        <TransactionList
          transactions={transactions}
          onEditTransaction={handleEditTransaction}
          onDeleteTransaction={handleDeleteTransaction}
        />
      )}
    </div>
  );
}
