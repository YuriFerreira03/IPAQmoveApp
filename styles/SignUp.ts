import { Button, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: -200,
    marginTop: -326,
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
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    fontFamily: "inter-bold",
    fontSize: 26,
    marginBottom: 100,
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
  buttonlog: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#032D45",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  buttonlog1: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  textbuttonlog: {
    fontFamily: "inter-regular",
    color: "white",
    fontSize: 23,
    marginHorizontal: 10,
  },
  textbuttonlog1: {
    fontFamily: "inter-regular",
    color: "white",
    fontSize: 18,
    marginHorizontal: 10,
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
  passwordContainer: {
    flexDirection: "row", // Alinha o TextInput e o ícone lado a lado
    alignItems: "center", // Alinha verticalmente o ícone e o campo de senha
    width: "75%",
    height: 60,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 35,
    marginBottom: 60,
    paddingHorizontal: 20,
    color: "#fff",
    backgroundColor: "transparent",
  },

  inputultimo: {
    flex: 1, // O TextInput ocupa o espaço disponível ao lado do ícone
    color: "#FFFFFF", // Cor do texto no campo de senha
    paddingHorizontal: 10, // Ajustar espaçamento interno do campo de texto
  },

  icon: {
    paddingHorizontal: 10, // Espaçamento entre o ícone e a borda do campo
    justifyContent: "center", // Garante que o ícone fique no meio
    alignItems: "center", // Centraliza o ícone verticalmente
    height: "100%", // Garante que o ícone ocupe a altura completa do contêiner
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
  containerLog: {
    width: "80%",
    borderRadius: 15,
    marginBottom: 30,
    marginTop: 320,
    backgroundColor: "#032D45",
    alignItems: "center",
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    width: "75%",
    height: 60,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 35,
    marginBottom: 5,
    paddingHorizontal: 20,
    color: "#fff",
    backgroundColor: "transparent",
  },
  textLog: {
    color: "white",
    fontFamily: "inter-bold",
    fontSize: 26,
  },
});
