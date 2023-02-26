import React, { useEffect } from "react";
import { BackHandler } from "react-native";

import AppHeader from "../../components/AppHeader";
import PostListView from "./PostListView";
import OurUser from "../../OurUser";
import themes from "../../ThemeController";
import { GraphQL } from "../../../API";

function FoundPage({ navigation }) {
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
    params.postTypes = 3;
    const result = await GraphQL.PostApiLogic.Queries.Retrieve(params);
    
    return result;
  };

  return (
    <>
      <AppHeader style={{ top: -12 }} navigation={navigation} isDrawer />
      <PostListView
        retrieveData={retrieveData}
        type={3}
        navigation={navigation}
        perPage={4}
      />
    </>
  );
}

export default FoundPage;
