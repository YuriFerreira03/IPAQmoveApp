import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Checkbox from "expo-checkbox";
import styles from "../../styles/GeneralQuestionsScreen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getIp from "../getIp";
import { api } from "@/api/api";

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
      if (storedIsChecked) setChecked(storedIsChecked === "true");
    }

    loadData();
  }, []);

  const validateForm = () => {
    if (
      !name ||
      !age ||
      !gender ||
      !estatura ||
      !peso ||
      !horasTrabalho ||
      !horasSono
    ) {
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
      const ip = getIp();
      const url = `/perguntas_gerais`;

      const response = await api.post(
        url,
        {
          fk_Usuario_id_usuario: userId,
          nome: name,
          idade: parseInt(age, 10),
          sexo: gender,
          estatura: parseFloat(estatura),
          peso: parseFloat(peso),
          trabalha_remunerado: isChecked ? 1 : 0,
          horas_trabalha_dia: parseInt(horasTrabalho, 10),
          horas_sono_dia: parseInt(horasSono, 10),
        },
        {
          timeout: 10000,
        }
      );

      console.log("Resposta do backend:", response.data);
      Alert.alert("Sucesso", "Resposta cadastrada com sucesso!");

      // Limpar os campos após o cadastro bem-sucedido
      setName("");
      setAge("");
      setGender("");
      setEstatura("");
      setPeso("");
      setHorasTrabalho("");
      setHorasSono("");
      setChecked(false);

      // Limpar os dados no AsyncStorage
      await AsyncStorage.multiRemove([
        "name",
        "age",
        "gender",
        "estatura",
        "peso",
        "horasTrabalho",
        "horasSono",
        "isChecked",
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
          placeholderTextColor="white"
          textColor="white"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.textboxI}
          placeholder="Idade:"
          placeholderTextColor="white"
          textColor="white"
          value={age}
          keyboardType="numeric"
          maxLength={3} // Limita a 2 dígitos
          onChangeText={(text) => {
            // Remova qualquer caractere que não seja número
            let formattedText = text.replace(/[^0-9]/g, "");

            setAge(formattedText); // Atualiza o valor com até 2 dígitos
          }}
        />

        <TextInput
          style={styles.textboxII}
          placeholder="Sexo: "
          placeholderTextColor="white"
          textColor="white"
          value={gender}
          onChangeText={setGender}
          onEndEditing={() => {
            const formattedText = gender.trim().toLowerCase();
            if (formattedText === "masculino" || formattedText === "feminino") {
              setGender(
                formattedText.charAt(0).toUpperCase() + formattedText.slice(1)
              );
            } else {
              Alert.alert(
                "Erro",
                "O campo Sexo aceita apenas 'Masculino' ou 'Feminino'"
              );
              setGender(""); // Limpa o campo se for inválido
            }
          }}
        />

        <TextInput
          style={styles.textboxIII}
          placeholder="Estatura: "
          placeholderTextColor="white"
          textColor="white"
          value={estatura}
          keyboardType="numeric"
          onChangeText={(text) => {
            // Remover qualquer caractere que não seja número ou ponto
            let formattedText = text.replace(/[^0-9.]/g, "");

            // Verificar se o primeiro número é maior que 2
            if (
              formattedText.length > 0 &&
              parseInt(formattedText[0], 10) > 2
            ) {
              return; // Se o primeiro número for maior que 2, não atualize o valor
            }

            // Limitar a no máximo um ponto decimal
            const decimalCount = (formattedText.match(/\./g) || []).length;
            if (decimalCount > 1) {
              return; // Impede múltiplos pontos decimais
            }

            // Adicionar ponto automaticamente após o primeiro dígito
            if (formattedText.length > 1 && !formattedText.includes(".")) {
              formattedText =
                formattedText.slice(0, 1) + "." + formattedText.slice(1);
            }

            // Limitar a dois dígitos após o ponto
            if (formattedText.includes(".")) {
              const parts = formattedText.split(".");
              if (parts[1].length > 2) {
                formattedText = parts[0] + "." + parts[1].substring(0, 2);
              }
              // Verificar se os últimos dois dígitos não excedem 99
              if (parseInt(parts[1], 10) > 99) {
                return; // Se o valor após o ponto for maior que 99, não atualize o valor
              }
            }

            setEstatura(formattedText); // Atualiza o valor final se passar em todas as validações
          }}
        />

        <TextInput
          style={styles.textboxIV}
          placeholder="Peso: "
          placeholderTextColor="white"
          textColor="white"
          value={peso}
          keyboardType="numeric"
          maxLength={3} // Limita a 3 dígitos
          onChangeText={(text) => {
            // Remova qualquer caractere que não seja número
            let formattedText = text.replace(/[^0-9]/g, "");

            setPeso(formattedText); // Atualiza o valor com até 3 dígitos
          }}
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
            placeholderTextColor="white"
            textColor="white"
            value={horasTrabalho}
            keyboardType="numeric"
            onChangeText={(text) => {
              // Remover qualquer caractere que não seja número
              let formattedText = text.replace(/[^0-9]/g, "");

              // Converter o texto para número e verificar se excede 24
              if (formattedText !== "" && parseInt(formattedText, 10) > 24) {
                formattedText = ""; // Limita o valor e apaga se for maior que 24
              }

              setHorasTrabalho(formattedText); // Atualiza o valor com no máximo 24
            }}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Quantas horas você dorme por dia:
          </Text>

          <TextInput
            style={styles.textboxV}
            placeholder="Digite aqui:"
            placeholderTextColor="white"
            textColor="white"
            value={horasSono}
            keyboardType="numeric"
            onChangeText={(text) => {
              // Remover qualquer caractere que não seja número
              let formattedText = text.replace(/[^0-9]/g, "");

              // Converter o texto para número e verificar se excede 24
              if (formattedText !== "" && parseInt(formattedText, 10) > 24) {
                formattedText = ""; // Limita o valor e apaga se for maior que 24
              }

              setHorasSono(formattedText); // Atualiza o valor com no máximo 24
            }}
          />
        </View>

        <TouchableOpacity style={styles.button3} onPress={handleRegister}>
          <Icon name="chevron-right" size={30} color="#032D45" />
        </TouchableOpacity>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default GeneralQuestionsScreen;
