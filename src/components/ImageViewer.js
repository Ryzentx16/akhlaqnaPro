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
import ImageColors from "react-native-image-colors";

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
  // const [dominantColor, setDominantColor] = useState("#d2d2d2");

  // useEffect(() => {
  //   console.log(uri);
  //   async function fetchDominantColor() {
  //     try {
  //       const colors = await ImageColors.getColors(uri, {
  //         fallback: "#d2d2d2",
  //         quality: "low",
  //       });

  //       // Set the dominant color
  //       setDominantColor(colors.dominant);
  //     } catch (error) {
  //       console.error("Error fetching dominant color:", error);
  //     }
  //   }

  //   fetchDominantColor();
  // }, []);

  // function isColorDark(color) {
  //   const hex = color.replace("#", "");
  //   const r = parseInt(hex.slice(0, 2), 16);
  //   const g = parseInt(hex.slice(2, 4), 16);
  //   const b = parseInt(hex.slice(4, 6), 16);
  //   const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  //   return brightness < 128;
  // }

  // const iconColor = isColorDark(dominantColor) ? "#ffffff" : "#000000";

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
          <Fontisto name={"close"} size={26} color={"white"} />
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
    // alignSelf: "flex-end",
    marginTop: 20,
    right: 20,
    borderRadius: 99,
    backgroundColor: "black",
  },
});

export default ImageViewer;
