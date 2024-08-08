import { useMutation } from "@tanstack/react-query";

import { createCategory as createCategoryService } from "@/services/category";

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: createCategoryService,
  });
};
