import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from "../../styles/TelaLocalizacao";
import { TextInput } from 'react-native-gesture-handler';
import Checkbox from "expo-checkbox";
import { TouchableOpacity } from 'react-native';
import handlePress from '../Components/Button'; // Importa a função do arquivo Button.js (ou Button.tsx)
import { useNavigation } from "@react-navigation/native";


const TelaLocalizacao = () => {
  
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('InformacoesProjeto');
  };

  return (
    <LinearGradient colors={["#032D45", "#14E2C3"]} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.textI}>Nós estamos interessados em saber que tipos de atividade física as pessoas fazem como parte do seu dia a dia!</Text>
        <Text style={styles.textII}>Para começar coloque sua {""}
          <Text style={styles.localizacao}>localização</Text>{""}:
        </Text>
      </View>
      <View style={styles.card}>
          <Text style ={styles.textIII}>
            Localização
          </Text>
      </View>
      <View style={styles.checkbox}>
            <Checkbox
            />
            <Text style={styles.textIV}>Li e estou de acordo com os {""}
              <Text style={styles.textVI}>Termos de Uso e Política de Privacidade</Text>
            </Text>
      </View>
      <Text style={styles.textV}>Deseja responder o questionário como:</Text>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>VISITANTE</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>PARTICIPANTE</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default TelaLocalizacao;