import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_APPID,
};
const firebaseapp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseapp);

export const uploadImages = async (
  imageBuffer: Buffer,
  directoryPath: string
) => {
  const imageName = `${Date.now()}-${Math.round(
    Math.random() * 1e9
  )}-image.jpg`;

  const storageRef = ref(storage, `${directoryPath}/${imageName}`);
  const metadata = { contentType: "image/jpeg" };
  const snapshot = await uploadBytesResumable(
    storageRef,
    imageBuffer,
    metadata
  );

  const uploadedImageUrl = await getDownloadURL(storageRef);
  return uploadedImageUrl;
};

export const deleteImage = async (url: string, directoryPath: string) => {
  const deleteImageName = url.split("2F")[2].split("?")[0];
  const desertRef = ref(storage, `${directoryPath}/${deleteImageName}`);
  await deleteObject(desertRef);
};
