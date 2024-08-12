import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getBooks } from "@/services/book";
import { GetAllBookParams } from "@/services/book/types";

export const useGetBooks = (params: GetAllBookParams) => {
  return useQuery({
    queryKey: ["books", params],
    queryFn: ({ signal }) => {
      const mergedParams: GetAllBookParams = {
        page_index: 0,
        limit: 10,
        ...params,
      };

      return getBooks(mergedParams, signal);
    },
    retry: false,
    gcTime: 0,
    placeholderData: keepPreviousData,
  });
};
