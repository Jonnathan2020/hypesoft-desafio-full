"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PackageOpen } from "lucide-react";
import { BarChart, Bar, CartesianGrid, XAxis, Tooltip, Legend } from "recharts";
import { ProductPerCategory } from "@/types";

interface ChartOverviewProps {
  produtosPorCategoria: ProductPerCategory[];
}

export default function ChartOverview({ produtosPorCategoria }: ChartOverviewProps) {
  const [selectedCategory, setSelectedCategory] = useState<"All" | string>("All");

  // Filtra categorias
  const categories = ["All", ...Array.from(new Set(produtosPorCategoria.map(d => d.nomeCategoria)))];

  const filteredData = produtosPorCategoria.filter(
    d => selectedCategory === "All" || d.nomeCategoria === selectedCategory
  );

  return (
    <Card className="w-full md:w-2/4 md:max-w-[800px]">
      <CardHeader>
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg sm:text-xl text-gray-800">Produtos por Categoria</CardTitle>
            <PackageOpen className="ml-auto w-5 h-5" />
          </div>

          <div className="mt-2 w-1/2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <BarChart
          data={filteredData}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          barGap={10}
          width={600}
          height={300}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="nomeCategoria" />
          <Tooltip />
          <Legend />
          <Bar dataKey="quantidadeProdutos" name="Quantidade" fill="#2563eb" radius={[4, 4, 0, 0]} />
          <Bar dataKey="totalCusto" name="Custo" fill="#ef4444" radius={[4, 4, 0, 0]} />
          <Bar dataKey="totalValores" name="Valor" fill="#16a34a" radius={[4, 4, 0, 0]} />
        </BarChart>
      </CardContent>
    </Card>
  );
}
