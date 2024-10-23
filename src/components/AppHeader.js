import UserAvatar from "@muhzi/react-native-user-avatar";
import React, { useContext, useEffect, useRef, useState } from "react";
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
import OurUser from "../OurUser";
import domain from "../../API/domain";
import ThemeContext from "./../themes/ThemeContext";
import AmantiLogo from "./AmantiLogo";

const isRTL = I18nManager.isRTL;

export default function AppHeader(props) {
  const { navigation, isDrawer } = props;
  const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext);

  const onLogo = () => {
    navigation.navigate("PostsPage");
  };
  const onProfile = () => {
    navigation.navigate("PersonProfile", { user: OurUser.user, isMe: true });
  };
  const onToggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const isSettings = props.hasOwnProperty("isSettings");

  return (
    <>
      {isDrawer ? (
        <View
          style={[
            styles.container,
            props.style,
            { backgroundColor: theme.primary },
          ]}
        >
          <AmantiLogo
            onLogo={() => onLogo}
            theme={theme}
            isDarkMode={isDarkMode}
          />

          <TouchableOpacity style={styles.profileContainer} onPress={onProfile}>
            <UserAvatar
              src={`${domain}/download/` + OurUser.user.profileImage}
              // initialName={"Abdulrahman .M"}
              size={50}
              // fontSize={36}
              style={styles.profileIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuContainer}
            onPress={onToggleDrawer}
          >
            <Entypo
              name="menu"
              size={30}
              color={theme.secondary}
              style={styles.menuIcon}
            />
          </TouchableOpacity>
          {isSettings && (
            <TouchableOpacity
              style={styles.backContainer}
              onPress={() => navigation.goBack()}
            >
              <Ionicons
                name="arrow-back"
                size={45}
                color={"#660032"}
                style={styles.backIcon}
              />
            </TouchableOpacity>
          )}
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 140,
    justifyContent: "center",
    shadowColor: "#944d6f",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
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
  },
});
