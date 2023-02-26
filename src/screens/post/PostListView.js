import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";

import PostCard from "./PostCard";
import PaginationListView from "../../components/PaginationListView";
import languages from "../../strings/LanguagesController";
import CommentPage from "../comment/CommentPage";
import themes from "../../ThemeController";

let textColor = themes._currTextTheme;
let backColor = themes._currBackColorTheme;
let themeColor = themes._currTheme;

//type of posts 1 for general 2 for islost and 3 for isfound and 4 for both
export default function PostListView(props) {
  const { retrieveData, type, perPage, navigation } = props;
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [commentPost, setCommentPost] = useState(null);

  let currLang = languages.currLang();
  useEffect(() => {
    textColor = themes._currTextTheme;
    backColor = themes._currBackColorTheme;
    themeColor = themes._currTheme;
    currLang = languages.currLang();
  });

  const renderItem = (item) => {
    return (
      <PostCard
        navigation={navigation}
        post={item.item}
        key={item.item.id}
        isTypeEnable={
          props.type == 2 || props.type == 3 || props.type == 4 ? true : false
        }
        // -------------Wrong Logic-------------
        // It Should be ( isTypeEnable={Boolen} )
        type={type}
        onPressComment={(clickedPost) => {
          setCommentPost(clickedPost);
          setIsCommentOpen(true);
        }}
      />
    );
  };

  return (
    <>
      <PaginationListView
        renderItem={renderItem}
        retrieveData={retrieveData}
        navigation={navigation}
        perPage={perPage}
      />
      {isCommentOpen && (
        <CommentPage
          post={commentPost}
          isClosed={(state) => {
            setCommentPost(null);
            setIsCommentOpen(state);
          }}
        />
      )}
    </>
  );
}

const postListContainerStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
    paddingTop: 10,
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
    backgroundColor: "red",
  },

  scrollContainer: {
    flex: 1,
  },
});
