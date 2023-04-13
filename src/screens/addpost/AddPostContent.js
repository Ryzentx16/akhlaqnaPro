import styles from "./styles";
import ImageViewer from "./../../components/ImageViewer";
import { ScrollView, TextInput } from "react-native";
import { View } from "react-native";
import languages from "./../../strings/LanguagesController";
import { useContext, useEffect } from "react";
import ThemeContext from "../../themes/ThemeContext";

export default function AddPostContent({
  setContent,
  content,
  image = null,
  setImage,
}) {
  const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext);

  let currLang = languages.currLang();
  useEffect(() => {
    currLang = languages.currLang();
  });

  return (
    <View
      style={[
        styles.contentContainer,
        { backgroundColor: isDarkMode ? theme.backColor : "#F0F2F5" },
      ]}
    >
      <ScrollView>
        <View style={styles.content}>
          <TextInput
            maxLength={5000}
            style={styles.contentInput}
            placeholder={currLang.addpostPage.hint}
            placeholderTextColor={theme.smallText}
            multiline={true}
            value={content}
            onChangeText={(text) => {
              setContent(text);
            }}
          />
        </View>
        {image && (
          <View style={styles.imageContainer}>
            <ImageViewer
              uri={image.uri}
              isFullScreen={false}
              maxHeight={400}
              imageHeight={image.height}
              imageWidth={image.width}
              isUpload={true}
              onCancel={() => setImage(null)}
              style={{ backgroundColor: "black" }}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
