import axios from "axios";

import { type UploadImageResponse } from "./types";

export const uploadImage = (image: File) => {
  const formData = new FormData();
  formData.append("file", image);
  return axios.post<UploadImageResponse>("/api/images/upload", formData);
};
