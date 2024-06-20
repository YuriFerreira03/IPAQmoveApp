import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
  textVII: {
    fontFamily: 'inter-bold',
    color: '#ffff',
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 10,
  },
  textVIII: {
    fontFamily: 'inter-bold',
    color: '#032D45',
  },
  textIX: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    marginTop: 4,
    fontFamily: "inter-regular",
    marginHorizontal: 20,
    letterSpacing: 1,
    lineHeight: 28,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#14E2C3',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    width: '60%',
    marginBottom: 20,
  },
  buttonText: {
    fontFamily: 'inter-bold',
    color: '#032D45',
    fontSize: 18,
  },
  icon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
