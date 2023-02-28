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
import ReplyCard from "./ReplyCard";
import ImageViewer from "../../components/ImageViewer";
import themes from "../../ThemeController";
import domain from "../../../API/domain";

let textColor = themes._currTextTheme;
let backColor = themes._currBackColorTheme;
let themeColor = themes._currTheme;

export default function CommentCard(props) {
  const { comment, onReply } = props;
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  var commentDuration = Helper.getDuration(comment.createdDateTime);

  const [imageWidth, setImageWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(null);

  const haveReplies = comment.hasOwnProperty("replies");
  const onSendReply = () => {
    setIsReplying(false);
    setReplyContent("");
  };

  useEffect(() => {
    textColor = themes._currTextTheme;
    backColor = themes._currBackColorTheme;
    themeColor = themes._currTheme;
  });

  useEffect(() => {
    if (comment.image !== null) {
      Image.getSize(
        `${domain}/download/` + comment.image,
        (imgWidth, imgHeight) => {
          setImageWidth(imgWidth);
          setImageHeight(imgHeight);
        }
      );
    }
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <UserAvatar size={35} src={`${domain}/download/` + comment.user.profileImage} fontSize={15} />
        </View>
        <View style={detailsStyles.container}>
          <View style={detailsStyles.headerContainer}>
            <Text
              style={detailsStyles.userName}
            >{`${comment.user.firstName} ${comment.user.lastName}`}</Text>
            <Text style={detailsStyles.postTime}>{commentDuration}</Text>
          </View>
          <View style={detailsStyles.commentDetailsContainer}>
            <SeeMoreText
              textStyle={detailsStyles.detailsText}
              text={comment.content}
              numberOfLines={6}
            />
          </View>
          {comment.image !== null && (
            <View style={detailsStyles.imageContainer}>
              <ImageViewer
                uri={
                  `${domain}/download/` +
                  comment.image
                }
                isFullScreen={true}
                maxHeight={imageHeight >= 250 ? 250 : imageHeight}
                imageHeight={imageHeight}
                imageWidth={imageWidth}
              />
            </View>
          )}
          <View style={detailsStyles.actionContainer}>
            {!isReplying && (
              <TouchableOpacity
                style={detailsStyles.replybutton}
                onPress={() => onReply(comment.user)}
              >
                <MaterialCommunityIcons
                  name={"reply"}
                  color={themeColor === "light" ? "#65676b" : "#FFFFFF"}
                  size={20}
                />
                <Text style={detailsStyles.replybuttonText}>Reply</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      {haveReplies && (
        <FlatList
          style={{ marginTop: -10 }}
          data={comment.replies}
          keyExtractor={(item, index) => index}
          renderItem={(item) => {
            return <ReplyCard reply={item.item} />;
          }}
          scrollEnabled={false}
        />
      )}
    </>
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
    backgroundColor: themeColor === "light" ? "#ffffff" : "#CCCCCC",

    overflow: "hidden",
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
    color: textColor,
    marginRight: 5,
  },

  postTime: {
    fontSize: 9,
    color: themeColor === "light" ? "#65676b" : "#FFFFFF",
  },

  detailsText: {
    fontSize: 13,
    color: textColor,
    lineHeight: 18,
  },
  imageContainer: {
    flexShrink: 1,
    flexGrow: 1,
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 17,
    paddingLeft: 10,
    // backgroundColor:'red',
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
