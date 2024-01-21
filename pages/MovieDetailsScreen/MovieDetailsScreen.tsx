import ScreenLayout from "components/ScreenLayout";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import { AirbnbRating, Rating } from "react-native-ratings";
import { useTheme } from "react-native-paper";
import Comments from "./Comments/Comments";
import AddComment from "./Comments/AddComment";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "static/Router";
import { SCREENS } from "static/screens";

type Props = NativeStackScreenProps<
  RootStackParamList,
  SCREENS.MOVIE_DETAILS_SCREEN
>;

const MovieDetailsScreen: React.FC<Props> = ({ route }) => {
  console.log(route);
  const theme = useTheme();
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
            <Rating
              ratingCount={5}
              startingValue={3} // value here
              tintColor={theme.colors.elevation.level1}
              fractions={1}
              minValue={0}
              jumpValue={0.1}
              readonly
              showReadOnlyText={false}
            />
            <Text style={styles.ratingValue}>{`(${3.4}/5)`}</Text>
          </View>
        </View>
        <Comments />
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
});
