import { useMutation } from "@tanstack/react-query";

import { deleteCategoryById as deleteCategoryByIdService } from "@/services/categories";

export const useDeleteCategoryById = () => {
  return useMutation({
    mutationFn: deleteCategoryByIdService,
  });
};
