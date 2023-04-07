import React, { useState, useEffect, useRef } from "react";
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
  ActivityIndicator,
  Button,
  Alert,
  Switch,
} from "react-native";
import UserAvatar from "@muhzi/react-native-user-avatar";
import {
  FontAwesome,
  MaterialIcons,
  Entypo,
  Ionicons,
  AntDesign,
} from "react-native-vector-icons";

import * as ImagePicker from "expo-image-picker";
import MapView from "react-native-maps";
import Modal from "react-native-modal";

import users from "../data/users";

import languages from "../strings/LanguagesController";

import { GraphQL, Utils } from "../../API";
import ImageViewer from "../components/ImageViewer";
import GetMap from "../components/GetMap";
import OurUser from "../OurUser";
import domain from "../../API/domain";

import LoadingHandler from "../components/LoadingHandler";

const isRTL = I18nManager.isRTL;

const AddPostPage = ({ navigation }) => {
  const [content, setContent] = useState(null);
  const [modalStatus, setModalStatus] = useState(false);
  const [image, setImage] = useState(null);
  // const [createdDateTime, setcreatedDateTime] = useState(Date.now());

  const [isLoading, setIsLoading] = useState(false);

  const [isLost, setIsLost] = React.useState(false);

  const [region, setRegion] = useState({
    latitude: 25.300946829658887,
    latitudeDelta: 0.6631861591450701,
    longitude: 51.465748474001884,
    longitudeDelta: 0.3281260281801224,
  });

  const onToggle = () => setIsLost(!isLost);

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
        quality: 0.4, // adjust the quality to reduce file size
        exif: false, // ignore EXIF data to prevent image rotation
      }).catch((er) => console.error(er));

      if (!result.canceled) {
        setImage(result.assets[0]);
      } else {
        console.log("cancelled");
      }
    }
  };

  const onPost = () => {
    setIsLoading(true);
    const createPost = (imagePath = null) => {
      if (!content) {
        Alert.alert("Error", "We cannot accept empty text post");
        setIsLoading(false);
        return;
      }

      const data = {
        content: content,
        area: "Alrayan - Alshafie",
        location: JSON.stringify(region),
        userId: OurUser.user.id,
        postTypes: isLost ? 2 : 3,
      };

      if (imagePath) {
        data.image = imagePath;
      }

      GraphQL.PostApiLogic.Queries.Create(data).then((res) => {
        if (res.success) {
          setContent("");
          setImage(null);
          setIsLoading(false);
          navigation.navigate("Post");
        } else {
          //to ar
          Alert.alert("Error", res.errors.join("\n"));
        }
      });
    };

    if (image) {
      Utils.Uploader.Image(image.uri, "post", true).then((res) => {
        createPost(res);
      });
    } else {
      createPost();
    }
    // setIsLoading(false);
  };

  //----------------------------------------------------

  const onLocation = () => {
    setModalStatus(true);
  };

  //----------------------------------------------------

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
        <View style={[styles.headContainer]}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.avatarContainer}>
              <UserAvatar
                size={55}
                src={`${domain}/download/` + OurUser.user.profileImage}
                fontSize={20}
              />
            </View>
            <View style={styles.headerDetailsContainer}>
              <Text style={styles.userName}>
                {OurUser.user.firstName + " " + OurUser.user.lastName}
              </Text>
            </View>
          </View>

          <View
            style={{
              width: 120,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 20,
              flexDirection: "row",
            }}
          >
            <Switch
              value={isLost}
              onValueChange={onToggle}
              thumbColor={isLost ? "#660032" : "#660032"}
              trackColor={{ false: "#767577", true: "#660032" }}
              style={{ marginRight: 10 }}
            />

            {isLost ? (
              <AntDesign name="questioncircle" size={30} color={"#660032"} />
            ) : (
              <Ionicons name="checkmark-circle" size={35} color={"#660032"} />
            )}
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
              <ImageViewer
                uri={image.uri}
                isFullScreen={false}
                maxHeight={400}
                imageHeight={image.height}
                imageWidth={image.width}
                isUpload={true}
                onCancel={() => setImage(null)}
                style={{ backdropColor: "black" }}
              />
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
        onBackButtonPress={() => setModalStatus(false)} //test
        isVisible={modalStatus}
        animationIn={"zoomIn"}
        animationOut={"zoomOut"}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        onBackdropPress={() => setModalStatus(false)}
        backdropColor={"#4b4b4a"}
        backdropOpacity={0.9}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <GetMap
          initRegion={region}
          onSetLocation={(region) => {
            setRegion(region);
            setModalStatus(false);
          }}
        />
      </Modal>

      <LoadingHandler status={isLoading} onImmediateBreak={() => setIsLoading(false)}/>
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
    // borderColor: "#660032",
    overflow: "hidden",
    width: "100%",
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

  pinIcon: {
    position: "absolute",
    // backgroundColor: "red",
    alignSelf: "center",
  },
});

export default AddPostPage;

{
  /* <MapView
            ref={mapViewRef}
            style={{ height: "100%", width: "100%" }}
            loadingEnabled={true}
            onRegionChangeComplete={async (region) => {
              setRegion(region);
            }}
            initialRegion={{
              latitude: 25.300946829658887,
              latitudeDelta: 0.6631861591450701,
              longitude: 51.465748474001884,
              longitudeDelta: 0.3281260281801224,
            }}
            // onPress={async (e) => {
            //   console.log(address);
            // }}
            onMapReady={async (e) => {
              setAddress(
                await mapViewRef.current.addressForCoordinate({
                  latitude: region.latitude,
                  longitude: region.longitude,
                })
              );
            }}
          />
          <View style={styles.pinIcon}>
            <Entypo name={"location-pin"} size={40} color={"#660032"} />
          </View>
          <View style={{ position: "absolute", top: 0, left: 0 }}>
            <Text>{`country: ${address.country} \n locality: ${address.locality} \n subLocality: ${address.subLocality}`}</Text>
          </View>
          <View style={{ position: "absolute", bottom: 0, right: 0 }}>
            <Button
              title="getAddress"
              onPress={async () => {
                setAddress(
                  await mapViewRef.current.addressForCoordinate({
                    latitude: region.latitude,
                    longitude: region.longitude,
                  })
                );

                console.log(address);
              }}
            />
          </View> */
}
