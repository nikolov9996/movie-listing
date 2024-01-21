import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Card } from "react-native-paper";
import { AirbnbRating } from "react-native-ratings";

interface CommentsProps {
  author: string;
  text: string;
  rating: number;
}

const Comments: React.FC = () => {
  return (
    <Card style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.author}>Author here</Text>
        <AirbnbRating defaultRating={4} showRating={false} size={15} />
      </View>
      <Text style={styles.text}>comment here</Text>
    </Card>
  );
};

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
