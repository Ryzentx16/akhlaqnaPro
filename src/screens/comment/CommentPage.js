import React, { useCallback, useMemo, useRef, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CommentCard from "./CommentCard";
import comments from "../../data/comments";
import InputBox from "../chat/inputBox";

function getCommentsGroup(post) {
  console.log(comments.length);
  for (let index = 0; index < comments.length; index++) {
    const element = comments[index];
    console.log("element: " + element.postId);
    if (post.commentsId === element.postId) {
      console.log("post.commentsId === element.postId: " + post.commentsId === element.postId);
      return element.comments;
    }
  }
}

function Comments(props) {
  const { post } = props
  console.log("Commetns length: " + comments.length);

  return (
    <SafeAreaView style={commentsStyles.container}>
      <View style={commentsStyles.commentsContainer}>
        <BottomSheetFlatList
          data={getCommentsGroup(post)}
          style={commentsStyles.scrollContainer}
          keyExtractor={(item, index) => index}
          renderItem={(item, index) => {
            return <CommentCard comment={item.item} key={index} />;
          }}
        />
      </View>

      <InputBox isComment={true} post={post}/>
    </SafeAreaView>
  );
}

export default function CommentPage(props) {
  const { post, isClosed } = props;
  const commentSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["65%", "100%"], []);

  const onCommentClose = () => {
    isClosed(false);
    console.log("Comment Clsoed: CommentPage");
  }

  return (
    <>
      <BottomSheet
        ref={commentSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: '#660032' }}
        onClose={onCommentClose}
        enablePanDownToClose={true}
      >
        <Comments post={post} />
      </BottomSheet>
    </>
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
