import { Button, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: -4,
    marginTop: -70,
    width: "100%",
  },
  gradient: {
    flex: 1,
    width: "110%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 90,
  },
  imageStyle: {
    width: 150,
    height: 200,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  textStyle: {
    color: "white",
    fontFamily: "inter-bold",
    fontSize: 26,
    marginBottom: 10,
  },
  textStyleII: {
    color: "white",
    fontFamily: "inter-bold",
    fontSize: 36,
    marginBottom: 40,
  },
  textStyleIII: {
    color: "white",
    fontFamily: "inter-regular",
    fontSize: 15,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#103B41",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 30,
  },
  googleButtonText: {
    fontFamily: "inter-regular",
    color: "white",
    fontSize: 23,
    marginHorizontal: 40,
  },
  googleButtonText1: {
    fontFamily: "inter-regular",
    color: "white",
    fontSize: 23,
    marginHorizontal: 20,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchLabel: {
    fontSize: 20,
    color: "#032D45",
    fontFamily: "inter-regular",
    marginTop: 65,
    marginHorizontal: 30,
  },
  switchStyle: {
    marginTop: 50,
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  },
  termsContainer: {
    alignItems: "center",
    transform: [{ scaleX: 1.2 }, { scaleY: 1.3 }],
    marginTop: 100,
  },
  termsText: {
    marginTop: 10,
    fontFamily: "inter-regular",
    fontSize: 13,
    color: "#032D45",
  },
});
