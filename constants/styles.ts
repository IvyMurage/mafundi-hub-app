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
    fontFamily: "poppins-semibold",
    letterSpacing: 2.4,
  },

  loginHeader: {
    color: Colors.secondary,
    fontSize: 28,
    fontFamily: "poppins-bold",
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
    fontFamily: "poppins",
  },

  authOption: {
    fontSize: 14,
    letterSpacing: 1.68,
    color: Colors.lighter,
    fontFamily: "poppins",
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
    fontFamily: "poppins-semibold",
  },
  errorText: {
    color: "red",
    fontFamily: "poppins",
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
    fontFamily: "poppins-medium",
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
    fontFamily: "poppins-semibold",
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
  },
  submitBtnText: {
    color: Colors.lighter,
    fontFamily: "poppins-semibold",
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
