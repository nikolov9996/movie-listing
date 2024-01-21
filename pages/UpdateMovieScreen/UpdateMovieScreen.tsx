import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text } from "react-native";
import { RootStackParamList } from "static/Router";
import { SCREENS } from "static/screens";

type Props = NativeStackScreenProps<
  RootStackParamList,
  SCREENS.UPDATE_MOVIE_SCREEN
>;

const UpdateMovieScreen: React.FC<Props> = () => {
  return <Text>UpdateMovieScreen</Text>;
};

export default UpdateMovieScreen;
