import React, { useEffect, useState } from "react";
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
import themes from "../../ThemeController";
import domain from "../../../API/domain";

let textColor = themes._currTextTheme;
let backColor = themes._currBackColorTheme;
let themeColor = themes._currTheme;

export default function CommentCard(props) {
  const { message, myId, roomId } = props;
  var messageDuration = Helper.getDuration(message.createdAt);

  const [imageWidth, setImageWidth] = useState(200);
  const [imageHeight, setImageHeight] = useState(250);

  let isItMyMessage = message.user.id == myId;
  let tempImage = require("../../../assets/akhlaqna.png");
  let tempImageUri = null;

  useEffect(() => {
    textColor = themes._currTextTheme;
    backColor = themes._currBackColorTheme;
    themeColor = themes._currTheme;
    isItMyMessage = message.user.id == myId;
    console.log(message.image !== null);
  });

  useEffect(() => {
    // if (tempImage !== null) {
    //   Image.getSize(
    //     tempImage,
    //     (imgWidth, imgHeight) => {
    //       setImageWidth(imgWidth);
    //       setImageHeight(imgHeight);
    //     }
    //   );
    // }
    let {uri, width, height } = Image.resolveAssetSource(tempImage);
    setImageHeight(height);
    setImageWidth(width);
    tempImageUri = uri;
    console.log({uri, width, height })
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: isItMyMessage ? "flex-end" : "flex-start",
        },
      ]}
    >
      {/* <View style={styles.avatarContainer}>
        <UserAvatar size={35} src={message.user.profileImage} fontSize={15} />
      </View> */}

      <View
        style={[
          detailsStyles.container,
          {
            backgroundColor: isItMyMessage ? "#660032" : "#ffffff",
          },
        ]}
      >
        <View style={detailsStyles.headerContainer}>
          {!isItMyMessage && (
            <Text
              style={detailsStyles.userName}
            >{`${message.user.firstName} ${message.user.lastName}`}</Text>
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
              { color: isItMyMessage ? "white" : "black" },
            ]}
          >
            asdasdasdasdaasdasdasdasdasdsd
          </Text>
        </View>

        {/* {message.image !== null && ( */}
        <View style={detailsStyles.imageContainer}>
          <ImageViewer
            // uri={`${domain}/download/` + message.image}
            uri={tempImageUri}
            isFullScreen={true}
            maxHeight={imageHeight >= 250 ? 250 : imageHeight}
            imageHeight={imageHeight}
            imageWidth={imageWidth}
          />
        </View>
        {/* )} */}

        <View style={detailsStyles.postTimeContainer}>
          <Text style={detailsStyles.postTime}>{messageDuration}</Text>
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
    // backgroundColor: themeColor === "light" ? "#ffffff" : "#CCCCCC",

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
    color: textColor,
    marginRight: 5,
  },

  postTimeContainer: {
    // flex: 1,
    alignItems: "flex-end",
    // backgroundColor: "green"
  },
  postTime: {
    fontSize: 9,
    color: themeColor === "light" ? "#65676b" : "#FFFFFF",
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
    color: themeColor === "light" ? "#65676b" : "#FFFFFF",
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
