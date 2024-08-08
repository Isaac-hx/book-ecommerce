import { useMutation } from "@tanstack/react-query";

import { updateBookById as updateBookByIdService } from "@/services/book";

export const useUpdateBookById = () => {
  return useMutation({
    mutationFn: updateBookByIdService,
  });
};
