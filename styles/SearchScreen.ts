import { Button, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    marginVertical: -200,
    paddingVertical: 200,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
  },
  input: {
    width: "75%",
    height: 60,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 50,
    marginBottom: 10,
    paddingHorizontal: 20,
    color: "#fff",
    backgroundColor: "transparent",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 1,
    paddingVertical: 26,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 30,
  },
  greeting: {
    fontSize: 24,
    color: "#ffff",
    fontFamily: "inter-medium",
  },
  userName: {
    fontSize: 24,
    color: "#032D45",
    fontFamily: "inter-bold",
  },
  location: {
    fontSize: 18,
    color: "#FFFFFF",
    marginTop: 5,
  },
  icon: {
    width: 60,
    height: 60,
    marginTop: 35,
  },
  texthead: {
    marginTop: 120,
    fontSize: 23,
    fontFamily: "inter-bold",
    color: "#FFFF",
  },
  textbox: {
    width: 300,
    height: 60,
    marginTop: 40,
    marginVertical: 20,
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  space: {
    marginRight: 260
  },
  buttonSearch: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#14E2C3",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 40,
  },
  buttonSearch1: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 40,
  },
  textButtonSearch: {
    width: 130,
    alignItems: "center",
    fontFamily: "inter-bold",
    color: "black",
    fontSize: 18,
    marginLeft: 15,
  },
  suggestionsContainer: {
    maxHeight: 150,
    backgroundColor: "#fff",
    borderColor: "#fff", // Mesma cor da borda do input
    borderWidth: 1,
    borderRadius: 5,
    marginTop: -9, // Ajusta a margem para aparecer logo abaixo do input
    width: "75%", // Mesma largura do input
    zIndex: 1,
  },
  suggestionText: {
    padding: 15, // Ajuste de padding para combinar com o input
    color: "#fff", // Mesma cor do texto do input
    fontSize: 16, // Mesmo tamanho de fonte
    backgroundColor: "#032D45", // Cor de fundo combinando com o gradiente da tela
  },
});
