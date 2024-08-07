import { useQuery } from "@tanstack/react-query";

import { getAuthorById } from "@/services/author";

export const useGetAuthorById = (id: string) => {
  return useQuery({
    queryKey: ["authors", id],
    queryFn: () => getAuthorById(id),
    retry: false,
    gcTime: 0,
  });
};
