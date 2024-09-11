import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Alert, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Checkbox from "expo-checkbox";
import CustomStepper from "../Components/CustomStepper";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles/Tela_2";
import getIp from "../getIp";
import Icon from "react-native-vector-icons/MaterialIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";

const Tela1_3 = () => {

  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [questao, setQuestao] = useState(null);
  const [isChecked, setChecked] = useState(false);
  const steps = ["1", "2", "3", "4", "5"];
  const activeStep = 2;


    const fetchQuestao = async () => {
      try {
        const ip = getIp(); // Endereço IP da sua máquina
        const url = `http://${ip}:8080/questao/14`; // Passando o id_questao diretamente so colocar o numero de acordo com o banco
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
    }, []); // Adicione id_questao como dependência se necessário
    

  const handleSaveResposta = async () => {
    try {

      const ip = getIp(); // Endereço IP da sua máquina
      const url = `http://${ip}:8080/responde`;
      await axios.post(url, {
        fk_Usuario_id_usuario: id_usuario, // Substitua pelo ID do usuário real
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
        <Text style={styles.title}>SEÇÃO 3</Text>
        <Text style={styles.steps}><CustomStepper steps={steps} activeStep={activeStep} /></Text>

        <Text style={styles.body}>
        Esta parte inclui as atividades físicas que você fez na ultima semana na sua casa e ao redor da sua casa, 
        por exemplo, trabalho em casa, cuidar do jardim, cuidar do quintal, trabalho de manutenção da casa ou para
        cuidar da sua família.
        Novamente pense <Text style={styles.nao}> somente </Text>naquelas atividades físicas que você faz por
          <Text style={styles.nao}> pelo menos 10 MINUTOS CONTÍNUOS.</Text>
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Tela2_3")}
        >
          <Icon name="chevron-right" size={30} color="#032D45" />
        </TouchableOpacity>

      </ScrollView>
    </LinearGradient>
  );
};

import { StyleSheet } from 'react-native';

const styles1 = StyleSheet.create({
  
  label: {
    fontSize: 26,
    color: 'white',
    marginHorizontal: -265,
    fontFamily: "inter-light",
    lineHeight: 45,
    marginTop: 100

  },
  label2: {
    fontSize: 26,
    color: 'white',
    marginHorizontal: 50,
    fontFamily: "inter-light",
    lineHeight: 45,
    marginTop: -30

  },

  label3: {
    fontSize: 26,
    color: 'white',
    fontFamily: "inter-light",
    lineHeight: 45,

  },
  
});


export default Tela1_3;
