import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 17,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  questao: {
    fontSize: 16,
    color: "#fff",
    marginVertical: 8,
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
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -4, 
    marginBottom: 30, 
    marginLeft: 300, 
  },

});

export default styles;