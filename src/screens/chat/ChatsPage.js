import React, { useEffect } from "react";
import { BackHandler } from "react-native";

import OurUser from "../../OurUser";
import themes from "../../ThemeController";
import { GraphQL } from "../../../API";
import ChatListView from "./ChatListView";

export default function ChatsPage({ navigation }) {
  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  });

  useEffect(() => {
    textColor = themes._currTextTheme;
    backColor = themes._currBackColorTheme;
    themeColor = themes._currTheme;
  });

  const retrieveData = async (params) => {
    params.userId = OurUser.user.id;
    const result = await GraphQL.ChatApiLogic.Rooms.Queries.Retrieve(params);
    return result;
  };

  return (
    <>
      <ChatListView
        retrieveData={retrieveData}
        navigation={navigation}
        perPage={10}
      />
    </>
  );
}
