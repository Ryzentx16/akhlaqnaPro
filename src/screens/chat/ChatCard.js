import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import UserAvatar from "@muhzi/react-native-user-avatar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function ChatCard(props) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View style={styles.avatarContainer}>
        <UserAvatar size={60} src={props.data.user.profileImage} />
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{props.data.user.name}</Text>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name={"dots-vertical"}
              color={"#660032"}
              size={20}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.details}>{props.data.preText}</Text>

          <Text style={styles.seen}>{props.data.lastSeen + " ago"}</Text>
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

    paddingTop: 10,
    paddingRight: 5,
  },

  lastContainer: {
    flex: 1,
    maxWidth: 20,
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
  seen: {
    fontSize: 9,
    color: "#660032",
  },
});
