"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { Produto, useCreateProduct } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { toast } from "sonner";

interface AddProductProps {
  onAdd: (produto: Produto) => void;
}

export default function AddProduct({ onAdd }: AddProductProps) {
  const { mutate: createProduct, isPending } = useCreateProduct();
  const { data: categorias, isLoading: loadingCategorias } = useCategories();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [custo, setCusto] = useState(0);
  const [preco, setPreco] = useState(0);
  const [categoriaId, setCategoriaId] = useState<string>("");
  const [quantidadeEstoque, setQuantidadeEstoque] = useState(0);
  const [open, setOpen] = useState(false);

  // Atualiza categoria selecionada quando categorias carregam
  useEffect(() => {
    if (categorias?.length && !categoriaId) {
      setCategoriaId(categorias[0].id); // seleciona a primeira por padrão
    }
  }, [categorias]);

  const handleSubmit = () => {
    if (!nome || preco <= 0 || !categoriaId) {
      toast("Atenção", {
        description: "Preencha os campos obrigatórios",
      });
      return;
    }

    const payload = {
      nome,
      descricao,
      custo,
      preco,
      categoriaId,
      quantidadeEstoque,
    };

    createProduct(payload, {
      onSuccess: () => {
        toast("Produto criado com sucesso!");
        onAdd({ id:"", nome, descricao, custo, preco, categoriaId: "", quantidadeEstoque: quantidadeEstoque }); // opcional: atualizar tabela
        setOpen(false);
        setNome("");
        setDescricao("");
        setCusto(0);
        setPreco(0);
        setCategoriaId(categorias?.[0]?.id || "");
        setQuantidadeEstoque(0);
      },
      onError: (err: any) => {
        toast(`Erro: ${err.response?.data?.message || "Não foi possível criar o produto"}`);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full lg:w-auto bg-green-500 hover:bg-green-600 text-white flex items-center gap-2">
          <PlusCircle className="h-5 w-5" />
          Adicionar Produto
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Adicionar Produto</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col">
            <Label htmlFor="nome">Nome</Label>
            <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="descricao">Descrição</Label>
            <Input id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="categoria">Categoria</Label>
            {loadingCategorias ? (
              <p>Carregando categorias...</p>
            ) : (
              <select
                id="categoria"
                value={categoriaId}
                onChange={(e) => setCategoriaId(e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2"
              >
                {categorias?.map((cat: {id:string; nome:string}) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nome}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="flex flex-col">
            <Label htmlFor="custo">Custo</Label>
            <Input id="custo" type="number" value={custo} onChange={(e) => setCusto(Number(e.target.value))} />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="preco">Preço</Label>
            <Input id="preco" type="number" value={preco} onChange={(e) => setPreco(Number(e.target.value))} />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="estoque">Quantidade em Estoque</Label>
            <Input
              id="estoque"
              type="number"
              value={quantidadeEstoque}
              onChange={(e) => setQuantidadeEstoque(Number(e.target.value))}
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? "Salvando..." : "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
