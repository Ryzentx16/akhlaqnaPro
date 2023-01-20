import React, { useState } from "react";
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
import users from "../data/users";

const windowHeight = Dimensions.get("window").height;
const isRTL = I18nManager.isRTL;

export default function ChangePasswordPage({ navigation, route }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isValide = () => {
    if (newPassword === '' || confirmPassword === '') {
        return false;
    } else if (newPassword === confirmPassword) {
        return true;
    } else {
        // console.warn("result: " + )
    }

    return null;
  };

  const onSubmit = () => {
    setNewPassword('');
    setConfirmPassword('');
    isValide()
      ? navigation.replace('AppStartupNavigator')
      : Alert.alert("Error", "Password doesn't match or its an empty");
  };

  const onResend = () => {
    //fake OTP generator:
    otp = Math.floor(Math.random() * 1000000).toString();
    Alert.alert("OTP number", otp);
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
                source={require("../../assets/Logo.png")}
                style={styles.imageLogo}
              />
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Change Password for {route.params?.phoneNumber}</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.newPasswordInput}>
            <TextInput
              placeholder={"New Password *"}
              placeholderTextColor={"#660032"}
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
              placeholder={"Confirm Password *"}
              placeholderTextColor={"#660032"}
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
              <Text style={{ color: "white", fontSize: 20 }}>Submit</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.resendContainer}>
            <TouchableOpacity style={styles.resend} onPress={onResend}>
              <Text style={{ color: "#660032", fontSize: 20 }}>
                Resend The OTP
              </Text>
            </TouchableOpacity>
          </View> */}
          {/* <View style={styles.changePhoneContainer}>
                        <TouchableOpacity style={styles.changePhone} onPress={() => navigation.goBack()}>
                            <Text style={{ color: '#660032', fontSize: 20 }}>Change My Phone Number</Text>
                        </TouchableOpacity>
                    </View> */}
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
    flex: 3,
    // backgroundColor: 'blue',
    marginTop: 90,
  },
  backContainer: {
    marginTop: 10,
    justifyContent: "center",
  },
  logoContainer: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",

    // backgroundColor: 'green',
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
    marginTop: "20%",
    alignSelf: "center",
    // backgroundColor: 'red',
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#660032",
  },

  inputContainer: {
    flex: 2,
    // backgroundColor: '#165815',
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
    // backgroundColor: 'red'
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
    borderWidth: 2,
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
