import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import styles from "../../styles/TelaLocalizacao";
import getIp from '../getIp';

const TelaLocalizacao = () => {
  const [localizacao, setLocalizacao] = useState('');
  const [isChecked, setChecked] = useState(false);
  const navigation = useNavigation();

  const handleSaveLocation = async () => {
    try {
      console.log("Iniciando o salvamento da localização...");
      const ip = getIp(); // Endereço IP da sua máquina
      const url = `http://${ip}:8080/SalvarLocalizacao`;
      console.log("URL de requisição:", url);
      console.log("Enviando dados para o backend:", { localizacao });

      const response = await axios.post(
        url,
        { localizacao },
        { timeout: 10000 } // 10 segundos de tempo limite
      );

      console.log("Resposta do backend:", response.data);
      Alert.alert("Sucesso", "Localização salva com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar localização:", error);
      Alert.alert("Erro", "Não foi possível salvar a localização.");
    }
  };

  const handlePress = async (destination) => {
    if (localizacao && isChecked) {
      await handleSaveLocation();
      navigation.navigate(destination);
    } else {
      Alert.alert("Aviso", "Preencha a localização e aceite os termos de uso.");
    }
  };

  return (
    <LinearGradient colors={["#032D45", "#0A4E66"]} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.textI}>
          Nós estamos interessados em saber que tipos de atividade física as pessoas fazem como parte do seu dia a dia!
        </Text>
        <Text style={styles.textII}>
          Para começar coloque sua <Text style={styles.localizacao}>localização</Text>:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Localização:"
          placeholderTextColor="#b3b3b3"
          value={localizacao}
          onChangeText={setLocalizacao}
        />
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            style={styles.checkbox}
          />
          <Text style={styles.textIV}>
            Li e estou de acordo com os <Text style={styles.textVI}>Termos de Uso e Política de Privacidade</Text>
          </Text>
        </View>
        <Text style={styles.textV}>Deseja responder o questionário como:</Text>
        <TouchableOpacity onPress={() => handlePress('ScreenExpli1')} style={styles.button}>
          <Text style={styles.buttonText}>VISITANTE</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('InformacoesProjeto')} style={styles.button}>
          <Text style={styles.buttonText}>PARTICIPANTE</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default TelaLocalizacao;
