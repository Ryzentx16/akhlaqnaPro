import * as ImagePicker from "expo-image-picker";
import * as RNImagePicker from "react-native-image-picker";
import * as Permissions from "expo-permissions";
import { Camera, CameraType } from "expo-camera";

import { Alert } from "react-native";

export const pickImage = async (setImage) => {
  // No permissions request is necessary for launching the image library
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    aspect: [4, 3],
    quality: 1,
    allowsEditing: true,
  });

  if (!result.canceled) {
    setImage(result.assets[0]);
  } else {
    console.log("cancelled");
  }
};

export const takeImage = async (setImage) => {
  Alert.alert("Sorry", "Sorry, this feature is not available yet.");
  // const [permission, requestPermission] = Camera.useCameraPermissions();

  // if (permission.granted) {
  //   const result = await ImagePicker.launchCameraAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: false,
  //     base64: false,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   console.log(result);
  // }

  // let permissionResult = await Camera.getCameraPermissionsAsync();
  // if (permissionResult.status !== "granted") {
  //   permissionResult = await Camera.requestCameraPermissionsAsync();
  // }
  // if (permissionResult.status !== "granted") {
  //   alert("You must turn on camera permissions to record a video.");
  // } else {
  //   // Camera.
  //   let result = await ImagePicker.launchCameraAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Videos,
  //     allowsEditing: true,
  //     aspect: [3, 4],
  //   });
  //   console.log(result);
  // }

  // ImagePicker.requestCameraPermissionsAsync()
  //   .then((permission) => {
  //     ImagePicker.getCameraPermissionsAsync().then(console.log);
  //     if (permission.granted) {
  //       ImagePicker.launchCameraAsync({
  //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //         base64: true,
  //         aspect: [4, 3],
  //         quality: 0.4,
  //         // allowsEditing: true,
  //       })
  //         .then((img) => {
  //           console.log(img);
  //           setImage(img.assets[0]);
  //         })
  //         .catch((er) => console.error(er));
  //     } else {
  //       console.log(permission);
  //     }
  //   })
  //   .catch(console.error);

  // console.log(await ImagePicker.getPendingResultAsync());

  // // let pS = ;
  // let r = await ImagePicker.requestCameraPermissionsAsync().catch((er) =>
  //   console.error(er)
  // );

  // if (!r.granted) {
  //   if (r.canAskAgain) {
  //     r = await ImagePicker.requestCameraPermissionsAsync().catch((er) =>
  //       console.error(er)
  //     );
  //     console.log(r);
  //   } else {
  //     alert("u refused!");
  //     return;
  //   }
  // }
  // console.log(r);
  // if (r.granted) {
  //   console.log("granted");

  //   const result = await ImagePicker.launchCameraAsync({
  //     aspect: [4, 3],
  //     quality: 0.4,
  //     allowsEditing: true,
  //   }).catch((er) => console.error(er));

  //   // if (!result.canceled) {
  //   //   setImage(result.assets[0]);
  //   // } else {
  //   //   console.log("cancelled");
  //   // }

  //   console.log(result);
  // }
};
