import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "./index";
import axios, { AxiosError } from "axios";
import getIp from "./getIp";
import styles from "../styles/SignUp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Ícones de senha visível/invisível
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SignUpPesquisador = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [locality, setLocality] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Controle de visibilidade da senha
  // Estados para cidades e filtragem
  const [cidades, setCidades] = useState([]);
  const [filteredCidades, setFilteredCidades] = useState([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Função para validar a senha
  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return minLength && hasUpperCase && hasNumber && hasSpecialChar;
  };

  // Buscar cidades na API do IBGE
  useEffect(() => {
    const fetchCidades = async () => {
      try {
        const response = await axios.get(
          "https://servicodados.ibge.gov.br/api/v1/localidades/municipios"
        );
        setCidades(response.data);
      } catch (error) {
        console.error("Erro ao buscar cidades:", error);
      }
    };

    fetchCidades();
  }, []);

  // Filtrar cidades com base na entrada do usuário
  useEffect(() => {
    if (locality.length > 1) {
      const filtro = cidades.filter((cidade) =>
        cidade.nome.toLowerCase().includes(locality.toLowerCase())
      );
      setFilteredCidades(filtro);
    } else {
      setFilteredCidades([]);
    }
  }, [locality, cidades]);

  // setIsLoading(true); // Mostrar o indicador de carregamento

  // Função para tratar o cadastro
  const handleCadastro = async () => {
    if (!name || !email || !locality || !password) {
      Alert.alert("Erro", "Todos os campos devem ser preenchidos.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Erro", "Por favor, insira um e-mail válido.");
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert(
        "Senha Inválida",
        "A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, números e caracteres especiais."
      );
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert(
        "Senha Inválida",
        "A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, números e caracteres especiais."
      );
      return; // Não prosseguir com o cadastro se a senha for inválida
    }

    try {
      const ip = await getIp();
      const url = `http://${ip}:8080/Usuario`;

      console.log("URL de requisição:", url);
      console.log("Enviando dados para o backend:", {
        name,
        email,
        locality,
        password,
        type: "pesquisador",
      });

      const response = await axios.post(
        url,
        { name, email, locality, password, type: "pesquisador" }, // Enviar dados de cadastro
        { timeout: 20000 }
      );

      // Resposta do backend
      const {
        userId,
        name: responseName,
        email: responseEmail,
        locality: responseLocality,
      } = response.data;

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
      navigation.navigate("Login1"); // Navegar para a tela inicial após cadastro
    } catch (error: unknown) {
      // Verifica se o erro é uma instância de AxiosError
      if (error instanceof AxiosError) {
        if (error.response && error.response.status === 400) {
          Alert.alert("Erro", error.response.data.message); // Exibe a mensagem vinda do backend
        } else {
          Alert.alert("Erro", "Erro ao cadastrar! Tente novamente.");
        }
      } else {
        // Para outros tipos de erro
        Alert.alert("Erro", "Erro inesperado.");
        console.error("Erro desconhecido:", error);
      }
    } finally {
      // Garante que o carregamento é desativado, independentemente do sucesso ou erro
      setIsLoading(false);
    }
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

            {/* Lista de Sugestões de Cidades */}
            {filteredCidades.length > 0 && (
              <FlatList
                data={filteredCidades}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setLocality(
                        `${item.nome}, ${item.microrregiao.mesorregiao.UF.nome}`
                      );
                      setFilteredCidades([]); // Limpar a lista de sugestões após a seleção
                      setFilteredCidades([]);
                    }}
                  >
                    <Text style={styles.suggestionText}>
                      {item.nome}, {item.microrregiao.mesorregiao.UF.sigla}
                    </Text>
                  </TouchableOpacity>
                )}
                style={styles.suggestionsContainer}
              />
            )}
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
