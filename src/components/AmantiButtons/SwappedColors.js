import React from "react";
import { TouchableOpacity } from "react-native";
import { View, StyleSheet, Text } from "react-native";

export default function SwappedColors(props) {

  return (
    <TouchableOpacity
      style={[
        styles.container,
        props.style,
        { backgroundColor: "transparent" },
      ]}
      onPress={props.onPress}
    >
      <Text style={[styles.title, { color: "#660032" }]}>{props.title}</Text>
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
