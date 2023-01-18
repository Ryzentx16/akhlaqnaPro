import React, { useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "react-native-vector-icons";
import AppHeader from "../../components/AppHeader";

export default function AccountPage({ navigation }) {
  const [switchValue, setSwitchValue] = useState(false);

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

      <View
        style={{
          flex: 1,
          paddingHorizontal: 42,
          marginTop: 9,
          marginBottom: 30,
          maxHeight: "50%",
        }}
      >
        <View style={{ flex: 1, alignItems: "center" }}>
          <Ionicons size={80} name={"language"} color={"#660032"} />
          <Text style={{ fontSize: 36, color: "#660032" }}>Language</Text>
        </View>
        <View
          style={{
            flex: 1,
            // marginTop: 30,
            // backgroundColor: "red",
            maxHeight: 80,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 22,
                color: "#660032",
                alignSelf: "center",
                marginBottom: 20,
              }}
            >
              English/العربية
            </Text>
            <Switch
              //   trackColor={""}
              thumbColor={"#660032"}
              style={{
                alignSelf: "flex-start",
                transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
              }}
              value={switchValue}
              onValueChange={(value) => setSwitchValue(value)}
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
    backgroundColor: "#fff",

    paddingBottom: "72%",
  },
});
