import React, { useContext } from "react";
import {
  TouchableWithoutFeedback,
  View,
  Switch,
  Keyboard,
  Text,
} from "react-native";
import styles from "./styles";
import UserAvatar from "@muhzi/react-native-user-avatar";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import OurUser from "../../OurUser";
import domain from "./../../../API/domain";
import ThemeContext from "../../themes/ThemeContext";

export default function AddPostHeader({
  isLocation,
  onToggleIsLocation,
  isLost,
  onToggleIsLost,
}) {
  const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      accessible={false}
      touchSoundDisabled={true}
    >
      <View style={[styles.headContainer]}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.avatarContainer}>
            <UserAvatar
              size={50}
              src={`${domain}/download/` + OurUser.user.profileImage}
              fontSize={20}
              userName={OurUser.user.firstName + " " + OurUser.user.lastName}
            />
          </View>
          <View style={styles.headerDetailsContainer}>
            <Text style={[styles.userName, { color: theme.largeText }]}>
              {OurUser.user.firstName + " " + OurUser.user.lastName}
            </Text>
          </View>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 0,
            flexDirection: "row",
          }}
        >
          <Switch
            value={isLocation}
            onValueChange={onToggleIsLocation}
            thumbColor={theme.secondary}
            trackColor={{ false: "#767577", true: "#660032" }}
            style={{ marginRight: 10 }}
          />
          {isLocation ? (
            <MaterialIcons
              name="location-on"
              size={35}
              color={theme.secondary}
            />
          ) : (
            <MaterialIcons
              name="location-off"
              size={35}
              color={theme.secondary}
            />
          )}
        </View>

        <View
          style={{
            width: 100,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 0,
            flexDirection: "row",
          }}
        >
          <Switch
            value={isLost}
            onValueChange={onToggleIsLost}
            thumbColor={theme.secondary}
            trackColor={{ false: "#767577", true: "#660032" }}
            style={{ marginRight: 10 }}
          />

          {isLost ? (
            <AntDesign
              name="questioncircle"
              size={30}
              color={theme.secondary}
            />
          ) : (
            <Ionicons
              name="checkmark-circle"
              size={36}
              color={theme.secondary}
            />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
