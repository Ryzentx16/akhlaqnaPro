import { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { BackHandler, Button, Text, TextInput, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import AppStartupNavigator from "./src/navigator/AppStartupNavigator";
import Storage from "./src/components/Storage";

export default function App() {
  useEffect(() => {
    const backAction = () => {
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  });

  const [value, setValue] = useState(null);
  var x = null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="default" />
      <NavigationContainer style={styles.container}>
        <AppStartupNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
  },
  text: {
    color: "white",
  },
});

// // import React, { useState, useEffect } from "react";
// // import { Button, Image, View, Platform } from "react-native";
// // import * as ImagePicker from "expo-image-picker";
// // import axios from "axios";

// // export default function App() {
// //   const [image, setImage] = useState(null);

// //   const pickImage = async () => {
// //     // No permissions request is necessary for launching the image library
// //     let result = await ImagePicker.launchImageLibraryAsync({
// //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
// //       aspect: [4, 3],
// //       quality: 1,
// //     });

// //     console.log(result);

// //     if (!result.canceled) {
// //       setImage(result.assets[0].uri);
// //     }
// //   };

// //   const takeImage = async () => {
// //     // No permissions request is necessary for launching the image library
// //     let result = await ImagePicker.launchCameraAsync({
// //       aspect: [4, 3],
// //       quality: 1,
// //     });

// //     console.log(result);

// //     if (!result.canceled) {
// //       setImage(result.assets[0].uri);
// //     }
// //   };

// //   const sendbackEndo = () => {
// //     let data = new FormData();
// //     data.append("userId", "tamborea");
// //     data.append("content", "aslkdjfkljasdjfklk;jadsjflja;ldjflk;jadlkjf");
// //     data.append("createdDateTime", new Date().toUTCString());

// //     if (image) {
// //       data.append("image", {
// //         uri: image,
// //         name: "profileExample.png",
// //         type: "image/png",
// //       });
// //     }

// //     axios
// //       .post("http://2c0f-156-192-171-226.eu.ngrok.io/addPost", data, {
// //         //config
// //         headers: {
// //           Accept: "application/json",
// //           "Content-Type": "multipart/form-data",
// //         },
// //       })
// //       .then((res) => {
// //         if (res) {
// //           console.log("donawy");
// //         } else {
// //         }
// //       })
// //       .catch((err) => {
// //         console.log(err);
// //         alert(err);
// //       });
// //   };

// //   return (
// //     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
// //       <Button title="Pick an image from camera roll" onPress={pickImage} />
// //       <Button title="take an image from camera roll" onPress={takeImage} />
// //       {image && (
// //         <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
// //       )}
// //       <Button title="send back endo" onPress={sendbackEndo} />
// //     </View>
// //   );
// // }

//------------------------------------------------------------------------------------------------
// import { useRef, useState } from "react";
// import { Button, StyleSheet, Text, View } from "react-native";
// import MapView, {
//   AnimatedRegion,
//   Animated,
//   MarkerAnimated,
// } from "react-native-maps";
// import * as Location from "expo-location";
// import { FontAwesome, MaterialIcons, Entypo } from "react-native-vector-icons";
// import axios from "axios";

// const customMapStyle = [];
// const QAlat = 25.300946829658887;
// const QAlon = 51.465748474001884;

// export default function App() {
//   const [markerPoint, setMarkerPoint] = useState({
//     latitude: 25.188497182423752,
//     longitude: 51.40093171969056,
//   });
//   const [currLocation, setCurrLocation] = useState(null);
//   const [address, setAddress] = useState(null);
//   // const [coordinate, setCoordinate] = useState(
//   //   new AnimatedRegion({
//   //     latitude: QAlat,
//   //     latitudeDelta: 0.6631861591450701,
//   //     longitude: QAlon,
//   //     longitudeDelta: 0.3281260281801224,
//   //   })
//   // );
//   const refMap = useRef(MapView);

//   const getAddressAsync = async (latitude, longitude) => {
//     let address = await Location.reverseGeocodeAsync({ latitude, longitude });
//     setAddress(address[0]);
//     return address;
//   };

//   const onLocation = async () => {
//     const location = {
//       latitude: currLocation.latitude,
//       longitude: currLocation.longitude,
//     };

//     refMap.current.animateCamera({
//       center: location,

//       // Only when using Google Maps.
//       zoom: 17,
//     });

//     await getAddressAsync(location.latitude, location.longitude);
//     // console.log(`${location.latitude}, ${location.longitude}`);
//     console.log(address);
//   };

//   const getAddressFromCoords = async (lat, lng) => {
//     try {
//       const response = await axios.get(
//         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBb2lef_VaN4m9OlvngArW3h84ul1DHZIo`
//       );
//       if (response.data.status === "OK") {
//         const { address_components } = response.data.results[0];
//         // find the street name component in the address_components array
//         const streetName = address_components.find((component) =>
//           component.types.includes("route")
//         ).long_name;
//         return streetName;
//       } else {
//         console.log(
//           "Geocode was not successful for the following reason: ",
//           response.data.status
//         );
//         return null;
//       }
//     } catch (error) {
//       console.log(error);
//       return null;
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <MapView
//         showsMyLocationButton={false}
//         showsUserLocation={true}
//         customMapStyle={customMapStyle}
//         onUserLocationChange={(e) => setCurrLocation(e.nativeEvent.coordinate)} //here
//         ref={refMap}
//         style={{ height: "100%", width: "100%" }}
//         onRegionChangeComplete={async (Region) => {
//           await getAddressAsync(Region.latitude, Region.longitude);
//           console.log(`${Region.latitude}, ${Region.longitude}`);

//           console.log(address);

//           await getAddressFromCoords(Region.latitude, Region.longitude);
//         }}
//         initialRegion={{
//           latitude: QAlat,
//           latitudeDelta: 0.6631861591450701,
//           longitude: QAlon,
//           longitudeDelta: 0.3281260281801224,
//         }}
//         onPress={(e) => {
//           setMarkerPoint(e.nativeEvent.coordinate);
//         }}
//         // onRegionChangeComplete={setCoordinate}
//       >
//         {/* {markerPoint && <MarkerAnimated coordinate={markerPoint} />} */}
//       </MapView>
//       <View style={{ position: "absolute", top: 40, left: 0 }}>
//         <Button title={"to curr location"} onPress={onLocation} />
//       </View>
//       <Entypo
//         name={"location-pin"}
//         size={30}
//         color={"#660032"}
//         style={{
//           position: "absolute",
//           left: "50%",
//           top: "50%",
//           marginTop: 3 + 3 - 30, //3 is the half of below view height another 3 is the offset and the -30 is the current icon hight
//           marginLeft: -15 + 3, //-15 is the current icon width and the 3 is the half of bellow view width
//           zIndex: 1,
//         }}
//       />
//       <View
//         style={{
//           position: "absolute",
//           width: 6,
//           height: 6,
//           borderRadius: 0,
//           left: "50%",
//           top: "50%",
//         }}
//       />
//       <View style={{ position: "absolute", bottom: 0 }}>
//         <Text>{JSON.stringify(address)}</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//   },
// });
