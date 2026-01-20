"use client";

import { useState, useMemo } from "react";
import SearchForm from "@/components/forms/searchForm/";
import ProductsTable from "@/components/layout/ProductsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Produto, useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";

export default function Products() {
  const [busca, setBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("All");

  // Hook de produtos
  const { data: produtos = [], isLoading: produtosLoading } = useProducts(
    1,
    100,
    busca,
    categoriaSelecionada !== "All" ? categoriaSelecionada : undefined
  );

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  // Hook de categorias
  const { data: categorias = [], isLoading: categoriasLoading } = useCategories();

  // Funções para SearchForm
  const handleSearch = (termo: string, categoria: string) => {
    setBusca(termo);
    setCategoriaSelecionada(categoria);
  };

  const handleAddProduct = (produto: Produto) => {
    createProduct.mutate({
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      custo: produto.custo,
      categoriaId: produto.categoriaId,
      quantidadeEstoque: produto.quantidadeEstoque,
    });
  };

  // Funções para ProductsTable
  const handleEditProduct = (index: number, produtoAtualizado: Produto) => {
    updateProduct.mutate({
      id: produtoAtualizado.id,
      nome: produtoAtualizado.nome,
      descricao: produtoAtualizado.descricao,
      preco: produtoAtualizado.preco,
      custo: produtoAtualizado.custo,
      categoriaId: produtoAtualizado.categoriaId,
      quantidadeEstoque: produtoAtualizado.quantidadeEstoque,
    });
  };

  const handleDeleteProduct = (index: number) => {
    const produto = produtos[index];
    if (produto) {
      deleteProduct.mutate(produto.id);
    }
  };

  // Mapeia produtos para incluir nome da categoria e estoque
  const produtosComCategoriaNome = useMemo(() => {
    return produtos.map((p: { categoriaId: any; quantidadeEstoque: any; }) => {
      const categoria = categorias.find((c: { id: any; }) => c.id === p.categoriaId);
      return {
        ...p,
        categoriaNome: categoria ? categoria.nome : "Desconhecida",
        estoque: p.quantidadeEstoque,
      };
    });
  }, [produtos, categorias]);

  if (produtosLoading) return <p>Carregando produtos...</p>;

  return (
    <main className="sm:ml-48 p-4">
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 select-none">Produtos</h1>
        <p className="text-gray-500 mt-1">Painel de controle de Produtos</p>
      </header>

      {/* Search */}
      <section className="grid grid-cols-1 lg:grid-cols-1 gap-4 mb-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-gray-400" />
              <CardTitle className="sm:text-xl text-gray-400 select-none">Pesquisa Simples</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <SearchForm
              categories={["All", ...categorias.map((c: any) => c.nome)]}
              onSearch={handleSearch}
              onAddProduct={handleAddProduct}
            />
          </CardContent>
        </Card>
      </section>

      {/* Tabela */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl text-gray-800">Resultados</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductsTable
            produtos={produtosComCategoriaNome}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        </CardContent>
      </Card>
    </main>
  );
}
