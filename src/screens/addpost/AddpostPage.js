import React, { useState, useEffect, useContext } from "react";
import { I18nManager, KeyboardAvoidingView, Alert } from "react-native";

import languages from "../../strings/LanguagesController";

import { GraphQL, Utils } from "../../../API";
import OurUser from "../../OurUser";

import LoadingHandler from "../../components/LoadingHandler";
import AddPostHeader from "./AddPostHeader";
import AddPostContent from "./AddPostContent";
import AddpostActions from "./AddPostActions";
import * as CameraPicker from "../../components/CameraPicker";
import MapViewer from "../../components/MapViewer";
import styles from "./styles";
import ThemeContext from "./../../themes/ThemeContext";

const isRTL = I18nManager.isRTL;

const AddPostPage = ({ navigation }) => {
  const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext);

  const [content, setContent] = useState("");
  const [modalStatus, setModalStatus] = useState(false);
  const [image, setImage] = useState(null);
  // const [createdDateTime, setcreatedDateTime] = useState(Date.now());

  const [isLoading, setIsLoading] = useState(false);

  const [isLost, setIsLost] = React.useState(false);
  const [isLocation, setIsLocation] = React.useState(false);

  const [region, setRegion] = useState(null);
  const [area, setArea] = useState(null);

  const onToggleIsLost = () => setIsLost(!isLost);
  const onToggleIsLocation = () => setIsLocation(!isLocation);

  let currLang = languages.currLang();
  useEffect(() => {
    currLang = languages.currLang();
  });

  const onPost = () => {
    setIsLoading(true);

    const createPost = (imagePath = null) => {
      if (!content.trim()) {
        Alert.alert("Error", "We cannot accept empty text post");
        setIsLoading(false);
        return;
      }

      const data = {
        content: content,
        area: area,
        location: isLocation ? JSON.stringify(region) : null,
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
          setIsLocation(false);
          setArea(null);

          navigation.navigate("Post");
        } else {
          //to ar
          Alert.alert("Error", res.errors.join("\n"));
        }
        setIsLoading(false);
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
    // console.log(region);
    setModalStatus(true);
  };

  //----------------------------------------------------

  return (
    <KeyboardAvoidingView
      behavior={"height"}
      keyboardVerticalOffset={"100%"}
      style={[
        styles.container,
        { width: "100%", backgroundColor: theme.primary },
      ]}
    >
      <AddPostHeader
        isLocation={isLocation}
        onToggleIsLocation={onToggleIsLocation}
        isLost={isLost}
        onToggleIsLost={onToggleIsLost}
      />

      <AddPostContent
        setContent={setContent}
        content={content}
        image={image}
        setImage={setImage}
      />

      <AddpostActions
        takeImage={() => CameraPicker.takeImage(setImage)}
        pickImage={() => CameraPicker.pickImage(setImage)}
        onLocation={onLocation}
        onPost={onPost}
      />

      <MapViewer
        status={modalStatus}
        initRegion={
          region || {
            latitude: 25.300946829658887,
            latitudeDelta: 0.6631861591450701,
            longitude: 51.465748474001884,
            longitudeDelta: 0.3281260281801224,
          }
        }
        onSetLocation={(region, area) => {
          console.log(region);
          setRegion(region);
          setArea(area);
          setIsLocation(true);
          setModalStatus(false);
        }}
        onCancel={() => {
          setModalStatus(false);
        }}
      />

      <LoadingHandler
        status={isLoading}
        onImmediateBreak={() => setIsLoading(false)}
      />
    </KeyboardAvoidingView>
  );
};

export default AddPostPage;
