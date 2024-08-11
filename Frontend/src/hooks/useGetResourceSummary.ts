import { useQuery } from "@tanstack/react-query";

import { getResourceSummaries } from "@/services/dashboard";

export const useGetResourceSummary = () => {
  return useQuery({
    queryKey: ["resource-summary"],
    queryFn: getResourceSummaries,
    retry: false,
    gcTime: 0,
  });
};
