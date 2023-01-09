import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import UserAvatar from "@muhzi/react-native-user-avatar";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function ActionButton(props) {
  let CurrentIcon;

  switch (props.type) {
    case "share":
      CurrentIcon = <FontAwesome5 size={30} name={"share"} color={"white"} />;
      break;
    case "like":
      CurrentIcon = <Ionicons size={30} name={"heart"} color={"white"} />;
      break;
    case "comment":
      CurrentIcon = <Ionicons size={30} name={"chatbubbles"} color={"white"} />;
      break;
  }

  return (
    <TouchableOpacity style={actionBtnStyles.container}>
      {CurrentIcon}
      
    </TouchableOpacity>
  );
}

export default function PostCard(props) {
  var numLines = 3;
  const [postDetailsLines, setLines] = useState(numLines);

  let { post, isFound = false, isLost = false } = props;
  let postImage = post.user.profileImage;

  return (
    <View style={styles.container}>
      <View style={headerStyles.container}>
        <View style={headerStyles.avatarContainer}>
          <UserAvatar size={35} userName="Josh Samuel" fontSize={15} />
        </View>
        <View style={headerStyles.headerDetailsContainer}>
          <Text style={headerStyles.userName}>{"Josh Samuel"}</Text>

          <Text style={headerStyles.postTime}>{"18m"}</Text>
        </View>
        <TouchableOpacity style={headerStyles.headerDotsContainer}>
          <MaterialCommunityIcons
            name={"dots-vertical"}
            color={"#660032"}
            size={25}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailsText} numberOfLines={postDetailsLines}>
          {
            "Hi i found something in AllRayyen\nit is an apple watch series 6 red color"
          }
        </Text>
        {/* {postDetailsLines === 0 ? (
          <Text
            onPress={() => setLines(numLines)}
            style={{ fontWeight: "bold" }}
          >
            Read Less
          </Text>
        ) : (
          <Text onPress={() => setLines(0)} style={{ fontWeight: "bold" }}>
            Read More
          </Text>
        )} */}
      </View>

      <View style={styles.imageContainer}>
        <Image
          style={styles.postImage}
          source={require("../../../assets/image_2_f.png")}
        />
      </View>

      <View style={styles.actionContainer}>
        <ActionButton type={"like"}/>
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
    backgroundColor: "red",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    height: 450,
    marginBottom: 17,
    paddingVertical: 10,
  },

  detailsContainer: {
    flex: 1,
    marginBottom: 10,
    minHeight: 20,
    maxHeight: 40,
    marginHorizontal: 10,
    paddingLeft: 10,
  },

  imageContainer: {
    flex: 1,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 15,
    overflow: "hidden",
  },

  actionContainer: {
    flex: 1,
    minHeight: 40,
    maxHeight: 40,
    backgroundColor: "blue",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },

  postImage: {
    height: 240,
    flex: 1,
    width: null,
    resizeMethod: "auto",
    resizeMode: "stretch",
  },

  detailsText: {
    fontSize: 14,
    color: "#660032",
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
