import { useQuery } from "@tanstack/react-query";

import { getUsers } from "@/services/user";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    retry: false,
    gcTime: 0,
  });
};
