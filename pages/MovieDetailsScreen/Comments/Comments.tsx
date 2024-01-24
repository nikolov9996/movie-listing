import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Card } from "react-native-paper";
import { AirbnbRating } from "react-native-ratings";
import { CommentType } from "static/types";

const Comments: React.FC<{ comments?: CommentType[] }> = ({ comments }) => (
  <>
    {comments?.map(({ author, comment, rating }, index) => (
      <Card style={styles.container} key={index}>
        <View style={styles.title}>
          <Text style={styles.author}>{author}</Text>
          <AirbnbRating defaultRating={rating} showRating={false} size={15} />
        </View>
        <Text style={styles.text}>{comment}</Text>
      </Card>
    ))}
  </>
);

export default Comments;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
  },
  author: {
    fontWeight: "bold",
  },
  title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: { paddingTop: 10 },
});
