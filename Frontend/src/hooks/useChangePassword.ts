import { useMutation } from "@tanstack/react-query";

import { changePassword } from "@/services/auth";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
  });
};
