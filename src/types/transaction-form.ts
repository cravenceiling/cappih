import { UseFormReturn } from "react-hook-form";
import { z } from "zod";


export const TransactionFormSchema = z.object({
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

export type TransactionFormType = z.infer<typeof TransactionFormSchema>;
export type UseFormType = UseFormReturn<z.infer<typeof TransactionFormSchema>>;
