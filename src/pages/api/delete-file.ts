import type { NextApiRequest, NextApiResponse } from "next";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { prefix } from "@/api/index";

type ResponseData = {
  results: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { path } = req.body;
  const storageRef = ref(storage, `${prefix}${path}`);
  await deleteObject(storageRef);
  res.status(200).json({ results: true });
}
