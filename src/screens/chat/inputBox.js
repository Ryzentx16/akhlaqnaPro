import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  I18nManager
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
const isRTL = I18nManager.isRTL;

export default function InputBox(props) {
  var heightLimit = 130;
  const [message, setMessage] = useState("");
  const [textInputHeight, setTextInputHeight] = useState(20);

  var placeholder = props.hasOwnProperty("isComment") == false ? "Type a message" : "Type a comment"
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
      <TouchableOpacity style={styles.buttonContainer}>
        <MaterialIcons name="send" size={20} color="white" style={{transform: [{rotateY: isRTL ? '180deg' : '0deg'}]}} />
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
