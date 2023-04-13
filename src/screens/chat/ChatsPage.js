import React, { useContext, useEffect, useState } from "react";
import { BackHandler, View, StyleSheet, Text } from "react-native";

import OurUser from "../../OurUser";
import { GraphQL } from "../../../API";
import ChatListView from "./ChatListView";

import BottomSheetHandler from "../../components/BottomSheetHandler";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { TouchableOpacity } from "react-native";
import languages from "../../strings/LanguagesController";
import ThemeContext from "./../../themes/ThemeContext";

let currLang = languages.currLang();

export default function ChatsPage({ navigation }) {
  const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext);

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  });

  const retrieveData = async (params) => {
    params.userId = OurUser.user.id;
    const result = await GraphQL.ChatApiLogic.Rooms.Queries.Retrieve(params);
    return result;
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.backColor }}>
      <ChatListView
        retrieveData={retrieveData}
        navigation={navigation}
        perPage={10}
        onChatEdit={setIsEdit}
      />
      {isEdit && (
        <BottomSheetHandler
          backgroundStyle={{ backgroundColor: theme.primary }}
          snaps={["40%"]}
          onClose={setIsEdit}
        >
          <View
            style={[
              BottomSheetStyle.background,
              { backgroundColor: theme.backColor },
            ]}
          >
            <TouchableOpacity style={BottomSheetStyle.removeContainer}>
              <View style={BottomSheetStyle.removeIcon}>
                <MaterialCommunityIcons
                  size={30}
                  name={"chat-remove"}
                  color={theme.secondary}
                />
              </View>
              <View style={BottomSheetStyle.remove}>
                <Text
                  style={{
                    color: theme.largeText,
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {currLang.chatpage.bottomesheet.remove}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={BottomSheetStyle.blockContainer}>
              <View style={BottomSheetStyle.blockIcon}>
                <MaterialCommunityIcons
                  size={30}
                  name={"block-helper"}
                  color={theme.secondary}
                />
              </View>

              <View style={BottomSheetStyle.block}>
                <Text
                  style={{
                    color: theme.largeText,
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {currLang.chatpage.bottomesheet.block}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </BottomSheetHandler>
      )}
    </View>
  );
}

const BottomSheetStyle = StyleSheet.create({
  background: {
    flex: 1,
    margin: 10,
    backgroundColor: "white", //k
    borderRadius: 15,
  },
  removeContainer: {
    flex: 1,
    // backgroundColor: "lightblue", //k
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  remove: {},
  removeIcon: {},

  blockContainer: {
    flex: 1,
    // backgroundColor: "yellow", //k
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
  },
  block: {},
  blockIcon: {},
});
