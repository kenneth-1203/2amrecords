import type { NextApiRequest, NextApiResponse } from "next";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { prefix } from "@/api/index";

type ResponseData = {
  results: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { path, file } = req.body;
  const storageRef = ref(storage, `${prefix}${path}`);
  const { ref: fileRef } = await uploadBytes(storageRef, file);
  res.status(200).json({ results: fileRef.bucket });
}
