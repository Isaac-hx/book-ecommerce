import { useQuery } from "@tanstack/react-query";

import { getProfileById } from "@/services/profile";

export const useGetProfileById = (id: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["profile", id],
    queryFn: () => getProfileById(id),
    retry: false,
    gcTime: 0,
    enabled,
  });
};
