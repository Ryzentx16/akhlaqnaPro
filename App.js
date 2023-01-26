import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View, I18nManager } from "react-native";
import AppStartupNavigator from "./src/navigator/AppStartupNavigator";
// import i18next from "./src/languages/i18n";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <NavigationContainer style={styles.container}>
        <AppStartupNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});     





// import React, { useState, useEffect } from "react";
// import { Button, Image, View, Platform } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import axios from "axios";

// export default function App() {
//   const [image, setImage] = useState(null);

//   const pickImage = async () => {
//     // No permissions request is necessary for launching the image library
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   const takeImage = async () => {
//     // No permissions request is necessary for launching the image library
//     let result = await ImagePicker.launchCameraAsync({
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   const sendbackEndo = () => {
//     let data = new FormData();
//     data.append("userId", "tamborea");
//     data.append("content", "aslkdjfkljasdjfklk;jadsjflja;ldjflk;jadlkjf");
//     data.append("createdDateTime", new Date().toUTCString());

//     if (image) {
//       data.append("image", {
//         uri: image,
//         name: "profileExample.png",
//         type: "image/png",
//       });
//     }

//     axios
//       .post("http://2c0f-156-192-171-226.eu.ngrok.io/addPost", data, {
//         //config
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "multipart/form-data",
//         },
//       })
//       .then((res) => {
//         if (res) {
//           console.log("donawy");
//         } else {
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         alert(err);
//       });
//   };

//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Button title="Pick an image from camera roll" onPress={pickImage} />
//       <Button title="take an image from camera roll" onPress={takeImage} />
//       {image && (
//         <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
//       )}
//       <Button title="send back endo" onPress={sendbackEndo} />
//     </View>
//   );
// }
