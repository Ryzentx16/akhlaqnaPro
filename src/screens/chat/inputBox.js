import React, { useState, useEffect, useRef, useContext } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  I18nManager,
  Keyboard,
  Image,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import ImageViewer from "../../components/ImageViewer";
import languages from "../../strings/LanguagesController";
import ThemeContext from "./../../themes/ThemeContext";

const isRTL = I18nManager.isRTL;

export default function InputBox(props) {
  var heightLimit = 135;

  const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext);

  const [message, setMessage] = useState("");
  const isComment = props.hasOwnProperty("isComment");
  const [textInputHeight, setTextInputHeight] = useState(25);
  const [isFocus, setIsFocus] = useState(props.onFocus);
  const [bPlaceholder, setBplaceholder] = useState(
    isComment ? "Type a comment" : "Type a message"
  );
  const ref = useRef(TextInput);

  let currLang = languages.currLang();
  useEffect(() => {
    currLang = languages.currLang();

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

  const onSend = () => {
    props.onSendReply(message.trim());
    Keyboard.dismiss();
    setIsFocus(false);
    setBplaceholder(isComment ? "Type a comment" : "Type a message");

    setMessage("");
    // setcreatedDateTime(Date.now());
  };

  return (
    <View
      style={[
        styles.container,
        props.style,
        { backgroundColor: theme.backColor },
      ]}
    >
      <View style={[styles.mainContainer, { backgroundColor: theme.primary }]}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <TextInput
            ref={ref}
            maxLength={2500}
            placeholder={bPlaceholder}
            placeholderTextColor={theme.smallText}
            multiline={true}
            value={message}
            onChangeText={setMessage}
            onContentSizeChange={(event) => {
              setTextInputHeight(event.nativeEvent.contentSize.height);
            }}
            style={[
              styles.textInput,
              { backgroundColor: "transparent", color: theme.mediumText },
              {
                height:
                  props.image !== null
                    ? heightLimit
                    : textInputHeight > heightLimit
                    ? heightLimit
                    : textInputHeight,
              },
            ]}
          />
        </View>
        {props.image !== null && (
          <View style={styles.imageContainer}>
            <ImageViewer
              uri={props.image.uri}
              isFullScreen={true}
              maxHeight={props.image.height >= 450 ? 450 : props.image.height}
              imageHeight={props.image.height}
              imageWidth={props.image.width}
              isUpload={true}
              onCancel={props.onCancel}
            />
          </View>
        )}

        <View
          style={{
            width: 70,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            // backgroundColor: "red",
          }}
        >
          {/* {props.hasOwnProperty("isComment") == false && (
            <Entypo
              name="location"
              size={20}
              color={"#660032"}
              style={styles.icon}
            />
          )} */}
          <TouchableOpacity
            // style={styles.buttonContainer}
            onPress={props.onPickImage}
          >
            <MaterialIcons
              name={"add-photo-alternate"}
              size={25}
              color={theme.secondary}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            // style={styles.buttonContainer}
            onPress={props.onTakeImage}
          >
            <Fontisto
              name="camera"
              size={20}
              color={theme.secondary}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          { backgroundColor: theme.OriginalColors.background },
        ]}
        onPress={onSend}
      >
        <MaterialIcons
          name="send"
          size={20}
          color={theme.OriginalColors.text}
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
    backgroundColor: "#ffffff",
    marginHorizontal: 10,
    textAlign: "auto",
    textAlignVertical: "auto",
  },
  icon: {
    marginHorizontal: 5,
  },
  buttonContainer: {
    height: 40,
    width: 40,
    backgroundColor: "#660032",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
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
