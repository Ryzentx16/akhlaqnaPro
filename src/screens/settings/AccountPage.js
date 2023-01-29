import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import AppHeader from "../../components/AppHeader";
import users from "../../data/users";
import languages from "../../strings/LanguagesController";
import themes from "../../ThemeController";

import { useNavigation } from "@react-navigation/native";

let currLang = languages.currLang();
let textColor = themes._currTextTheme;
let backColor = themes._currBackColorTheme;

export default function AccountPage() {
  const navigation = useNavigation();

  const onChangePass = () => {
    console.warn(users[0].phoneNumber);

    Alert.alert(
      "Warning",
      "In order to Change The password you need to sign out",
      [
        {
          text: "Yes, Sign Out",
          onPress: () =>
            navigation.dispatch(
              // navigation.replace("AppStartupNavigator", {
              //   screen: "SignUpConfirmation",
              //   params: {
              //     isChangePass: true,
              //     phoneNumber: users[0].phoneNumber,
              //   },
              // })
              navigation.reset({
                index: 1,
                routes: [
                  {
                    name: "SignUpConfirmation",
                    params: {
                      isChangePass: true,
                      phoneNumber: users[0].phoneNumber,
                    },
                  },
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
  };

  useEffect(() => {
    currLang = languages.currLang();
    textColor = themes._currTextTheme;
    backColor = themes._currBackColorTheme;
  });

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} isDrawer={true} isSettings />

      <View style={{ flex: 1, paddingHorizontal: 42, marginTop: 9 }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <MaterialCommunityIcons
            name={"account"}
            size={80}
            color={textColor}
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
            >
              <View style={{ flex: 1 }}>
                <MaterialCommunityIcons
                  name={"delete"}
                  size={40}
                  color={textColor}
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
                  color={textColor}
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
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backColor,

    paddingBottom: "72%",
  },
});
