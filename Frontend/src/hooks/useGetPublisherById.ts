import { useQuery } from "@tanstack/react-query";

import { getPublisherById } from "@/services/publisher";

export const useGetPublisherById = (id: string) => {
  return useQuery({
    queryKey: ["publishers", id],
    queryFn: () => getPublisherById(id),
    retry: false,
    gcTime: 0,
  });
};
