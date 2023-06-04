import type { NextApiRequest, NextApiResponse } from "next";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { prefix } from "@/api/index";

type ResponseData = {
  results?: any;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const { id } = req.body;
    const results = await addDoc(collection(firestore, `${prefix}Users`), {
      id: id,
      fullName: req.body.fullName,
      email: req.body.email,
      photoURL: req.body.photoURL ?? "",
      createdAt: req.body.createdAt,
      lastSignedIn: req.body.lastSignedIn,
      provider: req.body.provider ?? null,
      country: req.body.country,
      phoneNumber: "",
      addressLine1: "",
      addressLine2: "",
      state: "",
      postcode: "",
      items: "",
      orderHistory: [],
    });
    res.status(200).json({ results });
  }
}
