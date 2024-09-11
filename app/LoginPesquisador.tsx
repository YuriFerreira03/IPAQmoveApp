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

const LoginPesquisador = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      const ip = await getIp(); // Supondo que getIp seja assíncrono
      const url = `http://${ip}:8080/login`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      let data;
      try {
        data = await response.json();
      } catch (err) {
        throw new Error('Resposta da API não é JSON válido.');
      }

      if (response.ok) {
        Alert.alert('Login bem-sucedido', `Bem-vindo(a) ao IPAQmove`);
        navigation.navigate("Home");
      } else {
        Alert.alert('Erro no Login', data.message || 'Erro desconhecido');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao tentar fazer login. Tente novamente.');
      console.error('Erro:', error);
    } finally {
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
        <LinearGradient
          colors={["#14E2C3", "#032D45"]}
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

export default LoginPesquisador;


