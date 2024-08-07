import { useQuery } from "@tanstack/react-query";

import { getAuthors } from "@/services/author";

export const useGetAuthors = () => {
  return useQuery({
    queryKey: ["authors"],
    queryFn: getAuthors,
    retry: false,
    gcTime: 0,
  });
};
