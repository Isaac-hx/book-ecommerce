import { useQuery } from "@tanstack/react-query";

import { getCategoryById } from "@/services/categories";

export const useGetCategoryById = (id: string) => {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: () => getCategoryById(id),
    retry: false,
    gcTime: 0,
  });
};
