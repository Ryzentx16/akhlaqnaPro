import { useEffect } from "react";
import { BackHandler, Alert, I18nManager } from "react-native";

import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";

import AppHeader from "../components/AppHeader.js";
import ProfileNavigator from "./ProfileNavigator.js";
import PersonProfile from "../screens/Profiles/PersonProfile.js";
import AppBottomTabNavigator from "./AppBottomTabNavigator.js";

import AppStartupNavigator from "./AppStartupNavigator.js";
import LostPosts from "../../src/screens/post/LostPage";
import FoundPage from "../../src/screens/post/FoundPage";
import SettingPage from "../screens/settings/SettingPage";
import AccountPage from "../screens/settings/AccountPage.js";
import LanguagePage from "../screens/settings/LanguagePage";

import users from "../data/users.js";

const Drawer = createDrawerNavigator();
const isRTL = I18nManager.isRTL;

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

  console.warn(users[0]);

  return (
    <Drawer.Navigator
      initialRouteName="Pages"
      screenOptions={{
        headerShown: false,
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
          minHeight: "20%",
          maxHeight: "70%",
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
        name="My Profile"
        component={PersonProfile}
        initialParams={{user: users[0], isDrawer: true}}
        // options={}
      />

      <Drawer.Screen
        name="Pages"
        component={AppBottomTabNavigator}
        options={{ title: "Home" }}
      />

      <Drawer.Screen
        name="LostsPage"
        component={LostPosts}
        options={{
          title: "Losts Page",
        }}
      />
      <Drawer.Screen
        name="FoundsPage"
        component={FoundPage}
        options={{ title: "Founds Page" }}
      />

      <Drawer.Screen
        name="SettingPage"
        component={SettingPage}
        options={{ title: "Settings" }}
      />
      <Drawer.Screen
        name="AccountPage"
        component={AccountPage}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="LanguagePage"
        component={LanguagePage}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      {/* <Drawer.Screen
        name="ChatsSettingPage"
        component={ChatsSettingPage}
        options={{ drawerItemStyle: { display: "none" } }}
      /> */}

      <Drawer.Screen
        name="Sign Out"
        component={AppStartupNavigator}
      />
    </Drawer.Navigator>
  );
}
