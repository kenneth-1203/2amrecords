import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  AuthErrorCodes,
} from "firebase/auth";
import { firestore, auth } from "@/lib/firebase";
import { ILoginForm, ISignUpForm } from "@/shared/interfaces";
import { removeFileExtension } from "@/shared/utils";

export const prefix =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? "prod-" : "dev-";

export const getDocuments = async (collectionName: string) => {
  try {
    const response = await getDocs(
      collection(firestore, prefix + collectionName)
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
      doc(firestore, prefix + collectionName, documentId)
    );
    let results = null;
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
        doc(firestore, prefix + collectionName, docData.id),
        docData
      );
    } else {
      response = await addDoc(
        collection(firestore, prefix + collectionName),
        docData
      );
    }
    const results = response;
    return results;
  } catch (error) {
    return error;
  }
};

export const getFileURLs = async (path: string) => {
  try {
    const storage = getStorage();
    const folderRef = ref(storage, prefix + path);
    const { items } = await listAll(folderRef);
    const downloadURLs = await Promise.all(
      items.map(async (item) => {
        const url = await getDownloadURL(item);
        return {
          url,
          sort: Number(removeFileExtension(item.name)),
        };
      })
    );
    return { results: downloadURLs };
  } catch (error) {
    return { error };
  }
};

export const getFileURL = async (path: string) => {
  try {
    const storage = getStorage();
    const fileRef = ref(storage, prefix + path);
    const downloadURL = await getDownloadURL(fileRef);
    return { results: downloadURL };
  } catch (error) {
    return { error };
  }
};

export const signIn = async ({ email, password }: ILoginForm) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const document = doc(firestore, prefix + "Users", response.user.uid);
    await updateDoc(document, {
      lastSignedIn: new Date(),
    });
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
  try {
    if (password === confirmPassword) {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const results = response.user;
      await setDoc(doc(firestore, prefix + "Users", results.uid), {
        id: results.uid,
        fullName,
        email,
        phoneNumber: null,
        addressLine1: null,
        addressLine2: null,
        state: null,
        postcode: null,
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
