import { getOrderUserById } from "@/services/order";
import { useQuery } from "@tanstack/react-query";

export const useGetOrderUserById = (id: string) => {
  return useQuery({
    queryKey: ["order-user", id],
    queryFn: () => getOrderUserById(id),
  });
};
