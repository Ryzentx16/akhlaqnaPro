import React from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PostsPage from "../screens/post/PostsPage";
import CommentPage from "../screens/comment/CommentPage";

const Stack = createStackNavigator();

export default function PostNavigator({ navigation, route }) {
  React.useLayoutEffect(() => {
    const tabHiddenRoutes = ["CommentPage"];

    if(tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))){
        navigation.setOptions({tabBarStyle: {display: 'none'}});
       } else {
       navigation.setOptions({tabBarStyle: {display: 'flex'}});
      }
  }, [navigation, route]);

  return (
    <Stack.Navigator
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
      <Stack.Screen name="PostsPage" component={PostsPage} />
      <Stack.Screen
        name="CommentPage"
        component={CommentPage}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}
