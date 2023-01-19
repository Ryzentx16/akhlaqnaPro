import React from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PostsPage from "../screens/post/PostsPage";
import CommentPage from "../screens/comment/tempcommentwithbottomsheet";

import AppHeader from "../components/AppHeader";

import SettingPage from "../screens/settings/SettingPage";
import AccountPage from "../screens/settings/AccountPage";
import LanguagePage from "..//screens/settings/LanguagePage";
import ChatsSettingPage from "../screens/settings/ChatsSettingPage";

const Stack = createStackNavigator();

export default function SettingNavigator({ navigation, route }) {
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
      initialRouteName="SettingPage"
      screenOptions={{
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
      tabbarop
      barStyle={{ backgroundColor: "black" }} //This is where you can manipulate its look.
    >
      <Stack.Screen
        name="SettingPage"
        component={SettingPage}
        options={{
          header: () => {
            return <AppHeader navigation={navigation} isDrawer={true} />;
          },
        }}
      />
      <Stack.Screen
        name="AccountPage"
        component={AccountPage}
        options={{
          header: () => {
            return <AppHeader navigation={navigation} isDrawer={true} />;
          },
        }}
      />
      <Stack.Screen
        name="LanguagePage"
        component={LanguagePage}
        options={{
          header: () => {
            return <AppHeader navigation={navigation} isDrawer={true} />;
          },
        }}
      />
      <Stack.Screen
        name="ChatsSettingPage"
        component={ChatsSettingPage}
        options={{
          header: () => {
            return <AppHeader navigation={navigation} isDrawer={true} />;
          },
        }}
      />
    </Stack.Navigator>
  );
}
