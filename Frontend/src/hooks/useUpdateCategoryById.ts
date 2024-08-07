import { useMutation } from "@tanstack/react-query";

import { updateCategoryById as updateCategoryByIdService } from "@/services/categories";

export const useUpdateCategoryById = () => {
  return useMutation({
    mutationFn: updateCategoryByIdService,
  });
};
