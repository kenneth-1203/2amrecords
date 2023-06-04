import type { NextApiRequest, NextApiResponse } from "next";
import { doc } from "firebase/firestore";
import { prefix } from "@/api/index";
import { firestore } from "@/lib/firebase";

type ResponseData = {
  results: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { path } = req.query;
  const results = doc(firestore, `${prefix}${path}`);
  res.status(200).json({ results });
}
