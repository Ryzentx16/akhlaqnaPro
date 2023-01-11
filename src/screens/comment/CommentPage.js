import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import CommentCard from "./CommentCard";
import comments from "../../data/comments";

function preperTempData() {
  let coments = [];

  for (let i = 0; i < comments.length * 5; i++) {
    coments.push(comments[i % comments.length]);
  }

  return coments;
}


export default function CommentPage() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={preperTempData()}
        style={styles.scrollContainer}
        keyExtractor={(item, index) => index}
        renderItem={(item, index) => {
          return <CommentCard comment={item.item} key={index} />;
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
    paddingTop: 17,
    backgroundColor: "#F0F2F5",
  },

  scrollContainer: {
    flex: 1,
  },
});
