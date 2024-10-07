// Arquivo: styles/TelaLocalizacao.js

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginVertical: -200,
    paddingVertical: 200,
  },
  container: {
    width: "100%",
    alignItems: "center",
  },
  textI: {
    fontSize: 32,
    color: "white",
    textAlign: "left",
    marginBottom: 10,
    fontFamily: "inter-regular",
    lineHeight: 50,
    marginTop: 40,
  },
  textII: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "inter-regular",
    lineHeight: 28,
  },
  localizacao: {
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 60,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: "#fff",
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    flexWrap: "wrap", // Permite a quebra de linha
    width: "100%", // Garante que o conteúdo ocupe toda a largura disponível
  },
  checkbox: {
    marginRight: 10,
  },
  textIV: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "inter-regular",
    marginRight: -20,
    flexShrink: 1,
  },
  textVI: {
    color: "#14E2C3",
    textDecorationLine: "underline",
  },
  textV: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    marginTop: 2,
    marginBottom: 20,
    fontFamily: "inter-regular",
    lineHeight: 28,
  },
  button: {
    backgroundColor: "#14E2C3",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginBottom: 10,
    width: "80%",
  },
  buttonText: {
    fontSize: 18,
    color: "#032D45",
    fontFamily: "inter-bold",
  },
  suggestionsContainer: {
    maxHeight: 150,
    backgroundColor: "#fff",
    borderColor: "#fff", // Mesma cor da borda do input
    borderWidth: 1,
    borderRadius: 5,
    marginTop: -20, // Ajusta a margem para aparecer logo abaixo do input
    width: "100%", // Mesma largura do input
    zIndex: 1,
  },
  suggestionText: {
    padding: 15, // Ajuste de padding para combinar com o input
    color: "#fff", // Mesma cor do texto do input
    fontSize: 16, // Mesmo tamanho de fonte
    backgroundColor: "#032D45", // Cor de fundo combinando com o gradiente da tela
  },
});
