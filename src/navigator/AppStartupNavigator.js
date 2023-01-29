import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "../screens/startup/LoginPage";
import SignUpPage from "../screens/startup/SignUpPage";
import SignUpConfirmation from "../screens/startup/SignUpConfirmation";
import AppBottomTabNavigator from "./AppBottomTabNavigator";
import ChangePasswordPage from "../screens/startup/ChangePasswordPage";
import AppDrawerNavigator from "./AppDrawerNavigator";
import { BackHandler, Alert, I18nManager } from "react-native";
import { Flag } from "react-native-country-picker-modal";

const Stack = createStackNavigator();

export default function AppStartupNavigator({ navigation, route }) {
  // useEffect(() => {
  //   const backAction = () => {
  //     return null;
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
      screenListeners={{beforeRemove: null}}
      tabbarop
      barStyle={{ backgroundColor: "black" }} //This is where you can manipulate its look.
    >
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen
        name="SignUpPage"
        component={SignUpPage}
        initialParams={{
          user: null,
        }}
      />
      <Stack.Screen name="SignUpConfirmation" component={SignUpConfirmation} />
      <Stack.Screen name="ChangePasswordPage" component={ChangePasswordPage} />
      <Stack.Screen name="Home" component={AppDrawerNavigator} />
    </Stack.Navigator>
  );
}
