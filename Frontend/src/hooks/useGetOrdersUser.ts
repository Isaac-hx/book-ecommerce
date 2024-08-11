import { getOrdersUser } from "@/services/order";
import { useQuery } from "@tanstack/react-query";

export const useGetOrdersUser = () => {
  return useQuery({
    queryKey: ["order-user"],
    queryFn: getOrdersUser,
    retry: false,
    gcTime: 0,
  });
};
