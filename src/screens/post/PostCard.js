import React, { useState, useEffect, useContext } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  I18nManager,
  Alert,
} from "react-native";
import UserAvatar from "@muhzi/react-native-user-avatar";
import {
  Ionicons,
  AntDesign,
  Entypo,
  FontAwesome5,
} from "react-native-vector-icons";
import SeeMoreText from "../../components/SeeMoreText";
import Helper from "../../shared/helpers";

import { GraphQL } from "../../../API";
import ImageViewer from "../../components/ImageViewer";
import OurUser from "../../OurUser";
import domain from "../../../API/domain";
import MapViewer from "../../components/MapViewer";
import ThemeContext from "./../../themes/ThemeContext";

const isRTL = I18nManager.isRTL;

function ActionButton(props) {
  const { color } = props;
  let CurrentIcon;

  switch (props.type) {
    case "share":
      CurrentIcon = <FontAwesome5 size={30} name={"share"} color={color} />;
      break;
    case "not-liked":
      CurrentIcon = <Ionicons size={30} name={"heart-outline"} color={color} />;
      break;
    case "liked":
      CurrentIcon = <Ionicons size={30} name={"heart"} color={color} />;
      break;
    case "comment":
      CurrentIcon = (
        <Ionicons size={30} name={"chatbubbles-outline"} color={color} />
      );
      break;
  }

  return (
    <TouchableOpacity style={actionBtnStyles.container} onPress={props.onPress}>
      {CurrentIcon}
      <Text style={[actionBtnStyles.actionText, { color: color }]}>
        {props.details}
      </Text>
    </TouchableOpacity>
  );
}

function postType(type, color) {
  let result = null;

  switch (type) {
    case 2: // isLost
      result = <AntDesign name="questioncircle" size={25} color={color} />;
      break;
    case 3: // isFound
      result = <Ionicons name="checkmark-circle" size={25} color={color} />;
      break;
    default:
      result = null;
      break;
  }

  return result;
}

export default function PostCard(props) {
  let { post, navigation, onPressComment, isTypeEnable, isProfile } = props;

  const [numOfLikes, setNumOfLikes] = useState(post.numOfLikes); //To show ur remaining Text
  const [isLiked, setIsLiked] = useState(post.isLikedByMe);
  const [imageWidth, setImageWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(450);
  const [mapViewStatus, setMapViewStatus] = useState(false);
  const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext);

  const onMakeLike = () => {
    if (isLiked) {
      setNumOfLikes(numOfLikes - 1);
    } else {
      setNumOfLikes(numOfLikes + 1);
    }

    var params = {
      id: post.id,
      isLike: !isLiked,
      userId: OurUser.user.id,
    };
    GraphQL.PostApiLogic.Queries.Like(params).then((res) => {
      if (!res.success) {
        //to ar
        Alert.alert("Error", res.errors.join("\n"));
      }
    });

    setIsLiked(!isLiked);
  };

  var postDuration = Helper.getDuration(post.createdDateTime);

  useEffect(() => {
    // console.log(post.image !== null);
    if (post.image !== null) {
      Image.getSize(
        `${domain}/download/` + post.image,
        (imgWidth, imgHeight) => {
          setImageWidth(imgWidth);
          setImageHeight(imgHeight);
        }
      );
    }
  }, []);
  // console.log(route);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.primary,
        },
      ]}
    >
      <View style={headerStyles.container}>
        <TouchableOpacity
          style={headerStyles.avatarContainer}
          onPress={() => {
            if (!isProfile) {
              navigation.navigate("PersonProfile", {
                user: post.user,
                isMe: post.user.id == OurUser.user.id,
              });
            }
          }}
        >
          <UserAvatar
            size={35}
            src={`${domain}/download/` + post.user.profileImage}
            fontSize={15}
          />
        </TouchableOpacity>
        <View style={headerStyles.headerDetailsContainer}>
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <Text
              style={[
                headerStyles.userName,
                {
                  color: theme.largeText,
                },
              ]}
            >
              {post.user.firstName + " " + post.user.lastName}
            </Text>

            <Text
              style={[
                headerStyles.postTime,
                {
                  color: theme.smallText,
                },
              ]}
            >
              {postDuration + ` (${post.area || "Area Disabled"})`}
            </Text>
          </View>

          {post.location && (
            <TouchableOpacity
              style={headerStyles.location}
              onPress={() => setMapViewStatus(true)}
            >
              <Entypo name={"location"} size={25} color={theme.secondary} />
            </TouchableOpacity>
          )}
        </View>
        <View style={headerStyles.headerIconContainer}>
          {isTypeEnable && postType(post.postTypes, theme.secondary)}
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <SeeMoreText
          textStyle={[styles.detailsText, { color: theme.secondary }]}
          text={post.content}
          numberOfLines={4}
        />
      </View>

      {post.image !== null && (
        <View style={styles.imageContainer}>
          <ImageViewer
            uri={`${domain}/download/` + post.image}
            isFullScreen={true}
            maxHeight={imageHeight >= 450 ? 450 : imageHeight}
            imageHeight={imageHeight}
            imageWidth={imageWidth}
          />
        </View>
      )}

      <View style={styles.actionContainer}>
        <ActionButton
          type={isLiked ? "liked" : "not-liked"}
          details={numOfLikes}
          onPress={onMakeLike}
          color={theme.secondary}
        />
        <ActionButton
          type={"comment"}
          details={post.numOfComments}
          onPress={() => {
            onPressComment(post);
            console.log("Action Pressed");
          }}
          color={theme.secondary}
        />
        {/* <ActionButton type={"share"} details={post.numOfShares} /> */}
      </View>

      <MapViewer
        status={mapViewStatus}
        initRegion={
          JSON.parse(post.location) || {
            latitude: 25.300946829658887,
            longitude: 51.465748474001884,
            latitudeDelta: 0.6631861591450701,
            longitudeDelta: 0.3281260281801224,
          }
        }
        onCancel={() => setMapViewStatus(false)}
        fixedView={true}
      />
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
    // backgroundColor: 'red',
    flexDirection: "row",
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
    color: "#660032",
  },
  postTime: {
    fontSize: 9,
    color: "#65676b",
  },

  location: {
    // flex: 1,
    // flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    // backgroundColor: "red",
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
    color: "#660032",
    marginLeft: 10,
  },
});

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,

    // theme controller
    marginBottom: 10,
    paddingVertical: 10,
  },

  detailsContainer: {
    flexShrink: 1,
    marginBottom: 10,
    marginHorizontal: 10,
    paddingLeft: 10,
  },

  actionContainer: {
    flex: 1,
    minHeight: 40,
    maxHeight: 40,
    flexDirection: "row",
  },

  detailsText: {
    fontSize: 13,
    color: "#660032",
    lineHeight: 18,
    textAlign: "auto",
  },

  imageContainer: {
    flexShrink: 1,
    flexGrow: 1,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 15,
    overflow: "hidden",
  },
});
