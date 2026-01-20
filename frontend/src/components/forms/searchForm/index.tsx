"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import AddProduct from "../AddProduct";
import { Produto } from "@/hooks/useProducts";

interface SearchFormProps {
  categories: string[];
  onSearch: (term: string, category: string) => void;
  onAddProduct: (produto: Produto) => void;
}

export default function SearchForm({ categories, onSearch, onAddProduct }: SearchFormProps) {
  const [busca, setBusca] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(busca, selectedCategory);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full">
      <div className="flex flex-col">
        <Label htmlFor="nome" className="text-gray-700 font-medium mb-1">Nome</Label>
        <Input
          id="nome"
          type="text"
          placeholder="Digite o nome do produto..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="flex flex-col">
        <Label htmlFor="categoria" className="text-gray-700 font-medium mb-1">Categoria</Label>
        <select
          id="categoria"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full rounded border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="flex items-end">
        <Button type="submit" className="w-full lg:w-auto">Pesquisar</Button>
      </div>

      <div className="flex items-end">
        <AddProduct onAdd={onAddProduct} />
      </div>
    </form>
  );
}
