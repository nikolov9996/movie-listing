import AsyncStorage from "@react-native-async-storage/async-storage";

export const useStorage = () => {
  // TODO save movie data + image as file locally
  const storeMovie = async (value: any) => {
    try {
      await AsyncStorage.setItem("my-key", value);
    } catch (e) {
      // saving error
    }
  };
};
