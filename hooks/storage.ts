import AsyncStorage from "@react-native-async-storage/async-storage";
import { findMostFrequentItem } from "./utils";

export enum StorageKeys {
  SUGGESTIONS = "last-visited",
}

export const storeSuggestions = async (value: any) => {
  try {
    let current: string[] = [];
    const values: string | null = await AsyncStorage.getItem(
      StorageKeys.SUGGESTIONS
    );
    if (values) {
      current = JSON.parse(values);
      current.push(value);
      if (current.length > 6) {
        current.splice(0, 1);
      }
    }
    await AsyncStorage.setItem(
      StorageKeys.SUGGESTIONS,
      JSON.stringify(current)
    );
  } catch (e) {
    console.log("error saving to AsyncStorage : ", StorageKeys.SUGGESTIONS);
  }
};

export const getSuggestion = async () => {
  try {
    const string: string | null = await AsyncStorage.getItem(
      StorageKeys.SUGGESTIONS
    );
    if (string && string.length) {
      const arrayForSuggestion = JSON.parse(string);
      const mostFrequentGenre = findMostFrequentItem(arrayForSuggestion);

      return mostFrequentGenre; // return the genre that will appear first
    }

    return null; // returns null probably on initial load of the app
  } catch (error) {
    console.log("error getting from AsyncStorage : ", StorageKeys.SUGGESTIONS);
  }
};
