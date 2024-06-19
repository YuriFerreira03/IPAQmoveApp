import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles/ScreenExpli4";

const ScreenExpli4 = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("GeneralQuestionsScreen");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient colors={["#032D45", "#14E2C3"]} style={styles.container}>
      <View style={styles.lineContainer}>
        <Text style={styles.section}>PERGUNTAS</Text>
        <View style={styles.viewI}>
        <Text style={styles.sectionI}> GERAIS </Text>
        </View>
        <View style={styles.line} />
      </View>
    </LinearGradient>
  );
};

export default ScreenExpli4;