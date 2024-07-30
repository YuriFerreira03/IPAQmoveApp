// src/screens/Tela1.js
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Alert, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import CustomStepper from "../Components/CustomStepper";
import Button from "../Components/Button";
import axios from "axios";
import styles from "../../styles/Tela_1";
import getIp from "../getIp";

const Tela1 = () => {
  const [secao, setSecao] = useState({descricao: '' });
  const [loading, setLoading] = useState(true);
  const steps = ["1", "2", "3", "4", "5"];
  const activeStep = 0;

  const navigation = useNavigation();

  useEffect(() => {
    const fetchSecao = async () => {
      try {
        const ip = getIp(); // Endereço IP da sua máquina
        const url = `http://${ip}:8080/secao/descricao`;
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
  }, []);

  return (
    <LinearGradient colors={["#032D45", "#0A4E66"]} style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <ScrollView>
          <Text style={styles.title}>SEÇÃO 2</Text>
          <CustomStepper steps={steps} activeStep={activeStep} />
          <Text style={styles.body}>{secao.descricao}</Text>
          <Button />
        </ScrollView>
      )}
    </LinearGradient>
  );
};

export default Tela1;
