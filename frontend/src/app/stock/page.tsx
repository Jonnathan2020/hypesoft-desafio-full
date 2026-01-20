"use client";

import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct, Produto } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { CreateProductRequest } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ItemsLowStock } from "@/components/layout/itemsLowStock";
import ProductsTable from "@/components/layout/ProductsTable";
import AddProduct from "@/components/forms/AddProduct";
import { toast } from "sonner";
import { useDashboard } from "@/hooks/useDashboard";

export default function Stock() {
  const { data: produtos = [], isLoading: produtosLoading } = useProducts();
  const { data: categorias = [], isLoading: categoriasLoading } = useCategories();
  const { data: dashboardData } = useDashboard();

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  // Produtos com estoque baixo (limite <= 5)
  const produtosBaixoEstoque = produtos?.filter((p: Produto) => p.quantidadeEstoque <= 5) || [];

  // Mapeia o nome da categoria para o ID correto
  function mapCategoriaToId(nome: string): string {
    const cat = categorias.find((c: { nome: string; id: string }) => c.nome === nome);
    return cat?.id || "";
  }

  const handleAddProduct = (produto: Produto) => {
    const createRequest: CreateProductRequest = {
      nome: produto.nome,
      descricao: produto.descricao,
      custo: produto.custo,
      preco: produto.preco,
      categoriaId: mapCategoriaToId(produto.categoriaId || ""), // aqui usamos categoriaNome
      quantidadeEstoque: produto.quantidadeEstoque,
    };

    createProduct.mutate(createRequest, {
      onSuccess: () => toast.success("Produto criado com sucesso!"),
      onError: (err: any) => toast.error(err?.message || "Erro ao criar produto"),
    });
  };

  const handleEditProduct = (index: number, produtoAtualizado: Produto) => {
    updateProduct.mutate(produtoAtualizado, {
      onSuccess: () => toast.success("Produto atualizado com sucesso!"),
      onError: (err: any) => toast.error(err?.message || "Erro ao atualizar produto"),
    });
  };

  const handleDeleteProduct = (index: number) => {
    const produto = produtos[index];
    deleteProduct.mutate(produto.id, {
      onSuccess: () => toast.success("Produto excluído com sucesso!"),
      onError: (err: any) => toast.error(err?.message || "Erro ao excluir produto"),
    });
  };

  return (
    <main className="sm:ml-48 p-4">
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 select-none">
          Estoque
        </h1>
        <p className="text-gray-500 mt-1">Painel de inventário de estoque</p>
      </header>

      {/* Produtos com estoque baixo */}
      {dashboardData?.produtosEstoqueBaixo?.length > 0 && (
        <section className="mb-6">
          <ItemsLowStock produtos={dashboardData.produtosEstoqueBaixo.map((p: { id: any; nome: any; quantidadeEstoque: any; }) => ({
            id: p.id,
            nome: p.nome,
            quantidadeEstoque: p.quantidadeEstoque
          }))} />
        </section>
      )}



      {/* Card com tabela de produtos */}
      <section className="mb-6">
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
              Produtos em Estoque
            </CardTitle>
          </CardHeader>

          <CardContent>
            {produtosLoading ? (
              <p className="text-gray-500">Carregando produtos...</p>
            ) : (
              <ProductsTable
                produtos={produtos.map((p: { categoriaId: any; }) => ({
                  ...p,
                  categoriaNome: categorias.find((c: { id: any; }) => c.id === p.categoriaId)?.nome || "—"
                }))}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            )}

          </CardContent>
        </Card>
      </section>
    </main>
  );
}
