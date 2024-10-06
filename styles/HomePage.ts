import { StyleSheet } from "react-native";

export default StyleSheet.create({
  gradient: {
    flex: 1,
    marginBottom: -40,
    marginTop: -50,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 26,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -3,
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
    marginTop: 15,
  },
  icon: {
    width: 60,
    height: 60,
    marginTop: 50,
  },
  icon2: {
    width: 60,
    height: 60,
    marginTop: 50,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    padding: 33,
    marginTop: 80,
    marginBottom: -5,
    alignSelf: "center",
    width: "90%",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
  },
  cardIcon: {
    marginBottom: 10,
  },
  cardTitle: {
    //alinhar o texto ao centro
    textAlign: "center",
    fontSize: 18,
    color: "#FFFFFF",
    marginTop: -33,
    marginLeft: 10,
    fontFamily: "inter-black",
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#14E2C3",
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
});
