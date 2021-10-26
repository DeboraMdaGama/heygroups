import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202225",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "100%",
  },
  containerInput: {
    flexDirection: "row",
    margin: 10,
    marginTop: 20,
    alignItems: "flex-end",
  },
  mainContainerInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#bcccdc",
    flex: 1,
    borderRadius: 25,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
    maxHeight: 130,
    minHeight: 60,
    fontSize: 18,
  },
  buttonContainer: {
    backgroundColor: "#006600",
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
});
