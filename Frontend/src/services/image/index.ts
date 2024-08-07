import axios from "axios";

export const uploadImage = (image: File) => {
  const formData = new FormData();
  formData.append("file", image);
  return axios.post("/api/images/upload", formData);
};
