import React, {useEffect} from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  I18nManager,
} from "react-native";
import UserAvatar from "@muhzi/react-native-user-avatar";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppHeader from "../../components/AppHeader";
import languages from "../../strings/LanguagesController";
// import ar from "../../strings/ar";
// import HeaderSection from "../Classes/headerSection";

const isRTL = I18nManager.isRTL;
// const currLang = languages.currLang();

export default function SettingPage({ navigation }) {
  const onAccount = () => {
    navigation.navigate("AccountPage");
  };
  const onLanguage = () => {
    navigation.navigate("LanguagePage");
  };
  const onChats = () => {
    navigation.navigate("ChatsSettingPage");
  };

  let currLang = languages.currLang();
  useEffect(() => {
    currLang = languages.currLang();
  });

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} isDrawer={true} />

      <View style={styles.bodyContainer}>
        <View style={styles.accountInfoContainer}>
          <View style={styles.avatarContainer}>
            <UserAvatar
              size={100}
              src={"http://ryzentx.online/myProfileExample.png"}
            />
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>Abdulrahman .M</Text>
          </View>
        </View>
        <View style={styles.btnsBody}>
          <TouchableOpacity style={styles.accountContainer} onPress={onAccount}>
            <View style={styles.iconAccountContainer}>
              <Ionicons size={60} name={"person-circle"} color={"#660032"} />
            </View>
            <View style={styles.textAccountContainer}>
              <Text style={styles.text}>{currLang.settingPage.account}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.languageContainer}
            onPress={onLanguage}
          >
            <View style={styles.iconLanguageContainer}>
              <Ionicons size={50} name={"language"} color={"#660032"} />
            </View>
            <View style={styles.textLanguageContainer}>
              <Text style={styles.text}>{currLang.settingPage.language}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.chatsContainer} onPress={onChats}>
            <View style={styles.iconChatsContainer}>
              <Ionicons size={45} name={"chatbubbles"} color={"#660032"} />
            </View>
            <View style={styles.textChatsContainer}>
              <Text style={styles.text}>{currLang.settingPage.chats}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  bodyContainer: {
    flex: 1,
    // backgroundColor: 'red',

    marginBottom: "65%",
  },
  accountInfoContainer: {
    flex: 1,
    // backgroundColor: 'green',

    borderColor: "#660032",
    borderBottomWidth: 3,
    borderRadius: 43,

    flexDirection: "row",
  },
  avatarContainer: {
    flex: 1,
    // backgroundColor: 'yellow',

    justifyContent: "center",
    alignItems: "center",
  },
  nameContainer: {
    flex: 2,
    // backgroundColor: 'grey',

    justifyContent: "center",
    // alignItems: 'center'

    // paddingLeft: 15,
  },
  name: {
    fontSize: 26,
    color: "#660032",
    textAlign: "left",
  },

  btnsBody: {
    flex: 2,
    // backgroundColor: 'blue',

    marginTop: 17,
    paddingHorizontal: 17,
  },
  accountContainer: {
    flex: 1,
    // backgroundColor: 'yellow',

    flexDirection: "row",
  },
  iconAccountContainer: {
    flex: 1,
    // backgroundColor: 'red',
    justifyContent: "center",
    alignItems: "center",
  },
  textAccountContainer: {
    flex: 3,
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    color: "#660032",
    textAlign: "left",
  },
  languageContainer: {
    flex: 1,
    // backgroundColor: 'grey',
    flexDirection: "row",
  },
  iconLanguageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textLanguageContainer: {
    flex: 3,
    justifyContent: "center",
  },
  chatsContainer: {
    flex: 1,
    // backgroundColor: 'lightblue',
    flexDirection: "row",
  },
  iconChatsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textChatsContainer: {
    flex: 3,
    justifyContent: "center",
  },
});
