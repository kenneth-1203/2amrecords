import type { NextApiRequest, NextApiResponse } from "next";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { prefix } from "@/api/index";

type ResponseData = {
  results: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { collectionName, collectionId } = req.query;
  const { docData } = req.body;
  const results = await setDoc(
    doc(firestore, `${prefix}${collectionName}`, `${collectionId}`),
    docData
  );
  res.status(200).json({ results });
}
