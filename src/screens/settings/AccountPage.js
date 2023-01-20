import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import AppHeader from "../../components/AppHeader";
import users from "../../data/users";
import languages from "../../strings/LanguagesController";

const currLang = languages.currLang();

export default function AccountPage({ navigation }) {
  const onChangePass = () => {
    console.warn(users[0].phoneNumber);
    Alert.alert(
      "Warning",
      "In order to Change The password you need to sign out",
      [
        {
          text: "Yes, Sign Out",
          onPress: () =>
            navigation.navigate("AppStartupNavigator", {
              screen: "ChangePasswordPage",
              params: {phoneNumber: users[0].phoneNumber},
            }),
        },
        {
          text: "Cancel",
          onPress: null,
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} isDrawer={true} isSettings />

      <View style={{ flex: 1, paddingHorizontal: 42, marginTop: 9 }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <MaterialCommunityIcons
            name={"account"}
            size={80}
            color={"#660032"}
          />
          <Text style={{ fontSize: 36, color: "#660032" }}>{currLang.settingPage.account}</Text>
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
                  color={"#660032"}
                />
              </View>
              <View style={{ flex: 5 }}>
                <Text style={{ fontSize: 20, color: "#660032", textAlign: 'left' }}>
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
                  color={"#660032"}
                />
              </View>
              <TouchableOpacity style={{ flex: 5 }} onPress={onChangePass}>
                <Text style={{ fontSize: 20, color: "#660032", textAlign: 'left'}}>
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
    backgroundColor: "#fff",

    paddingBottom: "72%",
  },
});
