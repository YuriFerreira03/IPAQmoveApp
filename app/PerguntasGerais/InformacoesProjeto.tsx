import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from "../../styles/InformacoesProjeto";
import { TextInput } from 'react-native-gesture-handler';
import Checkbox from "expo-checkbox";
import { TouchableOpacity } from 'react-native';
import handlePress from '../Components/Button'; // Importa a função do arquivo Button.js (ou Button.tsx)
import { useNavigation } from "@react-navigation/native";

const InformacoesProjeto = () => {
    const navigation=useNavigation();

    const handlePress = () => {
        navigation.navigate('TelaLocalizacao');
      };

    return(
        <LinearGradient colors={["#032D45", "#14E2C3"]} style={styles.gradient}>
            <Text style={styles.textVII}>
                Olá,{""}
                <Text style={styles.textVIII}>_ _ _ _ </Text>{""}!
            </Text>
            <Text style={styles.textIX}>Insira as informações do projeto do qual você deseja participar:</Text>
            <View style={styles.cardI}>
                <Text style ={styles.textX}>
                    Nome da Pesquisa
                </Text>
            </View>
            <View style={styles.cardII}>
                <Text style ={styles.textXI}>
                    Nome do Pesquisador
                </Text>
            </View>
            <TouchableOpacity onPress={handlePress} style={styles.button}>
                <Text style={styles.buttonText}>ACESSAR</Text>
            </TouchableOpacity>
        </LinearGradient>

    );  
}