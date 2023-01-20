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
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import DateTimePicker from "@react-native-community/datetimepicker";

import PhoneInput from "react-native-phone-number-input";

import Adding from "../../API/Adding";
import languages from "../strings/LanguagesController";

const windowHeight = Dimensions.get("window").height;
const isRTL = I18nManager.isRTL;
// const currLang = languages.currLang();

export default function SignUpPage({ navigation }) {
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const phoneInput = useRef(PhoneInput);

  const [birthday, setbirthday] = useState(new Date());

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  let currLang = languages.currLang();
  useEffect(() => {
    currLang = languages.currLang();
  });

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    setbirthday(currentDate);
    // const test = new Date(date).getUTCDay();
  };

  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(true);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const vaildateSubmit = () => {
    // let vaildate = false;
    let isFilled =
      firstName !== "" &&
      lastName !== "" &&
      phoneNumber !== "" &&
      birthday !== "" &&
      newPassword !== "" &&
      confirmPassword !== "";
    let isConfirmPassword = confirmPassword === newPassword;

    // (isConfirmPassword) ? setPassword(confirmPassword) : null;

    return (
      isConfirmPassword && isFilled && phoneInput.current?.isValidNumber(value)
    );
  };

  const onSubmit = () => {
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

    // navigation.navigate("SignUpConfirmation");

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
  };

  const onLogin = () => {
    navigation.navigate("LoginPage");
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
              source={require("../../assets/Logo.png")}
              style={styles.imageLogo}
            />
          </View>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{currLang.signupPage.title}</Text>
        </View>

        <View style={styles.inputsContainer}>
          <View style={styles.usernameContainer}>
            <View style={styles.firstnameContainer}>
              <View style={styles.firstname}>
                <TextInput
                  placeholder={currLang.signupPage.firstname+" *"}
                  placeholderTextColor={"rgba(102,0,50,0.75)"}
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
                  placeholder={currLang.signupPage.lastname+" *"}
                  placeholderTextColor={"rgba(102,0,50,0.75)"}
                  onChangeText={(text) => {
                    setLastName(text);
                  }}
                  style={{ textAlign: isRTL ? "right" : "left" }}
                />
              </View>
            </View>
          </View>

          <View style={styles.phonenumberContainer}>
            <View style={styles.phonenumber}>
              <PhoneInput
                ref={phoneInput}
                // defaultValue="70031251"
                defaultCode="QA"
                layout="second"
                placeholder="hi"
                onChangeText={(text) => {
                  console.log(phoneNumber);
                  setValid(phoneInput.current?.isValidNumber(text));
                }}
                onChangeFormattedText={(text) => {
                  setPhoneNumber(text);
                  setFormattedValue(text);
                }}
                // withDarkTheme

                textContainerStyle={{ backgroundColor: "white" }}
                textInputStyle={{
                  fontSize: 16,
                  height: 50,
                  backgroundColor: "white",
                  textAlign: isRTL ? 'right' : 'left'
                }}
                textInputProps={{
                  placeholder: currLang.signupPage.phonenumber+" *",
                  placeholderTextColor: "rgba(102,0,50,0.75)",
                }}
              />
            </View>
          </View>

          <View style={styles.birthdayContainer}>
            <TouchableOpacity style={styles.birthday} onPress={showDatepicker}>
              <View style={{ flex: 8 }}>
                <TextInput
                  placeholder={"DD/MM/YYYY *"}
                  placeholderTextColor={"rgba(102,0,50,0.75)"}
                  value={birthday.toLocaleDateString()}
                  onChange={(text) => {
                    setbirthday(text);
                  }}
                  style={{ textAlign: isRTL ? "right" : "left" }}
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
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.passwordContainer}>
            <View style={styles.newPasswordContainer}>
              <TextInput
                placeholder={currLang.signupPage.createnewpassword+" *"}
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
                placeholder={currLang.signupPage.confirmpassword+" *"}
                placeholderTextColor={"rgba(102,0,50,0.75)"}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                }}
                secureTextEntry={true}
                style={{ textAlign: isRTL ? "right" : "left" }}
              />
            </View>
          </View>
        </View>

        <View style={styles.actionContainer}>
          <View style={styles.loginContainer}>
            <TouchableOpacity style={styles.login} onPress={onLogin}>
              <Text style={{ fontSize: 18, color: "#660032" }}>{currLang.signupPage.login}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.submitContainer}>
            <TouchableOpacity style={styles.submit} onPress={onSubmit}>
              <Text style={{ fontSize: 20, color: "white" }}>{currLang.signupPage.submit}</Text>
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
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-end",

    // backgroundColor: 'red',
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
    // backgroundColor: 'green',

    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    color: "#660032",
  },

  inputsContainer: {
    flex: 5,
    // backgroundColor: 'blue',
  },
  usernameContainer: {
    flex: 1,
    flexDirection: isRTL ? "row-reverse" : "row",
    // backgroundColor: '#578978',
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

    borderWidth: 2,
    borderColor: "#660032",
    borderRadius: 50,

    paddingHorizontal: 16,
    padding: 8,
  },
  lastnameContainer: {
    flex: 1,
    maxHeight: 50,

    // backgroundColor: "blue",
    paddingHorizontal: 20,
  },
  lastname: {
    flex: 1,

    borderWidth: 2,
    borderColor: "#660032",
    borderRadius: 50,

    paddingHorizontal: 16,
    padding: 8,
  },
  phonenumberContainer: {
    flex: 1,
    // backgroundColor: "#324234",
    justifyContent: "center",
    maxHeight: 50,
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
    // paddingTop: 3,
  },
  birthdayContainer: {
    flex: 1,
    flexDirection: isRTL ? "row-reverse" : "row",
    // backgroundColor: '#987412',
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
  btnsContainer: {
    flex: 3,
    // backgroundColor: 'grey',
  },
  createNewPasswordContainer: {
    flex: 1,
    // backgroundColor: 'red',
  },
  createNewPassword: {},
  passwordContainer: {
    flex: 2,
    paddingHorizontal: 20,
  },
  newPasswordContainer: {
    flex: 1,
    maxHeight: 50,

    borderWidth: 2,
    borderColor: "#660032",
    borderRadius: 50,

    paddingHorizontal: 16,
    padding: 8,
    marginBottom: 18,
  },
  confirmPasswordContainer: {
    flex: 1,
    maxHeight: 50,

    borderWidth: 2,
    borderColor: "#660032",
    borderRadius: 50,

    paddingHorizontal: 16,
    padding: 8,
  },

  actionContainer: {
    flex: 1,
    flexDirection: isRTL ? "row-reverse" : "row",
    // backgroundColor: 'red',

    justifyContent: "space-around",
    // paddingBottom: 6,
  },
  loginContainer: {
    // backgroundColor: 'blue',
    // marginBottom: 47,
    maxHeight: 40,
    minHeight: 40,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#660032",
    borderWidth: 2,
    borderRadius: 20,
  },
  login: {
    flex: 1,
    alignItems: "flex-end",

    paddingTop: 2,
    padding: 8,
  },

  submitContainer: {
    backgroundColor: "#660032",
    maxHeight: 40,
    minHeight: 40,
    borderRadius: 20,
  },
  submit: {
    flex: 1,
    alignItems: "flex-start",

    paddingTop: 3,
    padding: 8,
  },
});
