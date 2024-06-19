import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, StyleSheet } from 'react-native';
import styles from "../../styles/ScreensExpli";
import { TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const ScreenExpli2 = () =>{

    const navigation = useNavigation();

    return (

        <LinearGradient colors={["#032D45", "#14E2C3"]} style={styles.container}>

            <Text style={styles.textXIV}>
            As perguntas incluem as atividades que você faz no trabalho, 
            para ir de um lugar a outro, por lazer, por esporte, por exercício ou 
            como parte das suas atividades em casa ou no jardim. Suas respostas são 
            <Text style={styles.textXIII}> MUITO </Text>importantes.
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("ScreenExpli3")}
            >
                <Icon name="chevron-right" size={30} color="#032D45" />
            </TouchableOpacity>

        </LinearGradient>
    );

};

export default ScreenExpli2;