import { useMutation } from "@tanstack/react-query";

import { deletePublisherById as deletePublisherByIdService } from "@/services/publisher";

export const useDeletePublisherById = () => {
  return useMutation({
    mutationFn: deletePublisherByIdService,
  });
};
