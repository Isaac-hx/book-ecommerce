import { useMutation } from "@tanstack/react-query";

import { deleteBookById as deleteBookByIdService } from "@/services/book";

export const useDeleteBookById = () => {
  return useMutation({
    mutationFn: deleteBookByIdService,
  });
};
