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

type TelaLocalizacaoRouteProp = RouteProp<RootStackParamList, "Tela5_3">;

const Tela5_3: React.FC<{ route: TelaLocalizacaoRouteProp }> = ({ route }) => {
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
  const activeStep = 2;

  const handleTextInputChange = (text: string) => {
    // Permite que o usuário apague o texto completamente
    if (text === "") {
      sethoraeminuto(""); // Se o campo estiver vazio, atualiza o estado e retorna
      return;
    }

    // Remove qualquer caractere que não seja número
    const cleanText = text.replace(/[^0-9]/g, "");

    // Se o usuário digitou 3 ou mais caracteres, inserimos o ":"
    if (cleanText.length > 2) {
      const hours = cleanText.substring(0, 2);
      const minutes = cleanText.substring(2, 4);
      const formattedTime = `${hours}:${minutes}`;
      sethoraeminuto(formattedTime);

      // Validação para o formato HH:MM completo (exibe alerta só após 5 caracteres, que inclui ":")
      if (text.length === 5) {
        const regexFinal = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;

        // Se o formato estiver errado, exibe o alerta
        if (!regexFinal.test(formattedTime)) {
          Alert.alert(
            "Formato inválido",
            "Por favor, insira um horário válido no formato HH:MM."
          );
        }
      }
    } else {
      sethoraeminuto(cleanText); // Mantém apenas os números digitados antes dos dois pontos
    }
  };

  const fetchQuestao = async () => {
    try {
      const ip = getIp(); // Endereço IP da sua máquina
      const url = `http://${ip}:8080/questao/17`; // Passando o id_questao diretamente so colocar o numero de acordo com o banco
      console.log("URL de requisição:", url);

      const response = await axios.get(url, { timeout: 10000 }); // 10 segundos de tempo limite
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
    // Verifica se o campo de diasSemana está vazio e se o checkbox não está marcado
    if (!horaeminuto) {
      Alert.alert("Erro", "Preencha o campo de Horas e Minutos");
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
      const url = `http://${ip}:8080/Resposta`;
      console.log("URL de requisição:", url);
      console.log("Enviando dados para o backend:", {
        fk_Usuario_id_usuario: userId, // Utilize o ID do usuário logado
        fk_Questionario_id_questao: 17, // Substitua pelo ID da questão correta
        respostas_abertas: respostas_abertas,
        respostas_fechadas: isChecked ? "SIM" : "NÃO", // Armazena a resposta do checkbox
        datahora: datahora,
        resposta: resposta,
      });

      const dadosParaEnvio = {
        fk_Usuario_id_usuario: userId, // Utilize o ID do usuário logado
        fk_Questionario_id_questao: 17, // Sempre define com o id da questao
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

      const response = await axios.post(
        url,
        {
          fk_Usuario_id_usuario: userId, // Utilize o ID do usuário logado
          fk_Questao_id_questao: 17,
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
      console.log("Navegando para Tela6_3");
      setSearchName("");
      navigation.navigate("Tela6_3");
    } catch (error) {
      console.error("Erro ao cadastrar resposta:", error);
      Alert.alert("Erro", "Não foi possível cadastrar a resposta.");
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={20}
    >
      <LinearGradient colors={["#032D45", "#0A4E66"]} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>SEÇÃO 3</Text>
          <CustomStepper steps={steps} activeStep={activeStep} />
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

          <TouchableOpacity
            style={styles.button}
            onPress={handleRegister} // Armazena a resposta ao clicar no botão e navega para Tela_2
          >
            <Icon name="chevron-right" size={30} color="#032D45" />
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};
export default Tela5_3;
