import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import UserAvatar from "@muhzi/react-native-user-avatar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SeeMoreText from "../../components/SeeMoreText";
import Helper from "../../shared/helpers";

export default function ReplyCard(props) {
  const { reply } = props;
  var postDuration = Helper.getDuration(reply.createdAt);

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <UserAvatar size={35} src={reply.user.profileImage} fontSize={15} />
      </View>
      <View style={detailsStyles.container}>
        <View style={detailsStyles.headerContainer}>
          <Text style={detailsStyles.userName}>{reply.user.name}</Text>
          <Text style={detailsStyles.postTime}>{postDuration}</Text>
        </View>
        <View style={detailsStyles.commentDetailsContainer}>
          <SeeMoreText
            textStyle={detailsStyles.detailsText}
            text={reply.content}
            numberOfLines={6}
          />
        </View>
      </View>
    </View>
  );
}

const detailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 7,
    paddingHorizontal: 12,
    marginLeft: 5,
    marginRight: 20,
    borderRadius: 18,
    backgroundColor: "#ffffff",
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2,
  },

  commentDetailsContainer: {
    flexShrink: 1,
    marginBottom: 10,
  },

  actionContainer: {
    flex: 1,
    flexDirection: "row",
  },

  userName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#660032",
    marginRight: 5,
  },

  postTime: {
    fontSize: 9,
    color: "#65676b",
  },

  detailsText: {
    fontSize: 13,
    color: "#65676b",
    lineHeight: 18,
  },

  replybutton: {
    flexDirection: "row",
  },
  replybuttonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#65676b",
    marginLeft: 5,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 17,
    paddingLeft: 10,
    // backgroundColor:'red',
    marginLeft: 60,
  },

  avatarContainer: {
    flex: 1,
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 40,
  },

  headContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
