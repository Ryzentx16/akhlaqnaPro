import React, { useState, useRef, AsyncStorage, useEffect } from "react";
// import AsyncStorage from '@react-native-community/async-storage';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  I18nManager,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PhoneInput from "react-native-phone-number-input";
import languages from "../strings/LanguagesController";

const windowHeight = Dimensions.get("screen").height;
const isRTL = I18nManager.isRTL;

export default function LoginPage({ navigation }) {
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("+97470031251");
  const [valid, setValid] = useState(false);
  const phoneInput = useRef(PhoneInput);

  const [phoneNumber, setPhoneNumber] = useState("70031251");
  const [password, setPassword] = useState("12345");

  const checkLogin = () => {
    navigation.navigate("Home");
    // const axios = require("axios").default;
    // axios
    //   .get(
    //     "http://ryzentx.online/?phoneNumber=" +
    //       formattedValue +
    //       "&password=" +
    //       password
    //   )
    //   .then(function (response) {
    //     if (response.data === 1) {
    //       // redirect to Dashboard
    //       navigation.navigate("Home");
    //     } else {
    //       // alert something is wrong
    //       Alert.alert("Error", "Username/Password Wrong");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  const onForget = () => {
    navigation.navigate("SignUpConfirmation", {
      isChangePass: true,
      phoneNumber: formattedValue,
    });
  };
  
  const onSignup = () => {
    navigation.navigate("SignUpPage");
  };

  let currLang = languages.currLang();
  useEffect(() => {
    currLang = languages.currLang();
  });

  return (
    <View style={styles.background}>
      <ScrollView
        contentContainerStyle={styles.form}
        scrollEnabled={false}
        bounces={false}
      >
        <View style={styles.logoSection}>
          <View style={styles.logo}>
            <Image
              source={require("../../assets/Logo.png")}
              style={styles.imageLogo}
            />
            {/*<AmanatiLogo style={styles.imageLogo}/>*/}
          </View>
        </View>

        <View style={styles.title}>
          <Text style={styles.titleText}>{currLang.loginPage.title}</Text>
        </View>

        <View style={styles.inputsArea}>
          <View style={styles.phoneInputSection}>
            <View style={styles.phoneInput}>
              <View style={styles.phoneIconHolder}>
                <MaterialCommunityIcons
                  size={30}
                  name={"phone"}
                  color={"#660032"}
                />
              </View>
              <PhoneInput
                ref={phoneInput}
                defaultValue={phoneNumber}
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
                  placeholder: currLang.loginPage.phonenumber + " *",
                  placeholderTextColor: "rgba(102,0,50,0.75)",
                }}
              />
              {/* </View> */}
            </View>
          </View>
          <View style={styles.passInputSection}>
            <View style={styles.passInput}>
              <View style={styles.lockIconHolder}>
                <MaterialCommunityIcons
                  size={30}
                  name={"lock"}
                  color={"#660032"}
                />
              </View>
              <TextInput
                placeholder={currLang.loginPage.password + " *"}
                placeholderTextColor={"#660032"}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                }}
                secureTextEntry={true}
                style={{ textAlign: isRTL ? "right" : "left", flex: 1 }}
              />
            </View>
          </View>
        </View>

        <View style={styles.actionsArea}>
          <TouchableOpacity onPress={checkLogin} style={styles.loginButton}>
            <Text style={styles.textLogin}>{currLang.loginPage.login}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onForget} style={styles.forgetButton}>
            <Text style={styles.textForget}>
              {currLang.loginPage.forgetpassword}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signupButton} onPress={onSignup}>
            <Text style={styles.textSignup}>{currLang.loginPage.signup}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  form: {
    flex: 1,
    minHeight: windowHeight,
    maxHeight: windowHeight,
    // borderColor: "#660032",
    backgroundColor: "white",
  },
  border: {
    flex: 1,
  },

  title: {
    flex: 1,
    maxHeight: 40,
    minHeight: 15,
    // position: "absolute",
    // backgroundColor: 'green',
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 26,
    color: "#660032",
    // backgroundColor: 'red',
    // marginLeft: "56%",
    // marginTop: "73%",
  },

  logoSection: {
    flex: 1,
    minHeight: 250,
    maxHeight: 250,
    alignItems: "center",
    justifyContent: "flex-end",

    // backgroundColor: 'red',
    paddingBottom: 25,
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

  inputsArea: {
    flex: 1,
    // marginHorizontal: 32,
    // backgroundColor: 'grey',
    maxHeight: "25%",
    minHeight: "25%",
  },
  phoneInputSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    // backgroundColor: 'green',

    maxHeight: 50,
    minHeight: 50,

    marginBottom: 22,
    margin: 50,
  },
  passInputSection: {
    flex: 1,
    alignItems: "center",
    // backgroundColor: 'blue',

    maxHeight: 50,
    minHeight: 50,

    marginTop: 22,
    margin: 50,
  },
  phoneIconHolder: {
    width: 32,
    justifyContent: "center",
    // backgroundColor: 'red',
  },
  lockIconHolder: {
    width: 32,
    justifyContent: "center",
    // backgroundColor: 'red',
  },
  phoneInput: {
    flex: 1,
    flexDirection: "row",
    maxHeight: 50,
    minHeight: 50,
    maxWidth: 350,
    minWidth: 350,

    backgroundColor: "white",
    borderColor: "#660032",
    borderWidth: 2,
    borderRadius: 30,

    paddingHorizontal: 15,
    overflow: "hidden",
  },
  passInput: {
    flex: 1,
    flexDirection: "row",
    maxWidth: 350,
    minWidth: 350,

    backgroundColor: "white",
    borderColor: "#660032",
    borderWidth: 2,
    borderRadius: 30,

    paddingHorizontal: 15,
    overflow: "hidden",
  },

  actionsArea: {
    flex: 1,
    // backgroundColor: 'red'
    alignItems: "center",
  },
  forgetButton: {
    marginTop: 15,
    // marginBottom: 10,
    width: 150,
  },
  loginButton: {
    flex: 1,
    // maxWidth: '53%',
    // minWidth: '53%',
    maxHeight: 45,
    minHeight: 45,

    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    backgroundColor: "#660032",
    borderRadius: 30,

    paddingHorizontal: 60,
  },
  textLogin: {
    fontSize: 20,
    color: "white",
    // marginLeft: 5,
    alignSelf: "center",
  },
  textForget: {
    fontSize: 12,
    color: "#660032",
    // width:
    alignSelf: "center",
  },
  signupButton: {
    flex: 1,
    maxWidth: 150,
    minWidth: 150,
    maxHeight: 40,
    minHeight: 40,

    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",

    borderColor: "#660032",
    borderWidth: 2,
    borderRadius: 30,

    marginTop: "28%",
  },
  textSignup: {
    fontSize: 18,
    color: "#660032",
    // marginLeft: 5,
    alignSelf: "center",
  },
});