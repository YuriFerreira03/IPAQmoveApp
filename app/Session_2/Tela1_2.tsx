// src/screens/Tela1.js
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Alert, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import CustomStepper from "../Components/CustomStepper";
import axios from "axios";
import styles from "../../styles/Tela_1";
import getIp from "../getIp";
import Icon from "react-native-vector-icons/MaterialIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


const Tela1_2 = () => {
    const [secao, setSecao] = useState({ descricao: '' });
    const [loading, setLoading] = useState(true);
    const steps = ["1", "2", "3", "4", "5"];
    const activeStep = 1; //partezinha de cima que fica mostrando em qual seção o usuário está (deixa verdinha)

    const descsecId = 2;

    const navigation = useNavigation();

    useEffect(() => {
        const fetchSecao = async () => {
            try {
                const ip = getIp(); // Endereço IP da sua máquina
                const url = `http://${ip}:8080/secao/${descsecId}`; //referencia a descrição da seção
                console.log("URL de requisição:", url);

                const response = await axios.get(url, { timeout: 10000 }); // 10 segundos de tempo limite
                console.log("Dados da seção recebidos:", response.data);

                setSecao(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar dados da seção:", error);
                Alert.alert("Erro ao buscar dados da seção!");
                setLoading(false);
            }
        };

        fetchSecao();
    }, []);

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid={true}
            extraScrollHeight={20}
        >
            <LinearGradient colors={["#032D45", "#0A4E66"]} style={styles.container}>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#fff" />
                    </View>
                ) : (
                    <ScrollView>
                        <Text style={styles.title}>SEÇÃO 2</Text>
                        <CustomStepper steps={steps} activeStep={activeStep} />
                        <Text style={styles.body}>{secao.descricao}</Text>

                        <TouchableOpacity
                            style={styles1.button}
                            onPress={() => navigation.navigate("Tela2_2")}
                        >
                            <Icon name="chevron-right" size={30} color="#032D45" />
                        </TouchableOpacity>

                    </ScrollView>
                )}
            </LinearGradient>
        </KeyboardAwareScrollView>
    );
};

const styles1 = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 70,
        marginBottom: 30,
        marginLeft: 300,
    },
});

export default Tela1_2;
