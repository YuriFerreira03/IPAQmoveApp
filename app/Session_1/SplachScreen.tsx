import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import styles from "../../styles/SplachScreen";
import getIp from "../getIp";
import { api } from "@/api/api";

const SplachScreen = () => {
  const [secao, setSecao] = useState({
    id_secao: "",
    titulo: "",
    fk_Questionario_id_quest: "",
  });
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const secaoId = 1; //estabelecendo a constante da minha seção com o valor do meu id desejado

  // nesta parte {secao.titulo} que se encontra logo abaixo do código, faz referencia a introdução da seção em questão

  useEffect(() => {
    const fetchSecao = async () => {
      try {
        const ip = getIp(); // Endereço IP da sua máquina
        const url = `/secao/${secaoId}`; //pegando a seção 2 no banco de dados
        console.log("URL de requisição:", url);

        const response = await api.get(url, { timeout: 10000 }); // 10 segundos de tempo limite
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
            <Text style={styles.number}>{secao.fk_Questionario_id_quest}</Text>
            <Text style={styles.section}> SEÇÃO </Text>
            <View style={styles.line} />
          </View>
          <Text style={styles.subtitle}>{secao.titulo}</Text>
        </>
      )}
    </LinearGradient>
  );
};

export default SplachScreen;
