import { useDimensions } from "hooks/ui";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native-gesture-handler";
import { Card } from "react-native-paper";

const MovieCard: React.FC<TouchableOpacityProps> = ({ onPress }) => {
  const { screenWidth } = useDimensions();

  const styles = StyleSheet.create({
    container: {
      width: (screenWidth - 20) / 2,
      marginVertical: 5,
      marginHorizontal: 5,
    },
    textContainer: {
      position: "absolute",
      bottom: 0,
      padding: 5,
      backgroundColor: "rgba(0,0,0, 0.4)",
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      width: "100%",
      alignItems: "center",
    },
    cardTitle: {
      color: "white",
      fontSize: 16,
    },
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.8}
    >
      <Card>
        <Card.Cover
          source={{
            uri: "https://fastly.picsum.photos/id/1015/200/300.jpg?hmac=Rx9zhHRx_cf574gBuoMH5d7HlhZitGMA81AgPmhJDSI",
          }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>Some Textt</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default MovieCard;
