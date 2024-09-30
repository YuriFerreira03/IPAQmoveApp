import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 17,
    marginVertical: -200,
    paddingVertical: 200,
  },
  title: {
    fontSize: 30,
    marginTop: 50,
    marginBottom: 40,
    marginLeft: -5,
    color: "white",
    textAlign: "center",
    fontFamily: "inter-bold",
  },
  body: {
    fontSize: 32,
    color: "white",
    textAlign: "left",
    marginTop: 4,
    fontFamily: "inter-regular",
    marginHorizontal: 15,
    letterSpacing: 1,
    lineHeight: 45,
  },
  nao: {
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "transparent", // Mudei para transparente para se misturar com o fundo gradiente
    borderRadius: 10,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#fff",
    padding: 23,
    marginVertical: 30,
    width: "92%",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  cardTitle: {
    fontSize: 25,
    marginBottom: 40,
    color: "white",
    fontFamily: "inter-light",
  },
  checkboxWrapper: {
    flexDirection: "row", // Checkbox e "nenhum" em uma linha
    alignItems: "center",
    marginBottom: 15,
  },
  checkbox: {
    marginRight: 5, // Espaço entre o checkbox e o texto "nenhum"
  },
  label: {
    fontSize: 26,
    color: "white",
    marginHorizontal: 20,
    fontFamily: "inter-light",
    lineHeight: 45,
  },
  label2: {
    fontSize: 26,
    color: "white",
    marginHorizontal: 0,
    fontFamily: "inter-light",
    lineHeight: 45,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -4,
    marginBottom: 30,
    marginLeft: 300,
  },
  label3: {
    fontSize: 26,
    color: "white",
    marginHorizontal: 20,
    fontFamily: "inter-light",
    lineHeight: 45,
  },
  textboxV: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    fontSize: 20,
  },
  atividadesWrapper: {
    marginTop: 10, // Espaço entre o campo anterior
    alignItems: "flex-start", // Alinha o texto e o campo à esquerda
    marginBottom: 30,
  },
});

export default styles;
