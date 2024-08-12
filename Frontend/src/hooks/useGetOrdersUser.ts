import { useQuery } from "@tanstack/react-query";

import { getOrdersUser } from "@/services/order";

export const useGetOrdersUser = () => {
  return useQuery({
    queryKey: ["order-user"],
    queryFn: getOrdersUser,
    retry: false,
    gcTime: 0,
  });
};
