import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "./index";
import axios from "axios";
import getIp from "./getIp";
import styles from "../styles/SignUp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Ícones de senha visível/invisível
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SignUpPesquisador = () => { 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [locality, setLocality] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Controle de visibilidade da senha

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [isLoading, setIsLoading] = useState(false);

  // Função para validar a senha
  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return minLength && hasUpperCase && hasNumber && hasSpecialChar;
  };

  // Função para tratar o cadastro
  const handleCadastro = async () => {
    if (!validatePassword(password)) {
      Alert.alert(
        "Senha Inválida",
        "A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, números e caracteres especiais."
      );
      return; // Não prosseguir com o cadastro se a senha for inválida
    }

    setIsLoading(true); // Mostrar o indicador de carregamento

    try {
      const ip = await getIp(); 
      const url = `http://${ip}:8080/Usuario`;

      console.log("URL de requisição:", url);
      console.log("Enviando dados para o backend:", { name, email, locality, password, type: "user" });

      const response = await axios.post(
        url,
        { name, email, locality, password, type: "user" }, // Enviar dados de cadastro
        { timeout: 20000 }
      );
      
      // Resposta do backend
      const { userId, name: responseName, email: responseEmail, locality: responseLocality } = response.data;

      // Armazenar os dados no AsyncStorage para futura autenticação ou uso
      if (userId && responseName && responseEmail && responseLocality) {
        await AsyncStorage.setItem("userId", userId.toString());
        await AsyncStorage.setItem("name", responseName);
        await AsyncStorage.setItem("email", responseEmail);
        await AsyncStorage.setItem("locality", responseLocality);
      
        console.log("Nome armazenado:", responseName);
        console.log("Email armazenado:", responseEmail);
        console.log("Localidade armazenada:", responseLocality);
      }
      
      Alert.alert("Usuário cadastrado com sucesso!");
      navigation.navigate("Home"); // Navegar para a tela inicial após cadastro

    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      Alert.alert("Erro ao cadastrar!"); // Mostrar erro caso falhe
    } finally {
      setIsLoading(false); // Remover o indicador de carregamento
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={20}
    >
      <View style={styles.container}>
        <LinearGradient
          colors={["#032D45", "#14E2C3"]}
          style={styles.gradient}
        >
          <View style={styles.containerLog}>
            <Image
              source={require("../images/logo.png")}
              style={styles.imageStyle}
            />

            <Text style={styles.textLog}>Cadastro:</Text>
            <Text style={styles.textLog}>Pesquisador</Text>

            {/* Campo de nome */}
            <TextInput
              style={styles.input}
              placeholder="Nome:"
              placeholderTextColor="#b3b3b3"
              value={name}
              onChangeText={setName}
            />

            {/* Campo de e-mail */}
            <TextInput
              style={styles.input}
              placeholder="Email:"
              placeholderTextColor="#b3b3b3"
              value={email}
              onChangeText={setEmail}
            />

            {/* Campo de localidade */}
            <TextInput
              style={styles.input}
              placeholder="Localidade:"
              placeholderTextColor="#b3b3b3"
              value={locality}
              onChangeText={setLocality}
            />

            {/* Campo de senha com funcionalidade de mostrar/ocultar */}
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.inputultimo}
                placeholder="Senha:"
                placeholderTextColor="#b3b3b3"
                value={password}
                secureTextEntry={!isPasswordVisible} // Controle de visibilidade da senha
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                style={styles.icon}
              >
                <Icon
                  name={isPasswordVisible ? "eye-off" : "eye"}
                  size={24}
                  color={"#FFFFFF"} // Cor branca para o ícone
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Botão de Cadastro */}
          <TouchableOpacity
            style={styles.buttonlog}
            onPress={handleCadastro}
            disabled={isLoading} // Desativar enquanto carrega
          >
            <Text style={styles.textbuttonlog}>Cadastrar</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUpPesquisador;
