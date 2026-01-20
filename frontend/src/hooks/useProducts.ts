import { apiService } from '@/services/api';
import { Product, CreateProductRequest, UpdateProductRequest } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from "sonner";


export interface Produto {
    id: string;
    nome: string;
    descricao: string;
    custo: number;
    preco: number;
    categoriaId: string;
    quantidadeEstoque: number;
}

//Busca produtos
export const useProducts = (pagina = 1, paginaTam = 10, busca?: string, categoriaId?: string) => {
  return useQuery({
    queryKey: ['products', pagina, paginaTam, busca, categoriaId],
    queryFn: () => apiService.getProducts(pagina, paginaTam, busca, categoriaId),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

//busca produto por id
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => apiService.getProductById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

//criação de produto
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: CreateProductRequest) => apiService.createProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      toast("Sucesso!", {
        description: "Produto criado com sucesso.",
      });
    },
    onError: (error: any) => {
        toast('Erro!',{
            description: error.response?.data?.message || 'Erro ao criar produto.',
          });
    
    },
  });
};

//atualiza produto
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...product }: UpdateProductRequest) => 
      apiService.updateProduct(id, product),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      toast('Sucesso!',{
        description: 'Produto atualizado com sucesso.'
      });
    },
    onError: (error: any) => {
      toast('Erro!',{
        description: error.response?.data?.message || 'Erro ao atualizar produto.'
      });
    },
  });
};

//deleta produto
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      toast('Sucesso!',{
        description: 'Produto excluído com sucesso.'
      });
    },
    onError: (error: any) => {
      toast('Erro!',{
        description: error.response?.data?.message || 'Erro ao excluir produto.',
      });
    },
  });
};

//Atualiza estoque
export const useUpdateStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, quantidade }: { id: string; quantidade: number }) => 
      apiService.updateStock(id, quantidade),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      toast('Sucesso!',{
        description: 'Estoque atualizado com sucesso'
      });
    },
    onError: (error: any) => {
      toast('Erro!',{
        description: error.response?.data?.message || 'Erro ao atualizar estoque.'
      });
    },
  });
};

export const useLowStockProducts = (threshold: number = 10) => {
  return useQuery({
    queryKey: ['products', 'low-stock', threshold],
    queryFn: async () => {
      // Busca todos produtos com filtro de baixo estoque
      const response = await apiService.getProducts(1, 1000); // busca produtos
      const products = response.data || [];
      
      console.log('Low stock hook - response:', response);
      console.log('Low stock hook - products:', products);
      console.log('Low stock hook - threshold:', threshold);
      
      if (Array.isArray(products)) {
        const lowStockProducts = products.filter((product: Product) => product.quantidadeEstoque <= threshold);
        console.log('Low stock hook - filtered products:', lowStockProducts);
        return lowStockProducts;
      }
      
      return [];
    },
    staleTime: 2 * 60 * 1000, // 2 minutos
    refetchInterval: 5 * 60 * 1000, // Recarrega a cada 5 minutos
  });
};