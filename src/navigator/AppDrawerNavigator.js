import { useEffect } from "react";
import { BackHandler, Alert } from "react-native";

import { createDrawerNavigator } from "@react-navigation/drawer";

import AppHeader from "../components/AppHeader.js";
import ProfileNavigator from "./ProfileNavigator.js";
import AppBottomTabNavigator from "./AppBottomTabNavigator.js";

import users from "../data/users.js"; //Temp

const Drawer = createDrawerNavigator();
const iconsize = 30;
const iconcolor = "#660032";

export default function AppDrawerNavigator() {
  useEffect(() => {
    // console.log(logo);
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Drawer.Navigator
      initialRouteName="Pages"
      screenOptions={{
        headerShown: false,
        // header: () => <AppHeader />,
        drawerActiveTintColor: "white",
        drawerType: "front",
        // header: () => {headerTitle: 'hi'},
        drawerStyle: {
          backgroundColor: "#660032",
          borderTopRightRadius: 15,
          borderBottomRightRadius: 15,
          marginTop: 80,
          height: "50%",
          width: 240,
        },
      }}
    >
      <Drawer.Screen
        name="AppHeader"
        component={AppHeader}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen name="Pages" component={AppBottomTabNavigator} />
      <Drawer.Screen name="MyProfile" component={ProfileNavigator} initialParams={{ user: users[0] }} />
    </Drawer.Navigator>
  );
}
