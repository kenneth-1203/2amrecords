import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  AuthErrorCodes,
} from "firebase/auth";
import { firestore, auth, storage } from "@/lib/firebase";
import { Collections, ILoginForm, ISignUpForm } from "@/shared/interfaces";
import { removeFileExtension } from "@/shared/utils";
import { prefix } from "./config";

export const getDocuments = async (collectionName: Collections) => {
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

export const getDocumentsById = async (
  collectionName: Collections,
  ids: string[]
) => {
  try {
    const collectionRef = collection(firestore, prefix + collectionName);
    const snapshot = await getDocs(collectionRef);
    let results: any = [];
    snapshot.forEach((doc) => {
      if (ids.includes(doc.id)) results.push(doc.data());
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

export const getDocumentRef = (path: string) => {
  return doc(firestore, prefix + path);
};

export const checkDocumentExists = async (
  collectionName: Collections,
  documentId: string
) => {
  try {
    const docRef = doc(firestore, prefix + collectionName, documentId);
    const docSnapshot = await getDoc(docRef);
    return docSnapshot.exists();
  } catch (error) {
    return error;
  }
};

export const createDocument = async (
  collectionName: Collections,
  docData: any
) => {
  try {
    const collectionRef = collection(firestore, prefix + collectionName);
    const docRef = doc(collectionRef);
    const autoId = docRef.id;

    let response;
    if (docData.id) {
      response = await setDoc(
        doc(firestore, prefix + collectionName, docData.id),
        docData
      );
    } else {
      docData = { id: autoId, ...docData };
      response = await setDoc(
        doc(firestore, prefix + collectionName, autoId),
        docData
      );
    }

    return docData.id;
  } catch (error) {
    return error;
  }
};

export const deleteDocument = async (
  collectionName: Collections,
  documentId: string
) => {
  try {
    const docRef = doc(firestore, prefix + collectionName, documentId);

    await deleteDoc(docRef);

    return "Document deleted successfully";
  } catch (error) {
    return error;
  }
};

export const uploadFile = async (file: File, path: string) => {
  try {
    const storageRef = ref(storage, prefix + path);
    const { ref: fileRef } = await uploadBytes(storageRef, file);
    return { results: fileRef.bucket };
  } catch (error) {
    return { error };
  }
};

export const deleteFile = async (path: string) => {
  try {
    const storageRef = ref(storage, prefix + path);
    await deleteObject(storageRef);
    return true;
  } catch (error) {
    return false;
  }
};

export const getFileURLs = async (path: string) => {
  try {
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
        country: "Malaysia",
        phoneNumber: "",
        addressLine1: "",
        addressLine2: "",
        state: "",
        postcode: "",
        photoURL: "",
        provider: "",
        orderHistory: [],
        items: [],
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
