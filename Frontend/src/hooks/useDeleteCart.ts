import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCart } from "@/services/cart";

export const useDeleteCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
