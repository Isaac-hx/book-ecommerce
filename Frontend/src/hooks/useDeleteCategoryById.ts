import { useMutation } from "@tanstack/react-query";

import { deleteCategoryById as deleteCategoryByIdService } from "@/services/category";

export const useDeleteCategoryById = () => {
  return useMutation({
    mutationFn: deleteCategoryByIdService,
  });
};
