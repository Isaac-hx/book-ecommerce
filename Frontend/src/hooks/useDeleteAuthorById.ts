import { useMutation } from "@tanstack/react-query";

import { deleteAuthorById as deleteAuthorByIdService } from "@/services/author";

export const useDeleteAuthorById = () => {
  return useMutation({
    mutationFn: deleteAuthorByIdService,
  });
};
