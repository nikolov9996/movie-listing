import { getNetworkStatus } from "hooks/utils";
import React, { ReactNode, useEffect, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";

interface ScreenLayoutProps {
  children: ReactNode;
}

const ScreenLayout: React.FC<ScreenLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const [isOnline, setIsOnline] = useState<boolean | undefined>(true);

  useEffect(() => {
    getNetworkStatus().then((is) => {
      setIsOnline(is);
    });
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    offlineLabel: {
      padding: 10,
      backgroundColor: theme.colors.error,
      textAlign: "center",
      color: theme.colors.errorContainer,
      fontWeight: "700",
      fontSize: 16,
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar />
      {!isOnline && (
        <Text style={styles.offlineLabel}>
          You are Offline
          <Icon
            size={20}
            color={theme.colors.background}
            source={"microsoft-internet-explorer"}
          />
        </Text>
      )}
      {children}
    </View>
  );
};

export default ScreenLayout;
