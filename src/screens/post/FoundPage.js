import React, { useMemo, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Alert,
  View,
  SafeAreaView,
  FlatList
} from "react-native";
// import foundPosts from "../data/foundPosts";
import PostCard from "./PostCard";

import CommentPage from "../comment/CommentPage";
import posts from "../../data/posts";
import AppHeader from "../../components/AppHeader";

const foundPosts = () => {
  let value = [];
  for (let index = 0; index < posts.length*4; index++) {
    const element = posts[index % posts.length];
    if (element.type === "found") {
      value.push(element);
    }
  }

  return value;
};

function FoundPage({ navigation }) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [commentPost, setCommentPost] = useState(null);
  const commentSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["65%", "100%"], []);

  const onPressComment = () => {
    console.log("Comment Pressed");
  };

  console.log("Comment State: " + (isCommentOpen ? "Opened" : "Closed"));

  const onSignOut = () => {
    Alert.alert("Sign Out", "Are you Sure You Want to Sign Out ?", [
      {
        text: "Yes",
        onPress: () => navigation.navigate("LoginPage"),
      },
      {
        text: "Cancel",
        onPress: null,
      },
    ]);

    // this.navigation.navigate("Login");
  };

  const onToggleDrawer = () => {
    navigation.toggleDrawer();
  };

  return (
    <SafeAreaView style={commentsStyles.container}>
      <AppHeader
        style={{ top: -17 }}
        onSignOut={onSignOut}
        onToggleDrawer={onToggleDrawer}
      />
      <FlatList
        data={foundPosts()}
        style={styles.scrollContainer}
        keyExtractor={(item, index) => index}
        renderItem={(item, index) => {
          return (
            <PostCard
              navigation={navigation}
              post={item.item}
              key={index}
              onPressComment={(clickedPost) => {
                setCommentPost(clickedPost);
                setIsCommentOpen(true);
                console.log("Comment Pressed: " + clickedPost.commentsId);
              }}
              isFound
            />
          );
        }}
      />
      {!isCommentOpen ? console.log("Comment Clsoed: PostsPage") : null}
      {isCommentOpen && (
        <CommentPage
          post={commentPost}
          isClosed={(state) => {
            setIsCommentOpen(state);
          }}
        />
      )}
    </SafeAreaView>
  );
}

const commentsStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
    paddingTop: 17,
    backgroundColor: "#F0F2F5",
  },

  commentsContainer: {
    flex: 1,
  },

  scrollContainer: {
    flex: 1,
  },
});

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

export default FoundPage;
