"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";
import { Produto } from "@/hooks/useProducts";

interface EditProductProps {
  produto: Produto;
  onEdit: (produtoAtualizado: Produto) => void;
}

export default function EditProduct({ produto, onEdit }: EditProductProps) {
  const [open, setOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  const [id, setId] = useState(produto.id);
  const [nome, setNome] = useState(produto.nome);
  const [descricao, setDescricao] = useState(produto.descricao);
  const [categoriaId, setCategoria] = useState(produto.categoriaId);
  const [custo, setCusto] = useState(produto.custo);
  const [preco, setPreco] = useState(produto.preco);
  const [quantidadeEstoque, setEstoque] = useState(produto.quantidadeEstoque);

  const categories = ["Eletrônicos", "Periféricos", "Acessórios"];

  useEffect(() => {
    setId(produto.id);
    setNome(produto.nome);
    setDescricao(produto.descricao);
    setCategoria(produto.categoriaId);
    setCusto(produto.custo);
    setPreco(produto.preco);
    setEstoque(produto.quantidadeEstoque);
  }, [produto]);

  const handleSubmit = () => {
    const produtoAtualizado: Produto = { id, nome, descricao, categoriaId, custo, preco, quantidadeEstoque };
    onEdit(produtoAtualizado);

    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 2000);

    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Editar
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Editar Produto</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 mt-2">
            <div className="flex flex-col">
              <Label>Nome</Label>
              <Input value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
            <div className="flex flex-col">
              <Label>Descrição</Label>
              <Input value={descricao} onChange={(e) => setDescricao(e.target.value)} />
            </div>
            <div className="flex flex-col">
              <Label>Categoria</Label>
              <select value={categoriaId} onChange={(e) => setCategoria(e.target.value)} className="w-full rounded border border-gray-300 px-3 py-2">
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <Label>Custo</Label>
              <Input type="number" value={custo} onChange={(e) => setCusto(Number(e.target.value))} />
            </div>
            <div className="flex flex-col">
              <Label>Preço</Label>
              <Input type="number" value={preco} onChange={(e) => setPreco(Number(e.target.value))} />
            </div>
            <div className="flex flex-col">
              <Label>Estoque</Label>
              <Input type="number" value={quantidadeEstoque} onChange={(e) => setEstoque(Number(e.target.value))} />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleSubmit}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {alertVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-blue-500 text-white px-6 py-3 rounded shadow-lg">
            Produto {nome} atualizado com sucesso!
          </div>
        </div>
      )}
    </>
  );
}
