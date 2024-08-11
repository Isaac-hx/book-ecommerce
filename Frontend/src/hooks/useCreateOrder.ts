import { createOrder } from "@/services/order";
import { useMutation } from "@tanstack/react-query";

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: createOrder,
  });
};
