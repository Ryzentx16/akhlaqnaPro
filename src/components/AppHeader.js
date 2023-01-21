import UserAvatar from "@muhzi/react-native-user-avatar";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  I18nManager,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesome, Entypo, Ionicons } from "react-native-vector-icons";

import themes from "../ThemeController";

let textColor = themes._currTextTheme;
let backColor = themes._currBackColorTheme;
const isRTL = I18nManager.isRTL;

export default function AppHeader(props) {
  const { navigation, isDrawer } = props;

  const onLogo = () => {
    navigation.navigate('PostsPage');
  };
  const onProfile = () => {
    navigation.navigate('MyProfile');
  };
  const onToggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const isSettings = props.hasOwnProperty("isSettings");

  useEffect(() => {
    textColor = themes._currTextTheme;
    backColor = themes._currBackColorTheme;
  });

  return (
    <>
    {isDrawer ? <View style={[styles.container, props.style]}>
      <View style={styles.circle}></View>
      <TouchableOpacity style={styles.logo} onPress={onLogo}>
        <Image
          source={require("../../assets/Logo.png")}
          style={styles.imageLogo}
        />
        {/*<AmanatiLogo style={styles.imageLogo}/>*/}
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileContainer} onPress={onProfile}>
        <UserAvatar 
          src={"http://ryzentx.online/myProfileExample.png"}
          // initialName={"Abdulrahman .M"}
          size={50}
          // fontSize={36}
          style={styles.profileIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuContainer} onPress={onToggleDrawer}>
        <Entypo
          name="menu"
          size={30}
          color={textColor}
          style={styles.menuIcon}
        />
      </TouchableOpacity>
      {isSettings && <TouchableOpacity style={styles.backContainer} onPress={() => navigation.goBack()}>
      <Ionicons
          name="arrow-back"
          size={45}
          color={textColor}
          style={styles.backIcon}
        />
      </TouchableOpacity>}
    </View> : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 140,
    justifyContent: "center",
    backgroundColor: backColor,
  },
  circle: {
    width: 750,
    height: 800,
    borderRadius: 800,
    borderColor: textColor,
    borderWidth: 2,
    alignSelf: "center",
    marginTop: -700,
  },

  logo: {
    position: "absolute",
    height: 70,
    width: 70,
    alignSelf: "center",
    borderColor: textColor,
    borderWidth: 2,
    borderRadius: 150 / 2,

    alignItems: "center",
    justifyContent: "center",
  },
  imageLogo: {
    height: 57,
    width: 37,
    marginLeft: isRTL ? -5 : 5,
  },

  profileContainer: {
    position: "absolute",
    top: 40,
    left: 84,
  },
  profileIcon: {
    transform: [{ rotateY: isRTL ? "0deg" : "180deg" }],
  },

  menuContainer: {
    position: "absolute",
    top: 50,
    right: 100,
  },
  menuIcon: {
    // transform: [{ rotateY: isRTL ? "0deg" : "180deg" }],
  },

  backContainer: {
    position: "absolute",
    top: 100,
    left: 20,
  },
  backIcon: {
    transform: [{ rotateY: isRTL ? "180deg" : "0deg" }],
  }  
});
