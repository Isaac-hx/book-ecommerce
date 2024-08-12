import { useMutation } from "@tanstack/react-query";

import { createOrder } from "@/services/order";

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: createOrder,
  });
};
