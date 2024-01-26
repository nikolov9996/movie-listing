import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import RNPickerSelect, {
  Item,
  PickerSelectProps,
} from "react-native-picker-select";
import { MovieGenre } from "static/enums";

interface Props extends Omit<PickerSelectProps, "items"> {
  error?: boolean;
}

const items = Object.values(MovieGenre);

const Picker: React.FC<Props> = ({ value, onValueChange, error }) => {
  const theme = useTheme();
  return (
    <View
      style={{
        ...styles.picker,
        borderColor: error ? theme.colors.error : "#000000",
        borderWidth: error ? 2 : 1,
      }}
    >
      <RNPickerSelect
        placeholder={{
          label: "Select Genre",
          value: null,
          key: "keykey22",
        }}
        value={value}
        style={{
          iconContainer: {
            top: 20,
            right: 10,
          },
          placeholder: {
            color: "black",
            fontSize: 12,
            fontWeight: "bold",
          },
        }}
        onValueChange={onValueChange}
        items={items.map((item) => ({
          label: item,
          value: item,
          key: item,
        }))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
});

export default Picker;
