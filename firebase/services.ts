import { app } from "firebase/config";
import {
  Firestore,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  CommentType,
  CreateMovieType,
  MovieType,
  UpdateMovieType,
} from "static/types";

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

export const uploadImage = async (imageUri: string) => {
  try {
    const response = await fetch(imageUri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `/images/${new Date().getTime()}`);

    await uploadBytes(storageRef, blob);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.log(error);
    return "uploading image failed :/";
  }
};

export const createMovie = async (movieData: CreateMovieType) => {
  const movie: MovieType = {
    ...movieData,
    rating: 0,
    comments: [],
  };

  const db = getFirestore(app);
  try {
    const docRef = await addDoc(collection(db, "movies"), movie);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const editMovie = async (movieData: UpdateMovieType) => {
  return movieData.movieId;
};

export const getMovies = async () => {
  try {
    const db = getFirestore(app);

    const q = query(collection(db, "movies"));

    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), movieId: doc.id };
    });

    return data;
  } catch (error) {
    console.log(error);
    return [];
  } finally {
    console.log("Movies fetched!");
    
  }
};
