import type { NextApiRequest, NextApiResponse } from "next";
import { signInWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, firestore } from "@/lib/firebase";
import { prefix } from "@/api/index";

type ResponseData = {
  results?: any;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { email, password } = req.body;
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const document = doc(firestore, `${prefix}Users`, response.user.uid);
    await updateDoc(document, {
      lastSignedIn: new Date(),
    });
    const results = response.user;
    res.status(200).json({ results });
  } catch (error: any) {
    if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
      res.status(400).json({ error: "Invalid password" });
    }
    if (error.code === AuthErrorCodes.INVALID_EMAIL) {
      res.status(400).json({ error: "Invalid email address" });
    } else {
      res.status(401).json({ error: error.message });
    }
  }
}
