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

type TelaLocalizacaoRouteProp = RouteProp<RootStackParamList, "tela2_2">;

const Tela2_2: React.FC<{ route: TelaLocalizacaoRouteProp }> = ({ route }) => {
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
  const [diasSemana, setDiasSemana] = useState<string>("");

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
  const activeStep = 1;

  const handleTextInputChange = (text: string) => {
    if (text === "") {
      setDiasSemana(""); // Permite que o usuário apague o texto
    } else {
      const valor = parseInt(text);
      if (isNaN(valor) || valor < 0 || valor > 7) {
        Alert.alert(
          "Entrada inválida",
          "Por favor, insira um número entre 0 e 7"
        );
      } else {
        setDiasSemana(text); // Define o número
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
        setDiasSemana(""); // Limpa o campo de texto ao marcar o checkbox
      }
      return newCheckedState;
    });
  };

  const fetchQuestao = async () => {
    try {
      const ip = getIp(); // Endereço IP da sua máquina
      const url = `http://${ip}:8080/questao/8`; // Passando o id_questao diretamente so colocar o numero de acordo com o banco
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

  const handleRegister = async () => {
    try {
      if (isChecked) {
        console.log("Checkbox marcado, navegando para Tela3_2");
        navigation.navigate("Tela4_2"); // Navega para Tela3_2 se o checkbox estiver marcado
        return; // Para a execução do restante da função
      }
      console.log("Iniciando cadastro de resposta...");
      const ip = getIp(); // Endereço IP da sua máquina
      const url = `http://${ip}:8080/Resposta`;
      console.log("URL de requisição:", url);
      console.log("Enviando dados para o backend:", {
        fk_Usuario_id_usuario: userId, // Utilize o ID do usuário logado
        fk_Questionario_id_questao: 8, // Substitua pelo ID da questão correta
        respostas_abertas: respostas_abertas,
        respostas_fechadas: isChecked ? "SIM" : "NÃO", // Armazena a resposta do checkbox
        datahora: datahora,
        resposta: resposta,
      });

      const dadosParaEnvio = {
        fk_Usuario_id_usuario: userId, // Utilize o ID do usuário logado
        fk_Questionario_id_questao: 8, // Sempre define com o id da questao
        respostas_abertas: diasSemana,
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
          fk_Questao_id_questao: 8,
          respostas_abertas: diasSemana,
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
      console.log("Navegando para Tela3_2");
      setSearchName("");
      navigation.navigate("Tela3_2");
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
        <Text style={styles.title}>SEÇÃO 2</Text>
        <CustomStepper steps={steps} activeStep={activeStep} />
        <Text style={styles.body}>
        Estas questões se referem à forma típica como você se desloca de um lugar para outro, incluindo seu trabalho,
         escola, cinema, lojas e outros por <Text style={styles.nao}>pelo menos 10 minutos contínuos.</Text>
        </Text>

        {questao && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{questao.texto_pergunta}</Text>

            {/* Campo de texto para dias por semana */}
            <View style={styles.checkboxWrapper}>
              <TextInput
                style={styles.textboxV}
                placeholderTextColor="#b3b3b3"
                textColor="white"
                keyboardType="numeric"
                value={diasSemana}
                onChangeText={handleTextInputChange}
                editable={!isChecked} // Desabilita o campo se o checkbox estiver marcado
                underlineColor="white" // Cor da barra de texto em estado inativo
                activeUnderlineColor="white" // Cor da barra de texto quando ativo/focado
              />
              <Text style={styles.label}>dias por SEMANA</Text>
            </View>

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
      </ScrollView>
    </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default Tela2_2;
