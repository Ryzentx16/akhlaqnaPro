import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  I18nManager,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import posts from "../../data/posts";
import languages from "../../strings/LanguagesController";
import UserAvatar from "@muhzi/react-native-user-avatar";
import OurUser from "../../OurUser";

import { useNavigation } from "@react-navigation/native";
import PostListView from "../post/PostListView";
import { GraphQL } from "../../../API";
import domain from "../../../API/domain";
import LoadingHandler from "../../components/LoadingHandler";
import ThemeContext from "../../themes/ThemeContext";
import { OriginalColors } from "../../components/AmantiButtons";

const isRTL = I18nManager.isRTL;

export default function PersonProfile({ navigation, route }) {
  const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext);

  const user = route.params?.user;
  const isDrawer = route.params?.isDrawer;
  const globleNavigation = useNavigation();
  const isUserMe = route.params?.isMe;
  const [modalStatus, setModalStatus] = useState(false);

  let currLang = languages.currLang();
  useEffect(() => {
    currLang = languages.currLang();
  });

  const onEdit = () => {
    // Alert.alert("Sorry!", "Coming Soon");

    Alert.alert(
      currLang.languagepage.applychangealert.title,
      currLang.languagepage.applychangealert.content,
      [
        {
          text: currLang.languagepage.applychangealert.buttons.yessingout,
          onPress: () => {
            OurUser.logOut(() => {
              navigation.dispatch(
                navigation.reset({
                  index: 1,
                  routes: [{ name: "LoginPage" }, { name: "EditProfile" }],
                })
              );
            });
          },
        },
        {
          text: currLang.languagepage.applychangealert.buttons.cancel,
          onPress: null,
        },
      ]
    );
  };

  const onImage = () => {
    setIsModalOpen(true);
  };

  const retrieveData = async (params) => {
    params.userId = user.id;
    params.conditionUserId = user.id;

    const result = await GraphQL.PostApiLogic.Queries.Retrieve(params);

    return result;
  };

  const messagePerson = () => {
    setModalStatus(true);
    var data = {
      user1Id: OurUser.user.id,
      user2Id: user.id,
    };

    GraphQL.ChatApiLogic.Rooms.Queries.Create(data).then((res) => {
      setModalStatus(false);
      if (res.success || res.roomId) {
        navigation.navigate("Chat", {
          screen: "ChatRoom",
          initial: false,
          params: {
            roomId: res.roomId,
            chatName: user.firstName + " " + user.lastName,
            recieverId: user.id,
          },
        });
      } else {
        //to ar
        Alert.alert("Error", res.errors.join("\n"));
      }
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.backColor }}>
      {/* {<AppHeader style={{ top: -12 }} navigation={navigation} isDrawer />} */}
      <View
        style={[headerStyles.headContaienr, { backgroundColor: theme.primary }]}
      >
        <View style={[headerStyles.head, { borderColor: theme.border }]}>
          <View style={headerStyles.profileContainer}>
            <View style={styles.imageContainer}>
              <UserAvatar
                src={`${domain}/download/` + user.profileImage}
                userName={user.firstName + " " + user.lastName}
                size={80}
              />
            </View>
            <View style={headerStyles.detailsContaienr}>
              <Text style={[headerStyles.name, { color: theme.largeText }]}>
                {user.firstName + " " + user.lastName}
              </Text>
              {/* <MaterialCommunityIcons
                    name={"dots-vertical"}
                    color={"#660032"}
                    size={50}
                  /> */}
            </View>
          </View>
          <View style={headerStyles.actionContaienr}>
            {!isUserMe ? (
              <>
                {/* <TouchableOpacity
                  style={headerStyles.btnStyle}
                  onPress={messagePerson}
                >
                  <View style={headerStyles.messageButton}>
                    <Text style={headerStyles.messageText}>Message</Text>
                  </View>
                </TouchableOpacity> */}
                <OriginalColors
                  title={"Message"}
                  onPress={messagePerson}
                  textStyle={{ fontSize: 16 }}
                />
                {/* <TouchableOpacity style={headerStyles.btnStyle}>
                  <View style={headerStyles.lostAndFoundButton}>
                    <Text style={headerStyles.lostAndFoundText}>
                      Lost & Found
                    </Text>
                  </View>
                </TouchableOpacity> */}
              </>
            ) : (
              // <TouchableOpacity
              //   style={headerStyles.myBtnStyle}
              //   onPress={onEdit}
              // >
              //   <View style={headerStyles.editProfileButton}>
              //     <Text style={headerStyles.editProfileText}>Edit Profile</Text>
              //   </View>
              // </TouchableOpacity>
              <OriginalColors
                title={"Edit Profile"}
                onPress={onEdit}
                textStyle={{ fontSize: 16 }}
              />
            )}
          </View>
        </View>
      </View>
      <PostListView
        retrieveData={retrieveData}
        type={4}
        navigation={navigation}
        perPage={4}
        isProfile={true}
      />
      <LoadingHandler
        status={modalStatus}
        onImmediateBreak={() => setModalStatus(false)}
      />
    </View>
  );
}

const headerStyles = StyleSheet.create({
  headContaienr: {
    flex: 1,
    maxHeight: 170,
    minHeight: 170,
    backgroundColor: "white",
  },
  head: {
    flex: 4,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: "#660032",
  },
  profileContainer: {
    flex: 5,
    flexDirection: "row",
    // backgroundColor:'red'
  },
  detailsContaienr: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
  },
  name: {
    fontSize: 24,
    color: "#660032",
    marginTop: 10,
  },

  actionContaienr: {
    flex: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  btnStyle: {
    flex: 1,
    maxWidth: 170,
    minWidth: 170,
    justifyContent: "center",
  },
  myBtnStyle: {
    flex: 1,
    maxWidth: 170,
    minWidth: 170,
  },
  editProfileButton: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 99,
    borderWidth: 1,
    maxHeight: 30,
    minHeight: 30,
    borderColor: "#660032",
    alignItems: "center",
    // paddingLeft: isRTL ? -20 : 10,
    paddingTop: 3,
  },
  editProfileText: {
    // marginLeft: 30,
    color: "#660032",
    fontSize: 16,
  },
  messageButton: {
    flex: 1,
    borderRadius: 99,
    borderWidth: 1,
    maxHeight: 40,
    minHeight: 40,
    backgroundColor: "#660032",
    alignItems: "center",
    justifyContent: "center",
  },
  messageText: {
    // marginLeft: 30,
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
  lostAndFoundButton: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 99,
    borderWidth: 1,
    borderColor: "#660032",
    maxHeight: 40,
    alignItems: "center",
    paddingTop: 8,
  },
  lostAndFoundText: {
    // marginLeft: 30,
    color: "#660032",
    fontSize: 16,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  iconImageBackContainer: {
    flex: 1,
    // backgroundColor: 'grey',
    maxWidth: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    // backgroundColor: 'green',
  },
  postsContainer: {
    flex: 4,
    paddingBottom: 10,
    // paddingTop: 5,
    backgroundColor: "#CCCCCC",
  },
});
