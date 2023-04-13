import React, { useEffect } from "react";
import { BackHandler } from "react-native";

import AppHeader from "../../components/AppHeader";
import PostListView from "./PostListView";
import OurUser from "../../OurUser";
import { GraphQL } from "../../../API";

function LostPage({ navigation }) {
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
    params.postTypes = 2;
    const result = await GraphQL.PostApiLogic.Queries.Retrieve(params);
    
    return result;
  };

  return (
    <>
      <AppHeader style={{ top: -12 }} navigation={navigation} isDrawer />
      <PostListView
        retrieveData={retrieveData}
        type={2}
        navigation={navigation}
        perPage={4}
      />
    </>
  );
}

export default LostPage;
