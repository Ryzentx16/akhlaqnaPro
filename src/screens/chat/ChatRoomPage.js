import React, { useEffect, useState } from "react";
import { BackHandler, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import OurUser from "../../OurUser";
import themes from "../../ThemeController";
import { GraphQL } from "../../../API";
import ChatRoomListView from "./ChatRoomListView";
import InputBox from "./inputBox";
import { Utils } from "../../../API";

export default function ChatsPage({ route }) {
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
    textColor = themes._currTextTheme;
    backColor = themes._currBackColorTheme;
    themeColor = themes._currTheme;
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
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    } else {
      console.log("cancelled");
    }
  };

  const takeImage = async () => {
    // let pS = ;
    await ImagePicker.requestCameraPermissionsAsync();
    let r = await ImagePicker.getCameraPermissionsAsync().catch((er) =>
      console.error(er)
    );
    setTest(JSON.stringify(r));

    if (!r.granted) {
      if (r.canAskAgain) {
        await ImagePicker.requestCameraPermissionsAsync();
        r = await ImagePicker.getCameraPermissionsAsync().catch((er) =>
          console.error(er)
        );
        console.log(r);
      } else {
        alert("u refused!");
        return;
      }
    }

    if (r.granted) {
      // No permissions request is necessary for launching the image library
      const result = await ImagePicker.launchCameraAsync({
        aspect: [4, 3],
        quality: 1,
      }).catch((er) => console.error(er));

      if (!result.canceled) {
        setImage(result.assets[0]);
      } else {
        console.log("cancelled");
      }
    }
  };

  const retrieveData = async (params) => {
    params.chatRoomId = route.params.roomId;
    const result = await GraphQL.ChatApiLogic.Messages.Queries.Retrieve(params);
    return result;
  };

  const onSend = async (message) => {
    const createMessage = (imagePath = null) => {
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
    <View style={{ flex: 1, marginTop: 10 }}>
      <ChatRoomListView
        retrieveData={retrieveData}
        perPage={10}
        isSend={isSend}
        refreshCallBack={refreshCallBack}
        isHideRefreshAnimation={true}
      />
      <InputBox
        image={image}
        onPickImage={pickImage}
        onTakeImage={takeImage}
        onCancel={() => setImage(null)}
        onSendReply={onSend}
      />
    </View>
  );
}
