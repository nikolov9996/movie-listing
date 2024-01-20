import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREENS } from "./screens";
import HomeScreen from "pages/HomeScreen/HomeScreen";
import AddMovieScreen from "pages/AddMovieScreen/AddMovieScreen";
import MovieDetailsScreen from "pages/MovieDetailsScreen/MovieDetailsScreen";
import UpdateMovieScreen from "pages/UpdateMovieScreen/UpdateMovieScreen";

const Stack = createNativeStackNavigator();

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
          component={UpdateMovieScreen}
        />
        <Stack.Screen
          name={SCREENS.MOVIE_DETAILS_SCREEN}
          component={MovieDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
