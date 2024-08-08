import { useMutation } from "@tanstack/react-query";

import { createBook as createBookService } from "@/services/book";

export const useCreateBook = () => {
  return useMutation({
    mutationFn: createBookService,
  });
};
