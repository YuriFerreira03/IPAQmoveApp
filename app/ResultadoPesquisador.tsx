import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/ResultadosPesquisador";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import getIp from "./getIp";

const ResultadoPesquisador: React.FC = () => {
  const [pesquisas, setPesquisas] = useState([]);
  const [userId, setUserId] = useState<string | null>("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Função para buscar o userId do AsyncStorage
  const getDataFromStorage = async () => {
    const storedUserId = await AsyncStorage.getItem("userId");
    setUserId(storedUserId);
  };

  const fetchPesquisas = async () => {
    try {
      const ip = await getIp();
      const url = `http://${ip}:8080/PesquisasAll?userId=${userId}`; // Enviando userId como query param

      const response = await axios.get(url);
      console.log("Pesquisas recebidas:", response.data); // Verifique os dados recebidos
      setPesquisas(response.data); // Armazena as pesquisas filtradas
    } catch (error) {
      console.error("Erro ao buscar pesquisas:", error);
      console.log(
        "Detalhes do erro:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // useEffect para buscar userId e as pesquisas quando o componente é carregado
  useEffect(() => {
    getDataFromStorage();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchPesquisas();
    }
  }, [userId]);

  const renderPesquisa = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("UsuariosCadastrados", {
          pesquisaNome: item.nome_pesq,
        })
      }
    >
      <Text style={styles.cardTitle}>{item.nome_pesq || "Sem nome"}</Text>
      <Text style={styles.cardDescription}>
        Pesquisador: {item.nome_pesquisador || "Desconhecido"}
      </Text>
      <Text style={styles.cardDescription}>
        Localização: {item.localizacao || "Não informada"}
      </Text>
      <Text style={styles.cardDescription}>
        Instituição: {item.instituicao || "Não informada"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={["#032D45", "#0A4E66"]} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>PESQUISAS ATIVAS:</Text>

          {pesquisas.length === 0 ? (
            <Text style={styles.noDataText}>Nenhuma pesquisa cadastrada.</Text> // Mensagem quando não houver pesquisas
          ) : (
            <FlatList
              data={pesquisas}
              renderItem={renderPesquisa}
              keyExtractor={(item) => item.id_pesq.toString()} // Usando `id_pesq` como chave
            />
          )}
        </View>
        <View style={styles.space}>
          <TouchableOpacity
            style={styles.buttonSearch}
            onPress={() => navigation.navigate("PreResultado")}
          >
            <Icon name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};
export default ResultadoPesquisador;
