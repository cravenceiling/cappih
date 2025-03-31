import React, { useState, useEffect } from 'react';
import { Transaction, TransactionType } from '@/lib/types';
import { sampleCategories } from '@/lib/sampleData';
import { Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
  onCancel: () => void;
  editTransaction?: Transaction;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  onSubmit,
  onCancel,
  editTransaction
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

  const handleSubmit = (e: React.FormEvent) => {
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

    onSubmit(transaction);

    // Reset form
    if (!editTransaction) {
      setType('expense');
      setConcept('');
      setDescription('');
      setAmount('');
      setCategoryId(undefined);
      setDate(new Date().toISOString().split('T')[0]);
    }
  };

  return (
    <div className="neobrutalism-card p-5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          {editTransaction ? 'Editar transacción' : 'Nueva transacción'}
        </h2>
        <button
          onClick={onCancel}
          className="neobrutalism-button p-1"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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
              <label className="block text-sm font-medium mb-1">Concepto</label>
              <input
                type="text"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                placeholder="Ej. Salario mensual"
                className="neobrutalism-input w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Descripción (opcional)</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ej. Pago de la empresa XYZ"
                className="neobrutalism-input w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Monto (COP)</label>
              <input
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
              <label className="block text-sm font-medium mb-1">Fecha</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="neobrutalism-input w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Categoría (opcional)</label>
              <select
                value={categoryId || ''}
                onChange={(e) => setCategoryId(e.target.value || undefined)}
                className="neobrutalism-selector w-full p-2"
              >
                <option value="">Sin categoría</option>
                {sampleCategories
                  .filter(cat =>
                    // Filter categories based on transaction type
                    type === 'income'
                      ? cat.name.includes('Salario') || cat.name.includes('ingreso')
                      : !cat.name.includes('Salario') && !cat.name.includes('ingreso')
                  )
                  .map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))
                }
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="neobrutalism-button mr-2"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="neobrutalism-button-primary"
          >
            <Plus size={18} className="mr-1 inline-block" />
            {editTransaction ? 'Actualizar' : 'Añadir'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;

