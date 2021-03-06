import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202225",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#486581",
    fontSize: 55,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  subtitle: {
    color: "#bcccdc",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 30,
  },
  input: {
    width: "80%",
    backgroundColor: "#bcccdc",
    padding: 10,
    marginTop: 10,
    borderRadius: 7,
    fontSize: 17,
  },
  logInButton: {
    width: "80%",
    backgroundColor: "#102a43",
    padding: 10,
    marginTop: 10,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  logInButtonText: {
    color: "#bcccdc",
    fontSize: 20,
  },
  signUpButton: {
    width: "100%",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  signUpButtonText: {
    color: "#bcccdc",
    fontSize: 15,
  },
});
