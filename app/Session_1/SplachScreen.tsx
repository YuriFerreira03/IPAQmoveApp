import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles/SplachScreen";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Tela1");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient colors={["#032D45", "#0A4E66"]} style={styles.container}>
      <View style={styles.lineContainer}>
        <Text style={styles.number}>1</Text>
        <Text style={styles.section}> SEÇÃO </Text>
        <View style={styles.line} />
      </View>
      <Text style={styles.subtitle}>ATIVIDADE FÍSICA NO TRABALHO</Text>
    </LinearGradient>
  );
};

export default SplashScreen;
