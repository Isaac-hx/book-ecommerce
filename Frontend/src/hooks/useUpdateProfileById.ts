import { useMutation } from "@tanstack/react-query";

import { updateProfileById } from "@/services/profile";

export const useUpdateProfileById = () => {
  return useMutation({
    mutationFn: updateProfileById,
  });
};
