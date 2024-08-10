import { useMutation } from "@tanstack/react-query";

import { updateOrderById as updateOrderByIdService } from "@/services/order";

export const useUpdateOrderById = () => {
  return useMutation({
    mutationFn: updateOrderByIdService,
  });
};
