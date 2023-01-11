import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";

export default function SeeMoreText(props) {
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= props.numberOfLines); //to check the text is more than 4 lines or not
  }, []);

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);

    if (props.hasOwnProperty("onPress") == true) {
      props.onPress();
    }
  };

  return (
    <TouchableOpacity
      style={styles.detailsContainer}
      onPress={toggleNumberOfLines}
    >
      <Text
        style={styles.detailsText}
        onTextLayout={onTextLayout}
        numberOfLines={textShown ? undefined : props.numberOfLines}
      >
        {post.content}
      </Text>

      {lengthMore && !textShown ? (
        <TouchableOpacity onPress={toggleNumberOfLines}>
          <Text style={[styles.detailsText, { fontWeight: "bold" }]}>
            {"Read more"}
          </Text>
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: "red",
    justifyContent: "center",
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
});
