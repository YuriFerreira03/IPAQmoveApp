import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#032D45",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 30,
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#02405C",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 17,
    //alinhar texto no centro
    textAlign: "center",
    color: "#14E2C3",
  },
  cardDescription: {
    fontSize: 17,
    color: "#D8EBF2",
    marginBottom: 20,
  },
  pdfButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Centraliza o conteúdo horizontalmente
    backgroundColor: "#0A4E66",
    paddingVertical: 20, // Ajuste para padronizar com o outro botão
    borderRadius: 10,
    width: 365,
    //alinhar no centro
    alignSelf: "center",
    marginVertical: 10, // Margem entre os botões
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5, // Para sombras no Android
  },
  pdfButtonText: {
    color: "#FFFFFF",
    fontSize: 18, // Padroniza com o appButtonText
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default styles;
