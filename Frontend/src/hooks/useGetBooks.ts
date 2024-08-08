import { useQuery } from "@tanstack/react-query";

import { getBooks } from "@/services/book";

export const useGetBooks = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
    retry: false,
    gcTime: 0,
  });
};
