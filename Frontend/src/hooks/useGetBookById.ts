import { useQuery } from "@tanstack/react-query";

import { getBookById } from "@/services/book";

export const useGetBookById = (id: string) => {
  return useQuery({
    queryKey: ["books", id],
    queryFn: () => getBookById(id),
    retry: false,
    gcTime: 0,
  });
};
