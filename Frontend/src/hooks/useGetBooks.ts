import { useQuery } from "@tanstack/react-query";

import { getBooks } from "@/services/book";
import { GetAllBookParams } from "@/services/book/types";

export const useGetBooks = (params: GetAllBookParams) => {
  return useQuery({
    queryKey: ["books", params],
    queryFn: () => {
      const mergedParams: GetAllBookParams = {
        page_index: 0,
        limit: 10,
        ...params,
      };

      return getBooks(mergedParams);
    },
    retry: false,
    gcTime: 0,
  });
};
