import { updateOrderUserById } from "@/services/order";
import { useMutation } from "@tanstack/react-query";

export const useUpdateOrderUserById = () => {
  return useMutation({
    mutationFn: updateOrderUserById,
  });
};
