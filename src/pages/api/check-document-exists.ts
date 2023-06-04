import type { NextApiRequest, NextApiResponse } from "next";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { prefix } from "@/api/index";

type ResponseData = {
  results: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { collectionName, documentId } = req.query;
  const snapshot = await getDoc(
    doc(firestore, `${prefix}${collectionName}`, `${documentId}`)
  );
  res.status(200).json({ results: snapshot.exists() });
}
