import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { Image, StyleSheet, View, SafeAreaView, FlatList } from "react-native";
// import { FlatList } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import CommentCard from "../comment/CommentCard";
import comments from "../../data/comments";
import InputBox from "../chat/inputBox";
import posts from "../../data/posts";
import PostCard from "./PostCard";
import CommentPage from "../comment/CommentPage";

import themes from "../../ThemeController";

let textColor = themes._currTextTheme;
let backColor = themes._currBackColorTheme;
let themeColor = themes._currTheme;

function preperTempData() {
  let _posts = [];

  for (let i = 0; i < posts.length * 5; i++) {
    _posts.push(posts[i % posts.length]);
  }

  return _posts;
}

function prepercomentsTempData() {
  let coments = [];
  // console.warn("here");
  for (let i = 0; i < comments.length * 5; i++) {
    coments.push(comments[i % comments.length]);
  }

  return coments;
}

export default function PostsPage({ navigation }) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [commentPost, setCommentPost] = useState(null);
  const commentSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["65%", "100%"], []);

  const onPressComment = () => {
    console.log("Comment Pressed");
  };

  console.log("Comment State: " + (isCommentOpen ? "Opened" : "Closed"));

  useEffect(() => {
    textColor = themes._currTextTheme;
    backColor = themes._currBackColorTheme;
    themeColor = themes._currTheme;
  });

  return (
    <SafeAreaView style={commentsStyles.container}>
      <FlatList
        data={preperTempData()}
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
    backgroundColor: themeColor === "light" ? "#CCCCCC" : "#B1B1B1",
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
    backgroundColor: "red",
  },

  scrollContainer: {
    flex: 1,
  },
});
