import React, { useState, useEffect } from "react";
import {
  View,
  Text,
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
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getIp from "../getIp";

const GeneralQuestionsScreen = () => {
  const [isChecked, setChecked] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [estatura, setEstatura] = useState("");
  const [peso, setPeso] = useState("");
  const [horasTrabalho, setHorasTrabalho] = useState("");
  const [horasSono, setHorasSono] = useState("");
  const navigation = useNavigation();
  const [userId, setUserId] = useState<string | null>("");


  async function getDataFromStorage() {
    setUserId(await AsyncStorage.getItem("userId"));
  }

  useEffect(() => {
    getDataFromStorage();
  }, []);

  useEffect(() => {
    async function loadData() {
      const storedName = await AsyncStorage.getItem("name");
      const storedAge = await AsyncStorage.getItem("age");
      const storedGender = await AsyncStorage.getItem("gender");
      const storedEstatura = await AsyncStorage.getItem("estatura");
      const storedPeso = await AsyncStorage.getItem("peso");
      const storedHorasTrabalho = await AsyncStorage.getItem("horasTrabalho");
      const storedHorasSono = await AsyncStorage.getItem("horasSono");
      const storedIsChecked = await AsyncStorage.getItem("isChecked");

      if (storedName) setName(storedName);
      if (storedAge) setAge(storedAge);
      if (storedGender) setGender(storedGender);
      if (storedEstatura) setEstatura(storedEstatura);
      if (storedPeso) setPeso(storedPeso);
      if (storedHorasTrabalho) setHorasTrabalho(storedHorasTrabalho);
      if (storedHorasSono) setHorasSono(storedHorasSono);
      if (storedIsChecked) setChecked(storedIsChecked === 'true');
    }

    loadData();
  }, []);

  const validateForm = () => {
    if (!name || !age || !gender || !estatura || !peso || !horasTrabalho || !horasSono) {
      Alert.alert("Erro", "Todos os campos devem ser preenchidos.");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const ip = getIp(); // Supondo que você tenha uma função para obter o IP
      const url = `http://${ip}:8080/perguntas_gerais`;

      const response = await axios.post(
        url,
        {
          fk_Usuario_id_usuario: userId, // Substitua pelo ID do usuário correto
          nome: name,
          idade: parseInt(age, 10),
          sexo: gender,
          estatura: parseFloat(estatura),
          peso: parseFloat(peso),
          trabalha_remunerado: isChecked ? 1 : 0,
          horas_trabalho_dia: parseInt(horasTrabalho, 10),
          horas_sono_dia: parseInt(horasSono, 10),
        },
        {
          timeout: 10000, // 10 segundos de tempo limite
        }
      );

      console.log("Resposta do backend:", response.data);
      Alert.alert("Sucesso", "Resposta cadastrada com sucesso!");
      await AsyncStorage.multiSet([
        ["name", name],
        ["age", age],
        ["gender", gender],
        ["estatura", estatura],
        ["peso", peso],
        ["horasTrabalho", horasTrabalho],
        ["horasSono", horasSono],
        ["isChecked", isChecked.toString()],
      ]);
      navigation.navigate("Splach");
    } catch (error) {
      console.error("Erro ao cadastrar resposta:", error.message || error);
      Alert.alert("Erro", "Não foi possível cadastrar a resposta.");
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={20}
    >
      <LinearGradient colors={["#032D45", "#0A4E66"]} style={styles.container}>
        <TextInput
          style={styles.textbox}
          placeholder="Nome:"
          placeholderTextColor="#b3b3b3"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.textboxI}
          placeholder="Idade:"
          placeholderTextColor="#b3b3b3"
          value={age}
          onChangeText={setAge}
        />
        <TextInput
          style={styles.textboxII}
          placeholder="Sexo: "
          placeholderTextColor="#b3b3b3"
          value={gender}
          onChangeText={setGender}
        />
        <TextInput
          style={styles.textboxIII}
          placeholder="Estatura: "
          placeholderTextColor="#b3b3b3"
          value={estatura}
          onChangeText={setEstatura}
        />
        <TextInput
          style={styles.textboxIV}
          placeholder="Peso: "
          placeholderTextColor="#b3b3b3"
          value={peso}
          onChangeText={setPeso}
        />

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
          <TextInput
            style={styles.textboxV}
            placeholder="Digite aqui:"
            placeholderTextColor="#b3b3b3"
            value={horasTrabalho}
            onChangeText={setHorasTrabalho}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Quantas horas você dorme por dia:
          </Text>
          <TextInput
            style={styles.textboxV}
            placeholder="Digite aqui:"
            placeholderTextColor="#b3b3b3"
            value={horasSono}
            onChangeText={setHorasSono}
          />
        </View>

        <TouchableOpacity
          style={styles.button3}
          onPress={handleRegister}
        >
          <Icon name="chevron-right" size={30} color="#032D45" />
        </TouchableOpacity>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default GeneralQuestionsScreen;