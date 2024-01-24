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
    backgroundColor: Colors.secondary,
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
});
