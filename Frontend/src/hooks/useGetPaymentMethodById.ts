import { useQuery } from "@tanstack/react-query";

import { getPaymentMethodById } from "@/services/payment-method";

export const useGetPaymentMethodById = (id: string) => {
  return useQuery({
    queryKey: ["payment-methods", id],
    queryFn: () => getPaymentMethodById(id),
    retry: false,
    gcTime: 0,
  });
};
