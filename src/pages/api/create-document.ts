import type { NextApiRequest, NextApiResponse } from "next";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { prefix } from "@/api/index";

type ResponseData = {
  results: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { collectionName } = req.query;
  const { docData } = req.body;
  const results = await addDoc(
    collection(firestore, `${prefix}${collectionName}`),
    docData
  );
  res.status(200).json({ results });
}
