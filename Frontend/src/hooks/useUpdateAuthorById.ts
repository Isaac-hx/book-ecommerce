import { useMutation } from "@tanstack/react-query";

import { updateAuthorById as updateAuthorByIdService } from "@/services/author";

export const useUpdateAuthorById = () => {
  return useMutation({
    mutationFn: updateAuthorByIdService,
  });
};
