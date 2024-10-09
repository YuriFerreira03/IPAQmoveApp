import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import Checkbox from "expo-checkbox";
import axios from "axios";
import styles from "../../styles/TelaLocalizacao";
import getIp from "../getIp";
import { RootStackParamList } from "../../app";
import {
  useNavigation,
  NavigationProp,
  RouteProp,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { api } from "@/api/api";

type TelaLocalizacaoRouteProp = RouteProp<
  RootStackParamList,
  "TelaLocalizacao"
>;

const TelaLocalizacao: React.FC<{ route: TelaLocalizacaoRouteProp }> = ({
  route,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { userLocality } = route.params ?? {};
  const [searchName, setSearchName] = React.useState("");
  const [initialLocalizacao, setInitialLocalizacao] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [respostas_abertas, setrespostas_abertas] = React.useState("");
  const [respostas_fechadas, setrespostas_fechadas] = useState("");
  const [datahora, setrdatahora] = React.useState("");
  const [resposta, setresposta] = useState<string | null>("");
  const [userId, setUserId] = useState<string | null>("");
  const [localizacao, setLocalizacao] = useState<string | null>("");
  const [cidadeSelecionada, setCidadeSelecionada] = useState(null);

  // Estados para cidades e filtragem
  const [cidades, setCidades] = useState([]);
  const [filteredCidades, setFilteredCidades] = useState([]);

  async function getDataFromStorage() {
    setUserId(await AsyncStorage.getItem("userId"));
    // setresposta(await AsyncStorage.getItem("locality")); comentei pq tava vindo com a localizacao
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
    if (resposta.length > 1) {
      const filtro = cidades.filter((cidade) =>
        cidade.nome.toLowerCase().includes(resposta.toLowerCase())
      );
      setFilteredCidades(filtro);
    } else {
      setFilteredCidades([]);
    }
  }, [resposta, cidades]);

  const handleRegister = async () => {
    try {
      const data = {
        fk_Usuario_id_usuario: userId,
        fk_Questao_id_questao: 0,
        respostas_abertas: respostas_abertas,
        respostas_fechadas: respostas_fechadas,
        datahora: datahora,
        resposta: resposta,
      };
      console.log("Iniciando cadastro de resposta...");
      const ip = getIp();
      const url = `/Resposta`;
      console.log("URL de requisição:", url);
      console.log("Enviando dados para o backend:", data);

      const response = await api.post(url, data);
      console.log("Resposta do backend:", response.data);
      Alert.alert("Sucesso", "Resposta cadastrada com sucesso!");
      setSearchName("");
      navigation.navigate("Tela2");
    } catch (error) {
      console.error("Erro ao cadastrar resposta:", error);
      Alert.alert("Erro", "Não foi possível cadastrar a resposta.");
    }
  };

  const handlePress = async (Tela2) => {
    // Verifica se uma cidade foi selecionada (armazenada no estado cidadeSelecionada)
    if (resposta && isChecked) {
      await handleRegister();
      navigation.navigate(Tela2);
    } else if (!resposta) {
      Alert.alert("Aviso", "Selecione uma cidade válida da lista.");
    } else if (!isChecked) {
      Alert.alert("Aviso", "Aceite os termos de uso para continuar.");
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={20}
    >
      <LinearGradient colors={["#032D45", "#0A4E66"]} style={styles.gradient}>
        <View style={styles.container}>
          <Text style={styles.textI}>
            Nós estamos interessados em saber que tipos de atividade física as
            pessoas fazem como parte do seu dia a dia!
          </Text>
          <Text style={styles.textII}>
            Para começar coloque sua{" "}
            <Text style={styles.localizacao}>localização</Text>:
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Localização:"
            placeholderTextColor="#b3b3b3"
            value={resposta}
            onChangeText={setresposta}
          />

          {/* Lista de Sugestões de Cidades */}
          {filteredCidades.length > 0 && (
            <FlatList
              data={filteredCidades}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setresposta(
                      `${item.nome}, ${item.microrregiao.mesorregiao.UF.nome}`
                    );
                    setFilteredCidades([]); // Limpar a lista de sugestões após a seleção
                    setFilteredCidades([]);
                  }}
                >
                  <Text style={styles.suggestionText}>
                    {item.nome}, {item.microrregiao.mesorregiao.UF.sigla}
                  </Text>
                </TouchableOpacity>
              )}
              style={styles.suggestionsContainer}
            />
          )}

          <View style={styles.checkboxContainer}>
            <Checkbox
              value={isChecked}
              onValueChange={setChecked}
              style={styles.checkbox}
            />
            <Text style={styles.textIV}>
              Li e estou de acordo com os{" "}
              <Text style={styles.textVI}>
                Termos de Uso e Política de Privacidade
              </Text>
            </Text>
          </View>
          <Text style={styles.textV}>
            Deseja responder o questionário como:
          </Text>
          <TouchableOpacity
            onPress={() => handlePress("ScreenExpli1")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>VISITANTE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlePress("InformacoesProjeto")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>PARTICIPANTE</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default TelaLocalizacao;
