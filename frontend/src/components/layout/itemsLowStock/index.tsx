"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PackageMinus } from "lucide-react";

export interface ItemsLowStockProps {
  produtos: {
    id: string;
    nome: string;
    quantidadeEstoque: number;
  }[];
}

export function ItemsLowStock({ produtos }: ItemsLowStockProps) {
  if (!produtos || produtos.length === 0) {
    return (
      <Card className="w-full md:w-1/2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">Itens Estoque Baixo</CardTitle>
            <PackageMinus className="ml-auto w-5 h-5 text-red-500" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Nenhum produto com estoque baixo.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full md:w-1/2 max-h-[400px] overflow-y-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">Itens Estoque Baixo</CardTitle>
          <PackageMinus className="ml-auto w-5 h-5 text-red-500" />
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {produtos.map((produto) => (
            <li
              key={produto.id}
              className="flex justify-between p-2 rounded bg-red-50 hover:bg-red-100 transition-colors"
            >
              <span className="font-medium text-gray-700">{produto.nome}</span>
              <span className="font-bold text-red-600">{produto.quantidadeEstoque}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
