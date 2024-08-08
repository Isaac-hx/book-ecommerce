import { useMutation } from "@tanstack/react-query";

import { updateCategoryById as updateCategoryByIdService } from "@/services/category";

export const useUpdateCategoryById = () => {
  return useMutation({
    mutationFn: updateCategoryByIdService,
  });
};
