import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Switch,
  TextInput, // Agora usando TextInput nativo do React Native
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "./index";
import axios from "axios";
import getIp from "./getIp";
import styles from "../styles/LoginUsu";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Importar o ícone
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { api } from "@/api/api";

const LoginPesquisador = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Controle de visibilidade da senha
  const [isSwitchOn, setIsSwitchOn] = useState(false); // ou true, dependendo do estado inicial

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const loadCredentials = async () => {
      const credentials = await AsyncStorage.getItem("userCredentials");
      if (credentials) {
        const { email, password } = JSON.parse(credentials);
        setEmail(email);
        setPassword(password);
      }
    };
    loadCredentials();
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      const ip = await getIp();
      const url = `/login`;

      const userType = "pesquisador";

      console.log("URL de requisição:", url);
      console.log("Enviando dados para o backend:", {
        email,
        password,
        type: userType,
      });

      const response = await api.post(
        url,
        { email, password, type: userType },
        { timeout: 20000 }
      );

      console.log("Dados recebidos do backend:", response.data);

      const { userId, name, locality, type } = response.data;

      if (type !== userType) {
        Alert.alert(
          "Erro",
          `Você está tentando entrar como pesquisador, mas sua conta é de visitante.`
        );
        return;
      }

      if (userId && name && locality) {
        await AsyncStorage.setItem("userId", userId.toString());
        await AsyncStorage.setItem("name", name);
        await AsyncStorage.setItem("locality", locality);

        // Salva credenciais somente se o "Lembrar-me" estiver ativado
        if (isSwitchOn) {
          await AsyncStorage.setItem(
            "userCredentials",
            JSON.stringify({ email, password })
          );
        }

        console.log("Nome armazenado:", name);
        console.log("Localidade armazenada:", locality);
      }

      Alert.alert("Usuário entrou!");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Erro ao entrar:", error);

      // Verifica se há uma resposta do backend e exibe a mensagem de erro enviada
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        Alert.alert("Erro", error.response.data.message); // Exibe a mensagem enviada pelo backend
      } else {
        // Se não houver resposta do backend, exibe um erro genérico
        Alert.alert("Erro", "Erro de rede ou timeout.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const Cadastro = () => {
    navigation.navigate("CadastroPesquisador");
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={20}
    >
      <View style={styles.container}>
        <LinearGradient colors={["#032D45", "#14E2C3"]} style={styles.gradient}>
          <View style={styles.containerLog}>
            <Image
              source={require("../images/logo.png")}
              style={styles.imageStyle}
            />

            <Text style={styles.textLog}>Login Pesquisador</Text>

            {/* Campo de e-mail */}
            <TextInput
              style={styles.input}
              placeholder="Email:"
              placeholderTextColor="#b3b3b3"
              value={email}
              onChangeText={setEmail}
            />

            {/* Campo de senha com funcionalidade de mostrar/ocultar */}
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.inputultimo}
                placeholder="Senha:"
                placeholderTextColor="#b3b3b3"
                value={password}
                secureTextEntry={!isPasswordVisible}
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: -30,
                  marginBottom: 10,
                }}
              >
                <Switch value={isSwitchOn} onValueChange={setIsSwitchOn} />
                <Text style={{ color: "#fff", marginLeft: 10 }}>
                  Lembrar-me
                </Text>
              </View>
            </View>
          </View>

          {/* Botão de Login */}
          <TouchableOpacity
            style={styles.buttonlog}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.textbuttonlog}>Entrar</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text style={[styles.textbuttonlog1, { marginRight: 2 }]}>
              Não tem conta ?
            </Text>
            <TouchableOpacity onPress={Cadastro}>
              <Text style={styles.textbuttonlog1}>Cadastre-se!</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginPesquisador;
