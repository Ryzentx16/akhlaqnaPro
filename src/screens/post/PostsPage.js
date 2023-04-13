import React, { useContext, useEffect } from "react";
import { BackHandler } from "react-native";

import PostListView from "./PostListView";
import OurUser from "../../OurUser";
import { GraphQL } from "../../../API";
import ThemeContext from "../../themes/ThemeContext";
import { View } from "react-native";

export default function PostsPage({ navigation }) {
  const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext);

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

  const retrieveData = async (params) => {
    params.userId = OurUser.user.id;
    const result = await GraphQL.PostApiLogic.Queries.Retrieve(params);
    // console.log(result[0]);
    return result;
  };

  // console.log(theme);

  return (
    <View style={{ flex: 1, backgroundColor: theme.backColor }}>
      <PostListView
        retrieveData={retrieveData}
        type={1}
        navigation={navigation}
        perPage={4}
      />
    </View>
  );
}
