import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Alert, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Checkbox from "expo-checkbox";
import CustomStepper from "../Components/CustomStepper";
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TelaLocalizacaoRouteProp = RouteProp<RootStackParamList, "tela_2">;

const Tela_2: React.FC<{ route: TelaLocalizacaoRouteProp }> = ({ route }) => {
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
  const activeStep = 0;

  const fetchQuestao = async () => {
    try {
      const ip = getIp(); // Endereço IP da sua máquina
      const url = `http://${ip}:8080/questao/1`; // Passando o id_questao diretamente so colocar o numero de acordo com o banco
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
      console.log("Iniciando cadastro de resposta...");
      const ip = getIp(); // Endereço IP da sua máquina
      const url = `http://${ip}:8080/Resposta`;
      console.log("URL de requisição:", url);
      console.log("Enviando dados para o backend:", {
        fk_Usuario_id_usuario: userId, // Utilize o ID do usuário logado
        fk_Questionario_id_questao: 1, // Substitua pelo ID da questão correta
        respostas_abertas: respostas_abertas,
        respostas_fechadas: isChecked ? "SIM" : "NÃO", // Armazena a resposta do checkbox
        datahora: datahora,
        resposta: resposta,
      });

      const dadosParaEnvio = {
        fk_Usuario_id_usuario: userId, // Utilize o ID do usuário logado
        fk_Questionario_id_questao: 1, // Sempre define como 1
        respostas_abertas: respostas_abertas,
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
          fk_Questao_id_questao: 1,
          respostas_abertas: respostas_abertas,
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

      // Navegação após o envio bem-sucedido
      if (isChecked) {
        // Se "SIM" estiver marcado
        console.log("Navegando para TelaSim");
        navigation.navigate("Tela2"); // Substitua "TelaSim" pela tela correta para "SIM"
      } else {
        // Se "NÃO" estiver marcado
        console.log("Navegando para Splash2");
        navigation.navigate("Splash2"); // Substitua por sua tela correta para "NÃO"
      }
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
        <Text style={styles.title}>SEÇÃO 1</Text>
        <CustomStepper steps={steps} activeStep={activeStep} />

        <Text style={styles.body}>
          Esta seção inclui as atividades que você faz no seu serviço, que
          incluem trabalho remunerado ou voluntário, as atividades na escola ou
          faculdade e outro tipo de trabalho não remunerado fora da sua casa.
          <Text style={styles.nao}> NÃO</Text> incluir trabalho não remunerado
          que você faz na sua casa como tarefas domésticas, cuidar do jardim e
          da casa ou tomar conta da sua família. Estas serão incluídas na seção
          3.
          {"           "}
        </Text>

        {questao && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{questao.texto_pergunta}</Text>

            <View style={styles.checkboxWrapper}>
              <Checkbox
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? "#14E2C3" : undefined}
              />
              <Text style={styles.label}>SIM</Text>
              <Checkbox
                value={!isChecked}
                onValueChange={() => setChecked(!isChecked)}
                color={!isChecked ? "#14E2C3" : undefined}
              />
              <Text style={styles.label}>NÃO</Text>
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

export default Tela_2;
