'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Input } from "./ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { DatePicker } from './ui/date-picker';
import { Category } from '@/types/category';
import { TransactionFormType, UseFormType } from '@/types/transaction-form';


interface TransactionFormProps {
  form: UseFormType;
  edit?: boolean;
  onSubmit: (values: TransactionFormType) => void;
  onClose: () => void;
  categories: Category[];
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  form,
  edit,
  categories,
  onSubmit,
  onClose,
}) => {
  return (
    <DialogContent className="p-5 sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">
          {edit ? 'Editar transacción' : 'Nueva transacción'}
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
            <DialogClose asChild onClick={onClose}>
              <Button
                type="button"
                className="flex-1 bg-secondary-background"
                variant="reverse"
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
              {edit ? 'Actualizar' : 'Añadir'}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent >
  );
};

export default TransactionForm;
