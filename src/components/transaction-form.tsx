'use client';

import { format } from "date-fns"

import React, { useState, useEffect } from 'react';
import { Transaction, TransactionType } from '@/lib/types';
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
import { Label } from './ui/label';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { Input } from "./ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';


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
  const [id, setId] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [concept, setConcept] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());

  const formSchema = z.object({
    concept: z.string().min(5, {
      message: 'El concepto debe tener al menos 5 caracteres',
    }),
    amount: z.number().min(0, {
      message: 'El monto debe ser mayor o igual a 0',
    }),
    description: z.string().optional(),
    date: z.date(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (editTransaction) {
      setId(editTransaction.id);
      setType(editTransaction.type);
      setConcept(editTransaction.concept);
      setDescription(editTransaction.description || '');
      setAmount(editTransaction.amount.toString());
      setCategoryId(editTransaction.categoryId ?? '');
      setDate(new Date());
    }
  }, [editTransaction]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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

    const transaction = {
      id,
      type,
      concept,
      description: description.trim() || undefined,
      amount: Number(amount),
      date: date ?? new Date(),
      categoryId: categoryId || undefined,
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
    setId('');
    setType('expense');
    setConcept('');
    setDescription('');
    setAmount('');
    setCategoryId('');
    setDate(new Date());
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
              <input type="hidden" name="type" value={type} />

              <div>
                <div className="flex gap-2 mb-4">
                  <Button
                    type="button"
                    className={`flex-1 ${type === 'expense' ? 'font-bold bg-[#F2F2F2]' : ''}`}
                    variant={type === 'expense' ? 'noShadow' : 'default'}
                    onClick={() => setType('expense')}
                  >
                    Gasto
                  </Button>
                  <Button
                    className={`flex-1 ${type === 'income' ? 'font-bold bg-[#F2F2F2]' : ''}`}
                    type="button"
                    variant={type === 'income' ? 'noShadow' : 'default'}
                    onClick={() => setType('income')}
                  >
                    Ingreso
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="concept" className="block text-sm font-medium mb-1">Concepto</Label>
                    <Input
                      id="concept"
                      name="concept"
                      type="text"
                      value={concept}
                      onChange={(e) => setConcept(e.target.value)}
                      placeholder="Ej. Salario mensual"
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="block text-sm font-medium mb-1">Descripción (opcional)</Label>
                    <Input
                      id="description"
                      name="description"
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Ej. Pago de la empresa XYZ"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="amount" className="block text-sm font-medium mb-1">Monto</Label>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Ej. 1500000"
                      className="w-full"
                      min="0"
                      required
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha</FormLabel>
                        <FormControl>
                          <div>
                            <DatePicker date={field.value} setDate={field.onChange} />
                          </div>
                        </FormControl>
                      </FormItem>
                    )} />

                  <div>
                    {/*
                  className="w-full">
                  <Label htmlFor="date" className="block text-sm font-medium mb-1">Fecha</Label>
                  <DatePicker date={date} setDate={setDate} />
                <Label htmlFor="categoryId" className="block text-sm font-medium mb-1">Categoría (opcional)</Label>
                <Select
                  id="categoryId"
                  name="categoryId"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full p-2"
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
                */}
                  </div>
                </div>
              </div>

              <DialogFooter className="flex w-full pt-4 gap-8 justify-between flex-row">
                <Button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1"
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
