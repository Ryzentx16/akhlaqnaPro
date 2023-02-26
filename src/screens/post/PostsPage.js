import React, { useEffect } from "react";
import { BackHandler } from "react-native";

import PostListView from "./PostListView";
import OurUser from "../../OurUser";
import themes from "../../ThemeController";
import { GraphQL } from "../../../API";

export default function PostsPage({ navigation }) {
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
    const result = await GraphQL.PostApiLogic.Queries.Retrieve(params);

    return result;
  };

  return (
    <>
      <PostListView
        retrieveData={retrieveData}
        type={1}
        navigation={navigation}
        perPage={4}
      />
    </>
  );
}
