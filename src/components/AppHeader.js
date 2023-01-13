import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  I18nManager,
  TouchableOpacity
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const isRTL = I18nManager.isRTL;

export default function AppHeader(props) {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <View style={styles.circle}></View>
      <View style={styles.logo}>
        <Image
          source={require("../../assets/Logo.png")}
          style={styles.imageLogo}
        />
        {/*<AmanatiLogo style={styles.imageLogo}/>*/}
      </View>
      <TouchableOpacity style={styles.signOutContainer} onPress={() => navigation.navigate("LoginPage")}>
        <FontAwesome name="sign-out" size={30} color={'#660032'} style={styles.signOutIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 140,
    justifyContent: "center",
    backgroundColor: "white"
  },
  circle: {
    width: 750,
    height: 800,
    borderRadius: 800,
    borderColor: "#660032",
    borderWidth: 2,
    alignSelf: "center",
    marginTop: -700,
  },

  logo: {
    position: "absolute",
    height: 70,
    width: 70,
    alignSelf: "center",
    borderColor: "#660032",
    borderWidth: 2,
    borderRadius: 150 / 2,

    alignItems: "center",
    justifyContent: "center",
  },
  imageLogo: {
    height: 57,
    width: 37,
    marginLeft: isRTL ? -5 : 5,
  },

  signOutContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 50,
    right: 100,
  },
  signOutIcon: {
    transform: [{rotateY: isRTL ? '180deg' : '0deg'}]
  }
});
