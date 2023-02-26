import React, { useState, useEffect, useRef } from "react";
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

  const [message, setMessage] = useState("");
  const [isComment, setIsComment] = useState(props.hasOwnProperty("isComment"));
  const [createdDateTime, setcreatedDateTime] = useState(Date.now());
  const [textInputHeight, setTextInputHeight] = useState(25);
  const [isFocus, setIsFocus] = useState(props.onFocus);
  const [bPlaceholder, setBplaceholder] = useState(
    isComment ? "Type a comment" : "Type a message"
  );
  const ref = useRef(TextInput);

  let currLang = languages.currLang();
  useEffect(() => {
    currLang = languages.currLang();
    textColor = themes._currTextTheme;
    backColor = themes._currBackColorTheme;
    themeColor = themes._currTheme;

    setIsFocus(props.onFocus);

    if (!ref.current.isFocused()) {
      if (isFocus) {
        ref.current.focus();
      } else {
        Keyboard.dismiss();
      }
    }

    if (
      props.hasOwnProperty("replyPlaceHolder") &&
      props.replyPlaceHolder !== null
    ) {
      setBplaceholder(props.replyPlaceHolder);
      return;
    } else {
      if (isComment) {
        setBplaceholder("Type a comment");
        return;
      } else {
        setBplaceholder("Type a message");
        return;
      }
    }
  });

  // var placeholder = () => {
  //   return "error";
  // };

  const onSend = () => {
    props.onEndReply();
    Keyboard.dismiss();
    setIsFocus(false);
    setBplaceholder(isComment ? "Type a comment" : "Type a message");

    setMessage("");
    setcreatedDateTime(Date.now());
  };

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.mainContainer}>
        <TextInput
          ref={ref}
          maxLength={2500}
          placeholder={bPlaceholder}
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
