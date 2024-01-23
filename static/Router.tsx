import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREENS } from "./screens";
import HomeScreen from "pages/HomeScreen/HomeScreen";
import AddMovieScreen from "pages/AddMovieScreen/AddMovieScreen";
import MovieDetailsScreen from "pages/MovieDetailsScreen/MovieDetailsScreen";
import EditMovieScreen from "pages/UpdateMovieScreen/EditMovieScreen";

export type RootStackParamList = {
  [SCREENS.HOME_SCREEN]: {movieId:string};
  [SCREENS.ADD_MOVIE_SCREEN]: undefined;
  [SCREENS.MOVIE_DETAILS_SCREEN]: { movieId: string };
  [SCREENS.UPDATE_MOVIE_SCREEN]: { movieId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Router: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={SCREENS.HOME_SCREEN}>
        <Stack.Screen
          options={{ headerShown: false }}
          name={SCREENS.HOME_SCREEN}
          component={HomeScreen}
          
        />
        <Stack.Screen
          name={SCREENS.ADD_MOVIE_SCREEN}
          component={AddMovieScreen}
        />
        <Stack.Screen
          name={SCREENS.UPDATE_MOVIE_SCREEN}
          component={EditMovieScreen}
        />
        <Stack.Screen
          name={SCREENS.MOVIE_DETAILS_SCREEN}
          component={MovieDetailsScreen}
          options={{ headerTitle: "Details" }}
          // initialParams={{movieId:'some id'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
