import React from "react";
import { Image, StyleSheet, View, SafeAreaView } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import posts from "../../data/posts";
import PostCard from "./PostCard";

function preperTempData() {
  let _posts = [];

  for (let i = 0; i < posts.length * 5; i++) {
    _posts.push(posts[i % posts.length]);
  }

  return _posts;
}

function CommentBottomSheet() {}

export default function PostsPage({ navigation }) {
  const onPressComment = () => {
    navigation.navigate("Home", {
      screen: "CommentPage",
      initial: false,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={preperTempData()}
        style={styles.scrollContainer}
        keyExtractor={(item, index) => index}
        renderItem={(item, index) => {
          return (
            <PostCard
              post={item.item}
              key={index}
              onPressComment={onPressComment}
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
    paddingTop: 5,
    backgroundColor: "#CCCCCC",
  },

  scrollContainer: {
    flex: 1,
  },
});
