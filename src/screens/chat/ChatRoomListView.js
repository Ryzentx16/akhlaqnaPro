import React, { useState, useEffect } from "react";
import PaginationListView from "../../components/PaginationListView";
import OurUser from "../../OurUser";
import languages from "../../strings/LanguagesController";
import themes from "../../ThemeController";
import ChatMessage from "./ChatMessage";

let textColor = themes._currTextTheme;
let backColor = themes._currBackColorTheme;
let themeColor = themes._currTheme;

export default function ChatRoomListView(props) {
  const { retrieveData, perPage, isSend, refreshCallBack,isHideRefreshAnimation } = props;

  let currLang = languages.currLang();
  useEffect(() => {
    textColor = themes._currTextTheme;
    backColor = themes._currBackColorTheme;
    themeColor = themes._currTheme;
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
