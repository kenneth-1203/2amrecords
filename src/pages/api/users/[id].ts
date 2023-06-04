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
  if (req.method === "GET") {
    const { id } = req.query;
    const snapshot = await getDoc(doc(firestore, `${prefix}Users`, `${id}`));
    if (snapshot.exists()) {
      res.status(200).json({ results: snapshot.data() });
    } else {
      res.status(404).json({ results: null });
    }
  }
}
