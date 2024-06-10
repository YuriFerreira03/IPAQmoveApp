import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 17,
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
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    marginLeft: 80,
    transform: [{ scale: 1.2 }],
    marginLeft: 55,
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
    fontWeight: 'bold',
    color: 'yellow',
  },
  card: {
    backgroundColor: 'transparent', // Mudei para transparente para se misturar com o fundo gradiente
    borderRadius: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    padding: 23,
    marginVertical: 30,
    width: '100%',
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 26,
    marginBottom:40,
    color: 'white',
    fontFamily: "inter-light",
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    color: 'white',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth:1,
    borderColor: '#fff',
    left: 10,
  },
  label: {
    fontSize: 26,
    color: 'white',
    marginHorizontal: 20,
    fontFamily: "inter-light",
    lineHeight: 45,

  },
});

export default styles;
