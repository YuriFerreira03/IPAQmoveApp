import axios from "axios";
import { TextInput } from "react-native-paper";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/SearchScreen";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../app";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import getIp from "../app/getIp";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importando AsyncStorage
import React, { useEffect, useState } from "react";
import HomePage from "@/styles/HomePage";

const SearchScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Estados para armazenar as variáveis de entrada
  const [searchName, setSearchName] = React.useState("");
  const [userName, setName] = React.useState<string | null>("");
  const [location, setLocation] = React.useState("");
  const [institution, setInstitution] = React.useState("");
  const [userId, setUserId] = React.useState<string | null>(null); // Estado para o userId
  const [cidades, setCidades] = useState([]);
  const [filteredCidades, setFilteredCidades] = useState([]);

  async function getDataFromStorage() {
    const storedUserId = await AsyncStorage.getItem("userId");
    const storedName = await AsyncStorage.getItem("name");

    console.log("UserId recuperado:", storedUserId);
    console.log("Nome recuperado:", storedName);

    setUserId(storedUserId);
    setName(storedName);
  }

  useEffect(() => {
    getDataFromStorage();
  }, []);

  // Buscar cidades na API do IBGE
  useEffect(() => {
    const fetchCidades = async () => {
      try {
        const response = await axios.get(
          "https://servicodados.ibge.gov.br/api/v1/localidades/municipios"
        );
        setCidades(response.data);
      } catch (error) {
        console.error("Erro ao buscar cidades:", error);
      }
    };

    fetchCidades();
  }, []);

  // Filtrar cidades com base na entrada do usuário
  useEffect(() => {
    if (location.length > 1) {
      const filtro = cidades.filter((cidade) =>
        cidade.nome.toLowerCase().includes(location.toLowerCase())
      );
      setFilteredCidades(filtro);
    } else {
      setFilteredCidades([]);
    }
  }, [location, cidades]);

  const handleRegister = async () => {
    if (!searchName || !location || !institution) {
      Alert.alert(
        "Atenção",
        "Preencha todos os campos antes de cadastrar a pesquisa."
      );
      return;
    }
    try {
      console.log("Iniciando cadastro de pesquisa...");
      const ip = getIp(); // Endereço IP da sua máquina
      const url = `http://${ip}:8080/Pesquisa`;
      console.log("URL de requisição:", url);
      console.log("Enviando dados para o backend:", {
        nome_pesquisa: searchName,
        fk_Usuario_id_usuario: userId, // Utilize o ID do usuário logado
        localizacao: location,
        instituicao: institution, // Utilize o valor do campo instituição
      });

      const response = await axios.post(
        url,
        {
          nome_pesquisa: searchName,
          fk_Usuario_id_usuario: userId, // Utilize o ID do usuário logado
          localizacao: location,
          instituicao: institution, // Utilize o valor do campo instituição
        },
        {
          timeout: 10000, // 10 segundos de tempo limite
        }
      );

      console.log("Resposta do backend:", response.data);
      Alert.alert("Sucesso", "Pesquisa cadastrada com sucesso!");
      setSearchName("");
    } catch (error) {
      console.error("Erro ao cadastrar pesquisa:", error);
      Alert.alert("Erro", "Não foi possível cadastrar a pesquisa.");
    }
    navigation.navigate("Home");
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <LinearGradient colors={["#032D45", "#0A4E66"]} style={styles.container}>
        {/* <LinearGradient colors={["#0A4E66", "#14E2C3"]} style={styles.header}>
          <View style={styles.textContainer}>
            <Text style={styles.greeting}>
              Olá, <Text style={styles.userName}>{researcherName}</Text>
            </Text>
            <Text style={styles.location}>Cataguases, MG</Text>
          </View>
          <Icon name="person" size={60} color="#FFFFFF" style={styles.icon} />
        </LinearGradient> */}

        <Text style={styles.texthead}>CADASTRAR PESQUISA</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome da Pesquisa:"
          placeholderTextColor="#b3b3b3"
          textColor="#FFFFFF"
          value={searchName}
          onChangeText={setSearchName}
        />
        <TextInput
          style={styles.input}
          placeholder="Nome do Pesquisador:"
          placeholderTextColor="#b3b3b3"
          textColor="#FFFFFF"
          value={userName}
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Localização:"
          placeholderTextColor="#b3b3b3"
          textColor="#FFFFFF"
          value={location}
          onChangeText={setLocation}
        />

        {/* Lista de Sugestões de Cidades */}
        {filteredCidades.length > 0 && (
          <FlatList
            data={filteredCidades}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setLocation(item.nome); // Definir a cidade selecionada no input
                  setFilteredCidades([]); // Limpar a lista de sugestões após a seleção
                  setFilteredCidades([]);
                }}
              >
                <Text style={styles.suggestionText}>{item.nome}</Text>
              </TouchableOpacity>
            )}
            style={styles.suggestionsContainer}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Instituição:"
          placeholderTextColor="#b3b3b3"
          textColor="#FFFFFF"
          value={institution}
          onChangeText={setInstitution}
        />

        <TouchableOpacity style={styles.buttonSearch} onPress={handleRegister}>
          <Text style={styles.textButtonSearch}>CADASTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSearch}
          onPress={() => navigation.navigate("Home")}
        >
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default SearchScreen;
