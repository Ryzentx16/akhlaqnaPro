import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Keyboard,
  TextInput,
} from "react-native";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CommentCard from "./CommentCard";
import comments from "../../data/comments";
import InputBox from "../chat/inputBox";

import themes from "../../ThemeController";

let textColor = themes._currTextTheme;
let backColor = themes._currBackColorTheme;
let themeColor = themes._currTheme;

function useKeyboardHeight() {
  /* #region  get keybaord height test */
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) =>
      setKeyboardHeight(e.endCoordinates.height)
    );
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardHeight(0)
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [setKeyboardHeight]);

  /* #endregion */

  return keyboardHeight;
}

function getCommentsGroup(post) {
  // console.log(comments.length);
  for (let index = 0; index < comments.length; index++) {
    const element = comments[index];
    // console.log("element: " + element.postId);

    if (post.commentsId === element.postId) {
      // console.log(
      //   "post.commentsId === element.postId: " + post.commentsId ===
      //     element.postId
      // );
      return element.comments;
    }
  }
}

function Comments(props) {
  const { post } = props;
  // console.log("Commetns length: " + comments.length);

  return (
    // <KeyboardAvoidingView style={{ flex: 1 }}>
    <View style={commentsStyles.container}>
      <View style={commentsStyles.commentsContainer}>
        <BottomSheetFlatList
          data={getCommentsGroup(post)}
          style={commentsStyles.scrollContainer}
          keyExtractor={(item, index) => index}
          renderItem={(item, index) => {
            // console.log(item.item);
            return (
              <CommentCard
                comment={item.item}
                key={index}
                // BSTextInput={BottomSheetTextInput}
              />
            );
          }}
        />
      </View>
    </View>
    // </KeyboardAvoidingView>
  );
}

export default function CommentPage(props) {
  const { post, isClosed } = props;
  const [isFocus, setIsFocus] = useState(false);
  const [tiPlaceHolder, setTiPlaceHolder] = useState(null);
  const commentSheetRef = useRef(BottomSheet);
  const snapPoints = useMemo(() => ["25%", "65%", "100%"], []);

  /* #region  get keybaord height test */
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
      console.log(e);
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", (e) => {
      // console.log(e);
      setKeyboardHeight(0);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [setKeyboardHeight]);

  /* #endregion */

  const onCommentClose = () => {
    isClosed(false);
  };

  useEffect(() => {
    textColor = themes._currTextTheme;
    backColor = themes._currBackColorTheme;
    themeColor = themes._currTheme;
  });

  return (
    <BottomSheet
      ref={commentSheetRef}
      index={0}
      snapPoints={snapPoints}
      handleStyle={{
        backgroundColor: "#660032",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      }}
      onClose={onCommentClose}
      enablePanDownToClose={true}
    >
      <View style={commentsStyles.container}>
        <View style={commentsStyles.commentsContainer}>
          <BottomSheetFlatList
            data={getCommentsGroup(post)}
            style={commentsStyles.scrollContainer}
            keyExtractor={(item, index) => index}
            renderItem={(item, index) => {
              return (
                <CommentCard
                  comment={item.item}
                  key={index}
                  onReply={(user) => {
                    setTiPlaceHolder(`Replying to ${user.name}`);
                    setIsFocus(true);
                  }}
                />
              );
            }}
          />
        </View>
      </View>

      <InputBox
        replyPlaceHolder={tiPlaceHolder}
        onFocus={isFocus}
        onEndReply={() => {
          setIsFocus(false);
          setTiPlaceHolder(null)
        }}
        isComment={true}
        post={post}
        style={{ backgroundColor: "#c8c7c8" }}
      />

      {/* <KeyboardAvoidingView style={{flex: 1}}>
        <View style={{ flex: 1, backgroundColor: "red", padding: 14 }}>
          <View style={{ flex: 1, backgroundColor: "blue" }}>
            <BottomSheetFlatList
              data={getCommentsGroup(post)}
              style={commentsStyles.scrollContainer}
              keyExtractor={(item, index) => index}
              renderItem={(item, index) => {
                return (
                  <CommentCard
                    comment={item.item}
                    key={index}
                  />
                );
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView> */}
    </BottomSheet>
  );
}

const commentsStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
    paddingTop: 17,
    backgroundColor: themeColor === "light" ? "#c8c7c8" : "#A1A1A1",
    // backgroundColor: "lightblue",
  },

  commentsContainer: {
    // backgroundColor: 'red',
    flex: 1,
  },

  scrollContainer: {
    // backgroundColor: 'red',
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
