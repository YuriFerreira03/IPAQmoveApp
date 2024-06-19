import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView, Switch } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "../styles/HomePageVisitante";
import { useNavigation, NavigationProp, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../app'; 

type HomePageRouteProp = RouteProp<RootStackParamList, 'Home'>;

type HomePageProps = {
  route: HomePageRouteProp;
};

const HomePageVisitante: React.FC<HomePageProps> = ({ route }) => {
  
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  // const { userName } = route.params;

  const handleAccessPress = () => {
    navigation.navigate('InicioPerguntasGerais');
  };

  return (
    <LinearGradient colors={["#032D45", "#0A4E66"]} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <LinearGradient colors={["#0A4E66", "#14E2C3"]} style={styles.header}>
          <View style={styles.textContainer}>
            <Text style={styles.greeting}>Olá, <Text style={styles.userName}>Yuri</Text></Text>
            <Text style={styles.location}>Cataguases, MG</Text>
          </View>
          <Icon name="person" size={60} color="#FFFFFF" style={styles.icon} />
        </LinearGradient>
        <View style={styles.card}>
          <Icon name="favorite" size={24} color="#FFFFFF" style={styles.cardIcon} />
          <Text style={styles.cardTitle}>SAÚDE AO SEU ALCANCE</Text>
          <Text style={styles.cardDescription}>
            Descubra mais sobre seu bem-estar com o questionário IPAQ. Rápido,
            fácil e adaptado para você.
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleAccessPress}>
            <Text style={styles.buttonText}>ACESSAR</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <Icon name="assessment" size={24} color="#FFFFFF" style={styles.cardIcon} />
          <Text style={styles.cardTitle}>VISUALIZAR RESULTADOS</Text>
          <Text style={styles.cardDescription}>
            Acompanhe seu progresso na jornada para um estilo de vida mais
            ativo. Veja seus resultados.
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>ACESSAR</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomePageVisitante;
