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

// import React, { useCallback, useMemo, useRef, useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import BottomSheet, { BottomSheetModal,BottomSheetModalProvider } from "@gorhom/bottom-sheet";
// import { GestureHandlerRootView } from "react-native-gesture-handler";

// const App = () => {
//   const bottomSheetRef = useRef(null);

//   const snapPoints = useMemo(() => ["95"], []);

//   const handleSheetChanges = useCallback((index) => {
//     console.log("handleSheetChanges", index);
//   }, []);

//   const handlePresentModalPress = useCallback(() => {
//     bottomSheetRef.current?.present();
//   }, []);

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <BottomSheetModalProvider>
//         <Text>hakljasdf</Text>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={handlePresentModalPress}
//         >
//           <Text style={{ color: "#0080FB", fontSize: 16, fontWeight: "600" }}>
//             GET
//           </Text>
//         </TouchableOpacity>

//         <BottomSheetModal
//           ref={bottomSheetRef}
//           index={0}
//           snapPoints={snapPoints}
//           onChange={handleSheetChanges}
//         >
//           <View style={styles.contentContainer}>
//             <Text>Awesome 🎉</Text>
//           </View>
//         </BottomSheetModal>
//       </BottomSheetModalProvider>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     backgroundColor: "grey",
//   },
//   contentContainer: {
//     flex: 1,
//     alignItems: "center",
//   },
//   button: {
//     marginTop: 20,
//     backgroundColor: "#f4f4f4",
//     width: 80,
//     height: 30,
//     alignItems: "center",
//     justifyContent: "center",
//     alignSelf: "center",
//     borderRadius: 15,
//   },
// });

// export default App;
