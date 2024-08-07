import { useQuery } from "@tanstack/react-query";

import { getPublishers } from "@/services/publisher";

export const useGetPublishers = () => {
  return useQuery({
    queryKey: ["publishers"],
    queryFn: getPublishers,
    retry: false,
    gcTime: 0,
  });
};
