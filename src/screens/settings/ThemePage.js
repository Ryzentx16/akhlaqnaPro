import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "react-native-vector-icons";
import AppHeader from "../../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import ThemeContext from "../../themes/ThemeContext";

export default function ThemePage() {
  const [switchValue, setSwitchValue] = useState(false);
  // const [switchChanged, setSwitchChanged] = useState(false);
  const navigation = useNavigation();
  const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    setSwitchValue(isDarkMode);
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
          <MaterialCommunityIcons
            size={80}
            name={"theme-light-dark"}
            color={"#660032"}
          />
          <Text style={{ fontSize: 36, color: "#660032" }}>Theme</Text>
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
              {"Dark / Light Mode"}
            </Text>
            <Switch
              thumbColor={"#660032"}
              style={{
                alignSelf: "flex-start",
                transform: [{ rotateY: "180deg" }],
              }}
              value={switchValue}
              onValueChange={(value) => {
                // setSwitchChanged(true);
                toggleTheme();
                setSwitchValue(value);
              }}
            />
          </View>
        </View>

        {/* {switchChanged && (
          <View style={{ backgroundColor: "red", alignItems: "flex-end" }}>
            <TouchableOpacity
              style={{
                position: "absolute",
                maxheight: 60,
                borderRadius: 99,
                backgroundColor: "#660032",
                top: 150,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
              // onPress={onApplyChange}
            >
              <Text style={{ fontSize: 22, color: "white" }}>
                {`apply changes ?`}
              </Text>
            </TouchableOpacity>
          </View>
        )} */}
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
