import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import PaginationListView from "../../components/PaginationListView";
import languages from "../../strings/LanguagesController";
import CommentPage from "../comment/CommentPage";
import MapViewer from "../../components/MapViewer";

//type of posts 1 for general 2 for islost and 3 for isfound and 4 for both
export default function PostListView(props) {
  const { retrieveData, type, perPage, navigation, isProfile } = props;
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [commentPost, setCommentPost] = useState(null);

  let currLang = languages.currLang();
  useEffect(() => {
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
        isProfile={isProfile}
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
