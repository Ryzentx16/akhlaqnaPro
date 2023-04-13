import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import UserAvatar from "@muhzi/react-native-user-avatar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SeeMoreText from "../../components/SeeMoreText";
import Helper from "../../shared/helpers";
import ImageViewer from "../../components/ImageViewer";
import domain from "../../../API/domain";
import ThemeContext from "./../../themes/ThemeContext";

export default function CommentCard(props) {
  const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext);

  const { message, myId, roomId } = props;
  const [imageWidth, setImageWidth] = useState(200);
  const [imageHeight, setImageHeight] = useState(250);

  let isItMyMessage = message.senderUser.id == myId;

  useEffect(() => {
    isItMyMessage = message.senderUser.id == myId;
  });

  useEffect(() => {
    if (message.image !== null) {
      Image.getSize(
        `${domain}/download/` + message.image,
        (imgWidth, imgHeight) => {
          setImageWidth(imgWidth);
          setImageHeight(imgHeight);
        }
      );
    }
  }, []);

  var messageDuration = Helper.getDuration(message.createdDateTime);

  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: isItMyMessage ? "flex-start" : "flex-start",
          flexDirection: isItMyMessage ? "row-reverse" : "row",
        },
      ]}
    >
      <View style={styles.avatarContainer}>
        <UserAvatar
          size={35}
          src={`${domain}/download/` + message.senderUser.profileImage}
        />
      </View>

      <View
        style={[
          detailsStyles.container,
          {
            backgroundColor: isItMyMessage ? theme.secondary : theme.primary,
          },
        ]}
      >
        <View style={detailsStyles.headerContainer}>
          {!isItMyMessage && (
            <Text
              style={[detailsStyles.userName, { color: theme.largeText }]}
            >{`${message.senderUser.firstName} ${message.senderUser.lastName}`}</Text>
          )}
        </View>

        <View style={detailsStyles.commentDetailsContainer}>
          {/* <SeeMoreText
            textStyle={detailsStyles.detailsText}
            text={"asdasdasdasdaasdasdasdasdasdsd"}
            numberOfLines={6}
          /> */}
          <Text
            style={[
              detailsStyles.detailsText,
              { color: isItMyMessage ? "white" : theme.mediumText },
            ]}
          >
            {message.content}
          </Text>
        </View>

        {message.image !== null && (
          <View style={detailsStyles.imageContainer}>
            <ImageViewer
              uri={`${domain}/download/` + message.image}
              isFullScreen={true}
              maxHeight={imageHeight >= 250 ? 250 : imageHeight}
              imageHeight={imageHeight}
              imageWidth={imageWidth}
            />
          </View>
        )}

        <View style={detailsStyles.postTimeContainer}>
          <Text
            style={[
              detailsStyles.postTime,
              { color: isItMyMessage ? "#E0E0E0" : theme.smallText },
            ]}
          >
            {messageDuration}
          </Text>
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
    marginRight: 5,
    borderRadius: 18,
    // backgroundColor: "#ffffff",

    overflow: "hidden",

    maxWidth: "70%",
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2,
  },

  commentDetailsContainer: {
    flexShrink: 1,
    marginBottom: 5,
    // backgroundColor: "red",
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

  postTimeContainer: {
    // flex: 1,
    alignItems: "flex-end",
    // backgroundColor: "green"
  },
  postTime: {
    fontSize: 9,
    color: "#65676b",
  },

  detailsText: {
    fontSize: 13,
    lineHeight: 18,
  },
  imageContainer: {
    // flexShrink: 1,
    // flexGrow: 1,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 15,
    overflow: "hidden",
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

  replyContainer: {
    flex: 1,
    flexDirection: "row",
    // width: "100%",
    backgroundColor: "green",
    // borderBottomLeftRadius: 18,
    // borderBottomRightRadius: 18,
    marginHorizontal: -12,
    marginBottom: -7,
  },

  replyInput: {
    flex: 7,
    // backgroundColor: 'blue',
    justifyContent: "center",
    paddingLeft: 9,
    paddingRight: 7,
  },

  sendContainer: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingRight: 8,
    paddingLeft: 4,
  },
});

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 17,
    paddingLeft: 10,
    // maxWidth: "70%",
    // backgroundColor: "red",
    // marginLeft: is Reply ? ,
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
