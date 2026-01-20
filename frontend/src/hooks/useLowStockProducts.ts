import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/services/api";

export const useLowStockProducts = (limite: number = 10) => {
  return useQuery({
    queryKey: ["lowStockProducts", limite],
    queryFn: () => apiService.getLowStockProducts(limite),
    staleTime: 1000 * 60, // 1 minuto
    refetchOnWindowFocus: false,
  });
};
