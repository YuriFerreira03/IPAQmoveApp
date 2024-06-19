// Arquivo: InicioPerguntasGerais.js

import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import styles from "../../styles/InicioPerguntasGerais";
import { useNavigation } from "@react-navigation/native";
import handlePress from '../Components/Button'; // Importa a função do arquivo Button.js (ou Button.tsx)
import { StyleSheet } from 'react-native';


const InicioPerguntasGerais = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('TelaLocalizacao');
  };

  return (
    <LinearGradient colors={["#032D45", "#14E2C3"]} style={styles.gradient}>
      <Image
        source={require("../../images/logo.png")}
        style={styles.imageStyle}
      />
      <Text style={styles.textStyleII}>
        <Text style={{ color: "#082D47" }}>IPAQ</Text>
      </Text>
      <Text style={styles.textStyleIII}>Questionário Internacional de Atividade Física</Text>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>COMEÇAR</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default InicioPerguntasGerais;
