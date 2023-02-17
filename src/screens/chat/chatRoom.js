import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Dimensions,
  TextInput,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import ChatMessage from "./ChatMessage";
import chatRoomData from "../../data/chatRoomData";
import InputBox from "./inputBox";
import Constants from "expo-constants";

const statusBarHeight = Constants.statusBarHeight;
const windowHeight = Dimensions.get("window").height;

//  <KeyboardAvoidingView
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

export default function ChatRoom({ route }) {
  const keyboardHeight = useKeyboardHeight();
  const [layoutHeight, setLayoutHeight] = useState(windowHeight * 0.75);
  // const [greenHeight, setGreenHeight] = useState(0);
  const myFixedKeyboardHeight = 329.523;

  /* #region  get keybaord height test */
  // const [keyboardHeight, setKeyboardHeight] = useState(0);

  // useEffect(() => {
  //   const showSubscription = Keyboard.addListener("keyboardDidShow", (e) =>
  //     setKeyboardHeight(e.endCoordinates.height)
  //   );
  //   const hideSubscription = Keyboard.addListener("keyboardDidHide", () =>
  //     setKeyboardHeight(0)
  //   );
  //   return () => {
  //     showSubscription.remove();
  //     hideSubscription.remove();
  //   };
  // }, [setKeyboardHeight]);

  /* #endregion */

  // console.warn(keyboardHeight);

  return (
    // <View style={[styles.container]}>
    //   <View style={styles.messgaesContainer}>
    //     <FlatList
    //       data={chatRoomData[0].messages}
    //       style={styles.scrollContainer}
    //       keyExtractor={(item, index) => index}
    //       renderItem={(item, index) => {
    //         return <ChatMessage key={index} message={item.item} myId={"u1"} />;
    //       }}
    //       inverted
    //     />
    //   </View>
    //   <View>
    //     <InputBox />
    //   </View>
    // </View>

    <KeyboardAvoidingView
      onLayout={(event) => {
        // var { x, y, width, height } = event.nativeEvent.layout;
        // setLayoutHeight(height);
        // console.warn(
        //   ` layoutHeight: ${layoutHeight},\n keyboardHeight: ${keyboardHeight},\n`
        // );
      }}
      style={[
        styles.container,
        {
          maxHeight: windowHeight * 0.75 - keyboardHeight,
          minHeight: windowHeight * 0.75 - keyboardHeight,
        },
      ]}
      behavior={"height"}
    >
      <View
        style={[
          styles.messgaesContainer,
          // {
          //   height: "50%",
          //   justifyContent: "flex-end",
          //   alignItems: "center",
          // },
        ]}
      >
        <FlatList
          data={chatRoomData[0].messages}
          style={styles.scrollContainer}
          keyExtractor={(item, index) => index}
          renderItem={(item, index) => {
            return <ChatMessage key={index} message={item.item} myId={"u1"} />;
          }}
          inverted
        />
      </View>

      <View
        style={{
          width: "100%",
        }}
      >
        <InputBox />
        {/* <TextInput
          style={{
            // flex: 1,
            width: "100%",
            maxHeight: 25,
            minHeight: 25,
            backgroundColor: "red",
          }}
        /> */}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#CCCCCC",
    // justifyContent: "flex-end",
  },

  messgaesContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  scrollContainer: {
    flex: 1,
  },
});
