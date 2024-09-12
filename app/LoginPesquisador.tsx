
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  Alert,
  Button
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "./index";
import Dialog from "react-native-dialog";
import axios from "axios";
import getIp from "./getIp";
import styles from "../styles/LoginUsu";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const LoginVisitante = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [locality, setLocality] = useState("");

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      const ip = await getIp(); // Supondo que getIp seja assíncrono
      const url = `http://${ip}:8080/login`;

      console.log("URL de requisição:", url);
      console.log("Enviando dados para o backend:", {
        name,
        type: "user",
        locality, //pegando localização
      });


      const response = await axios.post(
        url,
        { email, password, type: "user" },
        { timeout: 20000 }
      );
      
      console.log("Resposta do backend:", response.data);
      const { userId, name, locality } = response.data; // Recupera nome e localidade do backend
      
      // Verifica se os dados foram recebidos corretamente antes de armazenar
      if (userId && name && locality) {
        await AsyncStorage.setItem("userId", userId.toString());
        await AsyncStorage.setItem("name", name);
        await AsyncStorage.setItem("locality", locality);
      
        console.log("Nome armazenado:", name);
        console.log("Localidade armazenada:", locality);
      }
      
      Alert.alert("Usuário entrou!");
      navigation.navigate("HomeVisitante");
      
    } catch (error) {
      console.error("Erro ao entrar:", error);
      Alert.alert("Erro ao entrar!");
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

            <Text style={styles.textLog}>Login</Text>

            <TextInput
              style={styles.input}
              placeholder="Email:"
              placeholderTextColor="#b3b3b3"
              textColor="#FFFFFF"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              style={styles.inputultimo}
              placeholder="Senha:"
              placeholderTextColor="#b3b3b3"
              textColor="#FFFFFF"
              value={password}
              onChangeText={setPassword}
            />

          </View>

          {/* <Button
                        title={isLoading ? 'Carregando...' : 'Login'}
                        onPress={handleLogin}
                        disabled={isLoading}
                      /> */}

          <TouchableOpacity
            style={styles.buttonlog}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.textbuttonlog}>Entrar</Text>
          </TouchableOpacity>

        </LinearGradient>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginVisitante;


