import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Animated,
  Easing,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/Resultados";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import getIp from "./getIp";

const PreResultado: React.FC = () => {
  const [respostas, setRespostas] = useState([]);
  const [userId, setUserId] = useState<string | null>("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [classificacao, setClassificacao] = useState("");

  // Função para buscar o userId do AsyncStorage
  const getDataFromStorage = async () => {
    const storedUserId = await AsyncStorage.getItem("userId");
    setUserId(storedUserId);
  };

  const fetchRespostas = async () => {
    try {
      const ip = getIp();
      const url = `http://${ip}:8080/Respostas/${userId}`;

      const response = await axios.get(url);

      // Certifique-se de acessar response.data.respostas e response.data.classificacao
      setRespostas(response.data.respostas); // Armazena as respostas
      setClassificacao(response.data.classificacao); // Armazena a classificação
    } catch (error) {
      console.error("Erro ao buscar respostas:", error); // Mostre o erro no console
    }
  };

  // Função para formatar a resposta fechada
  const formatRespostaFechada = (respostaFechada: number) => {
    return respostaFechada === 1 ? "Sim" : "Não";
  };

  // useEffect para buscar userId e as respostas quando o componente é carregado
  useEffect(() => {
    getDataFromStorage();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchRespostas();
    }
  }, [userId]);

  return (
    <LinearGradient colors={["#032D45", "#0A4E66"]} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Resultado no topo */}
          <Text style={styles.title}>RESULTADOS:</Text>

          {/* Container para centralizar os botões */}
          <View style={styles.resultContainer}>
            {/* Botão para Visualizar Resultados no Aplicativo */}
            <TouchableOpacity
              style={styles.appButton}
              onPress={() => navigation.navigate("Resultados")}
            >
              <Icon name="visibility" size={24} color="#FFFFFF" />
              <Text style={styles.appButtonText}>
                VISUALIZAR RESULTADOS NO APLICATIVO
              </Text>
            </TouchableOpacity>

            {/* Botão para Visualizar Resultados em PDF */}
            <TouchableOpacity style={styles.pdfButton} onPress={() => {}}>
              <Icon name="picture-as-pdf" size={24} color="#FFFFFF" />
              <Text style={styles.pdfButtonText}>
                VISUALIZAR RESULTADOS EM PDF
              </Text>
            </TouchableOpacity>
          </View>

          {/* Botão de Voltar */}
          <TouchableOpacity
            style={styles.buttonSearch}
            onPress={() => navigation.navigate("HomeVisitante")}
          >
            <Icon name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};
export default PreResultado;
