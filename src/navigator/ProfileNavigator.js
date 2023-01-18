import React from "react";
import {Alert} from 'react-native';
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PersonProfile from "../screens/Profiles/PersonProfile";

const Stack = createStackNavigator();

export default function ProfileNavigator({ navigation, route }) {
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

    navigation.navigate("Login");
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
      <Stack.Screen
        name="PersonProfile"
        component={PersonProfile}
        initialParams={route.params}
        options={{
          headerShown: false,
          title: "Profile",
          headerBlurEffect: true,
          headerTitleAlign: "center",
          header: () => (
            <AppHeader onSignOut={onSignOut} onToggleDrawer={onToggleDrawer} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
