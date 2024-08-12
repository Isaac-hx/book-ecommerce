import { useQuery } from "@tanstack/react-query";

import { getOrderUserById } from "@/services/order";

export const useGetOrderUserById = (id: string) => {
  return useQuery({
    queryKey: ["order-user", id],
    queryFn: () => getOrderUserById(id),
  });
};
