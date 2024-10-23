import React, { useState, useRef, AsyncStorage, useEffect } from "react";
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
  Button,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PhoneInput from "react-native-phone-number-input";
import languages from "../../strings/LanguagesController";
import { GraphQL } from "../../../API";
import OurUser from "../../OurUser";
import LoadingHandler from "../../components/LoadingHandler";
import Storage from "../../components/Storage";
import Checkbox from "expo-checkbox";
import UserBackModal from "../../components/UserBackModal";
import ConfirmerModal from "../../components/ConfirmerModal";
import AmantiLogo from "../../components/AmantiLogo";

const windowHeight = Dimensions.get("screen").height;
const isRTL = I18nManager.isRTL;
const isEdit = false;

export default function LoginPage({ navigation, route }) {
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [userBackModalStatus, setUserBackModalStatus] = useState(false);
  const phoneInput = useRef(PhoneInput);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const [loadingStatus, setLoadingStatus] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [confirmModal, setConfirmModal] = useState(false);

  const checkLogin = () => {
    setLoadingStatus(true);

    if (
      phoneNumber == "" ||
      phoneNumber == null ||
      password == "" ||
      password == null
    ) {
      setLoadingStatus(false);

      Alert.alert("Error", "Phone number and password are required");
      return;
    }
    const params = {
      phoneNumber: phoneNumber,
      password: password,
    };

    GraphQL.UserApiLogic.Queries.Login(params).then((res) => {
      setLoadingStatus(false);
      if (!res) {
        Alert.alert("Error", "Phone number or password incorrect");
      } else if (res.errors) {
        Alert.alert("Error", res.errors.join("\n"));
      } else {
        OurUser.user = res.result;
        Storage.storeData("UserData", res.result);
        Storage.storeData("firstLogin", true);
        if (isChecked) {
          Storage.storeData("keepLogging", true);
        }
        setUserBackModalStatus(false);

        navigation.navigate("Home");
      }
    });
  };

  const onForget = () => {
    if (!!phoneNumber) {
      setConfirmModal(true);
    } else {
      Alert.alert("Error", "Phone number is required");
    }
  };

  const onSignup = () => {
    navigation.navigate("SignUpPage");
  };

  let currLang = languages.currLang();
  useEffect(() => {
    currLang = languages.currLang();
  });

  useEffect(() => {
    const checkLogin = async () => {
      setLoadingStatus(true);

      Storage.getData("UserData").then((v) => {
        setPhoneNumber(v?.phoneNumber);
      });

      if (await Storage.getData("keepLogging")) {
        OurUser.user = await Storage.getData("UserData");
        setLoadingStatus(false);

        navigation.navigate("Home");
        return;
      } else if (await Storage.getData("firstLogin")) {
        setLoadingStatus(false);

        setUserBackModalStatus(true);
      } else {
        OurUser.user = await Storage.getData("UserData");
        setLoadingStatus(false);
      }
    };

    if (!route.params?.passBy) {
      checkLogin();
      console.log("check login");
    }
    // setLoadingStatus(false);
  }, []);

  return (
    <View style={styles.background}>
      <ScrollView
        contentContainerStyle={styles.form}
        scrollEnabled={false}
        bounces={false}
      >
        <View style={headerStyle.container}>
          <View style={headerStyle.logoSection}>
            <AmantiLogo
              contentContainerStyle={headerStyle.logo}
              isStartUp={true}
            />
          </View>

          <View style={headerStyle.title}>
            <Text style={headerStyle.titleText}>
              {currLang.loginPage.title}
            </Text>
          </View>
        </View>

        <View style={inputsStyle.container}>
          <View style={inputsStyle.phoneInputSection}>
            <View style={inputsStyle.phoneInput}>
              <View style={inputsStyle.phoneIconHolder}>
                <MaterialCommunityIcons
                  size={30}
                  name={"phone"}
                  color={"#660032"}
                />
              </View>

              <View style={inputsStyle.phoneInputHolder}>
                <PhoneInput
                  ref={phoneInput}
                  defaultValue={phoneNumber}
                  defaultCode="QA"
                  layout="second"
                  onChangeText={(text) => {
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
              </View>
            </View>
          </View>

          <View style={inputsStyle.passInputSection}>
            <View style={inputsStyle.passInput}>
              <View style={inputsStyle.lockIconHolder}>
                <MaterialCommunityIcons
                  size={30}
                  name={"lock"}
                  color={"#660032"}
                />
              </View>

              <View style={inputsStyle.passInputHolder}>
                <TextInput
                  placeholder={currLang.loginPage.password + " *"}
                  placeholderTextColor={"#660032"}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                  }}
                  secureTextEntry={true}
                  style={[
                    {
                      textAlign: isRTL ? "right" : "left",
                    },
                    isRTL ? { paddingRight: 10 } : { paddingLeft: 10 },
                  ]}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={actionsStyle.container}>
          <TouchableOpacity
            onPress={checkLogin}
            style={actionsStyle.loginContainer}
          >
            <Text style={actionsStyle.textLogin}>
              {currLang.loginPage.login}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onForget}
            style={actionsStyle.forgetContainer}
          >
            <Text style={actionsStyle.textForget}>
              {currLang.loginPage.forgetpassword}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSignup}
            style={actionsStyle.signupContainer}
          >
            <Text style={actionsStyle.textSignup}>
              {currLang.loginPage.signup}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <LoadingHandler
        status={loadingStatus}
        onImmediateBreak={() => setLoadingStatus(false)}
      />
      <UserBackModal
        status={userBackModalStatus}
        phoneNumber={phoneNumber}
        onCancel={() => setUserBackModalStatus(false)}
      >
        {/* 0 */}
        <View style={inputsStyle.passInputSection}>
          <View style={inputsStyle.passInput}>
            <View style={inputsStyle.lockIconHolder}>
              <MaterialCommunityIcons
                size={30}
                name={"lock"}
                color={"#660032"}
              />
            </View>

            <View style={inputsStyle.passInputHolder}>
              <TextInput
                placeholder={currLang.loginPage.password + " *"}
                placeholderTextColor={"#660032"}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                }}
                secureTextEntry={true}
                style={[
                  {
                    textAlign: isRTL ? "right" : "left",
                  },
                  isRTL ? { paddingRight: 10 } : { paddingLeft: 10 },
                ]}
              />
            </View>
          </View>
        </View>

        {/* 1 */}
        <>
          <TouchableOpacity
            onPress={checkLogin}
            style={[actionsStyle.loginContainer]}
          >
            <Text style={actionsStyle.textLogin}>
              {currLang.loginPage.login}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setUserBackModalStatus(false)}
            style={[
              actionsStyle.loginContainer,
              { width: "22%", marginTop: 4, backgroundColor: "white" },
            ]}
          >
            <Text style={[actionsStyle.textLogin, { color: "#660032" }]}>
              {`إلغاء`}
            </Text>
          </TouchableOpacity>
        </>

        {/* 2 */}
        <Checkbox
          style={{ marginRight: 5 }}
          value={isChecked}
          onValueChange={setIsChecked}
          color={isChecked ? "#660032" : undefined}
        />
      </UserBackModal>
      <ConfirmerModal
        status={confirmModal}
        phoneNumber={formattedValue.trim()}
        onCancel={() => setConfirmModal(false)}
        next={() => {
          setConfirmModal(false);
          navigation.navigate("ChangePasswordPage", {
            phoneNumber: formattedValue.trim(),
          });
        }}
      />
    </View>
  );
}

const headerStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isEdit ? "red" : "white",
  },

  logoSection: {
    flex: 1,
    // minHeight: 250,
    // maxHeight: 250,
    alignItems: "center",
    justifyContent: "flex-end",

    // backgroundColor: 'grey',
    paddingBottom: 10,
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

  title: {
    flex: 1,
    maxHeight: 40,
    minHeight: 40,
    // position: "absolute",
    // backgroundColor: 'green',
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 26,
    color: "#660032",
  },
});

const inputsStyle = StyleSheet.create({
  container: {
    flex: 0.75,
    justifyContent: "center",
    backgroundColor: isEdit ? "blue" : "white",
    paddingHorizontal: "11%",
  },

  phoneInputSection: {
    flex: 1,
    alignSelf: "center",
    maxWidth: "98%",
    minWidth: "90%",

    // backgroundColor: "red",

    maxHeight: 50,
    minHeight: 50,
  },
  phoneInput: {
    flex: 1,
    flexDirection: "row",
    // maxHeight: 50,
    // minHeight: 50,

    backgroundColor: "white",
    borderColor: "#660032",
    borderWidth: 2,
    borderRadius: 30,

    paddingHorizontal: 15,
    overflow: "hidden",
  },
  phoneIconHolder: {
    width: 32,
    justifyContent: "center",
    // backgroundColor: 'red',
  },
  phoneInputHolder: {
    flex: 1,
    // minWidth: 300,
    // maxWidth: 300,
    justifyContent: "center",
    // backgroundColor: "grey",
  },

  passInputSection: {
    flex: 1,
    alignSelf: "center",
    maxWidth: "98%",
    minWidth: "90%",
    // backgroundColor: "red",

    maxHeight: 50,
    minHeight: 50,

    marginTop: 22,
  },
  passInput: {
    flex: 1,
    flexDirection: "row",
    // maxHeight: 50,
    // minHeight: 50,
    // maxWidth: 350,
    // minWidth: 350,

    backgroundColor: "white",
    borderColor: "#660032",
    borderWidth: 2,
    borderRadius: 30,

    paddingHorizontal: 15,
    overflow: "hidden",
  },
  lockIconHolder: {
    width: 32,
    justifyContent: "center",
    // backgroundColor: 'red',
  },
  passInputHolder: {
    flex: 1,
    // maxWidth: 300,
    // minWidth: 300,
    justifyContent: "center",
    // backgroundColor: "grey",
  },
});

const actionsStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: isEdit ? "green" : "white",
    // paddingHorizontal: "11%",
  },

  loginContainer: {
    flex: 1,
    maxHeight: "14%",
    minHeight: "10%",
    width: "44%",
    // minWidth: 100,

    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "grey",
    backgroundColor: "#660032",
    borderRadius: 99,

    // paddingHorizontal: 60,
  },
  textLogin: {
    fontSize: 20,
    color: "white",
    // marginLeft: 5,
    alignSelf: "center",
  },

  forgetContainer: {
    // alignSelf: 'center',
    marginTop: 15,
    width: 150,
    alignItems: "center",
  },
  textForget: {
    fontSize: 12,
    color: "#660032",
  },

  signupContainer: {
    flex: 1,
    // maxWidth: 150,
    // minWidth: 150,
    width: "24%",
    maxHeight: "13%",
    minHeight: "7%",

    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",

    borderColor: "#660032",
    borderWidth: 2,
    borderRadius: 99,

    marginTop: "10%",
    // paddingHorizontal: 5,
  },
  textSignup: {
    fontSize: 14,
    color: "#660032",
    // fontWeight: 'bold'
  },
});

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
});
