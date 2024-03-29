import React from "react";
import { TouchableOpacity } from "react-native";
import { View, StyleSheet, Text } from "react-native";

export default function AmantiButton(props) {
  const isSwapColors = props.hasOwnProperty("Swap");

  return (
    <TouchableOpacity
      style={[
        styles.container,
        props.style,
        { backgroundColor: isSwapColors ? "transparent" : "#660032" },
      ]}
      onPress={props.onPress}
    >
      <Text
        style={[styles.title, { color: isSwapColors ? "#660032" : "white" }]}
      >
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
