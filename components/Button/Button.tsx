import React from "react";
import { Pressable, PressableProps, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS } from "static/colors";

interface ButtonProps extends PressableProps {
  label: string;
  type?: COLORS;
}

const Button: React.FC<ButtonProps> = ({ label, onPress, type=COLORS.ERROR, ...rest }) => {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <Pressable
        style={StyleSheet.compose(styles.button, { backgroundColor: type })}
        onPress={onPress}
        {...rest}
      >
        <Text style={styles.text}>{label}</Text>
      </Pressable>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6,
    elevation: 3,
    backgroundColor: COLORS.MAIN,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
