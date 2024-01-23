import ScreenLayout from "components/ScreenLayout";
import React from "react";
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

type Props = NativeStackScreenProps<
  RootStackParamList,
  SCREENS.MOVIE_DETAILS_SCREEN
>;

const MovieDetailsScreen: React.FC<Props> = ({
  navigation: { navigate },
  route,
}) => {
  const theme = useTheme()
  const { params } = route;
  return (
    <ScreenLayout>
      <ScrollView>
        <View>
          <View style={styles.titleBox}>
            <Text style={styles.mainTitle}>title here</Text>
          </View>
          <Card.Content>
            <Card.Cover
              source={{
                uri: "https://fastly.picsum.photos/id/1015/200/300.jpg?hmac=Rx9zhHRx_cf574gBuoMH5d7HlhZitGMA81AgPmhJDSI",
              }}
            />
            <Text>some text</Text>
          </Card.Content>
          <View style={styles.ratingBox}>
            <AirbnbRating
              count={5}
              size={30}
              defaultRating={2}
              isDisabled={true}
              showRating={false} // ={3} // value here
            />
            <Text style={styles.ratingValue}>{`(${2}/5)`}</Text>
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
            // onPress={() =>
            //   navigate({
            //     key: SCREENS.UPDATE_MOVIE_SCREEN,
            //     params: { movieId: params.movieId },
            //     name: SCREENS.UPDATE_MOVIE_SCREEN,
            //   })
            // }
            style={styles.deleteButton}
            mode="contained"
            buttonColor={theme.colors.error}
            children
            label="Delete Movie"
            icon="file-document-edit-outline"
          />
        </View>
        <Comments
          comments={[
            { author: "author", comment: "some comment here", rating: 3 },
          ]}
        />
        <AddComment />
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
    marginHorizontal:20,
    marginTop: 20,
  },
  deleteButton:{
    marginHorizontal:20,
    marginTop:10,
    marginBottom:20
  }
});
