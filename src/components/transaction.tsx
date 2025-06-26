import React from 'react';
import { Transaction as TransactionType } from '@/lib/types';
import CategoryBadge from './CategoryBadge';
import { ArrowDownCircle, ArrowUpCircle, Edit, Trash } from 'lucide-react';
import { Card } from './ui/card';
import { formatCurrency } from '@/lib/utils';
import { Button } from './ui/button';

interface TransactionProps {
  transaction: TransactionType;
  onEdit?: (transaction: TransactionType) => void;
  onDelete?: (id: string) => void;
}

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function ConfirmDeleteDialog(
  { id, onDelete }: { id: string, onDelete: (id: string) => void }
) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={'neutral'}
          className='p-0 px-1'
        >
          <Trash size={12} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. La transacción será eliminada permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => onDelete(id)}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

const Transaction: React.FC<TransactionProps> = ({
  transaction,
  onEdit,
  onDelete,
}) => {
  const { id, type, concept, amount, date, categoryId } = transaction;

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
            {onEdit && (
              <Button
                variant={'neutral'}
                onClick={() => onEdit(transaction)}
                className='p-0 px-1'
              >
                <Edit size={12} />
              </Button>
            )}

            {onDelete && (
              <ConfirmDeleteDialog
                id={id}
                onDelete={onDelete}
              />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Transaction;
