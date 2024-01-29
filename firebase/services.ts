import { app } from "firebase/config";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  increment,
  query,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  getMoviesFromCache,
  getSuggestion,
  saveMoviesToStorage,
  syncCacheOnDelete,
} from "hooks/storage";
import { getNetworkStatus, sortMovies } from "hooks/utils";
import {
  CommentType,
  CreateMovieType,
  MovieType,
  UpdateMovieType,
} from "static/types";

const db = getFirestore(app);

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
    await syncCacheOnDelete(movieId);
    return true;
  } catch (error) {
    return false;
  }
};

export async function getMovies() {
  try {
    const isOnline = await getNetworkStatus();
    const suggestionsKey = await getSuggestion();

    if (!isOnline) {
      const moviesOffline: MovieType[] = await getMoviesFromCache();
      return suggestionsKey
        ? sortMovies(moviesOffline, suggestionsKey)
        : moviesOffline;
    }

    const q = query(collection(db, "movies"));

    const querySnapshot = await getDocs(q);

    const data: MovieType[] = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), movieId: doc.id };
    });

    const moviesFromCache: MovieType[] = await saveMoviesToStorage(data);

    /* Always returns movies from cache! and check for movies from cache this means the data for image fetching will be saved and the app will run way faster */

    return suggestionsKey
      ? sortMovies(moviesFromCache, suggestionsKey)
      : moviesFromCache;
  } catch (error) {
    console.log(error);
    return [];
  } finally {
    console.log("Movies fetched!");
  }
}
