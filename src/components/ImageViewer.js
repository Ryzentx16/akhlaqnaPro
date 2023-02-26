import React, { useState, useEffect } from "react";
import {
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import ImageModal from "./ImageModal";
import { Fontisto } from "react-native-vector-icons";

const ImageViewer = (props) => {
  const {
    uri,
    isFullScreen,
    imageHeight,
    imageWidth,
    maxHeight,
    isUpload,
    onCancel,
  } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <>
      {isFullScreen ? (
        <TouchableWithoutFeedback
          onPress={() => setIsModalVisible(true)}
          style={[styles.imageContainer]}
        >
          <View style={{ flex: 1 }}>
            <Image
              style={[styles.postImage, { height: maxHeight }, props.style]}
              source={{ uri: uri }}
              onLoadStart={() => setIsImageLoading(true)}
              onLoadEnd={() => setIsImageLoading(false)}
            />
            {isImageLoading && (
              <View
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  opacity: 0.8,
                  backgroundColor: "black",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size="large" color="#FFD700" />
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <View style={[styles.imageContainer]}>
          <Image
            style={[styles.postImage, { height: maxHeight }, props.style]}
            source={{ uri: uri }}
          />
        </View>
      )}

      {isFullScreen && (
        <ImageModal
          status={isModalVisible}
          uri={uri}
          imageWidth={imageWidth}
          imageHeight={imageHeight}
          onCancel={() => setIsModalVisible(false)}
        />
      )}

      {isUpload && (
        <TouchableOpacity
          style={styles.closeButtonContainer}
          onPress={onCancel}
        >
          <Fontisto name={"close"} size={20} color={"#d2d2d2"} />
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },

  postImage: {
    flex: 1,
    height: 240,
    width: null,
    // resizeMethod: "auto",
    resizeMode: "stretch",
    // backgroundColor: "black",
  },

  closeButtonContainer: {
    position: "absolute",
    alignSelf: "flex-end",
    margin: "5%",
    // backgroundColor: "green",
  },
});

export default ImageViewer;
