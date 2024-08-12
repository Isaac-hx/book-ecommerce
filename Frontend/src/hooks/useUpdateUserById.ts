import { useMutation } from "@tanstack/react-query";

import { updateUserById as updateUserByIdService } from "@/services/user";

export const useUpdateUserById = () => {
  return useMutation({
    mutationFn: updateUserByIdService,
  });
};
