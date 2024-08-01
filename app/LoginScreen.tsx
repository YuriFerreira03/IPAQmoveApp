import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import styles from "../styles/LoginStyles";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "./index";
import Dialog from "react-native-dialog";
import axios from "axios";
import getIp from '../app/getIp';

const LoginScreen = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [locality, setLocality] = useState("");

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleToggleSwitch = () => {
    setIsSwitchOn((previousState) => !previousState);
  };

  const handleLoginPress = () => {
    setVisible(true);
  };

  const handleHomeVPress = () => {
    navigation.navigate("HomeVisitante");
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = async () => {
    setVisible(false);
    try {
      const ip = getIp(); // Endereço IP da sua máquina
      const url = `http://${ip}:8080/Usuario`;

      // Verifique se o nome não está vazio
      if (!name) {
        Alert.alert("Erro", "O nome do usuário não pode estar vazio!");
        return;
      }
      if (!locality) {
        Alert.alert("Erro", "A localização do usuário não pode estar vazia!");
        return;
      }

      console.log("URL de requisição:", url);
      console.log("Enviando dados para o backend:", {
        name,
        type: "user",
        locality //pegando localização
      });

      const response = await axios.post(
        url,
        { name, type: "user", locality }, 
        { timeout: 20000 } // 20 segundos de tempo limite
      );

      console.log("Resposta do backend:", response.data);
      Alert.alert("Usuário Salvo!");
      const userId = response.data.userId; // backend retorna o userId
      navigation.navigate("Home", { userName: name, userId }); // userId como parâmetro
    } catch (error) {
      console.error("Erro ao salvar o usuário:", error);
      Alert.alert("Erro ao salvar o usuário!");
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={isSwitchOn ? ["#032D45", "#14E2C3"] : ["#14E2C3", "#032D45"]}
        style={styles.gradient}
      >
        <Image
          source={require("../images/logo.png")}
          style={styles.imageStyle}
        />
        <Text style={styles.textStyle}>Seja bem-vindo ao</Text>
        <Text style={styles.textStyleII}>
          <Text style={{ color: "#082D47" }}>IPAQ</Text>
          <Text style={{ color: "#15E2C3" }}>move</Text>
        </Text>
        <Text style={styles.textStyleIII}>Use sua Conta Google para</Text>
        <Text style={styles.textStyleIII}>acessar o nosso app</Text>

        {isSwitchOn ? (
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleHomeVPress}
          >
            <AntDesign name="google" size={24} color="white" />
            <Text style={styles.googleButtonText}>Entrar com o Google</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleLoginPress}
          >
            <AntDesign name="google" size={24} color="white" />
            <Text style={styles.googleButtonText}>Entrar com o Google</Text>
          </TouchableOpacity>
        )}

        <View style={styles.switchContainer}>
          <Text
            style={[
              styles.switchLabel,
              { color: isSwitchOn ? "#00263E" : "#fff" },
            ]}
          >
            Pesquisador
          </Text>
          <Switch
            style={styles.switchStyle}
            value={isSwitchOn}
            onValueChange={handleToggleSwitch}
            trackColor={{ false: "#14E2C3", true: "#00263E" }}
            thumbColor={isSwitchOn ? "#14E2C3" : "#00263E"}
          />
          <Text
            style={[
              styles.switchLabel,
              { color: isSwitchOn ? "#00263E" : "#fff" },
            ]}
          >
            Visitante
          </Text>
        </View>
        <TouchableOpacity style={styles.termsContainer}>
          <FontAwesome
            name="file-text-o"
            size={40}
            color={isSwitchOn ? "#00263E" : "#fff"}
          />
          <Text
            style={[
              styles.termsText,
              { color: isSwitchOn ? "#00263E" : "#fff" },
            ]}
          >
            Termos de Uso
          </Text>
        </TouchableOpacity>
      </LinearGradient>
      <Dialog.Container visible={visible}>
        <Dialog.Title> Realizar login </Dialog.Title>
        <Dialog.Input label="Digite seu nome:" value={name} onChangeText={setName} />
        <Dialog.Input label="Digite sua localização:" value={locality} onChangeText={setLocality} />
        <Dialog.Button label="Cancelar" onPress={handleCancel} />
        <Dialog.Button label="Entrar" onPress={handleSubmit} />
      </Dialog.Container>
      
    </View>
  );
};

export default LoginScreen;
