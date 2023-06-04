import type { NextApiRequest, NextApiResponse } from "next";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { prefix } from "@/api/index";

type ResponseData = {
  results: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { userId } = req.query;
  const fileRef = ref(storage, `${prefix}ProfileImages/${userId}`);
  const results = await getDownloadURL(fileRef);
  res.status(200).json({ results });
}
