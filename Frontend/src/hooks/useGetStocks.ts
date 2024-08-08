import { useQuery } from "@tanstack/react-query";

import { getStocks } from "@/services/stock";

export const useGetStocks = () => {
  return useQuery({
    queryKey: ["stocks"],
    queryFn: getStocks,
    retry: false,
    gcTime: 0,
  });
};
