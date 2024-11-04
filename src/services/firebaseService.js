import { db } from "../config/firebase-config";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

const usersCollectionRef = collection(db, "users");

export const createUser = async (user) => {
  await addDoc(usersCollectionRef, user);
};

export const getUsers = async () => {
  const data = await getDocs(usersCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const updateUser = async (id, newFields) => {
  const userDoc = doc(db, "users", id);
  await updateDoc(userDoc, newFields);
};

export const deleteUser = async (id) => {
  const userDoc = doc(db, "users", id);
  await deleteDoc(userDoc);
};
