// Arquivo: styles/InicioPerguntasGerais.js

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  imageStyle: {
    alignItems: "center",
    width: 150,
    height: 200,
    alignSelf: "center",
    marginTop: -150,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#14E2C3",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 150,
  },
  buttonText: {
    width: 130,
    textAlign: "center",
    fontFamily: "inter-bold",
    color: "#032D45",
    fontSize: 18,
  },
  textIPAQ: {
    fontFamily: "inter-bold",
    color: "#FFFFFF",
    fontSize: 60,
    textAlign: "center",
    marginVertical: 10,
  },
  underline: {
    width: "60%",
    height: 4,
    backgroundColor: "#14E2C3",
    alignSelf: "center",
    marginBottom: 20,
  },
  textSubtitle: {
    color: "#ffffff",
    fontFamily: "inter-light",
    fontSize: 25,
    textAlign: "center",
    marginBottom: 40,
  },
  gradient: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 70,
  },
});
