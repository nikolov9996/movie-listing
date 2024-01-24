import { deleteMovie, getOneMovie } from "firebase/services";
import { useEffect, useState } from "react";
import { MovieType } from "static/types";

type Props = {
  movieId: string;
};

const useMovieDetailsScreen = ({ movieId }: Props) => {
  const [movie, setMovie] = useState<MovieType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  async function fetchData() {
    try {
      setLoading(true);
      const movie = await getOneMovie(movieId);
      setMovie(movie);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function refetchData() {
    const movie = await getOneMovie(movieId);
    setMovie(movie);
  }

  async function handleDeleteMovie(movieId: string) {
    try {
      setDeleteLoading(true);
      const deleted = await deleteMovie(movieId);
      return deleted;
    } catch (error) {
      return false;
    } finally {
      setDeleteLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [movieId]);

  return {
    loading,
    deleteLoading,
    movie,
    handleDeleteMovie,
    fetchData,
    refetchData,
  };
};

export default useMovieDetailsScreen;
