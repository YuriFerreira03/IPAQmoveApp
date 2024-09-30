import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import getIp from "../getIp";
import AsyncStorage from "@react-native-async-storage/async-storage";

const InformacoesProjeto: React.FC = () => {
  const navigation = useNavigation();
  const [nomePesquisa, setNomePesquisa] = useState("");
  const [nomePesquisador, setNomePesquisador] = useState("");
  const [pesquisas, setPesquisas] = useState([]);
  const [userId, setUserId] = useState<string | null>("");

  async function getDataFromStorage() {
    setUserId(await AsyncStorage.getItem("userId"));
  }

  useEffect(() => {
    getDataFromStorage();
  }, []);

  useEffect(() => {
    const fetchPesquisas = async () => {
      if (nomePesquisa.length > 0) {
        try {
          const ip = getIp(); // Endereço IP da sua máquina
          const url = `http://${ip}:8080/search-pesquisa?query=${nomePesquisa}`;

          const response = await axios.get(url);
          setPesquisas(response.data);
        } catch (error) {
          console.error("Erro ao buscar pesquisas:", error);
        }
      } else {
        setPesquisas([]);
      }
    };
    fetchPesquisas();
  }, [nomePesquisa]);

  const handleRegister = async () => {
    if (!nomePesquisa || !nomePesquisador) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      const ip = getIp(); // Supondo que você tenha uma função para obter o IP
      const url = `http://${ip}:8080/Vincular_projeto`;

      const response = await axios.post(
        url,
        {
          fk_Usuario_id_usuario: userId,
          nome_pesq: nomePesquisa,
          nome_pesquisador: nomePesquisador,
        },
        {
          timeout: 10000, // 10 segundos de tempo limite
        }
      );

      console.log("Resposta do backend:", response.data);
      Alert.alert("Sucesso", "Pesquisa vinculada com sucesso!");
      await AsyncStorage.multiSet([
        ["Nome Pesquisa: ", nomePesquisa],
        ["Nome Pesquisador", nomePesquisador],
      ]);
      navigation.navigate("ScreenExpli1");
    } catch (error) {
      console.error("Erro ao cadastrar pesquisa:", error.message || error);
      Alert.alert("Erro", "Não foi possível cadastrar a pesquisa.");
    }
  };

  return (
    <LinearGradient colors={["#032D45", "#0A4E66"]} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.textVII}>
          Olá, <Text style={styles.textVIII}></Text>!
        </Text>
        <Text style={styles.textIX}>
          Insira as informações do projeto do qual você deseja participar:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Nome da Pesquisa"
          placeholderTextColor="#b3b3b3"
          value={nomePesquisa}
          onChangeText={setNomePesquisa}
        />
        {pesquisas.length > 0 && (
          <ScrollView style={styles.suggestions}>
            {pesquisas.map((pesquisa, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionItem}
                onPress={() => {
                  setNomePesquisa(pesquisa.nome_pesq);
                  setNomePesquisador(pesquisa.nome_pesquisador); // Preencher o nome do pesquisador
                  setPesquisas([]); // Esta linha faz o campo de sugestões sumir
                }}
              >
                <Text style={styles.suggestionText}>{pesquisa.nome_pesq}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        <TextInput
          style={styles.input}
          placeholder="Nome do Pesquisador"
          placeholderTextColor="#b3b3b3"
          value={nomePesquisador}
          onChangeText={setNomePesquisador}
          editable={false}
        />
        <TouchableOpacity onPress={handleRegister} style={styles.button}>
          <Text style={styles.buttonText}>ACESSAR</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default InformacoesProjeto;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  container: {
    width: "100%",
    alignItems: "center",
  },
  textVII: {
    fontFamily: "inter-bold",
    color: "#ffff",
    textAlign: "center",
    fontSize: 34,
    marginBottom: 180,
    marginTop: 50,
  },
  textVIII: {
    fontFamily: "inter-bold",
    color: "#032D45",
    fontSize: 54,
  },
  textIX: {
    fontSize: 30,
    color: "white",
    textAlign: "left",
    marginTop: -120,
    fontFamily: "inter-regular",
    letterSpacing: 1,
    lineHeight: 50,
    marginBottom: 50,
  },
  input: {
    width: "100%",
    height: 60,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 50,
    color: "#fff",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#14E2C3",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    width: "60%",
    marginTop: 70,
    marginBottom: 30,
  },
  buttonText: {
    fontFamily: "inter-bold",
    color: "#032D45",
    fontSize: 18,
  },
  icon: {
    position: "absolute",
    bottom: 20,
    left: -30, // Alinhar completamente à esquerda
  },
  suggestions: {
    maxHeight: 150,
    backgroundColor: "#fff",
    borderColor: "#fff", // Mesma cor da borda do input
    borderWidth: 1,
    borderRadius: 5,
    marginTop: -20, // Ajusta a margem para aparecer logo abaixo do input
    width: "100%", // Mesma largura do input
    zIndex: 1,
  },
  suggestionItem: {
    padding: 15, // Ajuste de padding para combinar com o input
    color: "#fff", // Mesma cor do texto do input
    fontSize: 16, // Mesmo tamanho de fonte
    backgroundColor: "#032D45", // Cor de fundo combinando com o gradiente da tela
  },
  suggestionText: {
    color: "#fff",
    fontSize: 16,
  },
});
