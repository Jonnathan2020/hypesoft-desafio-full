"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign, Package2, PackageMinus, PackageOpen } from "lucide-react";
import { useDashboard } from "@/hooks/useDashboard";
import ChartOverview from "@/components/charts/totalProducts";
import { ItemsLowStock } from "@/components/layout/itemsLowStock";

export default function Dashboard() {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) return <p className="p-4 text-gray-500">Carregando dashboard...</p>;
  if (isError || !data) return <p className="p-4 text-red-500">Erro ao carregar dashboard.</p>;

  return (
    <main className="sm:ml-48 p-4">
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 select-none">Dashboard</h1>
        <p className="text-gray-500 mt-1">Informações dos Produtos</p>
      </header>

      {/* Cards resumo */}
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="text-lg sm:text-x1 text-gray-600 select-none">Total itens</CardTitle>
              <Package2 className="ml-auto w-5 h-5"/>
            </div>
            <CardDescription>Total de itens cadastrados</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-base sm:text-lg font-bold">{data.totalProdutos}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="text-lg sm:text-x1 text-gray-600 select-none">Estoque Total</CardTitle>
              <PackageOpen className="ml-auto w-5 h-5"/>
            </div>
            <CardDescription>Total de itens no estoque</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-base sm:text-lg font-bold">
            { 28/* sem tratamento para contar estoque */}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="text-lg sm:text-x1 text-gray-600 select-none">Valor em Estoque</CardTitle>
              <CircleDollarSign className="ml-auto w-5 h-5"/>
            </div>
            <CardDescription>Total de custo em estoque</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-base sm:text-lg font-bold">R$ {data.totalCusto.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="text-lg sm:text-x1 text-gray-600 select-none">Itens Estoque Baixo</CardTitle>
              <PackageMinus className="ml-auto w-5 h-5"/>
            </div>
            <CardDescription>Total de itens com estoque baixo</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-base sm:text-lg font-bold">{data.produtosEstoqueBaixo.length}</p>
          </CardContent>
        </Card>
      </section>

      {/* Gráficos e lista de produtos */}
      <section className="mt-4 flex flex-col md:flex-row gap-4">
        <ChartOverview produtosPorCategoria={data.produtosPorCategoria} />
        <ItemsLowStock produtos={data.produtosEstoqueBaixo} />
      </section>
    </main>
  );
}
