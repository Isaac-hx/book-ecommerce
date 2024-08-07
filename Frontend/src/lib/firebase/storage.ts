import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyDWVe2LV5QCO1rwV3D0aC32HZQGXzwWPDU",
  authDomain: "boomerce-book-ecommerce.firebaseapp.com",
  projectId: "boomerce-book-ecommerce",
  storageBucket: "boomerce-book-ecommerce.appspot.com",
  messagingSenderId: "583274894132",
  appId: "1:583274894132:web:fb255ee843281989f5cb61",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const uploadImage = async (image: File) => {
  const storageRef = ref(storage, `images/${uuidv4()}/${image.name}`);
  await uploadBytes(storageRef, image);
  return await getDownloadURL(storageRef);
};
