import { useQuery } from "@tanstack/react-query";

import { getCart } from "@/services/cart";

export const useGetAllCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
    retry: false,
    gcTime: 0,
  });
};
