import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import Modal from "react-native-modal";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default function LoadingHandler(props) {
  var { status, onImmediateBreak } = props;
  const [counter, setCounter] = useState(1);
  const [immediateBreak, setImmediateBreak] = useState(false);

  useEffect(() => {
    console.log("enter" + counter);
    if (counter % 10 === 0) {
      setImmediateBreak(true);
      onImmediateBreak();
      setTimeout(() => {
        setImmediateBreak(false);
        console.log("false done");
      }, 4000);
      status = false;
      console.log("set");
    }
  }, [counter]);

  return (
    <Modal
      isVisible={!immediateBreak ? status : false}
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
      <Pressable
        style={styles.contentContainer}
        onPress={() => setCounter(counter + 1)}
      >
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
      </Pressable>
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
    height: deviceHeight,
    width: deviceWidth,
  },
});
