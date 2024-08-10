import { useQuery } from "@tanstack/react-query";

import { getOrders } from "@/services/order";

export const useGetOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
    retry: false,
    gcTime: 0,
  });
};
