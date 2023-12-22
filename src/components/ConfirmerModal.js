import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { ScrollView } from "react-native";
import { Text } from "react-native";
import { StyleSheet, View, Dimensions, Modal } from "react-native";
import languages from "../strings/LanguagesController";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { I18nManager } from "react-native";
import { Alert } from "react-native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const isRTL = I18nManager.isRTL;

export default function ConfirmerModal(props) {
  let currLang = languages.currLang();
  useEffect(() => {
    currLang = languages.currLang();
  });

  const [OTPInput, setOtpInput] = useState("");
  const [OTPApi, setOtpApi] = useState("999999");

  const checkOTP = () => {
    // navigation.navigate("Home");

    if (OTPInput.trim() === OTPApi.trim()) {
      setOtpInput("");
      props.next();
    }
    // CheckOTP(
    //   {
    //     otp: OTP,
    //     phoneNumber: route.params?.phoneNumber,
    //   },
    //   () => navigation.navigate("Home")
    // );
    // return;
  };

  const onResend = () => {
    //fake OTP generator:
    setOtpApi(Math.floor(Math.random() * 1000000).toString());
    Alert.alert("OTP number", OTPApi);
  };

  return (
    <Modal
      visible={props.status}
      animationType="fade"
      onRequestClose={() => props.onCancel()}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      backdropColor={"#4b4b4a"}
      onShow={() => {
        alert(OTPApi);
      }}
      // backdropOpacity={0.9}
      // style={{ justifyContent: "center", alignItems: "center" }}
    >
      <View style={styles.container}>
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
                    source={require("../../assets/Logo.png")}
                    style={styles.imageLogo}
                  />
                </View>
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.text}>{currLang.otpPage.wesentotp}</Text>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.input}>
                <TextInput
                  placeholder={"OTP"}
                  placeholderTextColor={"#660032"}
                  value={OTPInput}
                  onChangeText={(text) => {
                    setOtpInput(text);
                  }}
                  maxLength={6}
                  style={{ width: "100%", textAlign: "center" }}
                />
              </View>
            </View>

            <View style={styles.actionsContainer}>
              <View style={styles.submitContainer}>
                <TouchableOpacity style={styles.submit} onPress={checkOTP}>
                  <Text style={{ color: "white", fontSize: 20 }}>
                    {currLang.otpPage.submit}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.resendContainer}>
                <TouchableOpacity style={styles.resend} onPress={onResend}>
                  <Text style={{ color: "#660032", fontSize: 22 }}>
                    {currLang.otpPage.resendotp}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.changePhoneContainer}>
                <TouchableOpacity
                  style={styles.changePhone}
                  onPress={() => props.onCancel()}
                >
                  <Text
                    style={{
                      color: "#660032",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    {currLang.otpPage.changemyphone}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
    // opacity: 0.5,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "white",
  },
  background: {
    flex: 1,
    backgroundColor: "white",
    // paddingTop: 10,
  },

  headContainer: {
    flex: 3,
    backgroundColor: "white",
    // marginTop: 90,
  },
  logoContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "flex-end",

    // backgroundColor: 'green',

    paddingBottom: 5,
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
  textContainer: {
    flex: 1,
    justifyContent: "flex-end",
    // marginTop: "20%",
    alignItems: "center",
    // backgroundColor: 'lightblue',
  },
  text: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#660032",
  },

  inputContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",

    paddingHorizontal: 90,
  },
  input: {
    height: 47,
    // backgroundColor: 'red',

    borderColor: "#660032",
    borderWidth: 2,
    borderRadius: 50,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingLeft: 15,
    padding: 10,
  },

  actionsContainer: {
    flex: 3,
    backgroundColor: "white",
  },
  submitContainer: {
    marginTop: 7,
    justifyContent: "center",
    paddingHorizontal: 130,
  },
  submit: {
    height: 40,
    backgroundColor: "#660032",

    borderColor: "#660032",
    // borderWidth: 2,
    borderRadius: 50,

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
