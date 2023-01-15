import React from "react";
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
  I18nManager
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import AmanatiLogo from "../Classes/logoXml";
// import {SvgXml} from "react-native-svg";
const windowHeight = Dimensions.get('screen').height;
// import SELECTquery from "../../server/SELECTquery";

const isRTL = I18nManager.isRTL;

export default function LoginPage({ navigation }) {
  let phoneNumber = '70031251';
  let password = '12345';

  const checkLogin = () => {
    navigation.navigate("Home");
    const axios = require("axios").default;
    axios
      .post(
        "http://ryzentx.online/?phoneNumber=" +
        phoneNumber +
        "&password=" +
        password
      )
      .then(function (response) {
        if (response.data === 1) {
          // redirect to Dashboard
          navigation.navigate("Home");
        } else {
          // alert something is wrong
          Alert.alert("Error", "Username/Password Wrong");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.background}>
      {  Alert.alert('Login Information', 'Phone: ' + phoneNumber + '\n' + 'Pass: ' + password)}
      <ScrollView contentContainerStyle={styles.form} scrollEnabled={false} bounces={false}>
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
          <Text style={styles.titleText}>Login</Text>
        </View>

        <View style={styles.inputsArea}>
          <View style={[styles.inputSection, { justifyContent: "center" }]}>
            <View style={styles.phoneInput}>
              <View style={styles.iconHolder}>
                <MaterialCommunityIcons
                  size={30}
                  name={"phone"}
                  color={"#660032"}
                />
              </View>
              <TextInput
                placeholder={"Phone Number"}
                placeholderTextColor={"#660032"}
                value={phoneNumber}
                onChangeText={(text) => {
                  phoneNumber = text;
                }}
                keyboardType={"phone-pad"}
                style={{ textAlign: isRTL ? 'right' : 'left' }}
              />
            </View>
          </View>
          <View style={styles.inputSection}>
            <View style={styles.passInput}>
              <View style={styles.iconHolder}>
                <MaterialCommunityIcons
                  size={30}
                  name={"lock"}
                  color={"#660032"}
                />
              </View>
              <TextInput
                placeholder={"Password"}
                placeholderTextColor={"#660032"}
                value={password}
                onChangeText={(text) => {
                  password = text;
                }}
                secureTextEntry={true}
                style={{ textAlign: isRTL ? 'right' : 'left' }}
              />
            </View>
          </View>
        </View>

        <View style={styles.buttonsArea}>
          <TouchableOpacity onPress={checkLogin} style={styles.loginButton}>
            <Text style={styles.textLogin}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SignUpConfirmation")} style={styles.forgetButton}>
            <Text style={styles.textForget}>Forget Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => navigation.navigate("SignUpPage")}
          >
            <Text style={styles.textSignup}>Sign Up</Text>
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
    borderColor: "#660032",
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
    alignItems: 'center',
    justifyContent: 'center'
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
  },
  inputSection: {
    // Used Twice !
    flex: 1,

    paddingHorizontal: 32,
  },
  iconHolder: {
    width: 32,
    // backgroundColor: 'red',
    marginRight: 7,
  },
  phoneInput: {
    flexDirection: "row",
    height: 50,

    backgroundColor: "white",
    borderColor: "#660032",
    borderWidth: 2,
    borderRadius: 30,

    paddingTop: 7,
    paddingLeft: 13,
    paddingRight: 13,
    paddingBottom: 7,
  },
  passInput: {
    flexDirection: "row",
    height: 50,

    backgroundColor: "white",
    borderColor: "#660032",
    borderWidth: 2,
    borderRadius: 30,

    paddingTop: 7,
    paddingLeft: 13,
    paddingRight: 13,
    paddingBottom: 7,
  },

  buttonsArea: {
    flex: 1,
  },
  forgetButton: {
    marginTop: 10,
    // marginBottom: 10,
  },
  loginButton: {
    flex: 1,
    width: 250,
    maxHeight: 45,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'grey',
    backgroundColor: "#660032",
    borderRadius: 30,
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
    // marginLeft: 5,
    alignSelf: "center",
  },
  signupButton: {
    flex: 1,
    width: 150,
    maxHeight: 40,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'grey',
    borderColor: "#660032",
    borderWidth: 2,
    borderRadius: 30,
    marginTop: 100,
  },
  textSignup: {
    fontSize: 18,
    color: "#660032",
    // marginLeft: 5,
    alignSelf: "center",
  },
});
