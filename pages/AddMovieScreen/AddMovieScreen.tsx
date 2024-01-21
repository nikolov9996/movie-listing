import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { saveData } from "firebase/services";
import React from "react";
import { Text } from "react-native";
import { RootStackParamList } from "static/Router";
import { SCREENS } from "static/screens";

type Props = NativeStackScreenProps<
  RootStackParamList,
  SCREENS.ADD_MOVIE_SCREEN
>;

const AddMovieScreen: React.FC<Props> = () => {
  return (
    <Text onPress={() => saveData({ sdjfh: "djlfh" })}>AddMovieScreen</Text>
  );
};

export default AddMovieScreen;
