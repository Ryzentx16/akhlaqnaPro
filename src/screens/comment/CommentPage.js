import React, { useMemo, useRef, useState, useEffect, useContext } from "react";
import { View, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import CommentCard from "./CommentCard";
import { GraphQL, Utils } from "../../../API";
import PaginationListView from "../../components/PaginationListView";
import BottomSheetHandler from "../../components/BottomSheetHandler";
import OurUser from "../../OurUser";
import * as CameraPicker from "../../components/CameraPicker";
import ThemeContext from "../../themes/ThemeContext";

export default function CommentPage(props) {
  const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext);

  const { post, isClosed } = props;
  const [isSend, setIsSend] = useState(false);
  const [image, setImage] = useState(null);

  const retrieveData = async (params) => {
    params.postId = post.id;
    const result = await GraphQL.CommentApiLogic.Queries.Retrieve(params);

    return result;
  };

  const onSend = async (message) => {
    setIsSend(true);
    const createComment = (imagePath = null) => {
      if (!message) {
        Alert.alert("Error", "We cannot accept empty text comment");
        return;
      }

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
      onPickImage={() => CameraPicker.pickImage(setImage)}
      onTakeImage={() => CameraPicker.takeImage(setImage)}
      InputBox={onSend}
      post={post}
      onClose={isClosed}
      image={image} // image to show in InputBox
      onCancel={() => setImage(null)}
    >
      <View
        style={[
          commentsStyles.container,
          { backgroundColor: isDarkMode ? theme.backColor : "#c8c7c8" },
        ]}
      >
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
