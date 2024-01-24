import { getMovies } from "firebase/services";
import React, { useEffect, useState } from "react";
import { MovieType } from "static/types";

const useHomeScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<MovieType[]>([]);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await getMovies();
      setMovies(response);
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return {
    loading: loading ?? movies.length,
    movies,
    fetchData,
  };
};

export default useHomeScreen;
