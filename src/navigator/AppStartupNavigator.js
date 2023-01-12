import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "../screens/LoginPage";
import SignUpPage from "../screens/SignUpPage";
import SignUpConfirmation from "../screens/signUpConfirmation";
import AppBottomTabNavigator from "./AppBottomTabNavigator"

const Stack = createStackNavigator();

export default function AppStartupNavigator({ navigation, route }) {
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
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="SignUpPage" component={SignUpPage} />
      <Stack.Screen name="SignUpConfirmation" component={SignUpConfirmation} />
      <Stack.Screen name="Home" component={AppBottomTabNavigator} />
    </Stack.Navigator>
  );
}
