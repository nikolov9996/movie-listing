import Button from "components/Button/Button";
import React from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { Card, TextInput } from "react-native-paper";
import { AirbnbRating } from "react-native-ratings";

interface FormState extends FieldValues {
  author: string;
  comment: string;
  rating: number;
}
const AddComment: React.FC = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: FormState | any) => {
    console.log(data);
    reset({
      author: "",
      comment: "",
      rating: 0,
    });
  };

  return (
    <Card style={styles.container}>
      <Text style={styles.formTitle}>Add Comment</Text>
      <Controller
        control={control}
        rules={{ required: true, minLength: 4 }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            mode="outlined"
            label="Author (min 4)"
            error={!!errors["author"]}
          />
        )}
        name="author"
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
            label="Comment (min 4)"
            error={!!errors["comment"]}
          />
        )}
        name="comment"
      />
      <View style={styles.ratingBox}>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <AirbnbRating
              defaultRating={value}
              showRating={false}
              onFinishRating={onChange}
            />
          )}
          name="rating"
        />
      </View>
      <Button
        children
        compact
        mode="contained"
        label="Submit"
        onPress={handleSubmit(onSubmit)}
      />
    </Card>
  );
};

export default AddComment;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
  },
  formTitle: {
    fontSize: 16,
    paddingVertical: 3,
    fontWeight: "bold",
  },
  ratingBox: {
    padding: 20,
  },
});
