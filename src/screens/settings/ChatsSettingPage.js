import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Switch } from "react-native";
import { Ionicons } from "react-native-vector-icons";
import AppHeader from "../../components/AppHeader";
import languages from "../../strings/LanguagesController";

const currLang = languages.currLang();

export default function ChatsSettingPage({ navigation }) {
  const [switchValue, setSwitchValue] = useState(false);

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} isDrawer={true} isSettings />

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
          <Ionicons size={80} name={"chatbubbles"} color={"#660032"} />
          <Text style={{ fontSize: 36, color: "#660032" }}>Chats</Text>
        </View>
        <View
          style={{
            flex: 1,
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
              Theme: Dark/Light
            </Text>
            <Switch
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
