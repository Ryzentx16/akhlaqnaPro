import React, { useState } from "react";
import { Button, StyleSheet, View, ActivityIndicator } from "react-native";
import Modal from "react-native-modal";
import { WebView } from "react-native-webview";
import LoadingHandler from "./LoadingHandler";

export default function WebViewerModal(props) {
  const { status, onAgree, onDisagree } = props;

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
      style={{ justifyContent: "center" }}
    >
      <View style={styles.contentContainer}>
        <WebView
          source={{ uri: "https://ryzentx.000webhostapp.com/" }}
          style={{ marginTop: 20 }}
          scalesPageToFit={false}
          nestedScrollEnabled
          startInLoadingState={true}
        />
        <View
          style={{
            flexDirection: "row-reverse",
            justifyContent: "space-around",
          }}
        >
          <Button title="Agree" onPress={onAgree} color={"green"} />
          <Button title="Disagree" onPress={onDisagree} color={"red"} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});
