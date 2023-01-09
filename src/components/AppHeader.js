import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";

export default function AppHeader({ navigation }) {
  
  return (
    <View style={styles.container}>
      <View style={styles.circle}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor:"red",
    justifyContent: "center",
  },
  circle: {
    width: 750  ,
    height: 800,
    borderRadius: 800,
    borderColor: "#660032",
    borderWidth: 2,
    alignSelf: "center",
    marginTop:-700
  },
});
