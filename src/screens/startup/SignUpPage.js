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

import Adding from "../../../API/Adding";
import languages from "../../strings/LanguagesController";
import { useNavigation } from "@react-navigation/native";

const windowHeight = Dimensions.get("window").height;
const isRTL = I18nManager.isRTL;
const isEdit = false;

// {
//   id: 'u1',
//   username: 'Abdulrahman',
//   name: 'Abdulrahman .M',
//   phoneNumber: '+97470031251',
//   password: "70031251",
//   profileImage: "http://ryzentx.online/myProfileExample.png",
// }

export default function SignUpPage({ navigation, route }) {
  const ourUser = route.params?.user;
  const isEditProfile = ourUser === null ? false : true;
  const globleNavigation = useNavigation();

  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const phoneInput = useRef(PhoneInput);

  const [birthday, setbirthday] = useState(new Date());

  const [firstName, setFirstName] = useState(
    isEditProfile ? ourUser.username : ""
  );
  const [lastName, setLastName] = useState(
    isEditProfile
      ? ourUser.name.charAt(ourUser.name.length - 2) +
          ourUser.name.charAt(ourUser.name.length - 1)
      : ""
  );
  const [phoneNumber, setPhoneNumber] = useState(
    isEditProfile ? ourUser.phoneNumber : ""
  );
  const [newPassword, setNewPassword] = useState(
    isEditProfile ? ourUser.password : ""
  );
  const [confirmPassword, setConfirmPassword] = useState(
    isEditProfile ? ourUser.password : ""
  );

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

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

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    setbirthday(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const vaildateSubmit = () => {
    let isFilled =
      firstName !== "" &&
      lastName !== "" &&
      phoneNumber !== "" &&
      birthday !== "" &&
      newPassword !== "" &&
      confirmPassword !== "";
    let isConfirmPassword = confirmPassword === newPassword;

    return (
      isConfirmPassword && isFilled && phoneInput.current?.isValidNumber(value)
    );
  };

  const onSubmit = () => {
    if (!isEditProfile) {
      if (!vaildateSubmit()) {
        Alert.alert(
          "Error",
          "Please fill it up with your information" +
            "\n" +
            "and use the same password on both inputs",
          [
            {
              text: "ok",
              // onPress: () => {},
            },
            {
              text: "are u a dev ?",
              onPress: () => {
                navigation.navigate("SignUpConfirmation", {
                  phoneNumber: "+97470031251",
                });
              },
            },
          ],
          "number-pad"
        );
        return;
      }

      var data = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        password: confirmPassword,
      };

      Adding("addUser", data, () => {
        navigation.navigate("SignUpConfirmation", {
          phoneNumber: data.phoneNumber,
        });
      });
    } else {
      Alert.alert(
        currLang.signupPage.editalert.title,
        currLang.signupPage.editalert.content
      );
      globleNavigation.dispatch(
        globleNavigation.reset({
          index: 0,
          routes: [{ name: "LoginPage" }],
        })
      );
    }
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
          <Text style={styles.title}>
            {isEditProfile
              ? currLang.signupPage.editprofile
              : currLang.signupPage.title}
          </Text>
        </View>

        <View style={styles.inputsContainer}>
          <View style={styles.usernameContainer}>
            <View style={styles.firstnameContainer}>
              <View style={styles.firstname}>
                <TextInput
                  placeholder={currLang.signupPage.firstname + " *"}
                  placeholderTextColor={"rgba(102,0,50,0.75)"}
                  value={firstName}
                  onChangeText={(text) => {
                    setFirstName(text);
                  }}
                  style={{ textAlign: isRTL ? "right" : "left" }}
                />
              </View>
            </View>
            <View style={styles.lastnameContainer}>
              <View style={styles.lastname}>
                <TextInput
                  placeholder={currLang.signupPage.lastname + " *"}
                  placeholderTextColor={"rgba(102,0,50,0.75)"}
                  value={lastName}
                  onChangeText={(text) => {
                    setLastName(text);
                  }}
                  style={{ textAlign: isRTL ? "right" : "left" }}
                />
              </View>
            </View>
          </View>

          {!isEditProfile && (
            <View style={styles.phonenumberContainer}>
              <View style={styles.phonenumber}>
                <PhoneInput
                  ref={phoneInput}
                  defaultCode="QA"
                  layout="second"
                  onChangeText={(text) => {
                    console.log(phoneNumber);
                    setValid(phoneInput.current?.isValidNumber(text));
                  }}
                  onChangeFormattedText={(text) => {
                    setPhoneNumber(text);
                    setFormattedValue(text);
                  }}
                  textContainerStyle={{ backgroundColor: "white" }}
                  textInputStyle={{
                    fontSize: 16,
                    height: 50,
                    backgroundColor: "white",
                    textAlign: isRTL ? "right" : "left",
                  }}
                  textInputProps={{
                    placeholder: currLang.signupPage.phonenumber + " *",
                    placeholderTextColor: "rgba(102,0,50,0.75)",
                  }}
                />
              </View>
            </View>
          )}

          <View style={styles.birthdayContainer}>
            <TouchableOpacity style={styles.birthday} onPress={showDatepicker}>
              <View style={{ flex: 8 }}>
                <TextInput
                  placeholder={"DD/MM/YYYY *"}
                  placeholderTextColor={"rgba(102,0,50,0.75)"}
                  value={birthday.toLocaleDateString("en-US")}
                  // onEndEditing={(text) => {
                  //   setbirthday(text);
                  // }}
                  style={{ textAlign: isRTL ? "right" : "left" }}
                  readOnly={true}
                />
              </View>
              <View style={styles.birthdayIcon}>
                <FontAwesome5
                  name={"calendar-alt"}
                  size={30}
                  color={"#660032"}
                />
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    onChange={onChange}
                    minimumDate={new Date(1943, 5, 3)}
                    maximumDate={new Date()}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.passwordContainer}>
            {!isEditProfile && (
              <>
                <View style={styles.newPasswordContainer}>
                  <TextInput
                    placeholder={currLang.signupPage.createnewpassword + " *"}
                    placeholderTextColor={"rgba(102,0,50,0.75)"}
                    onChangeText={(text) => {
                      setNewPassword(text);
                    }}
                    secureTextEntry={true}
                    style={{ textAlign: isRTL ? "right" : "left" }}
                  />
                </View>
                <View style={styles.confirmPasswordContainer}>
                  <TextInput
                    placeholder={currLang.signupPage.confirmpassword + " *"}
                    placeholderTextColor={"rgba(102,0,50,0.75)"}
                    onChangeText={(text) => {
                      setConfirmPassword(text);
                    }}
                    secureTextEntry={true}
                    style={{ textAlign: isRTL ? "right" : "left" }}
                  />
                </View>
              </>
            )}
          </View>
        </View>

        <View style={styles.actionContainer}>
          <View style={styles.loginContainer}>
            <TouchableOpacity style={styles.login} onPress={onLogin}>
              <Text style={{ fontSize: 18, color: "#660032" }}>
                {currLang.signupPage.login}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.submitContainer}>
            <TouchableOpacity style={styles.submit} onPress={onSubmit}>
              <Text style={{ fontSize: 20, color: "white" }}>
                {currLang.signupPage.submit}
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
  },
  firstnameContainer: {
    flex: 1,
    // backgroundColor: "red",

    paddingHorizontal: 20,
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
    padding: 8,
  },
  lastnameContainer: {
    flex: 1,
    maxHeight: 50,
    minHeight: 50,

    // backgroundColor: "blue",
    paddingHorizontal: 20,
  },
  lastname: {
    flex: 1,

    borderWidth: 2,
    borderColor: "#660032",
    borderRadius: 50,

    justifyContent: "center",

    paddingHorizontal: 16,
    padding: 8,
  },
  phonenumberContainer: {
    flex: 1,
    // backgroundColor: "",
    backgroundColor: isEdit ? "#324234" : "white",
    justifyContent: "center",
    maxHeight: 50,
    minHeight: 50,
    marginBottom: 18,

    paddingHorizontal: 20,
  },
  phonenumber: {
    // flex: 1,
    maxHeight: 50,
    minHeight: 50,
    borderWidth: 2,
    borderColor: "#660032",
    borderRadius: 50,
    marginVertical: 10,
    paddingHorizontal: 16,
    // backgroundColor: '#987412',
    justifyContent: "center",
    overflow: "hidden",
    justifyContent: "center",

    // paddingTop: 3,
  },
  birthdayContainer: {
    flex: 1,
    flexDirection: isRTL ? "row-reverse" : "row",
    // backgroundColor: '',
    backgroundColor: isEdit ? "#987412" : "white",
    maxHeight: 50,
    minHeight: 50,

    // alignItems: 'center',
    justifyContent: "center",
    marginBottom: 18,

    paddingHorizontal: 20,
  },
  birthday: {
    flex: 1,
    flexDirection: "row",
    maxHeight: 50,
    minHeight: 50,
    justifyContent: "center",

    borderWidth: 2,
    borderColor: "#660032",
    borderRadius: 50,

    paddingHorizontal: 16,
    padding: 8,
  },
  birthdayIcon: {
    flex: 1,
    // position: 'absolute',
    // backgroundColor: 'red',

    alignItems: isRTL ? "flex-start" : "flex-end",
  },
  createNewPasswordContainer: {
    // flex: 1,
    // backgroundColor: 'red',
  },
  createNewPassword: {},
  passwordContainer: {
    flex: 1,
    maxHeight: 118,
    minHeight: 118,
    // backgroundColor: "pink",
    // justifyContent: 'space-between',
    backgroundColor: isEdit ? "pink" : "white",
    paddingHorizontal: 20,
  },
  newPasswordContainer: {
    flex: 1,
    maxHeight: 50,
    minHeight: 50,

    borderWidth: 2,
    borderColor: "#660032",
    borderRadius: 50,
    justifyContent: "center",

    paddingHorizontal: 16,
    padding: 8,
    marginBottom: 18,
  },
  confirmPasswordContainer: {
    flex: 1,
    maxHeight: 50,
    minHeight: 50,

    borderWidth: 2,
    borderColor: "#660032",
    borderRadius: 50,
    justifyContent: "center",

    paddingHorizontal: 16,
    padding: 8,
  },

  actionContainer: {
    flex: 1,
    maxHeight: "5%",
    minHeight: "5%",
    flexDirection: isRTL ? "row-reverse" : "row",
    // backgroundColor: "",
    backgroundColor: isEdit ? "lightblue" : "white",
    marginTop: 30,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  loginContainer: {
    flex: 1,

    maxWidth: 140,
    minWidth: 140,
    maxHeight: 40,
    minHeight: 40,
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

    maxWidth: 100,
    minWidth: 40,
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
