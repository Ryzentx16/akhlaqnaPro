import React from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PersonProfile from "../screens/Profiles/PersonProfile";

const Stack = createStackNavigator();

export default function ChatNavigator({ navigation, route }) {
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
      <Stack.Screen name="PersonProfile"
        component={PersonProfile}
        options={
          {
            headerShown: true,
            title: "Profile",
            headerBlurEffect: true,
            headerTitleAlign: 'center'
          }} />
    </Stack.Navigator>
  );
}
