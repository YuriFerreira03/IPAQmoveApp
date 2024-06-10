import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'linear-gradient(to bottom, #00c6ff, #0072ff)',
  },
  number: {
    fontSize: 100,
    marginLeft: 160,
    fontWeight: 'bold',
    color: 'white',
    marginHorizontal: 20,
  },
  section: {
    fontSize: 24,
    marginTop: 20,
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    color: 'white',
    marginTop: -15,
    marginLeft: 115,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  line: {
    width: 280,
    height: 1,
    backgroundColor: 'white',
    marginTop: 20,
  },
});

export default styles;