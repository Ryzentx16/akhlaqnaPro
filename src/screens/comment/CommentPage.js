import React, { useMemo, useRef, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import CommentCard from "./CommentCard";
import { GraphQL, Utils } from "../../../API";
import PaginationListView from "../../components/PaginationListView";
import BottomSheetHandler from "../../components/BottomSheetHandler";
import OurUser from "../../OurUser";

export default function CommentPage(props) {
  const { post, isClosed } = props;
  const [isSend, setIsSend] = useState(false);
  const [image, setImage] = useState(null);

  const retrieveData = async (params) => {
    params.postId = post.id;
    const result = await GraphQL.CommentApiLogic.Queries.Retrieve(params);

    return result;
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
      Utils.Uploader.Image(image.uri, "comment", true).then(async (res) => {
        createComment(res);
      });
    } else {
      createComment();
    }
    setImage(null);
  };

  return (
    <BottomSheetHandler
      onPickImage={pickImage}
      onTakeImage={takeImage}
      InputBox={onSend}
      post={post}
      onClose={isClosed}
      image={image} // image to show in InputBox
      onCancel={() => setImage(null)}
    >
      <View style={commentsStyles.container}>
        <View style={commentsStyles.commentsContainer}>
          <PaginationListView
            perPage={5}
            retrieveData={retrieveData}
            renderItem={(item, index) => {
              return (
                <CommentCard
                  comment={item.item}
                  key={index}
                  onReply={(user) => {
                    setTiPlaceHolder(`Replying to ${user.name}`);
                    setIsFocus(true);
                  }}
                />
              );
            }}
            isBottomSheet={true}
            isSend={isSend}
            isHideRefreshAnimation={true}
          />
        </View>
      </View>
    </BottomSheetHandler>
  );
}

const commentsStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
    paddingTop: 17,
    backgroundColor: "#c8c7c8",
    // backgroundColor: "lightblue",
  },

  commentsContainer: {
    flex: 1,
  },

  scrollContainer: {
    flex: 1,
  },
});
