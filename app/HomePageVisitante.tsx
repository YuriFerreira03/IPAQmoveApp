import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "../styles/HomePage";
import {
  useNavigation,
  NavigationProp,
  RouteProp,
} from "@react-navigation/native";
import { RootStackParamList } from ".";
import AsyncStorage from "@react-native-async-storage/async-storage";

type HomePageRouteProp = RouteProp<RootStackParamList, "Home">;

type HomePageProps = {
  route: HomePageRouteProp;
};

const HomePage: React.FC<HomePageProps> = ({ route }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  // const { userName, userLocality } = route.params; // Recebe o parâmetro userName

  const [userId, setUserId] = useState<string | null>("");
  const [userName, setName] = useState<string | null>("");
  const [userLocality, setLocality] = useState<string | null>("");

  async function getDataFromStorage() {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const userName = await AsyncStorage.getItem("name");
      const userLocality = await AsyncStorage.getItem("locality");

      // Logs para depuração
      console.log("UserId recuperado:", userId);
      console.log("Nome recuperado:", userName);
      console.log("Localidade recuperada:", userLocality);

      setUserId(userId);
      setName(userName);
      setLocality(userLocality);
    } catch (error) {
      console.error("Erro ao recuperar dados do AsyncStorage:", error);
    }
  }

  useEffect(() => {
    getDataFromStorage();
  }, []);

  const handleAccessPress = () => {
    navigation.navigate("InicioPerguntasGerais");
  };

  const handleSearchPress = () => {
    //adicionando uma constante para conectar à tela de Pesquisa
    navigation.navigate("Search", { userName, userLocality }); // Passa o userName como parâmetro
  };

  const handleSearchPress1 = () => {
    //adicionando uma constante para conectar à tela de Pesquisa
    navigation.navigate("InicioPerguntasGerais"); // Passa o userName como parâmetro
  };

  const handleResultsPress = () => {
    navigation.navigate("Resultados"); // Navega para a página de resultados
  };

  const handleProfilePress = () => {
    // Lógica para o perfil
  };

  const handleSettingsPress = () => {
    // Lógica para configurações
  };

  const handleLogoutPress = () => {
    // Lógica para logout
  };

  return (
    <LinearGradient colors={["#032D45", "#0A4E66"]} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <LinearGradient colors={["#0A4E66", "#14E2C3"]} style={styles.header}>
          <View style={styles.textContainer}>
            <Text style={styles.greeting}>
              Olá, <Text style={styles.userName}>{userName}</Text>
            </Text>
            <Text style={styles.location}>{userLocality}</Text>
          </View>
          <Icon name="person" size={60} color="#FFFFFF" style={styles.icon} />
        </LinearGradient>
        <View style={styles.card}>
          <Icon
            name="favorite"
            size={24}
            color="#FFFFFF"
            style={styles.cardIcon}
          />
          <Text style={styles.cardTitle}>SAÚDE AO SEU ALCANCE</Text>
          <Text style={styles.cardDescription}>
            Descubra mais sobre seu bem-estar com o questionário IPAQ. Rápido,
            fácil e adaptado para você.
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleSearchPress1}>
            <Text style={styles.buttonText}>ACESSAR</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <Icon
            name="assessment"
            size={24}
            color="#FFFFFF"
            style={styles.cardIcon}
          />
          <Text style={styles.cardTitle}>VISUALIZAR RESULTADOS</Text>
          <Text style={styles.cardDescription}>
            Acompanhe seu progresso na jornada para um estilo de vida mais
            ativo. Veja seus resultados.
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleResultsPress}>
            <Text style={styles.buttonText}>ACESSAR</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.card}>
          <Icon
            name="search"
            size={24}
            color="#FFFFFF"
            style={styles.cardIcon}
          />
          <Text style={styles.cardTitle}>CADASTRAR PESQUISA</Text>
          <Text style={styles.cardDescription}>
            Cadastre seu projeto de pesquisa e consiga de uma forma simples ver
            todos os dados dos usuários juntos.
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleSearchPress}>
            <Text style={styles.buttonText}>ACESSAR</Text>
          </TouchableOpacity>
        </View> */}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomePage;
