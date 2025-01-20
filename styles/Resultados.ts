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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  title: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10, // Pequeno espaçamento abaixo do título
    textAlign: "center", // Centralizar o título
  },
  resultContainer: {
    flex: 1, // Preenche o espaço restante na tela
    justifyContent: "center", // Centraliza os botões verticalmente
    alignItems: "center", // Centraliza os botões horizontalmente
  },

  pdfButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Centraliza o conteúdo horizontalmente
    backgroundColor: "#0A4E66",
    paddingVertical: 40, // Ajuste para padronizar com o outro botão
    paddingHorizontal: 20,
    borderRadius: 10,
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
  appButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Centraliza o conteúdo horizontalmente
    backgroundColor: "#119797", // Cor de fundo verde-azulado
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 30, // Margem entre os botões
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5, // Para sombras no Android
  },
  appButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  pdfButtonText2: {
    color: "#FFFFFF",
    fontSize: 20,
    marginLeft: 10,
    marginTop: 5,
  },
  respostaItem: {
    backgroundColor: "#032D45",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  respostaText: {
    fontSize: 20,
    marginTop: 15,
    color: "#D8EBF2",
  },
  noRespostas: {
    color: "#D8EBF2",
    fontSize: 18,
    textAlign: "center",
  },
  labelText: {
    color: "#14E2C3",
    fontWeight: "bold",
  },
  text: {
    color: "#FFFFF",
  },
  buttonSearch: {
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A4E66",
    borderWidth: 3,
    borderColor: "#032D45",
    paddingVertical: 17,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 10,
    zIndex: 1000,
  },
  space: {
    marginRight: 260,
  },
  notice: {
    backgroundColor: "#032D45",
    padding: 5,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#D8EBF2",
    marginBottom: 2,
    fontSize: 16,
  },
  classificacaoText: {
    fontSize: 28, // Tamanho grande para destaque
    fontWeight: "bold", // Negrito
    color: "#FFFFFF", // Cor branca para o texto
    backgroundColor: "#0A4E66", // Cor de fundo azul escuro
    paddingVertical: 15, // Espaçamento vertical
    paddingHorizontal: 20, // Espaçamento horizontal
    borderRadius: 0, // Bordas arredondadas para parecer uma "caixa"
    borderWidth: 2, // Borda para destacar a caixa
    borderColor: "#0A4E66", // Cor da borda verde-azulada da logo
    textAlign: "center", // Centralizar o texto
    marginVertical: 20, // Margem acima e abaixo do texto
    shadowColor: "#14E2C3", // Cor da sombra
    shadowOffset: { width: 0, height: 0 }, // Deslocamento da sombra
    shadowOpacity: 0.8, // Opacidade da sombra
    shadowRadius: 8, // Raio da sombra
    elevation: 10, // Para funcionar no Android
  },
});
