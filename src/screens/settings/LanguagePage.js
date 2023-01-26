import React, { useState, useEffect } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View, Alert } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "react-native-vector-icons";
import AppHeader from "../../components/AppHeader";
import languages from "../../strings/LanguagesController";
import themes from "../../ThemeController";

let textColor = themes._currTextTheme;
let backColor = themes._currBackColorTheme;

export default function AccountPage({ navigation }) {
  const [switchValue, setSwitchValue] = useState(false);
  const [switchChanged, setSwitchChanged] = useState(false);

  const onApplyChange = () => {
    Alert.alert(
      currLang.languagepage.applychangealert.title,
      currLang.languagepage.applychangealert.content,
      [
        {
          text: currLang.languagepage.applychangealert.buttons.yessingout,
          onPress: () => {
            if (!switchValue) {
              languages.currLang("Ar");
              console.warn("Changed to Ar");
            } else {
              languages.currLang("En");
              console.warn("Changed to En");
            }
            navigation.replace('AppStartupNavigator');
          },
        },
        {
          text: currLang.languagepage.applychangealert.buttons.cancel,
          onPress: null,
        },
      ]
    );
  };

  let currLang = languages.currLang();
  useEffect(() => {
    currLang = languages.currLang();
    console.warn(languages.langType());
    textColor = themes._currTextTheme;
    backColor = themes._currBackColorTheme;
  });

  useEffect(() => {
    if (languages.langType() === 'En') {
      setSwitchValue(true);
    }
  }, []);

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
          <Ionicons size={80} name={"language"} color={textColor} />
          <Text style={{ fontSize: 36, color: textColor }}>Language</Text>
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
              {"العربية " + '/' + " English"}
            </Text>
            <Switch
              thumbColor={textColor}
              style={{
                alignSelf: "flex-start",
                transform: [ { rotateY: "180deg" }],
              }}
              
              value={switchValue}
              onValueChange={(value) => {
                setSwitchChanged(true);
                setSwitchValue(value);
              }}
            />
          </View>
        </View>

        {switchChanged && (
          <View style={{ backgroundColor: "red", alignItems: "flex-end" }}>
            <TouchableOpacity
              style={{
                position: "absolute",
                maxheight: 60,
                borderRadius: 99,
                backgroundColor: textColor,
                top: 150,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
              onPress={onApplyChange}
            >
              <Text style={{ fontSize: 22, color: "white" }}>
                {currLang.languagepage.applychange}
              </Text>
            </TouchableOpacity>
          </View>
        )}
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
