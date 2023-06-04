import type { NextApiRequest, NextApiResponse } from "next";
import { getDocs, collection } from "firebase/firestore";
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
  const response = await getDocs(
    collection(firestore, `${prefix}${collectionName}`)
  );
  const results: any = [];
  response.forEach((doc: any) => {
    results.push(doc.data());
  });
  res.status(200).json(results);
}
