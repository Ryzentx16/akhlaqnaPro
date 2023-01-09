import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import UserAvatar from "@muhzi/react-native-user-avatar";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function calcTime(offset) {
  // create Date object for current location
  var d = new Date();

  // convert to msec
  // subtract local time zone offset
  // get UTC time in msec
  var utc = d.getTime() + d.getTimezoneOffset() * 60000;

  // create new Date object for different city
  // using supplied offset
  var nd = new Date(utc + 3600000 * offset);

  // return time as a string
  return nd.toLocaleString();
}

function getPostDuration(postDate) {
  // var postDate = new Date(post.createdAt).getTime();
  // var currDate = new Date().getTime();
  // var postDuration = new Date(currDate - postDate);

  var postDate = new Date(postDate).getTime();
  var currDate = new Date(calcTime("+2")).getTime();
  var duration = currDate - postDate;

  var days = Math.floor(duration / (1000 * 60 * 60 * 24));
  var hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((duration % (1000 * 60)) / 1000);

  var durationString = "";

  if (days > 90) {
    var date = new Date(postDate);

    durationString =
      date.getDate() +
      " " +
      month[date.getMonth()] +
      " " +
      date.getFullYear().toString().substr(-2);
  } else if (days > 30 && days <= 90) {
    var date = new Date(postDate);
    durationString = date.getDate() + " " + month[date.getMonth()];
  } else if (days !== 0 && days > 0) {
    durationString = days + " d";
  } else if (hours !== 0 && hours > 0) {
    durationString = hours + " h";
  } else if (minutes !== 0 && minutes > 0) {
    durationString = minutes + " m";
  } else if (seconds !== 0 && seconds > 0) {
    durationString = seconds + " s";
  } else {
    durationString = "Just now";
  }

  return durationString;
  // console.log(postDuration)
}

function ActionButton(props) {
  let CurrentIcon;

  switch (props.type) {
    case "share":
      CurrentIcon = <FontAwesome5 size={30} name={"share"} color={"#660032"} />;
      break;
    case "not-liked":
      CurrentIcon = (
        <Ionicons size={30} name={"heart-outline"} color={"#660032"} />
      );
      break;
    case "liked":
      CurrentIcon = <Ionicons size={30} name={"heart"} color={"#660032"} />;
      break;
    case "comment":
      CurrentIcon = (
        <Ionicons size={30} name={"chatbubbles"} color={"#660032"} />
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
  let { post } = props;

  const [numOfLikes, setNumOfLikes] = useState(post.numberOfLikes); //To show ur remaining Text
  const [isLiked, setIsLiked] = useState(false);
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
  }, []);

  const onMakeLike = () => {
    if (isLiked) {
      setNumOfLikes(numOfLikes - 1);
    } else {
      setNumOfLikes(numOfLikes + 1);
    }

    setIsLiked(!isLiked);
  };

  var postDuration = getPostDuration(post.createdAt);
  var imageHeight;

  if (post.hasOwnProperty("image") == true) {
    imageHeight = Image.resolveAssetSource(post.image).height;
  }

  return (
    <View style={styles.container}>
      <View style={headerStyles.container}>
        <View style={headerStyles.avatarContainer}>
          <UserAvatar size={35} src={post.user.profileImage} fontSize={15} />
        </View>
        <View style={headerStyles.headerDetailsContainer}>
          <Text style={headerStyles.userName}>{post.user.name}</Text>

          <Text style={headerStyles.postTime}>{postDuration}</Text>
        </View>
        <TouchableOpacity style={headerStyles.headerDotsContainer}>
          <MaterialCommunityIcons
            name={"dots-vertical"}
            color={"#660032"}
            size={25}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.detailsContainer}
        onPress={toggleNumberOfLines}
      >
        <Text
          style={styles.detailsText}
          onTextLayout={onTextLayout}
          numberOfLines={textShown ? undefined : 4}
        >
          {post.content}
        </Text>

        {lengthMore && !textShown ? (
          <TouchableOpacity onPress={toggleNumberOfLines}>
            <Text style={[styles.detailsText, { fontWeight: "bold" }]}>
              {"Read more"}
            </Text>
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>
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
        <ActionButton type={"comment"} details={post.numberOfComments} />
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
    paddingLeft: 5,
  },

  headerDotsContainer: {
    flex: 1,
    maxWidth: 20,
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
    backgroundColor: "white",
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
    color: "#660032",
    lineHeight: 18,
  },
});

// <View
// style={[
//   styles.posts,
//   {
//     borderBottomWidth: 1,
//     borderColor: "#660032",
//     paddingBottom: 15,
//     backgroundColor: "white",
//   },
// ]}
// >
// <View style={{ flex: 1, backgroundColor: "white" }}>
//   <Image style={styles.profilePicture} source={postImage} />
// </View>
// <View style={{ flex: 4, backgroundColor: "white", paddingLeft: 5 }}>
//   <View style={{ flexDirection: "row", marginBottom: 10 }}>
//     <Text style={{ color: "#660032" }}>{post.user.name}</Text>
//     {/*<Text style={{color: 'grey'}}> @{post.user.username}</Text>*/}
//     <Text
//       style={{
//         marginLeft: 5,
//         color: "#99004b",
//         fontSize: 12,
//         alignSelf: "center",
//       }}
//     >
//       {Math.floor(Math.random() * 40 + 1)}s
//     </Text>
//     {isFound ? (
//       <View style={{ flex: 1, alignItems: "flex-end" }}>
//         <AntDesign name={"questioncircle"} color={"#660032"} size={20} />
//       </View>
//     ) : null}
//     {isLost ? (
//       <View style={{ flex: 1, alignItems: "flex-end" }}>

//         <Ionicons name={"checkmark-circle"} color={"#660032"} size={20} />
//       </View>
//     ) : null}
//   </View>
//   <View>
//     <View style={{ marginBottom: 10 }}>
//       <Text style={{ color: "#660032" }}>{post.content}</Text>
//     </View>

//     {post.isImage ? (
//       <View
//         style={{
//           borderWidth: 2,
//           borderRadius: 25,
//           borderColor: "#660032",
//         }}
//       >
//         <View style={{ flex: 1, overflow: "hidden", maxHeight: 150 }}>
//           {/*<Text style={{backgroundColor: 'black', color: 'red'}}> [Image] </Text>*/}
//           {/*<Text style={{backgroundColor: 'black', color: 'red'}}> I don't know how to deal*/}
//           {/*    with image </Text>*/}
//           <Image
//             style={{
//               maxHeight: 150,
//               width: "100%",
//               resizeMode: "stretch",
//             }}
//             source={post.image}
//           />
//         </View>
//       </View>
//     ) : null}
//   </View>

//   <View style={styles.bottomIcons}>
//     <TouchableOpacity style={styles.like}>
//       <Image
//         style={styles.likeIcon}
//         source={require("../../../assets/Like.png")}
//       />
//       <Text style={{ marginLeft: 5, color: "#660032" }}>
//         {post.numberOfLikes}
//       </Text>
//     </TouchableOpacity>
//     <TouchableOpacity style={styles.comment}>
//       <Image
//         style={styles.commentIcon}
//         source={require("../../../assets/Comment.png")}
//       />
//       <Text style={{ marginLeft: 5, color: "#660032" }}>
//         {post.numberOfComments}
//       </Text>
//     </TouchableOpacity>
//     <TouchableOpacity style={styles.share}>
//       <Image
//         style={styles.shareIcon}
//         source={require("../../../assets/Share.png")}
//       />
//       <Text style={{ marginLeft: 5, color: "#660032" }}>
//         {post.numberOfShares}
//       </Text>
//     </TouchableOpacity>
//   </View>
// </View>
// </View>

// const styles = StyleSheet.create({
//   posts: {
//     height: "auto",
//     minWidth: "50%",
//     backgroundColor: "red",

//     flexDirection: "row",

//     marginBottom: 20,
//   },
//   head: {
//     flex: 1,
//     flexDirection: "row",
//     maxHeight: "auto",

//     justifyContent: "flex-start",
//     alignContent: "space-between",

//     // backgroundColor: 'green',

//     marginBottom: 10,
//   },
//   pictureHolder: {
//     flex: 1,
//     backgroundColor: "green",
//     marginBottom: -4,

//     borderRadius: 999,
//   },
//   profilePicture: {
//     position: "absolute",
//     height: 65,
//     width: 65,
//   },
//   nameHolder: {
//     flex: 4,
//     // backgroundColor: 'green',

//     // justifyContent: 'center',
//     paddingLeft: 10,
//   },
//   content: {
//     flex: 3,
//     backgroundColor: "yellow",

//     // marginBottom: -10,
//     marginLeft: 60,
//   },
//   text: {
//     flex: 1,
//     backgroundColor: "green",

//     // marginLeft: 83,
//   },
//   imageHolder: {
//     flex: 3,
//     // height: 'auto',
//     backgroundColor: "grey",
//   },

//   bottomIcons: {
//     // flex: 1,
//     // backgroundColor: 'pink',
//     flexDirection: "row",

//     justifyContent: "space-around",

//     marginTop: 10,
//   },
//   share: {
//     flexDirection: "row",
//   },
//   comment: {
//     flexDirection: "row",
//   },
//   like: {
//     flexDirection: "row",
//   },
//   shareIcon: {
//     height: 16 + 10,
//     width: 20 + 10,
//   },
//   commentIcon: {
//     height: 16 + 10,
//     width: 16 + 10,
//   },
//   likeIcon: {
//     height: 16 + 10,
//     width: 20 + 10,
//   },

//   iconStyle: {
//     height: 20,
//     width: 20,
//   },
// });
