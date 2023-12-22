import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { View, StyleSheet, Text } from "react-native";
import ThemeContext from "./../../themes/ThemeContext";

export default function SwappedColors(props) {
  const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        props.style,
        { backgroundColor: "transparent" },
      ]}
      onPress={props.onPress}
    >
      <Text style={[styles.title, { color: theme.SwappedColors.text }]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: 100,
    // height: 50,

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 99,
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  title: {
    fontSize: 18,
  },
});
