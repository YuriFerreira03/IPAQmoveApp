import { StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

export default StyleSheet.create({
  gradient: {
    flex: 1,
    marginBottom: verticalScale(-30),
    marginTop: verticalScale(-10),
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
    padding: scale(26),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: verticalScale(-3),
    paddingVertical: verticalScale(26),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(5),
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: verticalScale(40),
  },
  greeting: {
    fontSize: moderateScale(24),
    color: "#ffff",
    fontFamily: "inter-medium",
  },
  userName: {
    fontSize: moderateScale(24),
    color: "#032D45",
    fontFamily: "inter-bold",
  },
  location: {
    fontSize: moderateScale(18),
    color: "#FFFFFF",
    marginTop: verticalScale(15),
  },
  icon: {
    width: scale(60),
    height: scale(60),
    marginTop: verticalScale(50),
  },
  icon2: {
    width: scale(60),
    height: scale(60),
    marginTop: verticalScale(50),
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: moderateScale(10),
    padding: scale(33),
    marginTop: verticalScale(60),
    marginBottom: verticalScale(-5),
    alignSelf: "center",
    width: "90%",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
  },
  cardIcon: {
    marginBottom: verticalScale(10),
  },
  cardTitle: {
    textAlign: "center",
    fontSize: moderateScale(18),
    color: "#FFFFFF",
    marginTop: verticalScale(-33),
    marginLeft: scale(10),
    fontFamily: "inter-black",
    marginBottom: verticalScale(10),
  },
  cardDescription: {
    fontSize: moderateScale(16),
    marginTop: verticalScale(10),
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: verticalScale(20),
  },
  button: {
    backgroundColor: "#14E2C3",
    paddingVertical: verticalScale(9),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(5),
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: moderateScale(16),
    textAlign: "center",
  },
});
