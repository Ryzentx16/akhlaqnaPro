import React, { useContext, useEffect, useLayoutEffect } from "react";
import { BackHandler } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatRoomPage from "../screens/chat/ChatRoomPage";
import ChatsPage from "../screens/chat/ChatsPage";
import ThemeContext from "../themes/ThemeContext";

const Stack = createStackNavigator();

export default function ChatNavigator({ navigation, route }) {
  const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext);
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

  useLayoutEffect(() => {
    const focusedRouteName = getFocusedRouteNameFromRoute(route);
    const hideTabBar = focusedRouteName === "ChatRoom";

    navigation.setOptions({
      tabBarStyle: hideTabBar
        ? { display: "none" }
        : {
            backgroundColor: theme.primary,
            borderTopColor: theme.secondary,
            borderTopWidth: 3,
          },
    });
  }, [navigation, route, theme]);

  return (
    <Stack.Navigator
      screenListeners={{ beforeRemove: null }}
      screenOptions={{
        headerTintColor: theme.largeText,
        headerStyle: {
          backgroundColor: theme.primary,
          shadowColor: "#944d6f",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,

          elevation: 7,
        },
        gestureEnabled: false,
        headerShown: false,
        // tabBarActiveTintColor: "red",
        // tabBarInactiveTintColor: "black",
        // tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: theme.primary,
          borderTopColor: theme.secondary,
          borderTopWidth: 3,
        },
      }}
      // tabbarop
      // barStyle={{ backgroundColor: "black" }} //This is where you can manipulate its look.
    >
      <Stack.Screen name="ChatPage" component={ChatsPage} />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomPage}
        options={({ route }) => ({
          headerTitle: route.params.chatName,
          headerShown: true,
        })}
      />
    </Stack.Navigator>
  );
}
