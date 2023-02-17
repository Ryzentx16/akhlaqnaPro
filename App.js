import { useEffect, useState } from "react";
import "react-native-gesture-handler";
import {
  BackHandler,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Button,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
// import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  I18nManager,
  Dimensions,
  NativeModules,
  StatusBar,
  Image,
} from "react-native";
// import { useHeaderHeight } from "@react-navigation/elements";
import AppStartupNavigator from "./src/navigator/AppStartupNavigator";
// import { TextInput } from "react-native-gesture-handler";
// import InputBox from "./src/screens/chat/inputBox";
import Constants from "expo-constants";

// import posts from "./src/data/posts";
// import PostCard from "./src/screens/post/PostCard";
// import Modal from "react-native-modal";

// import checkUserAsync from "./API/graphql/checkUser";
// import { loadUsersAsync } from "./API/graphql/getUsers";
// import client from "./API/graphql/connection";

const statusBarHeight = Constants.statusBarHeight;
// const { StatusBarManager } = NativeModules;
const windowHeight = Dimensions.get("window").height;

/* #region  Apollo client */
// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   HttpLink,
//   gql,
//   from,
// } from "@apollo/client";

// const endPointUrl = "http://192.168.100.10:4000/graphql";
// const client = new ApolloClient({
//   uri: endPointUrl,
//   cache: new InMemoryCache(),
// });

// async function loadStudentsAsync(i) {
//   const isId = i !== "0" ? "" : "id";
//   client
//     .query({
//       query: gql`
//         {
//           students {
//             ${isId}
//             firstName
//             lastName
//             college {
//               name
//             }
//           }
//         }
//       `,
//     })
//     .then((result) => {
//       console.log(JSON.stringify(result.data));
//       return result.data;
//     })
//     .catch((er) => {
//       console.error(er);
//       return er;
//     });
// }
/* #endregion */

function useKeyboardHeight() {
  /* #region  get keybaord height test */
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) =>
      setKeyboardHeight(e.endCoordinates.height)
    );
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardHeight(0)
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [setKeyboardHeight]);

  /* #endregion */

  return keyboardHeight;
}

function preperTempData() {
  let _posts = [];

  for (let i = 0; i < posts.length * 5; i++) {
    _posts.push(posts[i % posts.length]);
  }

  return _posts;
}

export default function App() {
  const keyboardHeight = useKeyboardHeight();
  const [greenHeight, setGreenHeight] = useState(0);
  const myFixedKeyboardHeight = 329.523;
  const [state, setState] = useState("no requsets");
  // const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  useEffect(() => {
    const backAction = () => {
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  });

  return (
    /* #region  Main app */
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="default" />
      <NavigationContainer style={styles.container}>
        <AppStartupNavigator />
      </NavigationContainer>
    </SafeAreaView>
    /* #endregion */

    /* #region  Modal test */
    // <View style={[styles.container, { justifyContent: "center" }]}>
    //   <PostCard
    //     post={preperTempData()[0]}
    //     onImagePress={() => setIsModalVisible(true)}
    //   />
    //   <Modal
    //     isVisible={isModalVisible}
    //     hideModalContentWhileAnimating={true}
    //     onBackdropPress={() => setIsModalVisible(false)}
    //     onSwipeComplete={() => setIsModalVisible(false)}
    //     swipeDirection={["up", "down"]}
    //     backdropColor={"grey"}
    //   >
    //     <View
    //       style={{
    //         // flex: 1,
    //         borderRadius: 23,
    //         backgroundColor: "red",
    //         justifyContent: "center",
    //         overflow: 'hidden'
    //       }}
    //     >
    //       <Image
    //         source={require("./assets/321772450_3845257045700671_1264120187291471573_n.jpg")}
    //         style={[
    //           {
    //             resizeMode: "contain",
    //             backgroundColor: "black",
    //             width: "100%",
    //             // Without height undefined it won't work
    //             height: undefined,
    //           },
    //           {
    //             aspectRatio: 960 / 772,
    //           },
    //         ]}
    //         // resizeMode={"contain"}
    //         // resizeMethod={"auto"}
    //       />
    //     </View>
    //   </Modal>
    // </View>
    /* #endregion */

    /* #region  Apollo client test */
    // <View style={[styles.container, { justifyContent: "center" }]}>
    //   <TextInput
    //     style={{ backgroundColor: "red", width: "100%", height: 50 }}
    //     // onChangeText={(text) => setI(text)}
    //   />
    //   <Button
    //     title="Check User"
    //     onPress={async () => {
    //       try {
    //         setState("Loading....");
    //         const v = await loadUsersAsync().catch((er) => console.error(er));
    //         setState(`Done With Result \n (${JSON.stringify(v)})`);
    //       } catch (er) {
    //         console.error(er);
    //       }
    //     }}
    //   />
    //   <Button
    //     title="Clear Store"
    //     onPress={async () => {
    //       setState("Clearing.....");
    //       await client.clearStore();
    //       setState("Done Clearing");
    //     }}
    //   />
    //   <Text style={styles.text}>{state}</Text>
    // </View>
    /* #endregion */

    /* #region  Keyboard Testing */
    // <KeyboardAvoidingView
    //   onLayout={(event) => {
    //     var { x, y, width, height } = event.nativeEvent.layout;
    //     console.warn(height);
    //   }}
    //   style={[
    //     styles.container,
    //     {
    //       maxHeight: windowHeight - keyboardHeight,
    //       minHeight: windowHeight - keyboardHeight,
    //     },
    //   ]}
    //   behavior={"height"}
    // >
    //   <View
    //     style={{
    //       height: "50%",
    //       justifyContent: "flex-end",
    //       alignItems: "center",
    //     }}
    //   >
    //     <Text style={styles.text}>
    //       {"StatusBar Height: " + statusBarHeight}
    //     </Text>
    //     <Text style={styles.text}>{"Window Height: " + windowHeight}</Text>
    //     <Text style={styles.text}>{"Keyboard Height: " + keyboardHeight}</Text>
    //     <Text style={styles.text}>{"Green View Height: " + greenHeight}</Text>
    //   </View>

    //   <View
    //     onLayout={(event) => {
    //       var { x, y, width, height } = event.nativeEvent.layout;
    //       setGreenHeight(height);
    //     }}
    //     style={{
    //       flex: 1,
    //       // height: windowHeight / 2,
    //       backgroundColor: "green",
    //       width: "100%",
    //       justifyContent: "flex-end",
    //     }}
    //   >
    //     <InputBox />
    //     {/* <TextInput
    //       style={{
    //         flex: 1,
    //         maxHeight: 25,
    //         minHeight: 25,
    //         backgroundColor: "red",
    //       }}
    //     /> */}
    //   </View>
    // </KeyboardAvoidingView>
    /* #endregion */
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // marginTop: statusBarHeight,

    backgroundColor: "grey",
    // alignItems: "center",
    // justifyContent: "center",
    // paddingBottom: 329.523
  },
  text: {
    // textAlign: 'center',
    color: "white",
  },
});

// import React, { useState, useEffect } from "react";
// import { Button, Image, View, Platform } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import axios from "axios";

// export default function App() {
//   const [image, setImage] = useState(null);

//   const pickImage = async () => {
//     // No permissions request is necessary for launching the image library
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   const takeImage = async () => {
//     // No permissions request is necessary for launching the image library
//     let result = await ImagePicker.launchCameraAsync({
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   const sendbackEndo = () => {
//     let data = new FormData();
//     data.append("userId", "tamborea");
//     data.append("content", "aslkdjfkljasdjfklk;jadsjflja;ldjflk;jadlkjf");
//     data.append("createdDateTime", new Date().toUTCString());

//     if (image) {
//       data.append("image", {
//         uri: image,
//         name: "profileExample.png",
//         type: "image/png",
//       });
//     }

//     axios
//       .post("http://2c0f-156-192-171-226.eu.ngrok.io/addPost", data, {
//         //config
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "multipart/form-data",
//         },
//       })
//       .then((res) => {
//         if (res) {
//           console.log("donawy");
//         } else {
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         alert(err);
//       });
//   };

//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Button title="Pick an image from camera roll" onPress={pickImage} />
//       <Button title="take an image from camera roll" onPress={takeImage} />
//       {image && (
//         <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
//       )}
//       <Button title="send back endo" onPress={sendbackEndo} />
//     </View>
//   );
// }
