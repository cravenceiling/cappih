import React from 'react';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createTransactionAction } from '@/app/dashboard/actions';
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


interface TransactionFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
};


const NewTransactionForm: React.FC<TransactionFormProps> = ({
  open,
  setOpen,
}) => {
  const categories: Category[] = [];

  const { toast } = useToast();

  const form: UseFormType = useForm({
    resolver: zodResolver(TransactionFormSchema),
    defaultValues: {
      date: new Date(),
      type: 'expense',
      id: '',
      amount: 0,
      description: '',
      concept: '',
    },
  });

  const handleSubmit = async (values: TransactionFormType) => {
    const transaction = {
      id: values.id,
      type: values.type,
      concept: values.concept,
      description: values.description?.trim() || '',
      amount: Number(values.amount),
      date: values.date ?? new Date(),
      categoryId: values.categoryId || '',
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

    toast({
      title: "Éxito",
      description: "Transacción añadida",
      className: 'bg-white text-black',
    });

    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Dialog open={open} onOpenChange={setOpen} modal={true} >
      <DialogTrigger asChild>
        <Button onClick={handleClose}>
          <Plus size={18} className="mr-1 inline-block" />
          Nueva
        </Button>
      </DialogTrigger>
      <TransactionForm
        form={form}
        onSubmit={handleSubmit}
        onClose={handleClose}
        categories={categories}
      />
    </Dialog>
  );
};

export default NewTransactionForm;
