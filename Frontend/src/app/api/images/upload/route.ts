import { fileTypeFromBlob } from "file-type";

import { uploadImage } from "@/lib/firebase/storage";

const MAXIMUM_FILE_SIZE = 512_000; // 500KB

export const POST = async (request: Request) => {
  try {
    if (!request.headers.get("Content-Type")?.includes("multipart/form-data")) {
      return Response.json({ code: "INVALID_CONTENT_TYPE" }, { status: 400 });
    }

    let formData = null;
    try {
      formData = await request.formData();
    } catch (error) {
      return Response.json({ code: "EMPTY_OR_MISSING_BODY" }, { status: 400 });
    }

    const file = formData.get("file") as File | null;

    if (!(file instanceof File)) {
      return Response.json({ code: "MISSING_FILE" }, { status: 400 });
    }

    const data = await fileTypeFromBlob(file);
    if (data?.mime !== "image/png" && data?.mime !== "image/jpeg") {
      return Response.json({ code: "MUST_JPEG_OR_PNG" }, { status: 400 });
    }

    if (file.size > MAXIMUM_FILE_SIZE) {
      return Response.json({ code: "MAX_2_MB" }, { status: 413 });
    }

    const url = await uploadImage(file);

    return Response.json({ data: url });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 500 });
    }
  }
};
