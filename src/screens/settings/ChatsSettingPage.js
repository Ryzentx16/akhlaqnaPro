import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Switch } from "react-native";
import { Ionicons } from "react-native-vector-icons";
import AppHeader from "../../components/AppHeader";
import languages from "../../strings/LanguagesController";
import themes from "../../ThemeController";

const currLang = languages.currLang();
let textColor = themes._currTextTheme;
let backColor = themes._currBackColorTheme;

export default function ChatsSettingPage({ navigation }) {
  const [switchValue, setSwitchValue] = useState(false);

  useEffect(() => {
    textColor = themes._currTextTheme;
    backColor = themes._currBackColorTheme;
  });

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
          <Ionicons size={80} name={"chatbubbles"} color={textColor} />
          <Text style={{ fontSize: 36, color: textColor }}>Chats</Text>
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
                color: textColor,
                alignSelf: "center",
                marginBottom: 20,
              }}
            >
              Theme: Dark/Light
            </Text>
            <Switch
              thumbColor={textColor}
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
    backgroundColor: backColor,

    paddingBottom: "72%",
  },
});
