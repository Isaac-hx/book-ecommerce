import { useMutation } from "@tanstack/react-query";

import { createPaymentMethod as createPaymentMethodService } from "@/services/payment-method";

export const useCreatePaymentMethod = () => {
  return useMutation({
    mutationFn: createPaymentMethodService,
  });
};
