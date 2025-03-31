'use client';

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Transaction } from "@/lib/types";
import { getDashboardSummary, sampleTransactions } from "@/lib/sampleData";
import { Plus, List, LayoutDashboard } from 'lucide-react';
import Navbar from "@/components/navbar";
import TransactionForm from "@/components/transaction-form";
import TransactionList from "@/components/transaction-list";
import Dashboard from "@/components/dashboard";


export default function Page() {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);
  const [activeView, setActiveView] = useState<'dashboard' | 'list'>('dashboard');

  const dashboardSummary = getDashboardSummary();

  const handleAddTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: 'pending add random id',
    };

    setTransactions([newTransaction, ...transactions]);
    setShowForm(false);

    toast({
      title: "Transacción agregada",
      description: "La transacción ha sido agregada exitosamente",
    });
  };

  const handleUpdateTransaction = (updatedTransaction: Omit<Transaction, 'id'>) => {
    if (!editingTransaction) return;

    const updatedTransactions = transactions.map(t =>
      t.id === editingTransaction.id
        ? { ...updatedTransaction, id: editingTransaction.id }
        : t
    );

    setTransactions(updatedTransactions);
    setEditingTransaction(undefined);
    setShowForm(false);

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
    setShowForm(true);
  };

  const openAddForm = () => {
    setEditingTransaction(undefined);
    setShowForm(true);
  };

  const closeForm = () => {
    setEditingTransaction(undefined);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container py-6 px-4 animate-slideUpAndFade">
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

            <button
              onClick={openAddForm}
              className="neobrutalism-button-primary"
            >
              <Plus size={18} className="mr-1 inline-block" />
              Nueva
            </button>
          </div>
        </div>

        {showForm && (
          <div className="mb-6 slide-up">
            <TransactionForm
              onSubmit={editingTransaction ? handleUpdateTransaction : handleAddTransaction}
              onCancel={closeForm}
              editTransaction={editingTransaction}
            />
          </div>
        )}

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
      </main>
    </div>
  );
}
