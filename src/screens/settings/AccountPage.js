import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import AppHeader from "../../components/AppHeader";
import users from "../../data/users";
import languages from "../../strings/LanguagesController";

import { useNavigation } from "@react-navigation/native";
import Storage from "../../components/Storage";
import ThemeContext from "../../themes/ThemeContext";
import OriginalColors from "./../../components/AmantiButtons/OriginalColors";

let currLang = languages.currLang();

export default function AccountPage() {
  const navigation = useNavigation();
  const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext);
  const iconColor = theme.secondary;
  const textColor = theme.largeText;

  const onChangePass = () => {
    // console.warn(users[0].phoneNumber);

    Alert.alert(
      "Warning",
      "In order to Change The password you need to sign out",
      [
        {
          text: "Yes, Sign Out",
          onPress: () =>
            navigation.dispatch(
              navigation.reset({
                index: 1,
                routes: [
                  { name: "LoginPage", params: { passBy: true } },
                  { name: "ChangePasswordPage" },
                ],
              })
            ),
        },
        {
          text: "Cancel",
          onPress: null,
        },
      ]
    );

    // Alert.alert("Sorry!", "Coming Soon");
  };

  const onRemoveKeepLogging = async () => {
    await Storage.storeData("keepLogging", false);
    await Storage.storeData("firstLogin", false);

    Alert.alert("Info", "Keep Logging removed successfully");
  };

  useEffect(() => {
    currLang = languages.currLang();
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      <AppHeader navigation={navigation} isDrawer={true} isSettings />

      <View style={{ flex: 1, paddingHorizontal: 42, marginTop: 9 }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <MaterialCommunityIcons
            name={"account"}
            size={80}
            color={iconColor}
          />
          <Text style={{ fontSize: 36, color: textColor }}>
            {currLang.settingPage.account}
          </Text>
        </View>
        <View style={{ flex: 2 }}>
          <View
            style={{ flex: 1, justifyContent: "flex-end", marginBottom: 18 }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                maxHeight: 60,
              }}
              onPress={() => {
                Alert.alert("Sorry!", "Coming Soon");
              }}
            >
              <View style={{ flex: 1 }}>
                <MaterialCommunityIcons
                  name={"delete"}
                  size={40}
                  color={iconColor}
                />
              </View>
              <View style={{ flex: 5 }}>
                <Text
                  style={{ fontSize: 20, color: textColor, textAlign: "left" }}
                >
                  {currLang.accountPage.delete}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, justifyContent: "flex-start" }}>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                maxHeight: 60,
              }}
            >
              <View style={{ flex: 1 }}>
                <MaterialCommunityIcons
                  name={"lock"}
                  size={40}
                  color={iconColor}
                />
              </View>
              <TouchableOpacity style={{ flex: 5 }} onPress={onChangePass}>
                <Text
                  style={{ fontSize: 20, color: textColor, textAlign: "left" }}
                >
                  {currLang.accountPage.changepassword}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <OriginalColors
              style={{ alignSelf: "center" }}
              title={`Remove keep logging`}
              onPress={onRemoveKeepLogging}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",

    paddingBottom: "72%",
  },
});
