import { useQuery } from "@tanstack/react-query";

import { getPaymentMethods } from "@/services/payment-method";

export const useGetPaymentMethods = () => {
  return useQuery({
    queryKey: ["payment-methods"],
    queryFn: getPaymentMethods,
    retry: false,
    gcTime: 0,
  });
};
