import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    padding: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 5,
    marginBottom: 60,
  },
  card: {
    backgroundColor: "#032D45",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    //alinhar texto no centro
    textAlign: "center",
    color: "#14E2C3",
  },
  cardDescription: {
    fontSize: 20,
    color: "#D8EBF2",
    marginBottom: 20,
  },
  cardButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#032D45",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
  },
  cardButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    marginLeft: 8,
  },
  noDataText: {
    color: "#fff", // Cor branca (ajuste conforme necessário)
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
  buttonSearch: {
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#032D45",
    paddingVertical: 15,
    paddingHorizontal: 17,
    borderRadius: 20,
    marginTop: 15,
  },
  buttonTextI: {
    color: "white",
    fontSize: 20,
    marginLeft: 10,
  },
  space: {
    marginRight: 310,
    marginLeft: 10,
  },
  resultContainer: {
    marginTop: 20,
    padding: 11,
    borderRadius: 8,
    backgroundColor: "#0A4E66",
    borderColor: "#032D45",
    borderWidth: 2,
  },
  resultTitle: {
    fontSize: 27,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  resultSubtitle: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    marginVertical: 15,
  },
  resultItem: {
    fontSize: 20,
    color: "white",
    marginVertical: 8,
    textAlign: "center",
  },
});

export default styles;
