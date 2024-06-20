import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 17,
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
  card: {
    backgroundColor: 'transparent', // Mudei para transparente para se misturar com o fundo gradiente
    borderRadius: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    padding: 23,
    marginVertical: 30,
    width: '92%',
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 25,
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
    color: '#FFFFF',
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
    marginTop: 40,
    fontSize: 23,
    fontFamily: 'inter-bold',
    color: "#FFFFF",
  },
  textbox: {
    width: 300,
    height: 60,
    marginTop: 40,
    marginVertical: 20,
    justifyContent: 'center',
    backgroundColor: "transparent",
    color: "#FFFFF"
  },

  textboxI: {
    width: 80,
    height: 60,
    marginTop: 15,
    backgroundColor: "transparent",
    color: "#FFFFF",
    marginLeft: -220
  },

  textboxII: {
    width: 120,
    height: 60,
    marginTop: 15,
    backgroundColor: "transparent",
    color: "#FFFFF",
    marginLeft: -180
  },

  textboxIII: {
    width: 120,
    height: 60,
    marginTop: -67,
    backgroundColor: "transparent",
    color: "#FFFFF",
    marginLeft: 170
  },

  button3: {width: 50,
  height: 50,
  borderRadius: 25,
  backgroundColor: "white",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 10, 
  marginBottom: 30, 
  marginLeft: 300, 
  }
});

export default styles;