import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import SearchPage from "../screens/SearchPage";
import AddPostPage from "../screens/AddpostPage";
import commentPage from "../screens/comment/CommentPage";
import NotificationsPage from "../screens/notification/NotificationsPage";
import PostsPage from "../screens/post/PostsPage";
import AppHeader from "../components/AppHeader";

const Tab = createBottomTabNavigator();
const iconsize = 30;
const iconcolor = "#660032";

export default function MyTabs() {
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
        component={PostsPage}
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
        component={commentPage}
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

// import React, {Component} from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
// import {
//   faHome,
//   faBell,
//   faUser,
//   faSchool,
// } from '@fortawesome/free-solid-svg-icons';
// //import DrawerNavigation from './DrawerNavigation';
// import 'react-native-gesture-handler';
// //import Home from '../screens/Home';
// import Notification from '../screens/notification';
// import Classes from '../screens/classes';
// import Profile from '../screens/profile/profile';
// import MessageThreadSelectionScreen from '../screens/messages/MessageThreadSelectionScreen';
// import QuizSelectionScreen from '../screens/quiz/QuizSelectionScreen';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import IconOcticons from 'react-native-vector-icons/Octicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Teachers from '../screens/Teachers';
// import Subjects from '../screens/subjects/Subjects';
// import DrawerNavigation from './DrawerNavigation';
// import ParentProfileScreen from '../screens/Parent/ParentProfileScreen';
// import TeacherProfileScreen from '../screens/teacherprofile/TeacherProfileScreen';

// const Tab = createBottomTabNavigator();
// const iconsize = 25;
// const iconcolor = 'yellowgreen';

// const BottomNavigation = () => {
//   return (
//     <Tab.Navigator
//       initialRouteName="DrawerNavigation"
//       screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor: 'red',
//         tabBarInactiveTintColor: 'black',
//         tabBarHideOnKeyboard: true,
//       }}
//       barStyle={{size: 24, backgroundColor: 'crimson'}}>
//       <Tab.Screen
//         name="DrawerNavigation"
//         component={DrawerNavigation}
//         options={{
//           tabBarLabel: 'Home',
//           tabBarIcon: () => (
//             <Icon name="home" color={iconcolor} size={iconsize} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Subjects"
//         component={Subjects}
//         options={{
//           tabBarLabel: 'Subjects',
//           tabBarIcon: () => (
//             <Icon name="layer-group" color={iconcolor} size={iconsize} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Teachers"
//         component={Teachers}
//         options={{
//           tabBarLabel: 'Teachers',
//           tabBarIcon: () => (
//             <Icon name="chalkboard" color={iconcolor} size={iconsize} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="MessageThreadSelectionScreen"
//         component={MessageThreadSelectionScreen}
//         options={{
//           tabBarLabel: 'Messages',
//           tabBarIcon: () => (
//             <Icon name="envelope" color={iconcolor} size={iconsize} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           tabBarLabel: 'Profile',
//           tabBarIcon: () => (
//             <Icon name="user" color={iconcolor} size={iconsize} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Parent Profile"
//         component={ParentProfileScreen}
//         options={{
//           tabBarLabel: 'Parent Profile',
//           tabBarIcon: () => (
//             <Icon name="user" color={iconcolor} size={iconsize} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Teacher Profile"
//         component={TeacherProfileScreen}
//         options={{
//           tabBarLabel: 'Teacher Profile',
//           tabBarIcon: () => (
//             <Icon name="user" color={iconcolor} size={iconsize} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };
// export default BottomNavigation;
