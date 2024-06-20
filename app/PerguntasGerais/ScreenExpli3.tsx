import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, StyleSheet } from 'react-native';
import styles from "../../styles/ScreensExpli";
import { TextInput } from 'react-native-gesture-handler';
import Checkbox from "expo-checkbox";
import { TouchableOpacity } from 'react-native';
import handlePress from '../Components/Button'; // Importa a função do arquivo Button.js (ou Button.tsx)
import { useNavigation } from "@react-navigation/native";
import Button from "../Components/Button";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ScreenExpli3 = () =>{

    const navigation = useNavigation();

    return (

        <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        extraScrollHeight={20}
        >

        <LinearGradient colors={["#032D45", "#14E2C3"]} style={styles.container3}>

           <View style={styles.view3}>
           <Text style={styles.textXIV}>
            Para responder as questões lembre que: 
            </Text>

            <Text style={styles.textXV}>
            Atividades físicas<Text style={styles.textXIII}> VIGOROSAS </Text>são aquelas que precisam de um grande esforço
            físico e que fazem respirar<Text style={styles.textXIII}> MUITO </Text>mais forte que o normal.
            </Text>
            <Text style={styles.textXV}>
            Atividades físicas<Text style={styles.textXIII}> MODERADAS </Text>são aquelas que precisam de algum esforço
            físico e que fazem respirar<Text style={styles.textXIII}> UM POUCO </Text>mais
            forte que o normal.
            </Text>

            <TouchableOpacity
                style={styles.button3}
                onPress={() => navigation.navigate("ScreenExpli4")}
            >
                <Icon name="chevron-right" size={30} color="#032D45" />
            </TouchableOpacity>
           </View>
        </LinearGradient>
        </KeyboardAwareScrollView>
    );

};

export default ScreenExpli3;