import {
  I18nManager,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

const isRTL = I18nManager.isRTL;

export default function AmantiLogo({
  contentContainerStyle,
  onLogo,
  theme,
  isDarkMode,
  isStartUp = false,
}) {
  return (
    <View
      style={[styles.container, { ...contentContainerStyle, borderWidth: 0 }]}
    >
      {!isStartUp && (
        <View style={[styles.circle, { borderColor: theme?.secondary }]} />
      )}
      <TouchableOpacity
        style={[styles.logo, { borderColor: theme?.secondary }]}
        onPress={onLogo}
      >
        <Image
          source={
            isDarkMode
              ? require("../../assets/AmantiDark.png")
              : require("../../assets/Logo1.png")
          }
          style={styles.imageLogo}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},

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
    height: 45,
    // width: 50,
    aspectRatio: 298 / 124,
    alignSelf: "center",
    borderColor: "#660032",
    // borderWidth: 2,
    // borderRadius: 150 / 2,
    // backgroundColor: "red",

    alignItems: "center",
    justifyContent: "center",
  },
  imageLogo: {
    height: 45,
    // width: 37,
    // aspectRatio: 298 / 124,
    resizeMode: "contain",
    marginLeft: isRTL ? -5 : 5,
  },
});
