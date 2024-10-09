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

type TelaLocalizacaoRouteProp = RouteProp<RootStackParamList, "tela1_4">;

const Tela1_4: React.FC<{ route: TelaLocalizacaoRouteProp }> = ({ route }) => {
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
  const [diasEAtividades, setdiasEAtividades] = useState<string>("");

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
    if (text === "") {
      setdiasEAtividades(""); // Permite que o usuário apague o texto
    } else {
      const valor = parseInt(text);
      if (isNaN(valor) || valor < 1 || valor > 7) {
        Alert.alert(
          "Entrada inválida",
          "Por favor, insira um número entre 1 e 7."
        );
      } else {
        setdiasEAtividades(text); // Define o número
        if (isChecked) {
          setChecked(false); // Desmarca o checkbox se o texto foi modificado
        }
      }
    }
  };

  // Checkbox change handler
  const handleCheckboxChange = () => {
    setChecked((prevChecked) => {
      const newCheckedState = !prevChecked;
      if (newCheckedState) {
        setdiasEAtividades(""); // Limpa o campo de texto ao marcar o checkbox
      }
      return newCheckedState;
    });
  };

  const fetchQuestao = async () => {
    try {
      const ip = getIp(); // Endereço IP da sua máquina
      const url = `/questao/22`; // Passando o id_questao diretamente so colocar o numero de acordo com o banco
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
    // Verifica se o campo de diasSemana está vazio e se o checkbox não está marcado
    if (!diasEAtividades && !isChecked) {
      Alert.alert("Erro", "Preencha pelo menos um campo ou marque o checkbox.");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      if (isChecked) {
        console.log("Checkbox marcado, navegando para Tela3_4");
        navigation.navigate("Tela5_4"); // Navega para Tela3_4 se o checkbox estiver marcado
        return; // Para a execução do restante da função
      }
      console.log("Iniciando cadastro de resposta...");
      const ip = getIp(); // Endereço IP da sua máquina
      const url = `/Resposta`;
      console.log("URL de requisição:", url);
      console.log("Enviando dados para o backend:", {
        fk_Usuario_id_usuario: userId, // Utilize o ID do usuário logado
        fk_Questionario_id_questao: 22, // Substitua pelo ID da questão correta
        respostas_abertas: respostas_abertas,
        respostas_fechadas: isChecked ? "SIM" : "NÃO", // Armazena a resposta do checkbox
        datahora: datahora,
        resposta: resposta,
      });

      const dadosParaEnvio = {
        fk_Usuario_id_usuario: userId, // Utilize o ID do usuário logado
        fk_Questionario_id_questao: 22, // Sempre define com o id da questao
        respostas_abertas: diasEAtividades,
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
          fk_Questao_id_questao: 22,
          respostas_abertas: diasEAtividades,
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
      navigation.navigate("Tela4_4");
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
        <Text style={styles.title}>SEÇÃO 4</Text>
        <CustomStepper steps={steps} activeStep={activeStep} />
        {questao && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{questao.texto_pergunta}</Text>

            <View style={styles.checkboxWrapper}>
              <TextInput
                style={styles.textboxV}
                textColor="white"
                keyboardType="numeric"
                value={diasEAtividades.split(",")[0] || ""} // Mostra só o primeiro valor
                onChangeText={(text) => {
                  if (text === "") {
                    setdiasEAtividades(
                      `,${diasEAtividades.split(",")[1] || ""}`
                    ); // Se vazio, mantém atividades
                  } else {
                    const valor = parseInt(text);
                    if (isNaN(valor) || valor < 1 || valor > 7) {
                      Alert.alert(
                        "Entrada inválida",
                        "Por favor, insira um número entre 1 e 7."
                      );
                    } else {
                      const [, atividades] = diasEAtividades.split(","); // Mantém o valor de atividades
                      setdiasEAtividades(`${text},${atividades || ""}`); // Atualiza apenas o "dias por semana"
                      if (isChecked) {
                        setChecked(false); // Desmarca o checkbox se o texto foi modificado
                      }
                    }
                  }
                }}
                editable={!isChecked}
                underlineColor="white" // Cor da barra de texto em estado inativo
                activeUnderlineColor="white" // Cor da barra de texto quando ativo/focado
              />
              <Text style={styles.label}>dias por SEMANA</Text>
            </View>

            {diasEAtividades !== "" && (
              <View style={styles.atividadesWrapper}>
                <Text style={styles.label2}>Quais atividades?</Text>
                <TextInput
                  style={styles.textboxV}
                  textColor="white"
                  keyboardType="default"
                  value={diasEAtividades.split(",")[1] || ""} // Mostra só o segundo valor
                  onChangeText={(text) => {
                    const [diasSemana] = diasEAtividades.split(","); // Mantém o valor de dias por semana
                    setdiasEAtividades(
                      `${diasSemana || ""},${text.toUpperCase()}`
                    ); // Converte o texto para maiúsculas
                  }}
                  editable={!isChecked}
                  underlineColor="white" // Cor da barra de texto em estado inativo
                  activeUnderlineColor="white" // Cor da barra de texto quando ativo/focado
                />
              </View>
            )}

            {/* Checkbox para "nenhum" */}
            <View style={styles.checkboxWrapper}>
              <Checkbox
                value={isChecked} // Usar o valor correto do estado
                onValueChange={handleCheckboxChange}
                color={isChecked ? "#14E2C3" : undefined} // Cor quando marcado
                style={styles.checkbox}
              />
              <Text style={styles.label}>nenhum</Text>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister} // Armazena a resposta ao clicar no botão e navega para Tela_2
        >
          <Icon name="chevron-right" size={30} color="#032D45" />
        </TouchableOpacity>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default Tela1_4;
