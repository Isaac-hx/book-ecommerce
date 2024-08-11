import { useMutation } from "@tanstack/react-query";

import { addToCart } from "@/services/cart";

export const useAddToCart = () => {
  return useMutation({
    mutationFn: addToCart,
  });
};
