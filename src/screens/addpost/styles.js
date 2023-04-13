import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },

  headContainer: {
    flex: 1,
    minHeight: 60,
    maxHeight: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginBottom: 10,
  },

  avatarContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 60,
  },

  headerDetailsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 5,
  },

  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#660032",
  },

  contentContainer: {
    flex: 1,
    backgroundColor: "#F0F2F5",
    borderRadius: 15,
    // justifyContent: "flex-start",
    marginHorizontal: 10,
    marginBottom: 10,
    paddingBottom: 8,
    padding: 5,
    overflow: "hidden",
  },

  content: {
    // backgroundColor: "green",
    padding: 10,
  },

  contentInput: {
    minHeight: 50,
    fontSize: 16,
    textAlignVertical: "top",
    textAlign: "auto",
  },

  imageContainer: {
    borderWidth: 3,
    borderRadius: 20,
    // borderColor: "#660032",
    overflow: "hidden",
    width: "100%",
  },

  resImage: {
    resizeMode: "contain",
    backgroundColor: "black",
    width: "100%",
    // Without height undefined it won't work
    height: undefined,
  },

  actionsContainer: {
    flex: 1,
    minHeight: 40,
    maxHeight: 40,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  attachmentContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  actionBtnContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  postBtnContaianer: {
    // justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: 40,
    // borderRadius: 50,
    // backgroundColor: "#660032",
  },
  attachmentsContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 8,
  },

  postContainer: {
    flex: 1,
    // backgroundColor: 'blue',
    justifyContent: "center",
    alignItems: "flex-end",

    paddingRight: 50,
  },
  postText: {
    // fontSize: 14,
    fontWeight: "bold",
    // color: "white",
  },

  pinIcon: {
    position: "absolute",
    // backgroundColor: "red",
    alignSelf: "center",
  },
});
