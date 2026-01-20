"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit2, Trash2, Edit } from "lucide-react";
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

interface Categoria {
  id: number;
  nome: string;
  descricao: string;
  quantidadeProdutos: number;
}

export default function Categories() {
  const [categorias, setCategorias] = useState<Categoria[]>([
    { id: 1, nome: "Mercearia", descricao: "Mercearia em geral", quantidadeProdutos: 12 },
    { id: 2, nome: "Bebidas", descricao: "Aguas, refrigerantes e alcoolicos", quantidadeProdutos: 8 },
    { id: 3, nome: "Eletrônicos", descricao: "Eletronicos de consumo", quantidadeProdutos: 15 },
    { id: 3, nome: "Eletrodomésticos", descricao: "Eletrodomesticos em geral", quantidadeProdutos: 26 },
    { id: 3, nome: "jogos", descricao: "Games Diversos", quantidadeProdutos: 32 },
  ]);

  // --- ESTADOS DO DIALOG ---
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [categoriaAtual, setCategoriaAtual] = useState<Categoria | null>(null);

  // --- FORMULÁRIO ADD/EDIT ---
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleAddSubmit = () => {
    const novo: Categoria = {
      id: categorias.length + 1,
      nome,
      descricao,
      quantidadeProdutos: 0,
    };
    setCategorias((prev) => [...prev, novo]);
    setNome("");
    setDescricao("");
    setOpenAdd(false);
  };

  const handleEditSubmit = () => {
    if (!categoriaAtual) return;
    setCategorias((prev) =>
      prev.map((cat) =>
        cat.id === categoriaAtual.id ? { ...cat, nome, descricao } : cat
      )
    );
    setCategoriaAtual(null);
    setNome("");
    setDescricao("");
    setOpenEdit(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta categoria?")) {
      setCategorias((prev) => prev.filter((cat) => cat.id !== id));
    }
  };

  return (
    <main className="sm:ml-48 p-4">
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 select-none">
          Categorias
        </h1>
        <p className="text-gray-500 mt-1">
          Painel de controle de categorias
        </p>
      </header>

      {/* CARD COM TABELA */}
      <Card className="w-full md:w-3/4 md:max-w-[900px]">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg sm:text-xl text-gray-800">
              Lista de Categorias
            </CardTitle>

            {/* BOTÃO ADD */}
            <Dialog open={openAdd} onOpenChange={setOpenAdd}>
              <DialogTrigger asChild>
                <Button className="ml-auto bg-green-500 hover:bg-green-600 text-white flex items-center gap-1">
                  <PlusCircle className="h-5 w-5" />
                  Adicionar
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Adicionar Categoria</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4 mt-2">
                  <div className="flex flex-col">
                    <Label htmlFor="nome">Nome</Label>
                    <Input
                      id="nome"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Digite o nome"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="descricao">Descrição</Label>
                    <Input
                      id="descricao"
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                      placeholder="Digite a descrição"
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button onClick={handleAddSubmit} className="w-full">
                    Salvar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <CardDescription className="mt-1">
            Gerencie suas categorias aqui
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Nome</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="text-right">Produtos</TableHead>
                  <TableHead className="text-center">Editar</TableHead>
                  <TableHead className="text-center">Excluir</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {categorias.map((cat) => (
                  <TableRow key={cat.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{cat.nome}</TableCell>
                    <TableCell>{cat.descricao}</TableCell>
                    <TableCell className="text-right font-semibold">{cat.quantidadeProdutos}</TableCell>

                    {/* EDIT */}
                    <TableCell className="flex justify-center gap-2">
                      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline" 
                            className=" items-center gap-1"
                            onClick={() => {
                              setCategoriaAtual(cat);
                              setNome(cat.nome);
                              setDescricao(cat.descricao);
                              setOpenEdit(true);
                            }}
                          >
                            <Edit className="h-5 w-5" />
                            Editar
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Editar Categoria</DialogTitle>
                          </DialogHeader>

                          <div className="flex flex-col gap-4 mt-2">
                            <div className="flex flex-col">
                              <Label htmlFor="nomeEdit" className="mb-1">Nome</Label>
                              <Input
                                id="nomeEdit"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                              />
                            </div>
                            <div className="flex flex-col">
                              <Label htmlFor="descricaoEdit" className="mb-1">Descrição</Label>
                              <Input
                                id="descricaoEdit"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                              />
                            </div>
                          </div>

                          <DialogFooter>
                            <Button onClick={handleEditSubmit} className="w-full">
                              Salvar
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>

                    {/* DELETE */}
                    <TableCell className="">
                      <Button
                        className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-1"
                        onClick={() => handleDelete(cat.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Excluir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
