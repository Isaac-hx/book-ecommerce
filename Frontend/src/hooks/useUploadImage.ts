import { useMutation } from "@tanstack/react-query";

import { uploadImage as uploadImageService } from "@/services/image";

export const useUploadImage = () => {
  return useMutation({
    mutationFn: uploadImageService,
  });
};
