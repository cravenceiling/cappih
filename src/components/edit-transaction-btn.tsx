import React from 'react';
import { Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { updateTransactionAction } from '@/app/dashboard/actions';
import {
  Dialog,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import TransactionForm from './transaction-form';
import { Category } from '@/types/category';
import { TransactionFormSchema, TransactionFormType, UseFormType } from '@/types/transaction-form';
import { Transaction } from '@/types/transaction';


interface TransactionFormProps {
  transaction: Transaction;
  open: boolean;
  setOpen: (open: boolean) => void;
}


const EditTransactionForm: React.FC<TransactionFormProps> = ({
  transaction,
  open,
  setOpen,
}) => {
  const { toast } = useToast();

  const categories: Category[] = [];

  const form: UseFormType = useForm({
    resolver: zodResolver(TransactionFormSchema),
    defaultValues: {
      ...transaction,
      date: new Date(transaction.date),
      categoryId: transaction.categoryId || '',
    },
  });

  const handleSubmit = async (values: TransactionFormType) => {
    const transaction = {
      id: values.id,
      type: values.type,
      concept: values.concept,
      description: values.description?.trim() || '',
      amount: Number(values.amount),
      date: new Date(values.date) ?? new Date(),
      categoryId: values.categoryId || '',
    };

    const { error } = await updateTransactionAction(transaction);

    if (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar la transacción",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Éxito",
      description: "Transacción actualizada",
      className: 'bg-white text-black',
    });

    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Dialog open={open} onOpenChange={setOpen} modal={true}>
      <DialogTrigger asChild>
        <Button
          variant={'neutral'}
          onClick={() => setOpen(true)}
          className='p-0 px-1'
        >
          <Edit size={12} />
        </Button>
      </DialogTrigger>
      <TransactionForm
        edit={true}
        form={form}
        onSubmit={handleSubmit}
        onClose={handleClose}
        categories={categories}
      />
    </Dialog>
  );
};

export default EditTransactionForm;
