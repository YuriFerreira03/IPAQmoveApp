import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from "../../styles/TelaTexto";
import { TextInput } from 'react-native-gesture-handler';
import Checkbox from "expo-checkbox";
import { TouchableOpacity } from 'react-native';
import handlePress from '../Components/Button'; // Importa a função do arquivo Button.js (ou Button.tsx)
import { useNavigation } from "@react-navigation/native";
import Button from "../Components/Button";

const TelaTexto = () => {
    const navigation=useNavigation();

    <LinearGradient colors={["#032D45", "#14E2C3"]} style={styles.gradient}>
        <Text style={styles.textXII}>
        As perguntas estão relacionadas ao tempo que você gasta fazendo atividade física em uma semana típica, na 
        </Text>
        <Text styles={styles.textXIII}>
            ULTIMA SEMANA
        </Text>
        <Button></Button>
    </LinearGradient>
};