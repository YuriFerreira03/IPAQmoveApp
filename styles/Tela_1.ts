import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 17,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    marginTop: 50,
    marginBottom: 40,
    color: "white",
    textAlign: "center",
    fontFamily: "inter-bold",
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    marginLeft: 80,
    transform: [{ scale: 1.2 }],
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  activeCircle: {
    backgroundColor: "#14E2C3",
  },
  stepLabel: {
    color: "#000",
    fontSize: 17,
  },
  activeStepLabel: {
    color: "#fff",
  },
  line: {
    width: 20,
    height: 2,
    backgroundColor: "white",
  },
  activeLine: {
    backgroundColor: "#14E2C3",
  },
  body: {
    fontSize: 32,
    color: "white",
    textAlign: "left",
    marginTop: 4,
    fontFamily: "inter-regular",
    marginHorizontal: 20,
    letterSpacing: 1,
    lineHeight: 45,
  },
  nao: {
    fontSize: 32,
    fontWeight: "bold",
    flexDirection: "row",
    marginHorizontal: 30,
    letterSpacing: 2,
  },
  body2: {
    fontSize: 32,
    color: "white",
    textAlign: "left",
    fontFamily: "inter-regular",
    flexDirection: "row",
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -4, // Ajuste conforme necessário
    marginBottom: 30, // Adicione espaço inferior
    marginLeft: 300, // Ajuste conforme necessário
  },
});

export default styles;