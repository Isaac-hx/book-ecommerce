import { useMutation } from "@tanstack/react-query";

import { updateOrderUserById } from "@/services/order";

export const useUpdateOrderUserById = () => {
  return useMutation({
    mutationFn: updateOrderUserById,
  });
};
