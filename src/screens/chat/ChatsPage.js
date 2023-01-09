import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import chats from "../../data/chats";
import ChatCard from "./ChatCard";

function prepareTempData() {
  let chatList = [];

  for (let i = 0; i < chats.length * 5; i++) {
    let chat = chats[i % chats.length];

    chatList.push(chat);
  }

  return chatList;
}

export default function ChatsPage({ navigation }) {
  let chatList = prepareTempData();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.scrollContainer}
        data={chatList}
        renderItem={(item, index) => {
          return <ChatCard key={index} data={item.item} />;
        }}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },

  scrollContainer: {
    flex: 1,
    paddingRight: 15,
    paddingLeft: 10,
  },
});

{
  /* <View style={styles.chatsSection}>
<ScrollView showsVerticalScrollIndicator={false}>{chatList}</ScrollView>
</View> */
}
