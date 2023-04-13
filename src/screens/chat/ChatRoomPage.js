import React, { useContext, useEffect, useState } from "react";
import { BackHandler, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import OurUser from "../../OurUser";
import { GraphQL } from "../../../API";
import ChatRoomListView from "./ChatRoomListView";
import InputBox from "./inputBox";
import { Utils } from "../../../API";
import * as CameraPicker from "../../components/CameraPicker";
import ThemeContext from "../../themes/ThemeContext";

export default function ChatsPage({ route }) {
  const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext);

  const [isSend, setIsSend] = useState(false);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  });

  useEffect(() => {
    // subscribe to the chat room when the component mounts
    Utils.Socket.emit("subscribe", { id: route.params.roomId });

    // listen for incoming messages
    Utils.Socket.on("chat message", (message) => {
      setIsSend(true);
    });

    // clean up event listeners when the component unmounts
    return () => {
      Utils.Socket.emit("unsubscribe", { id: route.params.roomId });
      Utils.Socket.off("chat message");
    };
  }, []);

  const refreshCallBack = () => {
    setIsSend(false);
  };

  const retrieveData = async (params) => {
    params.chatRoomId = route.params.roomId;
    const result = await GraphQL.ChatApiLogic.Messages.Queries.Retrieve(params);
    return result;
  };

  const onSend = async (message) => {
    const createMessage = (imagePath = null) => {
      if (!message) {
        Alert.alert("Error", "We cannot accept empty text message");
        return;
      }

      const data = {
        content: message,
        senderId: OurUser.user.id,
        receiverId: route.params.recieverId,
        roomId: route.params.roomId,
      };

      if (imagePath) {
        data.image = imagePath;
      }

      Utils.Socket.emit("chat message", data);
    };

    if (image) {
      Utils.Uploader.Image(image.uri, "chat", true).then(async (res) => {
        createMessage(res);
      });
    } else {
      createMessage();
    }

    setImage(null);
  };

  return (
    <View style={{ flex: 1, marginTop: 10, backgroundColor: theme.backColor }}>
      <ChatRoomListView
        retrieveData={retrieveData}
        perPage={10}
        isSend={isSend}
        refreshCallBack={refreshCallBack}
        isHideRefreshAnimation={true}
      />
      <InputBox
        image={image}
        onPickImage={() => CameraPicker.pickImage(setImage)}
        onTakeImage={() => CameraPicker.takeImage(setImage)}
        onCancel={() => setImage(null)}
        onSendReply={onSend}
      />
    </View>
  );
}
