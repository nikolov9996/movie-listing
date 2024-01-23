import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Image, KeyboardAvoidingView, StyleSheet, Text } from "react-native";
import { RootStackParamList } from "static/Router";
import { SCREENS } from "static/screens";
import * as ImagePicker from "expo-image-picker";
import { useDimensions } from "hooks/ui";
import { editMovie, uploadImage } from "firebase/services";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import Button from "components/Button/Button";

type Props = NativeStackScreenProps<
  RootStackParamList,
  SCREENS.UPDATE_MOVIE_SCREEN
>;

interface FormState extends FieldValues {
  creator?: string;
  title?: string;
  description?: string;
  image?: string;
  genre?: string;
}

const EditMovieScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [loading, setLoading] = useState<boolean>(false);
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
      aspect: [4, 4],
      quality: 0.6,
    });

    if (!result.canceled) {
      setImage(result);
      setValue("image", result.assets[0].uri);
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
      marginVertical: 20,
    },
    input: {
      marginVertical: 5,
    },
  });

  const onSubmit = async (data: FormState) => {
    try {
      if (data.image && image) {
        setLoading(true);
        const firebaseUrl = await uploadImage(data.image);
        const movieId: string | undefined = await editMovie({
          ...data,
          image: firebaseUrl,
        });

        if (movieId) {
          // navigate to newly created movie
          navigate({
            key: SCREENS.MOVIE_DETAILS_SCREEN,
            params: { movieId: movieId },
            name: SCREENS.MOVIE_DETAILS_SCREEN,
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      reset({
        creator: "",
        title: "",
        description: "",
        image: "",
        genre: "",
      });
    }
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
          defaultValue={"1"}
          control={control}
          rules={{ required: true, minLength: 4 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
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
          defaultValue={"1"}
          control={control}
          rules={{ required: true, minLength: 20 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
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
          defaultValue={"1"}
          control={control}
          rules={{ required: true, minLength: 4 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
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
          defaultValue={"1"}
          control={control}
          rules={{ required: true, minLength: 4 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
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
          loading={loading}
          style={styles.button}
          mode={"contained"}
          children
          label="Save"
          onPress={handleSubmit(onSubmit)}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditMovieScreen;
