import React, { useEffect } from "react";
import { Alert } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PersonProfile from "../screens/Profiles/PersonProfile";
import SignUpPage from "../screens/startup/SignUpPage";
import AppStartupNavigator from "./AppStartupNavigator";
import { BackHandler } from "react-native";
import EditProfilePage from "../screens/startup/EditProfilePage";

const Stack = createStackNavigator();

export default function ProfileNavigator({ navigation, route }) {
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
      <Stack.Screen
        name="PersonProfile"
        component={PersonProfile}
        initialParams={route.params}
        options={{
          headerShown: false,
          title: "Profile",
          headerBlurEffect: true,
          headerTitleAlign: "center",
        }}
      />

    </Stack.Navigator>
  );
}
