import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 12,
    position: "relative",
  },

  loginSubHeader: {
    color: Colors.lighter,
    fontSize: 24,
    fontFamily: "roboto-medium",
    letterSpacing: 2.4,
  },

  loginHeader: {
    color: Colors.secondary,
    fontSize: 28,
    fontFamily: "roboto-bold",
    letterSpacing: 2.88,
  },

  inputTextField: {
    fontSize: 14,
    letterSpacing: 1.68,
    width: 357,
    height: 56,
    margin: 12,
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.light,
    fontFamily: "roboto",
  },

  authOption: {
    fontSize: 14,
    letterSpacing: 1.68,
    color: Colors.lighter,
    fontFamily: "roboto",
  },

  authButton: {
    width: 357,
    height: 55,
    flexShrink: 0,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  authButtonText: {
    fontSize: 18,
    color: Colors.light,
    textAlign: "center",
    padding: 10,
    letterSpacing: 1.8,
    fontFamily: "roboto-medium",
  },
  errorText: {
    color: "red",
    fontFamily: "roboto",
    fontSize: 14,
    letterSpacing: 1.2,
    textAlign: "left",
    alignSelf: "flex-start",
    paddingLeft: 10,
  },
});

export const ClientRegisterStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    overflow: "scroll",
  },
  titleText: {
    fontFamily: "roboto-medium",
    fontSize: 14,
    letterSpacing: 1.6,
    textAlign: "center",
    color: Colors.lighter,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  scroll: {
    width: "100%",
    height: "100%",
  },
  subContainer: {
    flexGrow: 1,
    backgroundColor: Colors.light,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  textInput: {
    borderColor: Colors.secondary,
    borderWidth: 1,
  },

  submitBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    width: 357,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  submitBtnText: {
    color: Colors.lighter,
    fontFamily: "roboto-medium",
    fontSize: 18,
    letterSpacing: 1.8,
    textAlign: "center",
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
    marginTop: 12,
    backgroundColor: Colors.light,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});

export const clientProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    overflow: "scroll",
  },
  subContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingBottom: 50,
  },
  scroll: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.light,
    overflow: "scroll",
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 12,
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: Colors.secondary,
    paddingLeft: 20,
    marginBottom: 30,
  },
});

export const HandymanProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    overflow: "scroll",
  },
  scroll: {
    width: "100%",
    height: "100%",
  },
  subContainer: {
    backgroundColor: Colors.light,
    justifyContent: "space-evenly",
    alignItems: "center",
    overflow: "scroll",
    paddingBottom: 100,
  },
  textInput: {
    borderColor: Colors.secondary,
    borderBottomWidth: 2,
  },
  textArea: {
    paddingTop: 0,
    height: 100,
  },
  submitBtn: {
    padding: 12,
    borderRadius: 8,
    width: 357,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
  },
  submitBtnText: {
    color: Colors.lighter,
    fontFamily: "roboto-medium",
    fontSize: 18,
    letterSpacing: 1.8,
    textAlign: "center",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    overflow: "scroll",
    marginTop: 20,
    paddingBottom: 20,
    paddingTop: 25,
    backgroundColor: Colors.light,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});

export const handymanRegisterStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    overflow: "scroll",
  },
  scroll: {
    width: "100%",
    height: "100%",
  },
  subContainer: {
    backgroundColor: Colors.light,
    justifyContent: "space-evenly",
    alignItems: "center",
    overflow: "scroll",
    paddingBottom: 30,
  },
  textInput: {
    borderColor: Colors.secondary,
    borderWidth: 1,
  },
  textArea: {
    paddingTop: 0,
    height: 100,
  },
  submitBtn: {
    padding: 12,
    borderRadius: 8,
    width: 357,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  submitBtnText: {
    color: Colors.lighter,
    fontFamily: "roboto-medium",
    fontSize: 18,
    letterSpacing: 1.8,
    textAlign: "center",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    overflow: "scroll",
    marginTop: 20,
    paddingBottom: 20,
    paddingTop: 25,
    backgroundColor: Colors.light,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});

export const taskFormStyles = StyleSheet.create({
  safeareaStyle: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingTop: 20,
    alignItems: "center",
  },
  scroll: {
    width: "100%",
    height: "100%",
  },
  contentStyle: {
    flexGrow: 1,
    alignItems: "center",
    marginTop: 12,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    paddingBottom: 50,
    marginTop: 25,
    paddingTop: 20,
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingBottom: 50,
  },
  headerTextStyle: {
    fontFamily: "roboto",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1.8,
    color: Colors.secondary,
  },

  textInput: {
    borderColor: Colors.secondary,
    borderWidth: 1,
  },
  viewTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingBottom: 50,
  },
  inputField: {
    width: 180,
    fontFamily: "roboto",
    fontSize: 14,
    height: 60,
    borderRadius: 10,
    padding: 15,
    borderColor: Colors.secondary,
    marginBottom: 10,
    letterSpacing: 1.2,
  },
  textarea: {
    width: 384,
    height: 120,
    borderRadius: 10,
    padding: 15,
    borderColor: Colors.secondary,
    fontFamily: "roboto",
    marginBottom: 10,
    letterSpacing: 1.2,
  },
});

export const categoryListStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListStyle: {
    paddingVertical: 10,
    paddingBottom: 120,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  categoryContainer: {
    flex: 1,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: Colors.light,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: "roboto-medium",
    letterSpacing: 1.2,
    textAlign: "center",
    color: Colors.lighter,
  },
});

export const clientHomeStyles = StyleSheet.create({
  safeareaView: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: Colors.primary,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },

  notification: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  iconView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.lighter,
    borderRadius: 16,
    margin: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconText: {
    fontSize: 14,
    fontFamily: "roboto-medium",
    color: Colors.secondary,
    marginBottom: 10,
    letterSpacing: 1,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "roboto-bold",
    color: Colors.lighter,
    marginBottom: 10,
    letterSpacing: 1,
    lineHeight: 30,
  },
  catergoryHeader: {
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: "roboto-medium",
    letterSpacing: 1.2,
    color: Colors.lighter,
  },
});

export const defaultJobStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light,
    flex: 1,
  },
  headerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
});

export const jobListStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  jobContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: Colors.lighter,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  jobText: {
    fontSize: 14,
    fontFamily: "roboto",
    letterSpacing: 1,
    padding: 5,
  },
  proposalContainer: {
    alignSelf: "flex-end",
  },
  jobBody: {
    borderBottomWidth: 0.5,
    borderBottomColor: "grey",
    paddingBottom: 10,
    marginBottom: 10,
  },
  jobFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
