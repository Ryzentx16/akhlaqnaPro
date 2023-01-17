import { useEffect } from "react";
import { BackHandler, Alert, I18nManager } from "react-native";

import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";

import AppHeader from "../components/AppHeader.js";
import ProfileNavigator from "./ProfileNavigator.js";
import AppBottomTabNavigator from "./AppBottomTabNavigator.js";

import users from "../data/users.js"; //Temp
import AppStartupNavigator from "./AppStartupNavigator.js";
import LostPosts from "../screens/post/lostPage.js";
import FoundPage from "../screens/post/foundPage.js";

const Drawer = createDrawerNavigator();
const isRTL = I18nManager.isRTL;
// const iconsize = 30;
// const iconcolor = "#660032";

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
        // drawerActiveTintColor: "white",
        drawerType: "front",
        drawerStyle: {
          backgroundColor: "white",
          borderWidth: 5,

          borderRightWidth: isRTL ? 5 : 0,
          borderLeftWidth: isRTL ? 0 : 5,

          borderColor: "#660032",

          borderTopRightRadius: isRTL ? 15 : 0,
          borderBottomRightRadius: isRTL ? 15 : 0,

          borderTopLeftRadius: isRTL ? 0 : 15,
          borderBottomLeftRadius: isRTL ? 0 : 15,

          marginTop: 80,
          maxHeight: "50%",
          width: 240,
        },
        drawerPosition: isRTL ? "left" : "right",
      }}
    >
      <Drawer.Screen
        name="AppHeader"
        component={AppHeader}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="Pages"
        component={AppBottomTabNavigator}
        options={{ title: "Home" }}
      />
      <Drawer.Screen
        name="LostsPage"
        component={LostPosts}
        // initialParams={{ user: users[0] }}
        options={{ title: "Losts Page" }}
      />
      <Drawer.Screen
        name="FoundsPage"
        component={FoundPage}
        // initialParams={{ user: users[0] }}
        options={{ title: "Founds Page" }}
      />
      <Drawer.Screen
        name="Sign Out"
        component={AppStartupNavigator}
        // options={{ drawerItemStyle: { display: "none" } }}
      />
    </Drawer.Navigator>
  );
}
