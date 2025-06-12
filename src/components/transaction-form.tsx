'use client';


import React from 'react';
import { Transaction } from '@/lib/types';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createTransactionAction, updateTransactionAction } from '@/app/dashboard/actions';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Input } from "./ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { DatePicker } from './ui/date-picker';


export type Category = {
  id: string;
  name: string;
  description: string;
};

interface TransactionFormProps {
  editTransaction?: Transaction;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  editTransaction,
  open,
  setOpen,
}) => {
  const { toast } = useToast();

  const formSchema = z.object({
    id: z.string(),
    type: z.enum(['expense', 'income']),
    concept: z.string().min(5, {
      message: 'El concepto debe tener al menos 5 caracteres',
    }),
    amount: z.coerce.number().min(0, {
      message: 'El monto debe ser mayor o igual a 0',
    }),
    description: z.string().optional(),
    date: z.date(),
    categoryId: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      type: 'expense',
      id: '',
      amount: 0,
      description: '',
      concept: '',
    },
  });

  const categories: Category[] = [];

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.concept.trim()) {
      toast({
        title: "Error",
        description: "El concepto es obligatorio",
        variant: "destructive",
      });
      return;
    }

    // TODO: Change this to show any message (general use)
    if (!values.amount || isNaN(Number(values.amount)) || Number(values.amount) < 0) {
      toast({
        title: "Error",
        description: "Ingresa un monto válido",
        variant: "destructive",
      });
      return;
    }

    const transaction = {
      id: values.id,
      type: values.type,
      concept: values.concept,
      description: values.description?.trim() || undefined,
      amount: Number(values.amount),
      date: values.date ?? new Date(),
      categoryId: values.categoryId || undefined,
    };

    let actionError = null;

    if (!editTransaction) {
      const { error } = await createTransactionAction(transaction);
      actionError = error;
    } else {
      const { error } = await updateTransactionAction(transaction);
      actionError = error;
    }

    if (actionError) {
      toast({
        title: "Error",
        description: "No se pudo guardar la transacción",
        variant: "destructive",
      });
      return;
    }

    resetForm();

    toast({
      title: "Éxito",
      description: editTransaction ? "Transacción actualizada" : "Transacción añadida",
      className: 'bg-white text-black',
    });
  };

  const resetForm = () => {
    form.reset({
      id: '',
      type: 'expense',
      concept: '',
      amount: 0,
      description: '',
      date: new Date(),
      categoryId: '',
    });
  };


  return (
    <Dialog open={open} onOpenChange={setOpen} modal={true} >
      <DialogTrigger asChild>
        <Button>
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        className={`flex-1 ${field.value === 'expense' ? 'font-bold bg-[#F2F2F2]' : ''}`}
                        variant={field.value === 'expense' ? 'noShadow' : 'default'}
                        onClick={() => field.onChange('expense')}
                      >
                        Gasto
                      </Button>
                      <Button
                        className={`flex-1 ${field.value === 'income' ? 'font-bold bg-[#F2F2F2]' : ''}`}
                        type="button"
                        variant={field.value === 'income' ? 'noShadow' : 'default'}
                        onClick={() => field.onChange('income')}
                      >
                        Ingreso
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="concept"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="concept">Concepto</FormLabel>
                  <FormControl>
                    <Input
                      id="concept"
                      type="text"
                      placeholder="Ej. Salario mensual"
                      className="w-full"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description">Descripción (opcional)</FormLabel>
                  <FormControl>
                    <Input
                      id="description"
                      type="text"
                      placeholder="Ej. Pago de la empresa XYZ"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="amount">Monto</FormLabel>
                  <FormControl>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Ej. 1500000"
                      className="w-full"
                      min="0"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha</FormLabel>
                  <FormControl>
                    <DatePicker date={field.value} setDate={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger className="w-full p-2">
                        <SelectValue placeholder="Sin Categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex w-full pt-4 gap-8 justify-between flex-row">
              <DialogClose asChild onClick={() => setOpen(false)}>
                <Button
                  type="button"
                  className="flex-1 bg-secondary-background"
                  variant="reverse"
                  onClick={() => setOpen(false)}
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                variant='default'
                className="flex-1"
              >
                <Plus size={18} className="mr-1 inline-block" />
                {editTransaction ? 'Actualizar' : 'Añadir'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent >
    </Dialog >
  );
};

export default TransactionForm;
