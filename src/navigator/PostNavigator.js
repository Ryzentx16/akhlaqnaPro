import React, { useEffect } from "react";
import { BackHandler } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PostsPage from "../screens/post/PostsPage";
import CommentPage from "../screens/comment/tempcommentwithbottomsheet";

import PersonProfile from "../screens/Profiles/PersonProfile";
import ProfileNavigator from "./ProfileNavigator";
import AppHeader from "../components/AppHeader";

const Stack = createStackNavigator();

export default function PostNavigator({ navigation, route }) {
  useEffect(() => {
    const backAction = () => {
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  });

  React.useLayoutEffect(() => {
    const tabHiddenRoutes = ["CommentPage"];

    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "black",
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopColor: "#660032",
          borderTopWidth: 3,
        },
      }}
      screenListeners={{ beforeRemove: null }}
      tabbarop
      barStyle={{ backgroundColor: "black" }} //This is where you can manipulate its look.
    >
      <Stack.Screen name="PostsPage" component={PostsPage} />
      <Stack.Screen
        name="PersonProfile"
        component={ProfileNavigator}
        options={{
          headerShown: false,
          title: "",
          headerBlurEffect: true,
          headerTitleAlign: "center",
          presentation: "Modal",
        }}
      />
      <Stack.Screen
        name="CommentPage"
        component={CommentPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
