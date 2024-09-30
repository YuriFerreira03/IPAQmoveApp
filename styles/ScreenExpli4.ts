import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    fontSize: 30,
    marginTop: 5,
    color: "white",
    fontWeight: "bold",
    paddingHorizontal: 50,
    marginHorizontal: 20,
    marginLeft: 92,
  },
  sectionI: {
    fontSize: 30,
    marginTop: 5,
    color: "white",
    fontWeight: "bold",
    marginHorizontal: -255,
  },
  viewI: {
    marginTop: 80,
  },

  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  line: {
    width: 200,
    height: 1,
    backgroundColor: "white",
    marginTop: 10,
  },
});

export default styles;
