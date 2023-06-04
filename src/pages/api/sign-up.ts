import type { NextApiRequest, NextApiResponse } from "next";
import { AuthErrorCodes, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
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
  const { uid, email, password, confirmPassword, fullName } = req.body;
  try {
    if (password === confirmPassword) {
      const results = await setDoc(doc(firestore, `${prefix}Users`, uid), {
        id: uid,
        fullName,
        email,
        country: "Malaysia",
        phoneNumber: "",
        addressLine1: "",
        addressLine2: "",
        state: "",
        postcode: "",
        photoURL: "",
        provider: "",
        orderHistory: [],
        items: [], // TODO: Add existing items from guest
        lastSignedIn: new Date(),
        createdAt: new Date(),
      });
      res.status(200).json({ results });
    } else {
      res.status(400).json({ error: "Passwords do not match" });
    }
  } catch (error: any) {
    if (error.code === AuthErrorCodes.INVALID_EMAIL) {
      res.status(400).json({ error: "Invalid email" });
    }
    if (error.code === AuthErrorCodes.WEAK_PASSWORD) {
      res
        .status(400)
        .json({ error: "Password must be more than 6 characters" });
    }
    if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
      res.status(400).json({ error: "Email already in use" });
    } else {
      res.status(401).json({ error: error.message });
    }
  }
}
