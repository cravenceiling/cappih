'use client';

import React, { useState, useEffect } from 'react';
import { Transaction, TransactionType } from '@/lib/types';
import { sampleCategories } from '@/lib/sampleData';
import { Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createTransactionAction } from '@/app/dashboard/actions';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';

interface TransactionFormProps {
  editTransaction?: Transaction;
  setOpen: (open: boolean) => void;
  open: boolean;
  onSubmitComplete?: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  setOpen,
  open,
  editTransaction,
  onSubmitComplete,
}) => {
  const { toast } = useToast();
  const [type, setType] = useState<TransactionType>('expense');
  const [concept, setConcept] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Populate form when editing
  useEffect(() => {
    if (editTransaction) {
      setType(editTransaction.type);
      setConcept(editTransaction.concept);
      setDescription(editTransaction.description || '');
      setAmount(editTransaction.amount.toString());
      setCategoryId(editTransaction.categoryId);
      setDate(new Date(editTransaction.date).toISOString().split('T')[0]);
    }
  }, [editTransaction]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!concept.trim()) {
      toast({
        title: "Error",
        description: "El concepto es obligatorio",
        variant: "destructive",
      });
      return;
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Error",
        description: "Ingresa un monto válido",
        variant: "destructive",
      });
      return;
    }

    const transaction: Omit<Transaction, 'id'> = {
      type,
      concept,
      description: description.trim() || undefined,
      amount: Number(amount),
      date: new Date(date),
      categoryId: categoryId || undefined,
    };

    const { error } = await createTransactionAction(transaction);
    if (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar la transacción",
        variant: "destructive",
      });
      return;
    }

    if (!editTransaction) {
      resetForm();
    }

    if (onSubmitComplete) {
      onSubmitComplete();
    }

    toast({
      title: "Éxito",
      description: editTransaction ? "Transacción actualizada" : "Transacción añadida",
    });

    setOpen(false);
  };

  const resetForm = () => {
    setType('expense');
    setConcept('');
    setDescription('');
    setAmount('');
    setCategoryId(undefined);
    setDate(new Date().toISOString().split('T')[0]);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>
          <Plus size={18} className="mr-1 inline-block" />
          Nueva
        </Button>
      </DialogTrigger>
      <DialogContent className="p-5 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {editTransaction ? 'Editar transacción' : 'Nueva transacción'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input type="hidden" name="type" value={type} />

          <div>
            <div className="flex gap-2 mb-4">
              <button
                type="button"
                className={`neobrutalism-button flex-1 ${type === 'expense' ? 'bg-black text-white' : ''}`}
                onClick={() => setType('expense')}
              >
                Gasto
              </button>
              <button
                type="button"
                className={`neobrutalism-button flex-1 ${type === 'income' ? 'bg-black text-white' : ''}`}
                onClick={() => setType('income')}
              >
                Ingreso
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="concept" className="block text-sm font-medium mb-1">Concepto</Label>
                <input
                  id="concept"
                  name="concept"
                  type="text"
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                  placeholder="Ej. Salario mensual"
                  className="neobrutalism-input w-full"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description" className="block text-sm font-medium mb-1">Descripción (opcional)</Label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ej. Pago de la empresa XYZ"
                  className="neobrutalism-input w-full"
                />
              </div>

              <div>
                <Label htmlFor="amount" className="block text-sm font-medium mb-1">Monto (COP)</Label>
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Ej. 1500000"
                  className="neobrutalism-input w-full"
                  min="0"
                  required
                />
              </div>

              <div>
                <Label htmlFor="date" className="block text-sm font-medium mb-1">Fecha</Label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="neobrutalism-input w-full"
                  required
                />
              </div>

              <div>
                <Label htmlFor="categoryId" className="block text-sm font-medium mb-1">Categoría (opcional)</Label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value || undefined)}
                  className="neobrutalism-selector w-full p-2"
                >
                  <option value="">Sin categoría</option>
                  {sampleCategories
                    .filter(cat =>
                      type === 'income'
                        ? cat.name.includes('Salario') || cat.name.includes('ingreso')
                        : !cat.name.includes('Salario') && !cat.name.includes('ingreso')
                    )
                    .map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          <DialogFooter className="w-full pt-4 gap-2">
            <Button
              type="button"
              onClick={handleCancel}
              variant="reverse"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant='default'
              className="ml-auto"
            >
              <Plus size={18} className="mr-1 inline-block" />
              {editTransaction ? 'Actualizar' : 'Añadir'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent >
    </Dialog >
  );
};

export default TransactionForm;
