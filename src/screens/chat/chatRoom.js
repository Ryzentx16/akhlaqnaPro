import React from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import ChatMessage from "./ChatMessage";
import chatRoomData from "../../data/chatRoomData";
import InputBox from "./inputBox";

export default function ChatRoom({route}) {
  // console.log(route.params);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.messgaesContainer}>
        <FlatList
          data={chatRoomData[0].messages}
          style={styles.scrollContainer}
          keyExtractor={(item, index) => index}
          renderItem={(item, index) => {
            return <ChatMessage key={index} message={item.item} myId={"u1"} />;
          }}
          inverted
        />
      </View>
      <InputBox />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#CCCCCC",
  },

  messgaesContainer: {
    flex: 1,
  },
  
  scrollContainer: {
    flex: 1,
  },
});
