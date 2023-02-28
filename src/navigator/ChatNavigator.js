import React, { useEffect } from "react";
import { BackHandler } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatRoomPage from "../screens/chat/ChatRoomPage";
import ChatsPage from "../screens/chat/ChatsPage";

const Stack = createStackNavigator();

export default function ChatNavigator({ navigation, route }) {
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

  React.useLayoutEffect(() => {
    const tabHiddenRoutes = ["ChatRoom"];

    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator
      screenListeners={{ beforeRemove: null }}
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
      tabbarop
      barStyle={{ backgroundColor: "black" }} //This is where you can manipulate its look.
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
