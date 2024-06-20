import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InformacoesProjeto: React.FC = () => {
  const navigation = useNavigation();

  const handleScreenExpli1Press = () => {
    navigation.navigate('ScreenExpli1');
  };

  return (
    <LinearGradient
      colors={['#032D45', '#14E2C3']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Text style={styles.textVII}>
          Olá, <Text style={styles.textVIII}></Text>!
        </Text>
        <Text style={styles.textIX}>
          Insira as informações do projeto do qual você deseja participar:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Nome da Pesquisa"
          placeholderTextColor="#b3b3b3"
        />
        <TextInput
          style={styles.input}
          placeholder="Nome do Pesquisador"
          placeholderTextColor="#b3b3b3"
        />
        <TouchableOpacity onPress={handleScreenExpli1Press} style={styles.button}>
          <Text style={styles.buttonText}>ACESSAR</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default InformacoesProjeto;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
  textVII: {
    fontFamily: 'inter-bold',
    color: '#ffff',
    textAlign: 'center',
    fontSize: 34,
    marginBottom: 200,
    marginTop: -60,
  },
  textVIII: {
    fontFamily: 'inter-bold',
    color: '#032D45',
    fontSize: 54,
  },
  textIX: {
    fontSize: 30,
    color: 'white',
    textAlign: 'left',
    marginTop: -120,
    fontFamily: 'inter-regular',
    marginHorizontal: 20,
    letterSpacing: 1,
    lineHeight: 50,
    marginBottom: 50,
  },
  input: {
    width: '100%',
    height: 60,
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
    marginTop: 70,
    marginBottom: 30,
  },
  buttonText: {
    fontFamily: 'inter-bold',
    color: '#032D45',
    fontSize: 18,
  },
  icon: {
    position: 'absolute',
    bottom: 20,
    left: -30, // Alinhar completamente à esquerda
  },
});
