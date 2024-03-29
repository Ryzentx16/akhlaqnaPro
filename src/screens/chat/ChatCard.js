import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import UserAvatar from "@muhzi/react-native-user-avatar";
import domain from "../../../API/domain";
import OurUser from "../../OurUser";
import Helper from "../../shared/helpers";
import { Entypo } from "react-native-vector-icons";
import ThemeContext from "../../themes/ThemeContext";

export default function ChatCard(props) {
  const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext);

  const { onChatEdit } = props;
  const [isEdit, setIsEdit] = useState(false);

  const getLastMessage = () => {
    var message = "";

    if (props.data.lastMessage) {
      // TODO: change to ar
      if (props.data.lastMessage.senderUser.id == OurUser.user.id) {
        message = "You: ";
      }
      message = message + props.data.lastMessage.content;
    } else {
      message = "Start chat with " + props.data.user.firstName + " now";
    }

    return message;
  };

  const getDuration = () => {
    var duration = "";
    if (props.data.lastMessage) {
      duration = Helper.getDuration(props.data.createdDateTime);
    }

    return duration;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        props.onPress(props.data);
      }}
    >
      <View style={styles.avatarContainer}>
        <UserAvatar
          size={60}
          src={`${domain}/download/` + props.data.user.profileImage}
        />
      </View>
      <View style={[styles.bodyContainer, { borderColor: theme.border }]}>
        <View style={styles.headerContainer}>
          <Text style={[styles.header, { color: theme.secondary }]}>
            {props.data.user.firstName + " " + props.data.user.lastName}
          </Text>
          <TouchableOpacity
            style={{ justifyContent: "center", alignContent: "flex-end" }}
            onPress={() => onChatEdit(true)}
          >
            <Entypo
              size={20}
              name={"dots-three-vertical"}
              color={theme.secondary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={[styles.details, { color: theme.mediumText }]}>
            {getLastMessage()}
          </Text>
          {props.data.lastMessage && (
            <Text style={[styles.seen, { color: theme.smallText }]}>
              {getDuration() + " ago"}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 70,
    minHeight: 70,
    paddingHorizontal: 15,
    flexDirection: "row",
    marginTop: 10,
  },
  avatarContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 60,
    minWidth: 60,
  },
  bodyContainer: {
    flex: 1,
    justifyContent: "space-around",
    marginLeft: 7,
    borderBottomWidth: 0.25,
    borderColor: "#420021",
  },

  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },

  detailsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 5,
    paddingBottom: 10,
  },

  lastContainer: {
    flex: 1,
    maxWidth: 20,
  },
  header: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#660032",
  },
  details: {
    fontSize: 12,
    color: "#420021",
  },
  seen: {
    fontSize: 10,
    color: "#660032",
  },
});
