import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text } from 'react-native';
import styles from "../../styles/ScreensExpli";
import { TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const ScreenExpli1 = () => {

    const navigation = useNavigation();

    return (

        <LinearGradient colors={["#032D45", "#14E2C3"]} style={styles.container}>

            <Text style={styles.textXII}>
                As perguntas estão relacionadas ao tempo que você gasta fazendo atividade física em uma semana típica, na
            </Text>
            <Text style={styles.textXIII}>
                ÚLTIMA
            </Text>
            <Text style={styles.textXIII}>
                SEMANA
            </Text>
            <View style={styles.line}>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("ScreenExpli2")}
            >
                <Icon name="chevron-right" size={30} color="#032D45" />
            </TouchableOpacity>

        </LinearGradient>
    );
};

export default ScreenExpli1;