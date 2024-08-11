import { useQuery } from "@tanstack/react-query";

import { getOrderHistories } from "@/services/dashboard";
import { GetOrderHistoriesParams } from "@/services/dashboard/types";

export const useGetOrderHistories = (params: GetOrderHistoriesParams) => {
  return useQuery({
    queryKey: ["order-histories", params],
    queryFn: () => getOrderHistories(params),
    retry: false,
    gcTime: 0,
  });
};
