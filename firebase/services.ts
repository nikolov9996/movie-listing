import { app } from "firebase/config";
import { addDoc, collection, getFirestore } from "firebase/firestore";

export const saveData = async (data: any) => {
  const db = getFirestore(app);
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
