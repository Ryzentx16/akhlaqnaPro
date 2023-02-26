import React, { useState, useEffect } from "react";
import {
  I18nManager,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Platform,
  View,
  ScrollView,
} from "react-native";
import UserAvatar from "@muhzi/react-native-user-avatar";
import { FontAwesome, MaterialIcons, Entypo } from "react-native-vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Loader } from "@googlemaps/js-api-loader";

import users from "../data/users";

import Adding from "../../API/Adding";
import languages from "../strings/LanguagesController";

const isRTL = I18nManager.isRTL;

const AddPostPage = ({ navigation }) => {
  const user = users[0];
  const [content, setContent] = useState("");
  const [test, setTest] = useState("");
  const [status, setStatus] = useState(false);
  const [image, setImage] = useState(null);
  const [createdDateTime, setcreatedDateTime] = useState(Date.now());

  let currLang = languages.currLang();
  useEffect(() => {
    currLang = languages.currLang();
  });

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
      console.log("1");
      if (r.canAskAgain) {
        console.log("2");
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

  const onPost = () => {
    // let data = new FormData();
    // data.append("userId", user.id);
    // data.append("content", content);
    // data.append("createdDateTime", createdDateTime);
    // data.append("image", {
    //   uri: "http://ryzentx.online/image_1.png",
    //   name: "profileExample.png",
    //   type: "image/png",
    // });

    // Adding("addPost", data, () => navigation.navigate("Post"));

    console.log("toto");
  };

  const onLocation = () => {
    let map;

    const loader = new Loader({
      apiKey: "AIzaSyBb2lef_VaN4m9OlvngArW3h84ul1DHZIo",
      version: "weekly",
      // ...additionalOptions,
    });

    loader.load().then(() => {
      map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={"height"}
      keyboardVerticalOffset={"100%"}
      style={[styles.container, { width: "100%" }]}
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        accessible={false}
        touchSoundDisabled={true}
      >
        <View style={styles.headContainer}>
          <View style={styles.avatarContainer}>
            <UserAvatar size={55} src={user.profileImage} fontSize={20} />
          </View>
          <View style={styles.headerDetailsContainer}>
            <Text style={styles.userName}>{test}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.contentContainer}>
        <ScrollView>
          <View style={styles.content}>
            <TextInput
              maxLength={5000}
              style={styles.contentInput}
              placeholder={currLang.addpostPage.hint}
              multiline={true}
              value={content}
              onChangeText={(text) => {
                setContent(text);
              }}
            />
          </View>
          {image && (
            <View style={styles.imageContainer}>
              <View style={styles.image}>
                <Image
                  source={{ uri: image.uri }}
                  style={[
                    styles.resImage,
                    {
                      aspectRatio: image.width / image.height,
                    },
                  ]}
                  // resizeMode={"contain"}
                  // resizeMethod={"auto"}
                />
              </View>
            </View>
          )}
        </ScrollView>
      </View>

      <View style={styles.actionsContainer}>
        <View style={styles.attachmentContainer}>
          <TouchableOpacity
            style={styles.actionBtnContainer}
            onPress={takeImage}
          >
            <FontAwesome name={"camera"} size={30} color={"#660032"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionBtnContainer}
            onPress={pickImage}
          >
            <MaterialIcons
              name={"add-photo-alternate"}
              size={40}
              color={"#660032"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionBtnContainer}
            onPress={onLocation}
          >
            <Entypo name={"location"} size={30} color={"#660032"} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.postBtnContaianer} onPress={onPost}>
          <Text style={styles.postText}>{currLang.addpostPage.post}</Text>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={status}
        animationIn={"zoomIn"}
        animationOut={"zoomOut"}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        swipeDirection={["up", "down"]}
        backdropColor={"#4b4b4a"}
        backdropOpacity={0.9}
      >
        <View style={styles.contentContainer}>
          
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },

  headContainer: {
    flex: 1,
    minHeight: 60,
    maxHeight: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginBottom: 10,
  },

  avatarContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 60,
  },

  headerDetailsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 5,
  },

  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#660032",
  },

  contentContainer: {
    flex: 1,
    backgroundColor: "#F0F2F5",
    borderRadius: 15,
    // justifyContent: "flex-start",
    marginHorizontal: 10,
    marginBottom: 10,
    paddingBottom: 8,
    padding: 5,
    overflow: "hidden",
  },

  content: {
    // backgroundColor: "green",
    padding: 10,
  },

  contentInput: {
    minHeight: 50,
    fontSize: 16,
    textAlignVertical: "top",
    textAlign: "auto",
  },

  imageContainer: {
    borderWidth: 3,
    borderRadius: 20,
    borderColor: "#660032",
    overflow: "hidden",
    width: "100%",
  },

  image: {
    flex: 1,
  },

  resImage: {
    resizeMode: "contain",
    backgroundColor: "black",
    width: "100%",
    // Without height undefined it won't work
    height: undefined,
  },

  actionsContainer: {
    flex: 1,
    minHeight: 40,
    maxHeight: 40,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  attachmentContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  actionBtnContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  postBtnContaianer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    borderRadius: 50,
    backgroundColor: "#660032",
  },
  attachmentsContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 8,
  },

  postContainer: {
    flex: 1,
    // backgroundColor: 'blue',
    justifyContent: "center",
    alignItems: "flex-end",

    paddingRight: 50,
  },
  postText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
});

export default AddPostPage;

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
