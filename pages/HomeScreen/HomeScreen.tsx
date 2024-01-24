import React, { useEffect, useState } from "react";
import Button from "components/Button/Button";
import MovieCard from "components/MovieCard/MovieCard";
import ScreenLayout from "components/ScreenLayout";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { SCREENS } from "static/screens";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "static/Router";
import useHomeScreen from "./HomeScreen.logic";
import LoadingLayout from "pages/LoadingLayout";
import { MovieType } from "static/types";
import { useIsFocused } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, SCREENS.HOME_SCREEN>;

const HomeScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { loading, movies, fetchData } = useHomeScreen();
  const [refreshing, setRefreshing] = React.useState(false);
  const isFocused = useIsFocused();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => {
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [isFocused]);

  const renderItem = (item: MovieType) => {
    return (
      <MovieCard
        movie={item}
        onPress={() => {
          navigate({
            key: SCREENS.MOVIE_DETAILS_SCREEN,
            params: { movieId: item.movieId as string },
            name: SCREENS.MOVIE_DETAILS_SCREEN,
          });
        }}
      />
    );
  };

  return (
    <ScreenLayout>
      <Searchbar
        style={styles.search}
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <Button
        style={styles.button}
        compact
        mode="contained"
        label="Add Movie"
        children
        onPress={() =>
          navigate({
            key: SCREENS.ADD_MOVIE_SCREEN,
            name: SCREENS.ADD_MOVIE_SCREEN,
          })
        }
      />
      {loading ? (
        <LoadingLayout />
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ flex: 1 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => renderItem(item)}
            data={movies}
            numColumns={2}
          />
        </View>
      )}
    </ScreenLayout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  moviesContainer: {},
  search: {
    marginHorizontal: 5,
    marginTop: 20,
  },
  button: {
    marginVertical: 20,
    marginHorizontal: 5,
  },
});
