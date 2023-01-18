import React from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PostsPage from "../screens/post/PostsPage";
import CommentPage from "../screens/comment/tempcommentwithbottomsheet";

import PersonProfile from "../screens/Profiles/PersonProfile";
import ProfileNavigator from "./ProfileNavigator"; 
import AppHeader from "../components/AppHeader";

const Stack = createStackNavigator();

export default function PostNavigator({ navigation, route }) {
  React.useLayoutEffect(() => {
    const tabHiddenRoutes = ["CommentPage"];

    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    }
  }, [navigation, route]);

  const onSignOut = () => {
    Alert.alert("Sign Out", "Are you Sure You Want to Sign Out ?", [
      {
        text: "Yes",
        onPress: () => navigation.navigate("LoginPage"),
      },
      {
        text: "Cancel",
        onPress: null,
      },
    ]);
  };

  const onToggleDrawer = () => {
    navigation.toggleDrawer();
  };

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
      <Stack.Screen name="PersonProfile"
                    // headerBackTitleVisible={true}
                    component={PersonProfile}
                    options={
                      {
                        headerShown: true,
                        title: "",
                        headerBlurEffect: true,
                        headerTitleAlign: 'center',
                        presentation: 'Modal',
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
