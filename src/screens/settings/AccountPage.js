import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import AppHeader from "../../components/AppHeader";

export default function AccountPage({ navigation }) {
  const onSignOut = () => {
    Alert.alert("Sign Out", "Are you Sure You Want to Sign Out ?", [
      {
        text: "Yes",
        onPress: () => navigation.navigate("LoginPage"),
      },
      {
        text: "Cancel",
        onPress: null,
      },
    ]);
  };

  const onToggleDrawer = () => {
    navigation.toggleDrawer();
  };

  return (
    <View style={styles.container}>
      <AppHeader onSignOut={onSignOut} onToggleDrawer={onToggleDrawer} />

      <View style={{ flex: 1, paddingHorizontal: 42, marginTop: 9 }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <MaterialCommunityIcons
            name={"account"}
            size={80}
            color={"#660032"}
          />
          <Text style={{ fontSize: 36, color: "#660032" }}>Account</Text>
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
                <Text style={{ fontSize: 20, color: "#660032" }}>
                  Delete my account
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
              <View style={{ flex: 5 }}>
                <Text style={{ fontSize: 20, color: "#660032" }}>
                  Change my password
                </Text>
              </View>
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
