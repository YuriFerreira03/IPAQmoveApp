import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles/TelaLocalizacao";

const TelaLocalizacao = () => {
  const [isChecked, setChecked] = useState(false);
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('InformacoesProjeto');
  };
  const handlePressII = () => {
    navigation.navigate('ScreenExpli1');
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
        <TextInput style={styles.input} placeholder="Localização:" placeholderTextColor="#b3b3b3" />
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
        <TouchableOpacity onPress={handlePressII} style={styles.button}>
          <Text style={styles.buttonText}>VISITANTE</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Text style={styles.buttonText}>PARTICIPANTE</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default TelaLocalizacao;
