import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { Category, CreateCategoryRequest, UpdateCategoryRequest } from '@/types';
import { toast } from "sonner";

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => apiService.getCategories(),
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
};

export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => apiService.getCategoryById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (category: CreateCategoryRequest) => apiService.createCategory(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast('Sucesso!',{
        description: 'Categoria criada com sucesso.'
      });
    },
    onError: (error: any) => {
      toast('Erro!',{
        description: error.response?.data?.message || 'Erro ao criar categoria.',
      });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...category }: UpdateCategoryRequest) => 
      apiService.updateCategory(id, category),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['category', variables.id] });
      toast('Sucesso!',{
        description: 'Categoria atualizada com sucesso.'
      });
    },
    onError: (error: any) => {
        toast('Erro!',{
            description: error.response?.data?.message || 'Erro ao atualizar categoria.',
          });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast('Sucesso!',{
        description: 'Categoria excluída com sucesso.'
      });
    },
    onError: (error: any) => {
        toast('Erro!',{
            description: error.response?.data?.message || 'Erro ao excluir categoria.',
          });
    },
  });
};