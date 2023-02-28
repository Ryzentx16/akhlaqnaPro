import React, { useState } from "react";
import { StyleSheet, View, Dimensions, ActivityIndicator } from "react-native";
import Modal from "react-native-modal";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default function LoadingHandler(props) {
  const { status } = props;

  return (
    <Modal
      isVisible={status}
      animationIn={"flash"}
      animationOut={"flash"}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      //   onBackdropPress={onCancel}
      //   onBackButtonPress={onCancel}
      //   onSwipeComplete={onCancel}
      swipeDirection={["up", "down"]}
      backdropColor={"grey"}
      backdropOpacity={0.4}
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <View style={styles.contentContainer}>
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
    maxHeight: deviceHeight,
    minHeight: deviceHeight,
    maxWidth: deviceWidth,
    minWidth: deviceWidth,
  },
});
