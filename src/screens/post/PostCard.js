import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  I18nManager,
} from "react-native";
import UserAvatar from "@muhzi/react-native-user-avatar";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from "react-native-vector-icons";
import SeeMoreText from "../../components/SeeMoreText";
import Helper from "../../shared/helpers";

import themes from "../../ThemeController";

let textColor = themes._currTextTheme;
let backColor = themes._currBackColorTheme;
let timeColor = themes._currTimeTheme;
const isRTL = I18nManager.isRTL;

function ActionButton(props) {
  let CurrentIcon;

  switch (props.type) {
    case "share":
      CurrentIcon = <FontAwesome5 size={30} name={"share"} color={textColor} />;
      break;
    case "not-liked":
      CurrentIcon = (
        <Ionicons size={30} name={"heart-outline"} color={textColor} />
      );
      break;
    case "liked":
      CurrentIcon = <Ionicons size={30} name={"heart"} color={textColor} />;
      break;
    case "comment":
      CurrentIcon = (
        <Ionicons size={30} name={"chatbubbles-outline"} color={textColor} />
      );
      break;
  }

  return (
    <TouchableOpacity style={actionBtnStyles.container} onPress={props.onPress}>
      {CurrentIcon}
      <Text style={actionBtnStyles.actionText}>{props.details}</Text>
    </TouchableOpacity>
  );
}

export default function PostCard(props) {
  let { post, navigation, onPressComment, isLostOrFound } = props;
  const [numOfLikes, setNumOfLikes] = useState(post.numberOfLikes); //To show ur remaining Text
  const [isLiked, setIsLiked] = useState(false);
  const onMakeLike = () => {
    if (isLiked) {
      setNumOfLikes(numOfLikes - 1);
    } else {
      setNumOfLikes(numOfLikes + 1);
    }

    setIsLiked(!isLiked);
  };

  var postDuration = Helper.getPostDuration(post.createdAt);
  var imageHeight;

  if (post.hasOwnProperty("image") == true) {
    imageHeight = Image.resolveAssetSource(post.image).height;
  }


  useEffect(() => {
    textColor = themes._currTextTheme;
    backColor = themes._currBackColorTheme;
  });

  return (
    <View style={styles.container}>
      <View style={headerStyles.container}>
        <TouchableOpacity
          style={headerStyles.avatarContainer}
          onPress={() =>
            navigation.navigate("PersonProfile", { user: post.user })
          }
        >
          <UserAvatar size={35} src={post.user.profileImage} fontSize={15} />
        </TouchableOpacity>
        <View style={headerStyles.headerDetailsContainer}>
          <Text style={headerStyles.userName}>{post.user.name}</Text>

          <Text style={headerStyles.postTime}>
            {postDuration + " (Al Rayaan)"}
          </Text>
        </View>
        <View style={headerStyles.headerIconContainer}>
          {props.hasOwnProperty("isFound") ? (
            <Ionicons name="checkmark-circle" size={25} color={textColor} />
          ) : null}
          {props.hasOwnProperty("isLost") ? (
            <AntDesign name="questioncircle" size={25} color={textColor} />
          ) : null}
        </View>
        {/* <TouchableOpacity style={headerStyles.headerDotsContainer}>
          <MaterialCommunityIcons
            name={"dots-vertical"}
            color={textColor}
            size={25}
          />
        </TouchableOpacity> */}
      </View>

      <View style={styles.detailsContainer}>
        <SeeMoreText
          textStyle={styles.detailsText}
          text={post.content}
          numberOfLines={4}
        />
      </View>

      {post.hasOwnProperty("image") == true && (
        <View
          style={[
            styles.imageContainer,
            { height: imageHeight >= 450 ? 450 : imageHeight },
          ]}
        >
          <Image style={styles.postImage} source={post.image} />
        </View>
      )}

      <View style={styles.actionContainer}>
        <ActionButton
          type={isLiked ? "liked" : "not-liked"}
          details={numOfLikes}
          onPress={onMakeLike}
        />
        <ActionButton
          type={"comment"}
          details={post.numberOfComments}
          onPress={() => {
            onPressComment(post);
            console.log("Action Pressed");
          }}
        />
        <ActionButton type={"share"} details={post.numberOfShares} />
      </View>
    </View>
  );
}

const headerStyles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 40,
    maxHeight: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginBottom: 10,
  },

  avatarContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 40,
  },

  headerDetailsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start", //for RTL
    paddingLeft: 5,
  },

  headerDotsContainer: {
    flex: 1,
    maxWidth: 20,
  },

  headerIconContainer: {
    flex: 1,
    maxWidth: 25,
    // backgroundColor: 'red',
    marginEnd: 10,
  },

  userName: {
    fontSize: 12,
    fontWeight: "bold",
    color: textColor,
  },
  postTime: {
    fontSize: 9,
    color: timeColor,
  },
});

const actionBtnStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  actionText: {
    fontSize: 12,
    color: textColor,
    marginLeft: 10,
  },
});

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    backgroundColor: backColor,
    marginBottom: 17,
    paddingVertical: 10,
  },

  detailsContainer: {
    flexShrink: 1,
    marginBottom: 10,
    marginHorizontal: 10,
    paddingLeft: 10,
  },

  imageContainer: {
    flexShrink: 1,
    flexGrow: 1,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 15,
    overflow: "hidden",
  },

  actionContainer: {
    flex: 1,
    minHeight: 40,
    maxHeight: 40,
    flexDirection: "row",
  },

  postImage: {
    height: 240,
    flex: 1,
    width: null,
    resizeMethod: "auto",
    resizeMode: "stretch",
  },

  detailsText: {
    fontSize: 13,
    color: textColor,
    lineHeight: 18,
  },
});
