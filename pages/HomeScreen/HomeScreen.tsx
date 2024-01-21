import React, { useState } from "react";
import Button from "components/Button/Button";
import MovieCard from "components/MovieCard/MovieCard";
import ScreenLayout from "components/ScreenLayout";
import { FlatList, StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { SCREENS } from "static/screens";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "static/Router";

type Props = NativeStackScreenProps<RootStackParamList, SCREENS.HOME_SCREEN>;

const HomeScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const renderItem = () => {
    return (
      <MovieCard
        onPress={() => {
          navigate({
            key: SCREENS.MOVIE_DETAILS_SCREEN,
            params: { movieId: "ksjd" },
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
      <View style={{ flex: 1 }}>
        <FlatList
          renderItem={renderItem}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 3, 45, 23]}
          numColumns={2}
        />
      </View>
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
