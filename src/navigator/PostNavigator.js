import React, { useContext, useEffect } from "react";
import { BackHandler } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PostsPage from "../screens/post/PostsPage";
import CommentPage from "../screens/comment/tempcommentwithbottomsheet";

import PersonProfile from "../screens/Profiles/PersonProfile";
import ProfileNavigator from "./ProfileNavigator";
import AppHeader from "../components/AppHeader";
import ThemeContext from "../themes/ThemeContext";

const Stack = createStackNavigator();

export default function PostNavigator({ navigation, route }) {
  const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext);

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

  return (
    <Stack.Navigator
      initialRouteName="PostsPage"
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}
      screenListeners={{ beforeRemove: null }}
    >
      <Stack.Screen name="PostsPage" component={PostsPage} />
      <Stack.Screen name="PersonProfile" component={ProfileNavigator} />
      <Stack.Screen name="CommentPage" component={CommentPage} />
    </Stack.Navigator>
  );
}
