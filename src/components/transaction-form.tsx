'use client';

import { format } from "date-fns"

import React, { useEffect } from 'react';
import { Transaction } from '@/lib/types';
import { CalendarIcon, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createTransactionAction, updateTransactionAction } from '@/app/dashboard/actions';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { Input } from "./ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";


export type Category = {
  id: string;
  name: string;
  description: string;
};

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

  const formSchema = z.object({
    id: z.string(),
    type: z.enum(['expense', 'income']),
    concept: z.string().min(5, {
      message: 'El concepto debe tener al menos 5 caracteres',
    }),
    amount: z.number().min(0, {
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
    },
  });

  const categories: Category[] = [
    {
      id: '-1',
      name: 'Sin Categoría',
      description: '',
    },
    {
      id: '1',
      name: 'Alimentos',
      description: 'Productos alimenticios',
    },
  ];

  useEffect(() => {
    if (editTransaction) {
      form.reset(editTransaction);
    }
  }, [editTransaction]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.concept.trim()) {
      toast({
        title: "Error",
        description: "El concepto es obligatorio",
        variant: "destructive",
      });
      return;
    }

    if (!values.amount || isNaN(Number(values.amount)) || Number(values.amount) <= 0) {
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
    form.reset();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open}>
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
                    <FormLabel htmlFor="conceptId">Categoría</FormLabel>
                    <FormControl>
                      <Select {...field}>
                        <SelectTrigger className="w-full p-2">
                          <SelectValue placeholder="Selecciona una categoría" />
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
                <Button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-secondary-background"
                  variant="reverse"
                >
                  Cancelar
                </Button>
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
    </>
  );
};

const DatePicker = ({
  date,
  setDate,
}: {
  date: Date | undefined,
  setDate: (date: Date | undefined) => void,
}) => {
  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="noShadow"
          className="w-[280px] justify-start text-left font-base"
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Selecciona una fecha</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full border-0! p-0"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          required
        />
      </PopoverContent>
    </Popover>
  );
}

export default TransactionForm;
