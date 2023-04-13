import UserAvatar from "@muhzi/react-native-user-avatar";
import React, { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ThemeContext from "./../../themes/ThemeContext";

let size = 60;

function NotificationIcon(props) {
  let CurrentIcon;
  var s = size / 4 - 4;

  switch (props.type) {
    case "share":
      CurrentIcon = <FontAwesome5 size={s} name={"share"} color={"white"} />;
      break;
    case "like":
      CurrentIcon = <Ionicons size={s} name={"heart"} color={"white"} />;
      break;
    case "comment":
      CurrentIcon = <Ionicons size={s} name={"chatbubbles"} color={"white"} />;
      break;
  }

  return <View style={styles.notificationIcon}>{CurrentIcon}</View>;
}

export default function NotificationCard(props) {
  const { notification, type, navigation } = props;
  const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext);

  // console.log(navigation?.navigate());
  const onAvatar = () => {
    console.warn("Navigate To User's Profile");
  };

  const onNotification = () => {
    console.warn("Navigate To Notification Post Page");
  };

  return (
    <TouchableOpacity style={styles.container}>
      <TouchableOpacity style={styles.avatarContainer} onPress={onAvatar}>
        <UserAvatar
          active={true}
          size={size}
          src={notification.user.profileImage}
        />
        <NotificationIcon type={type} />
      </TouchableOpacity>

      <View style={[styles.bodyContainer, { borderBottomColor: theme.border }]}>
        <View style={styles.headerContainer}>
          <Text style={[styles.header, { color: theme.largeText }]}>
            {"unknowen"}
          </Text>
          {/* <TouchableOpacity>
            <MaterialCommunityIcons
              name={"close"}
              color={"#660032"}
              size={20}
            />
          </TouchableOpacity> */}
        </View>

        <View style={styles.detailsContainer}>
          <Text
            style={[styles.details, { color: theme.smallText }]}
          >{`Coming Soon`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 60,
    marginBottom: 17,
    paddingLeft: 5,
    flexDirection: "row",
  },

  avatarContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    maxWidth: 60,
  },

  bodyContainer: {
    flex: 4,
    justifyContent: "space-around",
    paddingLeft: 5,

    paddingBottom: 5,
    borderBottomColor: "#660032",
    borderBottomWidth: 0.5,
    marginLeft: 5,
  },

  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  detailsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",

    paddingTop: 3,
    paddingRight: 5,
    paddingLeft: 20,
  },

  header: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#660032",
  },

  details: {
    fontSize: 9,
    color: "#660032",
  },

  notificationIcon: {
    backgroundColor: "#660032",
    position: "absolute",
    alignSelf: "flex-end",
    borderColor: "#660032",
    borderWidth: 2,
    justifyContent: "center",
    alignContent: "center",

    width: size / 4,
    height: size / 4,
    borderRadius: size / 4,
    bottom: size / 32,
    right: size / 32,
  },
});
