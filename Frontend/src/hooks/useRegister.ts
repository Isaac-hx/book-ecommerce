import { useMutation } from "@tanstack/react-query";

import { register as registerService } from "@/services/auth";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerService,
  });
};
