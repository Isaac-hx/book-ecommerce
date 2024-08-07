import { useMutation } from "@tanstack/react-query";

import { createPublisher as createPublisherService } from "@/services/publisher";

export const useCreatePublisher = () => {
  return useMutation({
    mutationFn: createPublisherService,
  });
};
