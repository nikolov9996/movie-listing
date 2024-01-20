import React, { ReactNode } from "react";
import { StatusBar, StyleSheet, View } from "react-native";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar />
      {children}
    </View>
  );
};

export default PageLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
