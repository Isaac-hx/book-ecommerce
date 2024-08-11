import { deleteCart } from "@/services/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
