import React from "react";
import { TouchableOpacity } from "react-native";
import { View, StyleSheet, Text } from "react-native";

export default function AmantiButton(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]} onPress={props.onPress}>
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: 100,
    // height: 50,
    backgroundColor: "#660032",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 99,
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  title: {
    color: "white",
    fontSize: 18
  },
});
