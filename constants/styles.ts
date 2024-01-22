import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 50,
  },

  loginSubHeader: {
    color: Colors.lighter,
    fontSize: 24,
    fontWeight: "600",
    letterSpacing: 2.4,
  },

  loginHeader: {
    color: Colors.secondary,
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 2.88,
  },

  inputTextField: {
    width: 357,
    height: 56,
    margin: 12,
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.light,
  },

  authOption: {
    fontSize: 14,
    letterSpacing: 1.68,
    color: Colors.lighter,
    fontWeight: "400",
    borderColor: "red",
  },


  authButton: {
    width: 357,
    height: 55,
    flexShrink: 0,
    borderRadius: 5,
    backgroundColor: Colors.secondary,
  },
  authButtonText: {
    fontSize: 20,
    color: Colors.light,
    textAlign: "center",
    padding: 10,
    letterSpacing: 1.8,
    fontWeight: "700",
  },
});
