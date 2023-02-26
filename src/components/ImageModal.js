import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import { Fontisto } from "react-native-vector-icons";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";

// const deviceWidth = Dimensions.get("window").width;
// const deviceHeight = Dimensions.get("window").height;

export default function ImageModal(props) {
  const { status, postImage, onCancell } = props;
  //   const [isModalVisible, setIsModalVisible] = useState(status);
  // console.log(postImage);
  const image = Image.resolveAssetSource(postImage);
  // console.log(image);
  return (
    <Modal
      isVisible={status}
      animationIn={"zoomIn"}
      animationOut={"zoomOut"}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      onBackdropPress={onCancell}
      onBackButtonPress={onCancell}
      onSwipeComplete={onCancell}
      swipeDirection={["up", "down"]}
      backdropColor={"#4b4b4a"}
      backdropOpacity={0.9}
    >
      <View style={styles.contentContainer}>
        <ReactNativeZoomableView
          maxZoom={8}
          minZoom={0.7}
          style={styles.zoomAbleContainer}
        >
          <View style={styles.modalImageContainer}>
            <Image
              source={{ uri: image.uri }}
              style={[
                styles.modalImage,
                {
                  aspectRatio: image.width / image.height,
                },
              ]}
            />
          </View>
        </ReactNativeZoomableView>
        <TouchableOpacity
          style={styles.closeButtonContainer}
          onPress={onCancell}
        >
          <Fontisto name={"close"} size={40} color={"#d2d2d2"} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    // backgroundColor: "red",
    // justifyContent: "center",
    // alignItems: "center",
  },

  closeButtonContainer: {
    position: "absolute",
    alignSelf: "flex-end",
    // backgroundColor: "green",
  },

  zoomAbleContainer: {
    // flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    // backgroundColor: "black",
  },
  modalImageContainer: {
    borderRadius: 23,
    justifyContent: "center",
    overflow: "hidden",
    // borderColor: "green",
    // borderWidth: 4,
  },

  modalImage: {
    resizeMode: "contain",
    backgroundColor: "black",
    width: "100%",
    // Without height undefined it won't work
    height: undefined,
  },
});
