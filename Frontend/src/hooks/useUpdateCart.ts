import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCart } from "@/services/cart";

export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
