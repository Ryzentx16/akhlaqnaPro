import React, { useState, useRef, useEffect } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  I18nManager,
  Alert,
  BackHandler,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import DateTimePicker from "@react-native-community/datetimepicker";

import PhoneInput from "react-native-phone-number-input";

import languages from "../../strings/LanguagesController";
import { useNavigation } from "@react-navigation/native";
import { GraphQL, Utils } from "../../../API";
import LoadingHandler from "../../components/LoadingHandler";
import WebViewerModal from "../../components/WebViewerModal";
import OurUser from "../../OurUser";
import UserAvatar from "@muhzi/react-native-user-avatar";
import * as ImagePicker from "expo-image-picker";
import domain from "../../../API/domain";

const windowHeight = Dimensions.get("window").height;
const isRTL = I18nManager.isRTL;
const isEdit = false;

export default function EditProfilePage({ navigation, route }) {
  const ourUser = route.params?.user;
  const globleNavigation = useNavigation();
  const inputMaxLength = 55;

  const [modalStatus, setModalStatus] = useState(false);
  const [firstName, setFirstName] = useState(ourUser?.firstName);
  const [lastName, setLastName] = useState(ourUser?.lastName);
  const [profileImage, setProfileImage] = useState(ourUser?.profileImage);

  let currLang = languages.currLang();
  useEffect(() => {
    currLang = languages.currLang();

    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  });

  const vaildateSubmit = () => {
    let isFilled = firstName !== "" && lastName !== "";

    return isFilled;
  };

  const onImage = async () => {
    var image = null;

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        image = result.assets[0];
      } else {
        console.log("cancelled");
      }
    };
    await pickImage();

    if (!!image) {
      await Utils.Uploader.Image(image.uri, "user", true).then((res) => {
        setProfileImage(res);
      });
    }
  };

  const onSubmit = () => {
    setModalStatus(true);
    if (!vaildateSubmit()) {
      setModalStatus(false);
      Alert.alert(
        // TODO: change it to ar
        "Error",
        "Please fill it up with your information "
      );
      return;
    }

    var data = {
      phoneNumber: ourUser.phoneNumber,
      input: {
        firstName: firstName,
        lastName: lastName,
        profileImage: profileImage,
      },
    };

    GraphQL.UserApiLogic.Queries.Edit(data).then((res) => {
      setModalStatus(false);
      console.log(res);
      if (res.success) {
        Alert.alert(
          currLang.edituserPage.editalert.title,
          currLang.edituserPage.editalert.content
        );
        globleNavigation.dispatch(
          globleNavigation.reset({
            index: 0,
            routes: [{ name: "LoginPage" }],
          })
        );
      } else {
        //to ar
        Alert.alert("Error", res.errors.join("\n"));
      }
    });
    setModalStatus(false);
  };

  const onLogin = () => {
    globleNavigation.dispatch(
      globleNavigation.reset({
        index: 0,
        routes: [{ name: "LoginPage" }],
      })
    );
  };

  return (
    <View style={styles.background}>
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        contentContainerStyle={{
          flex: 1,
          minHeight: windowHeight,
          maxHeight: windowHeight,
        }}
      >
        <View style={styles.logoSection}>
          <View style={styles.logo}>
            <Image
              source={require("../../../assets/Logo.png")}
              style={styles.imageLogo}
            />
          </View>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{currLang.edituserPage.title}</Text>
        </View>

        <View style={styles.inputsContainer}>
          <Text
            style={{
              color: "#660032",
              fontSize: 14,
              fontWeight: "bold",
              alignSelf: "center",
            }}
          >
            Click on the picture to change it
          </Text>
          <TouchableOpacity style={styles.profileContainer} onPress={onImage}>
            <UserAvatar
              src={`${domain}/download/` + profileImage}
              size={185}
              style={styles.profileIcon}
            />
          </TouchableOpacity>
          <View style={styles.usernameContainer}>
            <View style={styles.firstnameContainer}>
              <View style={styles.firstname}>
                <TextInput
                  maxLength={inputMaxLength}
                  placeholder={currLang.edituserPage.firstname + " *"}
                  placeholderTextColor={"rgba(102,0,50,0.75)"}
                  value={firstName}
                  onChangeText={(text) => {
                    setFirstName(text);
                  }}
                  style={{
                    flex: 1,
                    textAlign: isRTL ? "right" : "left",
                    // backgroundColor: "red",
                  }}
                />
              </View>
            </View>
            <View style={styles.lastnameContainer}>
              <View style={styles.lastname}>
                <TextInput
                  maxLength={inputMaxLength}
                  placeholder={currLang.edituserPage.lastname + " *"}
                  placeholderTextColor={"rgba(102,0,50,0.75)"}
                  value={lastName}
                  onChangeText={(text) => {
                    setLastName(text);
                  }}
                  style={{
                    flex: 1,
                    textAlign: isRTL ? "right" : "left",
                    // backgroundColor: "red",
                  }}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.actionContainer}>
          <View style={styles.loginContainer}>
            <TouchableOpacity style={styles.login} onPress={onLogin}>
              <Text style={{ fontSize: 14, color: "#660032" }}>
                {currLang.edituserPage.login}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.submitContainer}>
            <TouchableOpacity style={styles.submit} onPress={onSubmit}>
              <Text style={{ fontSize: 20, color: "white" }}>
                {currLang.edituserPage.submit}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <LoadingHandler
        status={modalStatus}
        onImmediateBreak={() => setModalStatus(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
  },

  logoSection: {
    flex: 1,
    maxHeight: "26%",
    minHeight: "26%",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: isEdit ? "red" : "white",
    // backgroundColor: "grey",
  },
  logo: {
    height: 125,
    width: 125,
    borderColor: "#660032",
    borderWidth: 2,
    borderRadius: 150 / 2,

    alignItems: "center",
    justifyContent: "center",
  },
  imageLogo: {
    // alignSelf: 'center',
    height: 87,
    width: 57,

    // marginTop: 12,
    marginLeft: isRTL ? -5 : 5,
  },

  titleContainer: {
    flex: 1,
    maxHeight: "6%",
    minHeight: "6%",
    backgroundColor: isEdit ? "green" : "white",
    paddingTop: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    color: "#660032",
  },

  inputsContainer: {
    flex: 1,
    maxHeight: 355,
    minHeight: 355,
    backgroundColor: isEdit ? "blue" : "white",
    // marginHorizontal: '5%',
    paddingVertical: 20,
  },
  usernameContainer: {
    flex: 1,
    maxHeight: "15%",
    minHeight: "15%",
    flexDirection: isRTL ? "row-reverse" : "row",
    // backgroundColor: "",
    backgroundColor: isEdit ? "#578978" : "white",
    alignItems: "flex-end",
    justifyContent: "center",
    marginBottom: 18,
    paddingHorizontal: 20,
  },
  firstnameContainer: {
    flex: 1,
    marginRight: 5,
    // backgroundColor: "red",
  },
  firstname: {
    flex: 1,
    maxHeight: 50,
    minHeight: 50,

    borderWidth: 2,
    borderColor: "#660032",
    borderRadius: 50,

    justifyContent: "center",

    paddingHorizontal: 16,
    padding: 4,
  },
  lastnameContainer: {
    flex: 1,
    marginLeft: 5,
  },
  lastname: {
    flex: 1,

    borderWidth: 2,
    borderColor: "#660032",
    borderRadius: 50,

    justifyContent: "center",

    paddingHorizontal: 16,
    padding: 4,
  },
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 10,
  },
  profileIcon: {
    // backgroundColor: "red",
  },

  actionContainer: {
    flex: 1,
    maxHeight: 100,
    minHeight: 100,
    flexDirection: "column-reverse",

    backgroundColor: isEdit ? "lightblue" : "white",
    marginTop: 30,
    justifyContent: "space-around",
    alignItems: "center",
  },
  loginContainer: {
    flex: 1,
    width: 140,
    maxHeight: 30,
    minHeight: 30,
    justifyContent: "center",
    alignItems: "center",

    borderColor: "#660032",

    borderWidth: 2,
    borderRadius: 20,
  },
  login: {
    // flex: 1,
    // // alignItems: "flex-end",
    // paddingTop: 2,
    // padding: 8,
  },

  submitContainer: {
    flex: 1,
    width: 220,
    maxHeight: 40,
    minHeight: 40,
    borderRadius: 20,

    backgroundColor: "#660032",
    justifyContent: "center",
    alignItems: "center",
  },
  submit: {
    // flex: 1,
    // alignItems: "flex-start",
    // paddingTop: 10,
    // padding: 8,
  },
});
