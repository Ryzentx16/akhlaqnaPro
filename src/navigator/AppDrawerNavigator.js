import { useEffect } from "react";
import { BackHandler, Alert, I18nManager } from "react-native";

import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
// import { useNavigation } from '@react-navigation/native';

import AppHeader from "../components/AppHeader.js";
import PersonProfile from "../screens/Profiles/PersonProfile.js";
import AppBottomTabNavigator from "./AppBottomTabNavigator.js";

import AppStartupNavigator from "./AppStartupNavigator.js";
import LostPosts from "../../src/screens/post/LostPage";
import FoundPage from "../../src/screens/post/FoundPage";
import SettingNavigator from "./SettingNavigator.js";

import users from "../data/users.js";
import OurUser from "../OurUser";
import languages from "../strings/LanguagesController";
import ProfileNavigator from "./ProfileNavigator.js";

const Drawer = createDrawerNavigator();
const isRTL = I18nManager.isRTL;
let currLang = languages.currLang();

function CustomDrawerContent(props) {
  const { navigation } = props;

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label={currLang.drawer.singout}
        onPress={() => navigation.popToTop()}
        labelStyle={{ textAlign: isRTL ? "right" : "left" }}
        style={isRTL ? { left: 0 } : { right: 0 }}
      />
    </DrawerContentScrollView>
  );
}

export default function AppDrawerNavigator() {
  useEffect(() => {
    currLang = languages.currLang();

    const backAction = () => {
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  });

  return (
    <Drawer.Navigator
      initialRouteName="Pages"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenListeners={{beforeRemove: null}}
      screenOptions={{
        swipeEnabled: false,
        headerShown: false,
        drawerType: "front",
        drawerStyle: {
          backgroundColor: "white",
          
          borderLeftWidth: 5,
          borderTopWidth: 5,
          borderBottomWidth: 5,

          borderColor: "#660032",

          borderTopLeftRadius:  15,
          borderBottomLeftRadius:  15,

          marginTop: 80,
          minHeight: "18%",
          maxHeight: "67%",
          width: 240,
        },
        drawerLabelStyle: {
          flex: 1,
          textAlign: isRTL ? "right" : "left",
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
        name="MyProfile"
        component={ProfileNavigator}
        initialParams={{
          user: OurUser.user,
          isDrawer: true,
        }}
        options={{
          title: "My Profile",
          drawerItemStyle: { display: "none" },
          swipeEnabled: false,
        }}
      />

      <Drawer.Screen
        name="Pages"
        component={AppBottomTabNavigator}
        options={{ title: currLang.drawer.home }}
      />

      <Drawer.Screen
        name="LostsPage"
        component={LostPosts}
        options={{
          title: currLang.drawer.lostspage,
        }}
      />
      <Drawer.Screen
        name="FoundsPage"
        component={FoundPage}
        options={{ title: currLang.drawer.foundpage }}
      />

      <Drawer.Screen
        name="SettingPage"
        component={SettingNavigator}
        // initialParams={{
        //   drawerNavigation: navigation,
        // }}
        options={{ title: currLang.drawer.settings }}
      />
    </Drawer.Navigator>
  );
}
