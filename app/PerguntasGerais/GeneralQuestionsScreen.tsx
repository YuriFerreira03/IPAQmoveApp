import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Switch,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Checkbox from "expo-checkbox";
import styles from "../../styles/GeneralQuestionsScreen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import { TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Dialog from "react-native-dialog";
import axios from "axios";
//import getIp from '../app/getIp';


const GeneralQuestionsScreen = () => {
  const [isChecked, setChecked] = React.useState(false);
  const [name, Name] = React.useState("");
  const [age, Age] = React.useState("");
  const [gender, Gender] = React.useState("");
  const [estatura, Estatura] = React.useState("");
  const [peso, Peso] = React.useState("");
  const navigation = useNavigation();


  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={20}
    >
      <LinearGradient colors={["#032D45", "#0A4E66"]} style={styles.container}>

        <TextInput style={styles.textbox} placeholder="Nome:" placeholderTextColor="#b3b3b3" />
        <TextInput style={styles.textboxI} placeholder="Idade:" placeholderTextColor="#b3b3b3" />
        <TextInput style={styles.textboxII} placeholder="Sexo: " placeholderTextColor="#b3b3b3" />
        <TextInput style={styles.textboxIII} placeholder="Estatura: " placeholderTextColor="#b3b3b3" />
        <TextInput style={styles.textboxIV} placeholder="Peso: " placeholderTextColor="#b3b3b3" />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Você trabalha de forma remunerada ou voluntária:
          </Text>
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

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Quantas horas você trabalha por dia:
          </Text>
          <TextInput style={styles.textboxV} placeholder="Digite aqui:" placeholderTextColor="#b3b3b3" />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Quantas horas você dorme por dia:
          </Text>
          <TextInput style={styles.textboxV} placeholder="Digite aqui:" placeholderTextColor="#b3b3b3" />
        </View>
        <TouchableOpacity
          style={styles.button3}
          onPress={() => navigation.navigate("Splach")}
        >
          <Icon name="chevron-right" size={30} color="#032D45" />
        </TouchableOpacity>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default GeneralQuestionsScreen;
