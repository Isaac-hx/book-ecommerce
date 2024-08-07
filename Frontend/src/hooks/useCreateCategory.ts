import { useMutation } from "@tanstack/react-query";

import { createCategory as createCategoryService } from "@/services/categories";

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: createCategoryService,
  });
};
