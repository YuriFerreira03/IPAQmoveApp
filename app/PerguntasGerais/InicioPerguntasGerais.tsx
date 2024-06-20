// Arquivo: InicioPerguntasGerais.js

import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles/InicioPerguntasGerais";

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
      <Text style={styles.textIPAQ}>IPAQ</Text>
      <View style={styles.underline} />
      <Text style={styles.textSubtitle}>Questionário Internacional de Atividade Física</Text>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>COMEÇAR</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default InicioPerguntasGerais;
