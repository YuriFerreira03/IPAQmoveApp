import * as React from "react";
import axios from "axios";
import { TextInput } from "react-native-paper";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/SearchScreen";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation, NavigationProp, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../app";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type SearchScreenRouteProp = RouteProp<RootStackParamList, 'SearchScreen'>;

const SearchScreen: React.FC<{ route: SearchScreenRouteProp }> = ({ route }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { userName } = route.params; // Recebe o parâmetro userName

  const [searchName, setSearchName] = React.useState("");
  const [researcherName, setResearcherName] = React.useState(userName);
  const [location, setLocation] = React.useState("");

  const handleRegister = async () => {
    try {
      console.log("Iniciando cadastro de pesquisa...");
      const ip = "192.168.1.231"; // Endereço IP da sua máquina
      const url = `http://${ip}:8080/pesquisa`;
      console.log("URL de requisição:", url);
      console.log("Enviando dados para o backend:", {
        nome_pesquisa: searchName,
      });

      const response = await axios.post(
        url,
        {
          nome_pesquisa: searchName,
        },
        {
          timeout: 10000, // 10 segundos de tempo limite
        }
      );

      console.log("Resposta do backend:", response.data);
      Alert.alert("Sucesso", "Pesquisa cadastrada com sucesso!");
      setSearchName("");
    } catch (error) {
      console.error("Erro ao cadastrar pesquisa:", error);
      Alert.alert("Erro", "Não foi possível cadastrar a pesquisa.");
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={20}
    >
      <LinearGradient colors={["#032D45", "#0A4E66"]} style={styles.container}>
        <LinearGradient colors={["#0A4E66", "#14E2C3"]} style={styles.header}>
          <View style={styles.textContainer}>
            <Text style={styles.greeting}>
              Olá, <Text style={styles.userName}>{researcherName}</Text>
            </Text>
            <Text style={styles.location}>Cataguases, MG</Text>
          </View>
          <Icon name="person" size={60} color="#FFFFFF" style={styles.icon} />
        </LinearGradient>

        <Text style={styles.texthead}>CADASTRAR PESQUISA</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome da Pesquisa:"
          placeholderTextColor="#b3b3b3"
          textColor="#FFFFFF"
          value={searchName}
          onChangeText={setSearchName}
        />
        <TextInput
          style={styles.input}
          placeholder="Nome do Pesquisador:"
          placeholderTextColor="#b3b3b3"
          textColor="#FFFFFF"
          value={userName}
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Localização:"
          placeholderTextColor="#b3b3b3"
          textColor="#FFFFFF"
          value={location}
          onChangeText={setLocation}
        />
        <TextInput
          style={styles.input}
          placeholder="Instituição:"
          placeholderTextColor="#b3b3b3"
          textColor="#FFFFFF"
        />

        <TouchableOpacity style={styles.buttonSearch} onPress={handleRegister}>
          <Text style={styles.textButtonSearch}>CADASTRAR</Text>
        </TouchableOpacity>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default SearchScreen;
