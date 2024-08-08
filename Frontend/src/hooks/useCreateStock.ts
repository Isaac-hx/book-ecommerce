import { useMutation } from "@tanstack/react-query";

import { createStock as createStockService } from "@/services/stock";

export const useCreateStock = () => {
  return useMutation({
    mutationFn: createStockService,
  });
};
