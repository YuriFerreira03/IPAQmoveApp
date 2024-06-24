import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import CustomStepper from "../Components/CustomStepper";
import Button from "../Components/Button";
import styles from "../../styles/Tela_1";
import axios from "axios"; // Certifique-se de ter instalado axios

const Tela1 = () => {
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(true);
  const steps = ["1", "2", "3", "4", "5"];
  const activeStep = 0;

  const navigation = useNavigation();

  useEffect(() => {
    const fetchDescricao = async () => {
      try {
        const ip = "192.168.1.231"; // Endereço IP da sua máquina
        const url = `http://${ip}:8080/secao/1`;
        console.log("URL de requisição:", url);

        const response = await axios.get(url, { timeout: 10000 }); // 10 segundos de tempo limite
        console.log("Dados da seção recebidos:", response.data);

        setDescricao(response.data.descricao);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados da seção:", error);
        Alert.alert("Erro ao buscar dados da seção!");
        setLoading(false);
      }
    };

    fetchDescricao();
  }, []);

  return (
    <LinearGradient colors={["#032D45", "#0A4E66"]} style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <ScrollView>
          <Text style={styles.title}>SEÇÃO 1</Text>
          <CustomStepper steps={steps} activeStep={activeStep} />
          <Text style={styles.body}>{descricao}</Text>
          <Button />
        </ScrollView>
      )}
    </LinearGradient>
  );
};

export default Tela1;
