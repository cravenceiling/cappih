import { deleteTransactionAction } from "@/app/dashboard/actions";
import { useToast } from "@/hooks/use-toast";
import { ConfirmDeleteDialog } from "./delete-dialog";


const DeleteTransactionBtn: React.FC<{ id: string }> = ({ id }) => {
  const { toast } = useToast();

  const handleDeleteTransaction = async () => {
    const { error } = await deleteTransactionAction(id);
    if (error) {
      toast({ title: "Error", description: error, });
      return;
    }

    toast({
      title: "Transacción eliminada",
      description: "La transacción ha sido eliminada exitosamente",
      className: 'bg-secondary-background text-foreground',
    });
  };

  return (
    <ConfirmDeleteDialog onDelete={handleDeleteTransaction} />
  );
};

export default DeleteTransactionBtn;
