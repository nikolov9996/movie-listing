import { getMovies } from "firebase/services";
import { getNetworkStatus } from "hooks/utils";
import React, { useEffect, useState } from "react";
import { MovieType } from "static/types";

const useHomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [apiData, setApiData] = useState<MovieType[]>([]);
  const [isOnline, setIsOnline] = useState<boolean | undefined>(true);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await getMovies();
      setApiData(response);
      setMovies(response);
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    } finally {
      setLoading(false);
    }
  }

  const search = (keyword: string) => {
    const result = apiData.filter((movie) =>
      movie.title?.toLocaleLowerCase().includes(keyword.toLowerCase())
    );
    setMovies(result);
  };

  useEffect(() => {
    getNetworkStatus().then((is) => {
      setIsOnline(is);
    });
    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery.length) {
      search(searchQuery);
    } else {
      setMovies(apiData);
    }
  }, [searchQuery]);

  return {
    loading: loading ?? movies.length,
    movies,
    searchQuery,
    isOnline,
    setSearchQuery,
    fetchData,
    search,
  };
};

export default useHomeScreen;
