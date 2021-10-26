import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#bcccdc",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222222",
  },
  editButton: {
    backgroundColor: "#102A43",
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: "6%",
    right: "6%",
  },
  flatlist: {
    flex: 1,
    backgroundColor: "#202225",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 35,
  },
  header: {
    width: "100%",
    backgroundColor: "#222222",
    borderBottomColor: "#102A43",
    borderBottomWidth: 1,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderBottomEndRadius: 40,
  },
  headerContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  headerContent: {
    marginHorizontal: 10,
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },
});
