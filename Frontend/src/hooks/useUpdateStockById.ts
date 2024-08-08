import { useMutation } from "@tanstack/react-query";

import { updateStockById as updateStockByIdService } from "@/services/stock";

export const useUpdateStockById = () => {
  return useMutation({
    mutationFn: updateStockByIdService,
  });
};
