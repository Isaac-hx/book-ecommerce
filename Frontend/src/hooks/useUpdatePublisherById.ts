import { useMutation } from "@tanstack/react-query";

import { updatePublisherById as updatePublisherByIdService } from "@/services/publisher";

export const useUpdatePublisherById = () => {
  return useMutation({
    mutationFn: updatePublisherByIdService,
  });
};
