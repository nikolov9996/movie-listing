import { logout } from "firebase/services";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-paper";

const Logout = () => {
  return (
    <TouchableOpacity onPress={logout} style={styles.box}>
      <Text style={styles.text}>Logout</Text>
      <Icon size={27} source={"logout"} />
    </TouchableOpacity>
  );
};

export default Logout;

const styles = StyleSheet.create({
  box: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    paddingRight: 4,
    fontWeight: "700",
    fontSize: 18,
  },
});
