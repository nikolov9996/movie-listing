import React, { ReactNode } from "react";
import { StatusBar, StyleSheet, View } from "react-native";

interface ScreenLayoutProps {
  children: ReactNode;
}

const ScreenLayout: React.FC<ScreenLayoutProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar />
      {children}
    </View>
  );
};

export default ScreenLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
