import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  I18nManager,
  Keyboard,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import users from "../../data/users";

import languages from "../../strings/LanguagesController";
import Adding from "../../../API/Adding"; // API

import themes from "../../ThemeController";

let textColor = themes._currTextTheme;
let backColor = themes._currBackColorTheme;
let themeColor = themes._currTheme;
const isRTL = I18nManager.isRTL;

function useKeyboardHeight() {
  /* #region  get keybaord height test */
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) =>
      setKeyboardHeight(e.endCoordinates.height)
    );
    const hideSubscription = Keyboard.addListener("keyboardWillHide", () =>
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

export default function InputBox(props) {
  var heightLimit = 135;
  // const headerHeight = useHeaderHeight();

  const [message, setMessage] = useState("");
  const [isComment, setIsComment] = useState(props.hasOwnProperty("isComment"));
  const [createdDateTime, setcreatedDateTime] = useState(Date.now());
  const [textInputHeight, setTextInputHeight] = useState(25);

  let currLang = languages.currLang();
  useEffect(() => {
    currLang = languages.currLang();
    textColor = themes._currTextTheme;
    backColor = themes._currBackColorTheme;
    themeColor = themes._currTheme;
  });

  var placeholder = !isComment ? "Type a message" : "Type a comment";

  const onSend = () => {
    setMessage("");
    setcreatedDateTime(Date.now());
    isComment
      ? Adding("addComment", {
          userId: users[0].id,
          postId: props.post.id,
          content: message,
          createdDateTime: createdDateTime,
        })
      : null;
  };

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    //   keyboardVerticalOffset={useKeyboardHeight() * -1}
    //   style={[styles.container, { flex: 1 }]}
    // >
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <TextInput
          maxLength={2500}
          placeholder={placeholder}
          multiline={true}
          value={message}
          onChangeText={setMessage}
          onContentSizeChange={(event) => {
            setTextInputHeight(event.nativeEvent.contentSize.height);
          }}
          style={[
            styles.textInput,
            {
              height:
                textInputHeight > heightLimit ? heightLimit : textInputHeight,
            },
          ]}
        />
        {props.hasOwnProperty("isComment") == false && (
          <Entypo name="location" size={20} color="grey" style={styles.icon} />
        )}
        {!message && (
          <Fontisto name="camera" size={20} color="grey" style={styles.icon} />
        )}
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={onSend}>
        <MaterialIcons
          name="send"
          size={20}
          color="white"
          style={{ transform: [{ rotateY: isRTL ? "180deg" : "0deg" }] }}
        />
      </TouchableOpacity>
    </View>
    // </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flexShrink: 1,
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 25,
    marginRight: 5,
    alignItems: "flex-end",
  },
  textInput: {
    flex: 1,
    backgroundColor: themeColor === "light" ? "#ffffff" : "#CCCCCC",
    marginHorizontal: 10,
    textAlign: "auto",
  },
  icon: {
    marginHorizontal: 5,
  },
  buttonContainer: {
    height: 40,
    width: 40,
    backgroundColor: textColor,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
});
