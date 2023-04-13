import { StyleSheet } from "react-native";
import light from "./light";
import dark from "./dark";

export default class ThemeController {
  static lightColors = {
    primary: "white",
    secondary: "#660032",
    mediumText: "black",
    smallText: "grey",
    backColor: "#E6E6E6",
    largeText: "#660032",
    border: "#420021",
    OriginalColors: { background: "#660032", text: "white" },
    SwappedColors: { background: "white", text: "#660032" },
  };

  static darkColors = {
    primary: "#1C1C1C",
    secondary: "#B34176",
    mediumText: "#E0E0E0",
    smallText: "#A0A0A0",
    backColor: "#2C2C2C",
    largeText: "#B34176",
    border: "#8F506B",
    OriginalColors: { background: "#B34176", text: "#E0E0E0" },
    SwappedColors: { background: "#1C1C1C", text: "#B34176" },
  };

  static mode = "light"; // Default mode is light

  static switchMode() {
    this.mode = this.mode === "light" ? "dark" : "light";
  }

  static getCurrentMode() {
    return this.mode;
  }

  static getColors() {
    return this.mode === "light" ? this.lightColors : this.darkColors;
  }
}

// export const themedStyles = StyleSheet.create({
//   // Add your component styles here using ThemeManager.getColors()
// });
