import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  doc,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  AuthErrorCodes,
} from "firebase/auth";
import db from "@/lib/index";
import { AxiosError } from "axios";
import { ILoginForm, ISignUpForm } from "@/shared/interfaces";

const collectionPrefix =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "development" ? "dev-" : "prod-";

export const getDocuments = async (collectionName: string) => {
  try {
    const response = await getDocs(
      collection(db, collectionPrefix + collectionName)
    );
    const results: any = [];
    response.forEach((doc: any) => {
      results.push(doc.data());
    });
    return results;
  } catch (error) {
    return error;
  }
};

export const getDocument = async (
  collectionName: string,
  documentId: string
) => {
  try {
    const snapshot = await getDoc(
      doc(db, collectionPrefix + collectionName, documentId)
    );
    let results;
    if (snapshot.exists()) {
      results = snapshot.data();
    }
    return results;
  } catch (error) {
    return error;
  }
};

export const createDocument = async (collectionName: string, docData: any) => {
  try {
    let response;
    if (docData.id) {
      response = await setDoc(
        doc(db, collectionPrefix + collectionName, docData.id),
        docData
      );
    } else {
      response = await addDoc(
        collection(db, collectionPrefix + collectionName),
        docData
      );
    }
    const results = response;
    return results;
  } catch (error) {
    const err = error as AxiosError;
    return err.response;
  }
};

export const signIn = async ({ email, password }: ILoginForm) => {
  const auth = getAuth();
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const results = response.user;
    return { results };
  } catch (error: any) {
    if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
      return { error: "Invalid password" };
    }
    if (error.code === AuthErrorCodes.INVALID_EMAIL) {
      return { error: "Invalid email address" };
    }
    return { error: "Something went wrong. Try again later" };
  }
};

export const signUp = async ({
  email,
  password,
  confirmPassword,
  fullName,
}: ISignUpForm) => {
  const auth = getAuth();
  try {
    if (password === confirmPassword) {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const results = response.user;
      await setDoc(doc(db, "Users", results.uid), {
        id: results.uid,
        fullName,
        email,
        photoURL: null,
        provider: null,
        orderHistory: [],
        lastSignedIn: new Date(),
        createdAt: new Date(),
      });
      return { results };
    } else {
      return { error: "Passwords do not match" };
    }
  } catch (error: any) {
    if (error.code === AuthErrorCodes.INVALID_EMAIL) {
      return { error: "Invalid email" };
    }
    if (error.code === AuthErrorCodes.WEAK_PASSWORD) {
      return { error: "Password must be more than 6 characters" };
    }
    if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
      return { error: "Email already in use" };
    }
    return { error: error.message };
  }
};
