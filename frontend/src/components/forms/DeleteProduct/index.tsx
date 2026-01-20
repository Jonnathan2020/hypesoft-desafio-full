"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { Produto } from "@/hooks/useProducts";

interface DeleteProductProps {
  produto: Produto;
  onDelete: () => void;
}

export default function DeleteProduct({ produto, onDelete }: DeleteProductProps) {
  const [open, setOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  const handleDelete = () => {
    onDelete();
    setOpen(false);
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 2000);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive" className="flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            Excluir
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Excluir Produto</DialogTitle>
          </DialogHeader>

          <p className="mt-2 text-gray-700">
            Tem certeza que deseja excluir o produto <strong>{produto.nome}</strong>?
          </p>

          <DialogFooter className="mt-4">
            <Button variant="destructive" onClick={handleDelete}>Excluir</Button>
            <Button onClick={() => setOpen(false)}>Cancelar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {alertVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-red-500 text-white px-6 py-3 rounded shadow-lg">
            Produto {produto.nome} excluído com sucesso!
          </div>
        </div>
      )}
    </>
  );
}
