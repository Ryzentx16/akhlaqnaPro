import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import SearchPage from "../screens/SearchPage";
import AddPostPage from "../screens/AddpostPage";
import chatRoom from "../screens/chat/chatRoom"
import commentPage from "../screens/comment/CommentPage";
import NotificationsPage from "../screens/notification/NotificationsPage";
import AppHeader from "../components/AppHeader";
import ChatNavigator from "./ChatNavigator";
import PostNavigator from "./PostNavigator";

const Tab = createBottomTabNavigator();
const iconsize = 30;
const iconcolor = "#660032";

export default function AppBottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "black",
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopColor: "#660032",
          borderTopWidth: 3,
        },
        header: () => <AppHeader />,
      }}
      tabbarop
      barStyle={{ backgroundColor: "black" }} //This is where you can manipulate its look.
    >
      <Tab.Screen
        name="Search"
        component={SearchPage}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              color={iconcolor}
              size={iconsize}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationsPage}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "notifications" : "notifications-outline"}
              color={iconcolor}
              size={iconsize}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={PostNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={iconcolor}
              size={iconsize}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={ChatNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "chatbubbles" : "chatbubbles-outline"}
              color={iconcolor}
              size={iconsize}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Add"
        component={AddPostPage}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "add-circle" : "add-circle-outline"}
              color={iconcolor}
              size={iconsize}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}