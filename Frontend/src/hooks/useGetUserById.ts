import { useQuery } from "@tanstack/react-query";

import { getUserById } from "@/services/user";

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserById(id),
    retry: false,
    gcTime: 0,
  });
};
