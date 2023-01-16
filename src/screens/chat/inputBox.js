import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  I18nManager,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import users from "../../data/users";

// import AddComment from "../../../API/AddComment"; 
import Adding from "../../../API/Adding"; // API

const isRTL = I18nManager.isRTL;

export default function InputBox(props) {
  var heightLimit = 130;
  const [message, setMessage] = useState("");
  const [isComment, setIsComment] = useState(props.hasOwnProperty("isComment"));
  const [createdDateTime, setcreatedDateTime] = useState(Date.now());
  const [textInputHeight, setTextInputHeight] = useState(20);

  var placeholder = isComment ? "Type a message" : "Type a comment";

  const onSend = () => {
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      style={[styles.container, { width: "100%" }]}
    >
      <View style={styles.mainContainer}>
        <TextInput
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
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
    marginHorizontal: 10,
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
});
