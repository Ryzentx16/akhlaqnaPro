import React, { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  I18nManager,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import users from "../../data/users";

import languages from "../../strings/LanguagesController";

const windowHeight = Dimensions.get("window").height;
const isRTL = I18nManager.isRTL;
const isEdit = false;

export default function ChangePasswordPage({ navigation, route }) {
  let currLang = languages.currLang();
  useEffect(() => {
    currLang = languages.currLang();
  });

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const inputMaxLength = 55;

  const isValide = () => {
    if (newPassword === "" || confirmPassword === "") {
      return false;
    } else if (newPassword === confirmPassword) {
      return true;
    } else {
      // console.warn("result: " + )
    }

    return null;
  };

  const onSubmit = () => {
    setNewPassword("");
    setConfirmPassword("");
    isValide()
      ? navigation.dispatch(
          navigation.reset({
            index: 0,
            routes: [{ name: "LoginPage" }],
          })
        )
      : Alert.alert(
          currLang.changepasswordpage.submitalert.title,
          currLang.changepasswordpage.submitalert.content
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
        <View style={styles.headContainer}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Image
                source={require("../../../assets/Logo.png")}
                style={styles.imageLogo}
              />
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {currLang.changepasswordpage.changepasswordfor +
                "(" +
                route.params?.phoneNumber +
                ")"}
            </Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.newPasswordInput}>
            <TextInput
              maxLength={inputMaxLength}
              placeholder={currLang.changepasswordpage.createnewpassword}
              placeholderTextColor={"#660032"}
              value={newPassword}
              onChangeText={(text) => {
                setNewPassword(text);
              }}
              //   maxLength={6}
              style={{ width: "100%", textAlign: "center" }}
              secureTextEntry
            />
          </View>
          <View style={styles.confirmPasswordInput}>
            <TextInput
              maxLength={inputMaxLength}
              placeholder={currLang.changepasswordpage.confirmpassword}
              placeholderTextColor={"#660032"}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
              }}
              //   maxLength={6}
              style={{ width: "100%", textAlign: "center" }}
              secureTextEntry
            />
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <View style={styles.submitContainer}>
            <TouchableOpacity style={styles.submit} onPress={onSubmit}>
              <Text style={{ color: "white", fontSize: 15 }}>
                {currLang.changepasswordpage.submit}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
    // paddingTop: 10,
  },

  headContainer: {
    flex: 4,
    backgroundColor: isEdit ? "green" : "white",
    // marginTop: 90,
  },
  backContainer: {
    marginTop: 10,
    justifyContent: "center",
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",

    paddingBottom: 20,
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
    height: 87,
    width: 57,

    marginLeft: isRTL ? -5 : 5,
  },

  textContainer: {
    // flex: 1,
    marginBottom: 5,
    alignItems: "center",
    backgroundColor: isEdit ? "red" : "white",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#660032",
  },

  inputContainer: {
    flex: 2,
    backgroundColor: isEdit ? "#165815" : "white",
    justifyContent: "center",

    paddingHorizontal: 90,
  },
  newPasswordInput: {
    height: 47,
    // backgroundColor: 'red',

    borderColor: "#660032",
    borderWidth: 2,
    borderRadius: 50,

    paddingLeft: 15,
    padding: 10,
  },
  confirmPasswordInput: {
    height: 47,
    // backgroundColor: 'red',

    borderColor: "#660032",
    borderWidth: 2,
    borderRadius: 50,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 20,
    paddingLeft: 15,
    padding: 10,
  },

  actionsContainer: {
    flex: 4,
    backgroundColor: isEdit ? "blue" : "white",
    alignItems: "center",
  },
  submitContainer: {
    flex: 1,
    marginTop: 7,
    // justifyContent: "center",
    // paddingHorizontal: 130,
  },
  submit: {
    // flex: 1,
    maxHeight: 35,
    minHeight: 35,
    maxWidth: "22%",
    minWidth: "22%",

    backgroundColor: "#660032",

    // borderColor: "#660032",
    // borderWidth: 2,
    borderRadius: 99,

    justifyContent: "center",
    alignItems: "center",
  },
  resendContainer: {
    alignSelf: "center",
    marginTop: "30%",
    marginBottom: 10,
  },
  resend: {},
  changePhoneContainer: {
    alignSelf: "center",
  },
  changePhone: {},
});
