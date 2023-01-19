import React from "react";
import { Alert } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PersonProfile from "../screens/Profiles/PersonProfile";

const Stack = createStackNavigator();

export default function ProfileNavigator({ navigation, route }) {

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
      <Stack.Screen
        name="PersonProfile"
        component={PersonProfile}
        initialParams={route.params}
        options={{
          headerShown: false,
          title: "Profile",
          headerBlurEffect: true,
          headerTitleAlign: "center",
          // header: () => <AppHeader navigation={navigation} />,
        }}
      />
    </Stack.Navigator>
  );
}
