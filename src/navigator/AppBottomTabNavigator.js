import { useEffect } from 'react';
import { BackHandler, Alert } from 'react-native';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import SearchPage from "../screens/search/SearchPage";
import AddPostPage from "../screens/AddpostPage";
import chatRoom from "../screens/chat/chatRoom"
import commentPage from "../screens/comment/CommentPage";
import NotificationsPage from "../screens/notification/NotificationsPage";
import AppHeader from "../components/AppHeader";
import ChatNavigator from "./ChatNavigator";
import PostNavigator from "./PostNavigator";

import logo from "../../assets/logo.js"
import { SvgXml } from "react-native-svg";

const Tab = createBottomTabNavigator();
const iconsize = 30;
const iconcolor = "#660032";

export default function AppBottomTabNavigator({navigation}) {
  useEffect(() => {
    // console.log(logo);
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName={"Post"}
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
        header: () => <AppHeader navigation={navigation}/>,
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
        name="Post"
        component={PostNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={iconcolor}
              size={iconsize}
            />
            // <SvgXml xml={logo} /> // Why i can't use svgxml ? it throw error [TypeError: source.split is not a function. (In 'source.split('\n')', 'source.split' is undefined)]
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