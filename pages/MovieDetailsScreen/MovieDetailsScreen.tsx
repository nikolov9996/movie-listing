import ScreenLayout from "components/ScreenLayout";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, useTheme } from "react-native-paper";
import { AirbnbRating } from "react-native-ratings";
import Comments from "./Comments/Comments";
import AddComment from "./Comments/AddComment";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "static/Router";
import { SCREENS } from "static/screens";
import Button from "components/Button/Button";
import useMovieDetailsScreen from "./MovieDetailsScreen.logic";
import LoadingLayout from "pages/LoadingLayout";
import { useIsFocused } from "@react-navigation/native";

type Props = NativeStackScreenProps<
  RootStackParamList,
  SCREENS.MOVIE_DETAILS_SCREEN
>;

const MovieDetailsScreen: React.FC<Props> = ({
  navigation: { navigate },
  route,
}) => {
  const isFocused = useIsFocused();

  const theme = useTheme();
  const { params } = route;
  const {
    loading,
    movie,
    handleDeleteMovie,
    deleteLoading,
    fetchData,
    refetchData,
  } = useMovieDetailsScreen({
    movieId: params.movieId,
  });

  useEffect(() => {
    fetchData();
  }, [isFocused]);

  const deleteCurrentMovie = async () => {
    const deleted = await handleDeleteMovie(params.movieId);
    if (deleted) {
      return navigate({
        key: SCREENS.HOME_SCREEN,
        params: { movieId: params.movieId },
        name: SCREENS.HOME_SCREEN,
      });
    }
  };

  const rating: number = Number(
    (
      movie?.comments &&
      movie.rating &&
      movie?.rating / movie?.comments.length
    )?.toFixed(0)
  );

  if (loading) {
    return <LoadingLayout />;
  }

  return (
    <ScreenLayout>
      <ScrollView>
        <View>
          <View style={styles.titleBox}>
            <Text style={styles.mainTitle}>{movie?.title}</Text>
          </View>
          <Card.Content>
            <Card.Cover
              style={{ height: 350 }}
              source={{
                uri: movie?.image,
              }}
            />
            <Text style={styles.description}>{movie?.description}</Text>
          </Card.Content>
          <View style={styles.ratingBox}>
            <AirbnbRating
              count={5}
              size={30}
              defaultRating={+rating || 0}
              isDisabled={true}
              showRating={false}
            />
            <Text style={styles.ratingValue}>{`(${rating}/5)`}</Text>
          </View>
          <Button
            onPress={() =>
              navigate({
                key: SCREENS.UPDATE_MOVIE_SCREEN,
                params: { movieId: params.movieId },
                name: SCREENS.UPDATE_MOVIE_SCREEN,
              })
            }
            style={styles.editButton}
            mode="contained"
            children
            label="Edit Movie"
            icon="file-document-edit-outline"
          />
          <Button
            onPress={deleteCurrentMovie}
            loading={deleteLoading}
            style={styles.deleteButton}
            mode="contained"
            buttonColor={theme.colors.error}
            children
            label="Delete Movie"
            icon="file-document-edit-outline"
          />
        </View>
        <Comments comments={movie?.comments} />
        <AddComment refetchData={refetchData} movieId={params.movieId} />
      </ScrollView>
    </ScreenLayout>
  );
};

export default MovieDetailsScreen;

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 25,
    fontWeight: "bold",
    paddingTop: 10,
  },
  titleBox: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  description: {
    paddingHorizontal: 3,
    paddingVertical: 10,
  },
  ratingBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  ratingValue: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 25,
    color: "#f1c40f",
  },
  editButton: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  deleteButton: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
});
