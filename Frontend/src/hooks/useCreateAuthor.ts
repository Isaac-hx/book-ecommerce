import { useMutation } from "@tanstack/react-query";

import { createAuthor as createAuthorService } from "@/services/author";

export const useCreateAuthor = () => {
  return useMutation({
    mutationFn: createAuthorService,
  });
};
