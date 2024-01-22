import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Button from "components/Button/Button";
import { saveData } from "firebase/services";
import { useDimensions } from "hooks/ui";
import React from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import { RootStackParamList } from "static/Router";
import { SCREENS } from "static/screens";
import * as ImagePicker from "expo-image-picker";

type Props = NativeStackScreenProps<
  RootStackParamList,
  SCREENS.ADD_MOVIE_SCREEN
>;

interface FormState extends FieldValues {
  creator?: string;
  title?: string;
  description?: string;
  image?: ImagePicker.ImagePickerSuccessResult;
  genre?: string;
}

const AddMovieScreen: React.FC<Props> = () => {
  const [image, setImage] =
    React.useState<ImagePicker.ImagePickerSuccessResult>();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result);
      setValue("image", result);
    }
  };
  const { screenWidth } = useDimensions();

  const styles = StyleSheet.create({
    container: { gap: 5, margin: 5 },
    button: {
      marginTop: 20,
    },
    image: {
      alignSelf: "center",
      objectFit: "contain",
      height: screenWidth - 120,
      width: screenWidth - 40,
    },
  });

  const onSubmit = async (data: FormState) => {
    try {
      if (data.image && image) {
        const response = await fetch(image.assets[0].uri)
        const blob = await response.blob();

        console.log(blob)
        // handle image upload here
      }
    } catch (error) {}

    reset({
      creator: "",
      title: "",
      description: "",
      image: "",
      genre: "",
    });
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={handleImagePicker} activeOpacity={0.7}>
          <Image
            style={styles.image}
            source={
              image
                ? { uri: image.assets[0].uri }
                : require("static/files/placeholder.jpeg")
            }
          />
        </TouchableOpacity>
        <Controller
          control={control}
          rules={{ required: true, minLength: 4 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              mode="outlined"
              label="Title (min 4)"
              error={!!errors["title"]}
            />
          )}
          name="title"
        />
        <Controller
          control={control}
          rules={{ required: true, minLength: 4 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              multiline
              numberOfLines={3}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              mode="outlined"
              label="Description (min 20)"
              error={!!errors["description"]}
            />
          )}
          name="description"
        />
        <Controller
          control={control}
          rules={{ required: true, minLength: 4 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              mode="outlined"
              label="Genre (min 4)"
              error={!!errors["genre"]}
            />
          )}
          name="genre"
        />
        <Controller
          control={control}
          rules={{ required: true, minLength: 4 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              mode="outlined"
              label="Creator (min 4)"
              error={!!errors["creator"]}
            />
          )}
          name="creator"
        />
        <Button
          style={styles.button}
          mode={"contained"}
          children
          label="Create"
          onPress={handleSubmit(onSubmit)}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddMovieScreen;
