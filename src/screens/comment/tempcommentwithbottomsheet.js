import React, { useCallback, useMemo, useRef } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import CommentCard from "./CommentCard";
import comments from "../../data/comments";
import InputBox from "../chat/inputBox";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function preperTempData() {
  let coments = [];

  for (let i = 0; i < comments.length * 5; i++) {
    coments.push(comments[i % comments.length]);
  }

  return coments;
}

function Comments() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.commentsContainer}>
        <BottomSheetFlatList
          data={preperTempData()}
          style={styles.scrollContainer}
          keyExtractor={(item, index) => index}
          renderItem={(item, index) => {
            return <CommentCard comment={item.item} key={index} />;
          }}
        />
      </View>

      <InputBox isComment={true} />
    </SafeAreaView>
  );
}

export default function CommentPage(props) {
  const commentSheetRef = useRef(null);

  const snapPoints = useMemo(() => ["99"], []);

  const handleSheetChanges = useCallback((index) => {
    if (index == -1) {
      props.navigation.goBack();
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheet
        ref={commentSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
      >
        <Comments />
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

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
