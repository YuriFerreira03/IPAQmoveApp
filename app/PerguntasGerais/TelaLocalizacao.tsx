import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react"; // Adicionado useEffect
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
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

type TelaLocalizacaoRouteProp = RouteProp<
  RootStackParamList,
  "TelaLocalizacao"
>;

const TelaLocalizacao: React.FC<{ route: TelaLocalizacaoRouteProp }> = ({
  route,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { userLocality } = route.params; // Recebe o parâmetro userName e userId
  const [searchName, setSearchName] = React.useState("");
  const [initialLocalizacao, setInitialLocalizacao] = useState(""); // Estado para armazenar a localização inicial
  const [isChecked, setChecked] = useState(false);
  const [respostas_abertas, setrespostas_abertas] = React.useState("");
  const [respostas_fechadas, setrespostas_fechadas] = useState("");
  const [datahora, setrdatahora] = React.useState("");
  const [resposta, setresposta] = useState<string | null>("");
  const [userId, setUserId] = useState<string | null>("");
  const [localizacao, setLocalizacao] = useState<string | null>("");

  async function getDataFromStorage() {
    setUserId(await AsyncStorage.getItem("userId"));
    setresposta(await AsyncStorage.getItem("locality"));
  }

  useEffect(() => {
    getDataFromStorage();
  }, []);

  const handleRegister = async () => {
    try {
      console.log("Iniciando cadastro de resposta...");
      const ip = getIp(); // Endereço IP da sua máquina
      const url = `http://${ip}:8080/Resposta`;
      console.log("URL de requisição:", url);
      console.log("Enviando dados para o backend:", {
        fk_Usuario_id_usuario: userId, // Utilize o ID do usuário logado
        fk_Questionario_id_questao: 1, // Substitua pelo ID da questão correta
        respostas_abertas: respostas_abertas,
        respostas_fechadas: respostas_fechadas,
        datahora: datahora,
        resposta: resposta,
      });

      const response = await axios.post(
        url,
        {
          fk_Usuario_id_usuario: userId, // Utilize o ID do usuário logado
          fk_Questionario_id_questao: 1, // Substitua pelo ID da questão correta
          respostas_abertas: respostas_abertas,
          respostas_fechadas: respostas_fechadas,
          datahora: datahora,
          resposta: resposta,
        },
        {
          timeout: 10000, // 10 segundos de tempo limite
        }
      );

      console.log("Resposta do backend:", response.data);
      Alert.alert("Sucesso", "Resposta cadastrada com sucesso!");
      setSearchName("");
      navigation.navigate("Tela2");

    } catch (error) {
      console.error("Erro ao cadastrar respsota:", error);
      Alert.alert("Erro", "Não foi possível cadastrar a respsota.");
    }
  };

  const handlePress = async (destination) => {
    if (userLocality && isChecked) {
      await handleRegister();
      navigation.navigate(destination);
    } else {
      Alert.alert("Aviso", "Preencha a localização e aceite os termos de uso.");
    }
  };

  return (
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
        <Text style={styles.textV}>Deseja responder o questionário como:</Text>
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
  );
};

export default TelaLocalizacao;
