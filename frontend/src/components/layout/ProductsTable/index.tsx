"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Produto } from "@/hooks/useProducts";
import EditProduct from "@/components/forms/EditProduct";
import DeleteProduct from "@/components/forms/DeleteProduct";

interface ProductsTableProps {
  produtos: (Produto & { categoriaNome: string; estoque: number })[];
  onEdit: (index: number, produtoAtualizado: Produto) => void;
  onDelete: (index: number) => void;
}

export default function ProductsTable({ produtos, onEdit, onDelete }: ProductsTableProps) {
  if (!produtos || produtos.length === 0) {
    return <p className="text-gray-500 mt-2">Nenhum produto encontrado.</p>;
  }

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead className="text-right">Custo</TableHead>
          <TableHead className="text-right">Preço</TableHead>
          <TableHead className="text-right">Estoque</TableHead>
          <TableHead className="text-center">Editar</TableHead>
          <TableHead className="text-start">Excluir</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {produtos.map((produto, idx) => (
          <TableRow key={produto.id} className="hover:bg-gray-50">
            <TableCell>{produto.nome}</TableCell>
            <TableCell>{produto.descricao}</TableCell>
            <TableCell>{produto.categoriaNome}</TableCell>
            <TableCell className="text-right text-red-600 font-medium">
              R$ {produto.custo.toFixed(2)}
            </TableCell>
            <TableCell className="text-right text-green-600 font-medium">
              R$ {produto.preco.toFixed(2)}
            </TableCell>
            <TableCell className="text-right">{produto.quantidadeEstoque}</TableCell>

            <TableCell className="flex justify-center text-center">
              <EditProduct
                produto={produto}
                onEdit={(produtoAtualizado) => onEdit(idx, produtoAtualizado)}
              />
            </TableCell>

            <TableCell className="ml-auto text-center">
              <DeleteProduct
                produto={produto}
                onDelete={() => onDelete(idx)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
