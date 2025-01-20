import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Alert, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Checkbox from "expo-checkbox";
import CustomStepper from "../Components/CustomStepper";
import { TextInput } from "react-native-paper";
import axios from "axios";
import styles from "../../styles/Tela_2";
import getIp from "../getIp";
import { RootStackParamList } from "../../app";
import {
  useNavigation,
  NavigationProp,
  RouteProp,
} from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { api } from "@/api/api";

type TelaLocalizacaoRouteProp = RouteProp<RootStackParamList, "tela2_4">;

const Tela2_4: React.FC<{ route: TelaLocalizacaoRouteProp }> = ({ route }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [searchName, setSearchName] = React.useState("");
  const [initialLocalizacao, setInitialLocalizacao] = useState(""); // Estado para armazenar a localização inicial
  const [isChecked, setChecked] = useState(false);
  const [respostas_abertas, setrespostas_abertas] = React.useState("");
  const [respostas_fechadas, setrespostas_fechadas] = useState("");
  const [datahora, setrdatahora] = React.useState("");
  const [resposta, setresposta] = useState<string | null>("");
  const [userId, setUserId] = useState<string | null>("");
  const [localizacao, setLocalizacao] = useState<string | null>("");
  const [horaeminuto, sethoraeminuto] = useState<string>("");

  async function getDataFromStorage() {
    setUserId(await AsyncStorage.getItem("userId"));
    setresposta(await AsyncStorage.getItem("locality"));
  }

  useEffect(() => {
    getDataFromStorage();
  }, []);

  console.log("route.params:", route.params);
  const { id_questao } = route.params || {};
  const { id_usuario } = route.params || {};
  const [loading, setLoading] = useState(true);
  console.log("Recebido id_questao:", id_questao);
  const [questao, setQuestao] = useState(null);
  const steps = ["1", "2", "3", "4", "5"];
  const activeStep = 3;

  const handleTextInputChange = (text: string) => {
    // Remove caracteres não numéricos
    const cleanText = text.replace(/[^0-9]/g, "");

    // Se o texto estiver vazio, apenas atualiza o estado
    if (cleanText === "") {
      sethoraeminuto("");
      return;
    }
    // Monta o formato HH:MM conforme os caracteres digitados
    let formattedTime = cleanText;
    if (cleanText.length > 2) {
      const hours = cleanText.substring(0, 2);
      const minutes = cleanText.substring(2, 4);
      formattedTime = `${hours}:${minutes}`;

      sethoraeminuto(formattedTime);

      // Valida se o formato é válido após completar 5 caracteres
      if (formattedTime.length === 5) {
        const regexFinal = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;

        if (!regexFinal.test(formattedTime)) {
          Alert.alert(
            "Formato inválido",
            "Por favor, insira um horário válido no formato HH:MM."
          );
          sethoraeminuto(""); // Reseta o valor para forçar a correção
        }
      }
    } else {
      sethoraeminuto(cleanText); // Atualiza parcialmente enquanto digita
    }
  };

  const fetchQuestao = async () => {
    try {
      const ip = getIp(); // Endereço IP da sua máquina
      const url = `/questao/21`; // Passando o id_questao diretamente so colocar o numero de acordo com o banco
      console.log("URL de requisição:", url);

      const response = await api.get(url, { timeout: 10000 }); // 10 segundos de tempo limite
      console.log("Dados da seção recebidos:", response.data);

      setQuestao(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar dados da seção:", error);
      Alert.alert("Erro ao buscar dados da seção!");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestao();
  }, []);

  const validateForm = () => {
    // Verifica se o campo está vazio ou com formato incorreto
    const regexFinal = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;

    if (!horaeminuto || !regexFinal.test(horaeminuto)) {
      Alert.alert(
        "Erro",
        "Preencha o campo de Horas e Minutos no formato HH:MM."
      );
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      console.log("Iniciando cadastro de resposta...");
      const ip = getIp(); // Endereço IP da sua máquina
      const url = `/Resposta`;
      console.log("URL de requisição:", url);
      console.log("Enviando dados para o backend:", {
        fk_Usuario_id_usuario: userId, // Utilize o ID do usuário logado
        fk_Questionario_id_questao: 21, // Substitua pelo ID da questão correta
        respostas_abertas: respostas_abertas,
        respostas_fechadas: isChecked ? "SIM" : "NÃO", // Armazena a resposta do checkbox
        datahora: datahora,
        resposta: resposta,
      });

      const dadosParaEnvio = {
        fk_Usuario_id_usuario: userId, // Utilize o ID do usuário logado
        fk_Questionario_id_questao: 21, // Sempre define com o id da questao
        respostas_abertas: horaeminuto,
        respostas_fechadas: isChecked ? "1" : "0", // Armazena a resposta do checkbox
        datahora: datahora,
        resposta: resposta,
      };

      // Exibe os dados que serão enviados para o backend
      console.log(
        "Dados enviados para o backend:",
        JSON.stringify(dadosParaEnvio, null, 2)
      );

      const response = await api.post(
        url,
        {
          fk_Usuario_id_usuario: userId, // Utilize o ID do usuário logado
          fk_Questao_id_questao: 21,
          respostas_abertas: horaeminuto,
          respostas_fechadas: isChecked ? "1" : "0", // Armazena a resposta do checkbox
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

      // Adicione um log antes da navegação
      console.log("Navegando para Tela_2");
      setSearchName("");
      navigation.navigate("Tela3_4");
    } catch (error) {
      console.error("Erro ao cadastrar resposta:", error);
      Alert.alert("Erro", "Não foi possível cadastrar a resposta.");
    }
  };

  return (
    <LinearGradient colors={["#032D45", "#0A4E66"]} style={styles.container}>
      <Text style={styles.title}>SEÇÃO 4</Text>
      <CustomStepper steps={steps} activeStep={activeStep} />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
        {questao && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{questao.texto_pergunta}</Text>

            {/* Campo de texto para dias por semana */}
            <View style={styles.checkboxWrapper}>
              <TextInput
                style={styles.textboxV}
                textColor="#FFFFFF"
                placeholderTextColor="#b3b3b3"
                keyboardType="numeric"
                value={horaeminuto}
                onChangeText={handleTextInputChange}
                underlineColor="white" // Cor da barra de texto em estado inativo
                activeUnderlineColor="white" // Cor da barra de texto quando ativo/focado
              />
              <Text style={styles.label}>Horas e Minutos</Text>
            </View>
          </View>
        )}
      </KeyboardAwareScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister} // Armazena a resposta ao clicar no botão e navega para Tela_2
      >
        <Icon name="chevron-right" size={30} color="#032D45" />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Tela2_4;
