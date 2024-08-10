import { useQuery } from "@tanstack/react-query";

import { getOrderById } from "@/services/order";

export const useGetOrderById = (id: string) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => getOrderById(id),
    retry: false,
    gcTime: 0,
  });
};
