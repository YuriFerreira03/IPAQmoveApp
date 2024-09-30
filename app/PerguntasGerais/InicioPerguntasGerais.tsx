import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../../styles/InicioPerguntasGerais";
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

const InicioPerguntasGerais: React.FC<HomePageProps> = ({ route }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [userId, setUserId] = useState<string | null>("");
  const [userName, setName] = useState<string | null>("");
  const [userLocality, setLocality] = useState<string | null>("");

  async function getDataFromStorage() {
    setUserId(await AsyncStorage.getItem("userId"));
    setName(await AsyncStorage.getItem("name"));
    setLocality(await AsyncStorage.getItem("locality"));
  }

  useEffect(() => {
    getDataFromStorage();
  }, []);

  const handlePress = () => {
    navigation.navigate("TelaLocalizacao", { userName, userLocality });
  };

  return (
    <LinearGradient colors={["#032D45", "#0A4E66"]} style={styles.gradient}>
      <Image
        source={require("../../images/logo.png")}
        style={styles.imageStyle}
      />
      <Text style={styles.textIPAQ}>IPAQ</Text>
      <View style={styles.underline} />
      <Text style={styles.textSubtitle}>
        Questionário Internacional de Atividade Física
      </Text>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>COMEÇAR</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default InicioPerguntasGerais;
