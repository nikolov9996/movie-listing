import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";

import { MovieGenre } from "static/enums";
import { Picker as ExpoPicker, PickerProps } from "@react-native-picker/picker";
import { ItemValue } from "@react-native-picker/picker/typings/Picker";
interface Props extends Omit<PickerProps, "onValueChange"> {
  error?: boolean;
  onValueChange: any;
  selectedValue: string;
}

const items = Object.values(MovieGenre);

const Picker: React.FC<Props> = ({ selectedValue, onValueChange, error }) => {
  const theme = useTheme();
  return (
    <View
      style={{
        ...styles.picker,
        borderColor: error ? theme.colors.error : "#000000",
        borderWidth: error ? 2 : 1,
      }}
    >
      <ExpoPicker
        selectedValue={selectedValue}
        onValueChange={(itemValue: string) => onValueChange("genre", itemValue)}
        selectionColor={"#000000"}
      >
        {items.map((item) => (
          <ExpoPicker.Item
            enabled={true}
            color={error ? theme.colors.error : undefined}
            value={item}
            key={item}
            label={item}
          />
        ))}
      </ExpoPicker>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
});

export default Picker;
