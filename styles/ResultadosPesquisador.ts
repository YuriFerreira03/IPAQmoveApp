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
    marginTop: 50,
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 200,
    marginTop: -10,
  },
  space: {
    marginRight: 310,
    marginLeft: 10
  },
});

export default styles;
