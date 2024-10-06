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
    const storedUserId = await AsyncStorage.getItem("userId");
    const storedName = await AsyncStorage.getItem("name");
    const storedLocality = await AsyncStorage.getItem("locality");

    console.log("UserId recuperado:", storedUserId);
    console.log("Nome recuperado:", storedName);
    console.log("Localidade recuperada:", storedLocality);

    setUserId(storedUserId);
    setName(storedName);
    setLocality(storedLocality);
  }

  useEffect(() => {
    getDataFromStorage();
  }, []);

  const handleAccessPress = () => {
    navigation.navigate("InicioPerguntasGerais");
  };

  const handleSearchPress = () => {
    if (userName && userLocality) {
      console.log("Navegando para Search com:", { userName, userLocality });
      navigation.navigate("Search", { userName, userLocality }); // Passa userName e userLocality como parâmetros
    } else {
      console.log("Dados do usuário não carregados.");
      Alert.alert("Erro", "Dados do usuário não carregados.");
    }
  };

  const handleSearchPress1 = () => {
    //adicionando uma constante para conectar à tela de Pesquisa
    navigation.navigate("TelaLocalizacao", { userName, userLocality }); // Passa o userName como parâmetro
  };

  const handleResultPress = () => {
    // Lógica para o resultado
    navigation.navigate("ResultadoPesquisador");
  };

  const handleSettingsPress = () => {
    // Lógica para configurações
  };

  const handleLogoutPress = async () => {
    try {
      // Remover os dados armazenados no AsyncStorage
      await AsyncStorage.removeItem("userId");
      await AsyncStorage.removeItem("name");
      await AsyncStorage.removeItem("locality");

      // Navegar para a tela de Login (ou a tela inicial)
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }], // Substitua 'Login' pelo nome da sua tela de login
      });

      console.log("Logout realizado com sucesso");
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
    }
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
          <TouchableOpacity onPress={handleLogoutPress}>
            <Icon
              name="logout"
              size={40}
              color="#FFFFFF"
              style={styles.icon2}
            />
          </TouchableOpacity>
        </LinearGradient>
        {/* <View style={styles.card}>
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
        </View> */}
        <View style={styles.card}>
          <Icon
            name="search"
            size={24}
            color="#FFFFFF"
            style={styles.cardIcon}
          />
          <Text style={styles.cardTitle}>CADASTRAR PESQUISA</Text>
          <Text style={styles.cardDescription}>
            Cadastre sua pesquisa, e visualize os resultados de forma
            inteligente.
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleSearchPress}>
            <Text style={styles.buttonText}>CLIQUE AQUI</Text>
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
            Acesse os resultados das suas pesquisas cadastradas.
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleResultPress}>
            <Text style={styles.buttonText}>CLIQUE AQUI</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomePage;
