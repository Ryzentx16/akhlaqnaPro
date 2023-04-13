import React, { useState, useEffect } from "react";
import PaginationListView from "../../components/PaginationListView";
import OurUser from "../../OurUser";
import languages from "../../strings/LanguagesController";
import ChatMessage from "./ChatMessage";

export default function ChatRoomListView(props) {
  const {
    retrieveData,
    perPage,
    isSend,
    refreshCallBack,
    isHideRefreshAnimation,
  } = props;

  let currLang = languages.currLang();
  useEffect(() => {
    currLang = languages.currLang();
  });

  const renderItem = (item) => {
    return (
      <ChatMessage
        key={item.item.id}
        message={item.item}
        myId={OurUser.user.id}
      />
    );
  };

  return (
    <>
      <PaginationListView
        renderItem={renderItem}
        retrieveData={retrieveData}
        perPage={perPage}
        isInverted={true}
        isSend={isSend}
        refreshCallBack={refreshCallBack}
        isHideRefreshAnimation={isHideRefreshAnimation}
      />
    </>
  );
}
