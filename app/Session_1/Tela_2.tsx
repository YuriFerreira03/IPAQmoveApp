import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Checkbox from "expo-checkbox";
import CustomStepper from "../Components/CustomStepper";
import Button from "../Components/Button";
import axios from "axios";
import styles from "../../styles/Tela_2";

const Tela2 = ({ route }) => {
  console.log("route.params:", route.params);
  const { id_questao } = route.params || {}; 
  console.log("Recebido id_questao:", id_questao);
  const [questao, setQuestao] = useState(null);
  const [isChecked, setChecked] = useState(false);
  const steps = ["1", "2", "3", "4", "5"];
  const activeStep = 0;

  useEffect(() => {
    const fetchQuestao = async () => {
      try {
        const ip = "192.168.1.231"; // Endereço IP da sua máquina
        const url = `http://${ip}:8080/questao/:id_secao`;
        console.log("URL de requisição:", url);

        const response = await axios.get(url, { timeout: 10000 }); // 10 segundos de tempo limite
        console.log("Dados da seção recebidos:", response.data);

        setQuestao(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados da seção:", error);
        Alert.alert("Erro ao buscar dados da seção!");
      }
    };

    fetchQuestao();
  }, []);

  const handleSaveResposta = async () => {
    try {
      const ip = "192.168.1.231"; // Endereço IP da sua máquina
      const url = `http://${ip}:8080/responde`;
      await axios.post(url, {
        fk_Usuario_id_usuario: 1, // Substitua pelo ID do usuário real
        fk_Questao_id_questao: id_questao,
        resposta: isChecked ? 'SIM' : 'NÃO',
      });
      Alert.alert("Resposta salva com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar resposta:", error);
      Alert.alert("Erro ao salvar resposta!");
    }
  };

  return (
    <LinearGradient colors={["#032D45", "#0A4E66"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>SEÇÃO 1</Text>
        <CustomStepper steps={steps} activeStep={activeStep} />
        {questao && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{questao.texto_pergunta}</Text>
            <View style={styles.checkboxContainer}>
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
        <Text style={styles.body}>
          As próximas questões são em relação a toda a atividade física que você
          fez na ultima semana como parte do seu trabalho remunerado ou não
          remunerado e/ou do seu estudo.
          {"           "}
          <Text style={styles.nao}>NÃO</Text> inclua o transporte para o
          trabalho. Pense unicamente nas atividades que você faz por
          {" "}
          <Text style={styles.nao}>pelo menos 10 MINUTOS CONTÍNUOS:</Text>
        </Text>
        <Button onPress={handleSaveResposta} />
      </ScrollView>
    </LinearGradient>
  );
};

export default Tela2;
