import react, { useState } from "react";

import { Button, ScrollView, Text, TextInput, View } from "react-native";
import Modal from "react-native-modal";

export default function UserBackModal(props) {
  const { status, phoneNumber, onCancel } = props;

  return (
    <Modal
      isVisible={status}
      animationIn={"zoomIn"}
      animationOut={"zoomOut"}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      backdropColor={"#4b4b4a"}
      backdropOpacity={0.9}
    >
      <View
        style={{
          width: "100%",
          maxHeight: "50%",
          minHeight: "50%",
          backgroundColor: "white",
        }}
      >
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 22,
                color: "#660032",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Looks like you have logged in before!
            </Text>
          </View>
          <View style={{ flex: 3, padding: 8 }}>
            <Text style={{ fontSize: 14, color: "#660032" }}>
              {`If you want to log in with this number (${phoneNumber}) again without password, please check the box and enter your password`}
            </Text>

            {props.children[0]}

            <View
              style={{
                flexDirection: "row",
                marginLeft: 15,
                marginVertical: 15,
              }}
            >
              {props.children[2]}
              <Text>Do you want an automatic login next time ?</Text>
            </View>

            {/* <Button title="Save and Login" onPress={onCancel} /> */}
            {props.children[1]}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
