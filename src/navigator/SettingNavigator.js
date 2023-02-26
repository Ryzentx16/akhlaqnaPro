import React, { useEffect } from "react";
import { BackHandler } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PostsPage from "../screens/post/PostsPage";
import CommentPage from "../screens/comment/tempcommentwithbottomsheet";

import AppHeader from "../components/AppHeader";

import SettingPage from "../screens/settings/SettingPage";
import AccountPage from "../screens/settings/AccountPage";
import LanguagePage from "..//screens/settings/LanguagePage";
import ChatsSettingPage from "../screens/settings/ChatsSettingPage";
import AppStartupNavigator from "./AppStartupNavigator";

const Stack = createStackNavigator();

export default function SettingNavigator({ navigation, route }) {
  // useEffect(() => {
  //   const backAction = () => {
  //     return false;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove();
  // });

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
      initialRouteName="Settings"
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
      <Stack.Screen name="Settings" component={SettingPage} />
      <Stack.Screen name="AccountPage" component={AccountPage} />
      <Stack.Screen
        name="LanguagePage"
        component={LanguagePage}
        // initialParams={{ drawerNavigation: drawerNavigation }}
      />
      <Stack.Screen name="ChatsSettingPage" component={ChatsSettingPage} />
      {/* <Stack.Screen name="AppStartupNavigator" component={AppStartupNavigator} /> */}
    </Stack.Navigator>
  );
}
