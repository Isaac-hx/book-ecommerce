import { useMutation } from "@tanstack/react-query";

import { updatePaymentMethodById as updatePaymentMethodByIdService } from "@/services/payment-method";

export const useUpdatePaymentMethodById = () => {
  return useMutation({
    mutationFn: updatePaymentMethodByIdService,
  });
};
