import React, { useMemo, useRef, useState, useEffect, useContext } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import InputBox from "../screens/chat/inputBox";
import ThemeContext from "../themes/ThemeContext";

export default BottomSheetHandler = (props) => {
  const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext);

  const {
    post,
    onClose, // required
    onSend,
    snaps = ["25%", "65%", "100%"],

    // For textinput
    onPickImage,
    onCancel,
    onTakeImage,
    image,

    backgroundStyle,
  } = props;
  const [isFocus, setIsFocus] = useState(false);
  const [tiPlaceHolder, setTiPlaceHolder] = useState(null);
  const snapPoints = useMemo(() => snaps, []);

  const onCommentClose = () => {
    onClose(false);
  };

  return (
    <BottomSheet
      index={0}
      snapPoints={snapPoints}
      handleStyle={{
        backgroundColor: theme.secondary,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      }}
      onClose={onCommentClose} // required
      enablePanDownToClose={true}
      backgroundStyle={[{ backgroundColor: theme.backColor }, backgroundStyle]}
    >
      {props.children}

      {props.hasOwnProperty("InputBox") && (
        <InputBox
          replyPlaceHolder={tiPlaceHolder}
          onFocus={isFocus}
          onSendReply={(message) => {
            props.InputBox(message);
            setIsFocus(false);
            setTiPlaceHolder(null);
          }}
          isComment={true}
          // post={post}
          image={image}
          style={{ backgroundColor: "#c8c7c8" }}
          onPickImage={onPickImage}
          onTakeImage={onTakeImage}
          onCancel={onCancel}
        />
      )}
    </BottomSheet>
  );
};
