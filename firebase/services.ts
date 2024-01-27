import { app } from "firebase/config";
import {
  CACHE_SIZE_UNLIMITED,
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocsFromServer,
  getFirestore,
  increment,
  initializeFirestore,
  memoryLocalCache,
  query,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getSuggestion } from "hooks/storage";
import {
  CommentType,
  CreateMovieType,
  MovieType,
  UpdateMovieType,
} from "static/types";

const db = initializeFirestore(app, {
  localCache: memoryLocalCache(),
});

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

  try {
    const docRef = await addDoc(collection(db, "movies"), movie);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const editMovie = async (movieData: UpdateMovieType) => {
  try {
    const movieRef = doc(db, "movies", movieData.movieId as string);

    await updateDoc(movieRef, { ...movieData });

    return movieData.movieId;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const addComment = async (movieId: string, comment: CommentType) => {
  try {
    const movieRef = doc(db, "movies", movieId);

    await updateDoc(movieRef, {
      comments: arrayUnion(comment),
      rating: increment(comment.rating as number),
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const getOneMovie = async (movieId: string) => {
  const docRef = doc(db, "movies", movieId);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const deleteMovie = async (movieId: string) => {
  try {
    await deleteDoc(doc(db, "movies", movieId));
    return true;
  } catch (error) {
    return false;
  }
};

export const getMovies = async () => {
  try {
    const q = query(collection(db, "movies"));

    const querySnapshot = await getDocsFromServer(q);

    const data: MovieType[] = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), movieId: doc.id };
    });

    const suggestionsKey = await getSuggestion();
    console.log(suggestionsKey);
    if (suggestionsKey) {
      data.sort((a) => {
        const valueA = a.genre === suggestionsKey;
        // const valueB = b.genre === suggestionsKey;

        if (valueA) {
          return -1;
        } else return 1;
      });
    }
    return data;
  } catch (error) {
    console.log(error);
    return [];
  } finally {
    console.log("Movies fetched!");
  }
};
