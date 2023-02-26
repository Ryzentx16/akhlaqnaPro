import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import PaginationListView from "../../components/PaginationListView";
import OurUser from "../../OurUser";
import chatRoomData from "../../data/chatRoomData";
import InputBox from "./inputBox";
import ChatMessage from "./ChatMessage";

export default function ChatRoom({ route }) {
  const [isSend, setIsSend] = useState(false);
  const [image, setImage] = useState(null);

  const retrieveData = async (params) => {
    params.postId = post.id;
    const result = await GraphQL.CommentApiLogic.Queries.Retrieve(params);

    // return result;
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets[0].uri);

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

      console.log(result);

      if (!result.canceled) {
        setImage(result.assets[0]);
      } else {
        console.log("cancelled");
      }
    }
  };

  const onSend = async (message) => {
    setIsSend(true);
    const createComment = (imagePath = null) => {
      const data = {
        content: message,
        userId: OurUser.user.id,
        postId: post.id,
      };

      if (imagePath) {
        data.image = imagePath;
      }

      GraphQL.CommentApiLogic.Queries.Create(data).then((res) => {
        if (res.success) {
          setIsSend(false);
        } else {
          //to ar
          Alert.alert("Error", res.errors.join("\n"));
        }
      });
    };

    if (image) {
      Utils.Uploader.Image(image.uri, "post", true).then(async (res) => {
        createComment(res);
      });
    } else {
      createComment();
    }
    setImage(null);
  };

  return (
    // <KeyboardAvoidingView
    //   onLayout={(event) => {}}
    //   style={[
    //     styles.container,
    //     {
    //       maxHeight: windowHeight * 0.75 - keyboardHeight,
    //       minHeight: windowHeight * 0.75 - keyboardHeight,
    //     },
    //   ]}
    //   behavior={"height"}
    // >
    //   <View style={[styles.messgaesContainer]}>
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

    //   <View
    //     style={{
    //       width: "100%",
    //     }}
    //   >
    //     <InputBox
    //       image={null}
    //       style={{ backgroundColor: "#c8c7c8" }}
    //       onPickImage={() => {}}
    //       onTakeImage={() => {}}
    //       onCancel={() => {}}
    //     />
    //   </View>
    // </KeyboardAvoidingView>

    // renderItem,
    // retrieveData,
    // perPage,
    // isBottomSheet = false,
    // isSend,

    <View style={styles.container}>
      {/* <PaginationListView
        perPage={5}
        retrieveData={() => chatRoomData[0].messages}
        renderItem={(item, index) => {
          return (
            <ChatMessage
              key={index}
              message={item.item}
              myId={OurUser.user.id}
            />
          );
        }}
        
      /> */}
      <View style={styles.messgaesContainer}>
        <ChatMessage
          // key={index}
          message={{
            id: "m10",
            createdAt: "2023/01/10 22:08:00",
            content: "Bye",
            user: OurUser.user,
          }}
          myId={OurUser.user.id}
        />
        <ChatMessage
          // key={index}
          message={{
            id: "m9",
            createdAt: "2023/01/10 22:07:50",
            content: "Good Bye then!",
            user: {
              id: "u2",
              username: "John",
              firstName: "John .M",
              phoneNumber: "+97412345678",
              password: "12345678",
              profileImage: "http://ryzentx.online/profile_1.png",
            },
            image: "خلطبية بالصلصة"
          }}
          myId={OurUser.user.id}
        />
      </View>

      <InputBox
        image={null}
        style={{ backgroundColor: "#c8c7c8" }}
        onPickImage={pickImage}
        onTakeImage={takeImage}
        onCancel={() => setImage(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#CCCCCC",
  },

  messgaesContainer: {
    flex: 1,
    // justifyContent: "flex-end",
    // alignItems: "center",
  },

  scrollContainer: {
    flex: 1,
  },
});
