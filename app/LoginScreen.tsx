// Importações necessárias
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/LoginStyles';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#14E2C3', '#032D45']}
        style={styles.gradient}
      >
        <Image
          source={require("../images/logo.png")}  // Atualize o caminho conforme necessário
          style={styles.imageStyle}
        />
        <Text style={styles.textStyle}>
          Seja bem-vindo ao
        </Text>
        <Text style={styles.textStyleII}>
          <Text style={{ color: '#082D47' }}>IPAQ</Text>
          <Text style={{ color: '#15E2C3' }}>move</Text>
        </Text>
        <Text style={styles.textStyleIII}>
          Use sua Conta Google para 
        </Text>
        <Text style={styles.textStyleIII}>
          acessar o nosso app
        </Text>
      </LinearGradient>
    </View>
  );
};

export default LoginScreen;
