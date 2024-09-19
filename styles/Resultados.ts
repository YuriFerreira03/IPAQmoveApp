import { StyleSheet } from "react-native";

export default StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 120,
  },
  pdfButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A4E66",
    padding: 30,
    borderRadius: 10,
    marginBottom: 400,
  },
  pdfButtonText: {
    color: "#FFFFFF",
    fontSize:20,
    marginLeft: 10,
  },
});
