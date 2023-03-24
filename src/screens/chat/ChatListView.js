import React, { useState, useEffect } from "react";
import PaginationListView from "../../components/PaginationListView";
import languages from "../../strings/LanguagesController";
import themes from "../../ThemeController";
import ChatCard from "./ChatCard";

let textColor = themes._currTextTheme;
let backColor = themes._currBackColorTheme;
let themeColor = themes._currTheme;

export default function ChatListView(props) {
  const { retrieveData, perPage, navigation, onChatEdit } = props;

  let currLang = languages.currLang();
  useEffect(() => {
    textColor = themes._currTextTheme;
    backColor = themes._currBackColorTheme;
    themeColor = themes._currTheme;
    currLang = languages.currLang();
  });

  const onPress = (room) => {
    navigation.navigate("Chat", {
      screen: "ChatRoom",
      initial: false,
      params: {
        roomId: room.id,
        chatName: room.user.firstName + " " + room.user.lastName,
        recieverId: room.user.id,
      },
    });
  };

  const renderItem = (item) => {
    return (
      <ChatCard
        key={item.item.id}
        data={item.item}
        onPress={onPress}
        onChatEdit={onChatEdit}
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
    </>
  );
}
