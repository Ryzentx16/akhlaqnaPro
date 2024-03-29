import React, { useContext } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import notifications from "../../data/notifications";
import NotificationCard from "./NotificationCard";
import ThemeContext from "../../themes/ThemeContext";

export default function NotificationsPage({ navigation }) {
  const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext);

  let _notifications = [];

  for (let i = 0; i < notifications.length * 5; i++) {
    _notifications.push(notifications[i % notifications.length]);
  }
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.primary }]}
    >
      <FlatList
        data={_notifications}
        style={styles.scrollContainer}
        keyExtractor={(item, index) => index}
        renderItem={(item, index) => {
          return (
            <NotificationCard
              navigation={{ navigation }}
              notification={item.item}
              type={item.item.type}
            />
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },

  scrollContainer: {
    flex: 1,
    paddingRight: 15,
    paddingLeft: 10,
  },
});
