import { View } from "react-native";
import styles from "./styles";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "react-native-vector-icons";
import { MaterialIcons } from "react-native-vector-icons";
import { Entypo } from "react-native-vector-icons";
import OriginalColors from "./../../components/AmantiButtons/OriginalColors";
import languages from "./../../strings/LanguagesController";
import { useContext, useEffect } from "react";
import ThemeContext from "../../themes/ThemeContext";

export default function AddpostActions({
  takeImage,
  pickImage,
  onLocation,
  onPost,
}) {
  const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext);

  let currLang = languages.currLang();
  useEffect(() => {
    currLang = languages.currLang();
  });

  return (
    <View style={styles.actionsContainer}>
      <View style={styles.attachmentContainer}>
        <TouchableOpacity style={styles.actionBtnContainer} onPress={takeImage}>
          <FontAwesome name={"camera"} size={30} color={theme.secondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtnContainer} onPress={pickImage}>
          <MaterialIcons
            name={"add-photo-alternate"}
            size={40}
            color={theme.secondary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionBtnContainer}
          onPress={onLocation}
        >
          <Entypo name={"location"} size={30} color={theme.secondary} />
        </TouchableOpacity>
      </View>

      <OriginalColors
        onPress={onPost}
        style={styles.postBtnContaianer}
        title={currLang.addpostPage.post}
        textStyle={styles.postText}
      />
    </View>
  );
}
