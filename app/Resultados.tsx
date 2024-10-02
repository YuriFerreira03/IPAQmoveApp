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

const Resultados: React.FC = () => {
  const [respostas, setRespostas] = useState([]);
  const [userId, setUserId] = useState<string | null>("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [classificacao, setClassificacao] = useState("");
  const [fadeAnim] = useState(new Animated.Value(1)); // Inicializa a animação

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.5, // Valor final (mais transparente)
          duration: 1000, // Duração da animação
          easing: Easing.linear, // Suavização
          useNativeDriver: true, // Otimizar para desempenho
        }),
        Animated.timing(fadeAnim, {
          toValue: 1, // Retorna ao valor original
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start(); // Inicia a animação
  }, []);

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
          {/* <Text style={styles.title}>RESULTADOS:</Text> */}
          <Text style={styles.notice}>
            Somente as respostas do último questionário respondido são exibidas.
          </Text>
          <Animated.Text
            style={[
              styles.classificacaoText,
              { opacity: fadeAnim }, // Aplica a animação de opacidade (indo e voltando)
            ]}
          >
            Classificação: {classificacao}
          </Animated.Text>

          <ScrollView>
            {respostas.length > 0 ? (
              respostas.map((resposta, index) => (
                <View key={index} style={styles.respostaItem}>
                  <Text style={styles.respostaText}>
                    <Text style={styles.labelText}>Pergunta: </Text>
                    {resposta.questao}
                  </Text>
                  {resposta.respostas_abertas ? (
                    <Text style={styles.respostaText}>
                      <Text style={styles.labelText}>Resposta: </Text>
                      {resposta.respostas_abertas}
                    </Text>
                  ) : (
                    <Text style={styles.respostaText}>
                      <Text style={styles.labelText}>Resposta: </Text>
                      {formatRespostaFechada(resposta.respostas_fechadas)}
                    </Text>
                  )}
                </View>
              ))
            ) : (
              <Text style={styles.noRespostas}>
                Nenhuma resposta encontrada.
              </Text>
            )}
          </ScrollView>

          {/* <TouchableOpacity
            style={styles.pdfButton}
            onPress={() => {
            }}
          >
            <Icon name="picture-as-pdf" size={24} color="#FFFFFF" />
            <Text style={styles.pdfButtonText}>
              VISUALIZAR RESULTADOS EM PDF
            </Text>
          </TouchableOpacity> */}
        </View>
        <TouchableOpacity
          style={styles.buttonSearch}
          onPress={() => navigation.navigate("PreResultado")}
        >
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Resultados;
