import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import styles from "../../styles/SplachScreen";

const SplashScreen = () => {
  const [secao, setSecao] = useState({ id_secao: '', titulo: '' });
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchSecao = async () => {
      try {
        const ip = "192.168.1.231"; // Endereço IP da sua máquina
        const url = `http://${ip}:8080/secao/1`;
        console.log("URL de requisição:", url);

        const response = await axios.get(url, { timeout: 10000 }); // 10 segundos de tempo limite
        console.log("Dados da seção recebidos:", response.data);

        setSecao(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados da seção:", error);
        Alert.alert("Erro ao buscar dados da seção!");
        setLoading(false);
      }
    };

    fetchSecao();

    const timer = setTimeout(() => {
      navigation.navigate("Tela1");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient colors={["#032D45", "#0A4E66"]} style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <>
          <View style={styles.lineContainer}>
            <Text style={styles.number}>{secao.id_secao}</Text>
            <Text style={styles.section}> SEÇÃO </Text>
            <View style={styles.line} />
          </View>
          <Text style={styles.subtitle}>{secao.titulo}</Text>
        </>
      )}
    </LinearGradient>
  );
};

export default SplashScreen;