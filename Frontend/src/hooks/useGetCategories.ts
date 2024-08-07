import { useQuery } from "@tanstack/react-query";

import { getCategories } from "@/services/categories";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    retry: false,
    gcTime: 0,
  });
};
