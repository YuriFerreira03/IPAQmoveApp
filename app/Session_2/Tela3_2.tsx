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

const Tela3_2 = () => {

    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [questao, setQuestao] = useState(null);
    const [isChecked, setChecked] = useState(false);
    const steps = ["1", "2", "3", "4", "5"];
    const activeStep = 1;


    const fetchQuestao = async () => {
        try {
            const ip = getIp(); // Endereço IP da sua máquina
            const url = `http://${ip}:8080/questao/9`; // Passando o id_questao diretamente so colocar o numero de acordo com o banco
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
                <Text style={styles.title}>SEÇÃO 2</Text>
                <Text style={styles.steps}><CustomStepper steps={steps} activeStep={activeStep} /></Text>

                {questao && (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>{questao.texto_pergunta}</Text>
                        <View style={styles.checkboxContainer}>

                            <TextInput style={styles1.textboxV} placeholder="..." placeholderTextColor="#b3b3b3" />

                            <Text style={styles1.label3}>horas</Text>

                            <TextInput style={styles.textboxV} placeholder="..." placeholderTextColor="#b3b3b3" />

                            <Text style={styles1.label3}>minutos</Text>

                        </View>
                    </View>
                )}

                <Text style={styles.body}>
                Agora pense <Text style={styles.nao}>somente</Text> em relação a caminhar ou pedalar para ir de um lugar a outro na ultima semana.
                </Text>

                <TouchableOpacity
                    style={styles.button}
                onPress={() => navigation.navigate("Tela4_2")}
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

    textboxV: {
        backgroundColor: "transparent",
        borderColor: "transparent",
        marginHorizontal: -10,
    },

});


export default Tela3_2;
