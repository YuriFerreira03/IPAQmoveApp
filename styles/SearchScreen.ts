import { Button, StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 1,
    paddingVertical: 26,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 30,
  },
  greeting: {
    fontSize: 24,
    color: '#ffff',
    fontFamily: 'inter-medium',
  },
  userName: {
    fontSize: 24,
    color: '#032D45',
    fontFamily: 'inter-bold',
  },
  location: {
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 5,
  },
  icon: {
    width: 60,
    height: 60,
    marginTop: 35,
  },
  texthead: {
    marginTop: 70,
    fontSize: 23,
    fontFamily: 'inter-bold',
    color: "#FFFF",
  },
  textbox: {
    width: 300,
    height: 60,
    marginTop: 40,
    marginVertical: 20,
    justifyContent: 'center',
    backgroundColor: "transparent",
  },
  buttonSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#14E2C3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 40,
  },
  textButtonSearch: {
    width: 130,
    alignItems: 'center',
    fontFamily: 'inter-bold',
    color: '#0A4E66',
    fontSize: 18,
    marginLeft: 15,

  }


});