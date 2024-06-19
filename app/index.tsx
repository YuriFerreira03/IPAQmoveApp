import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar, SafeAreaView, StyleSheet, View } from "react-native";
import HomePage from "./HomePage";
import LoginScreen from "./LoginScreen";
import SearchScreen from "./SearchScreen"; //importando a tela 
import HomePageVisitante from "./HomePageVisitante"; //importando a home page sem possibilidade de cadastrar uma pesquisa
import SplachScreen from "./Session_1/SplachScreen";
import Tela1 from "./Session_1/Tela_1";
import Tela2 from "./Session_1/Tela_2";
import InicioPerguntasGerais from "./PerguntasGerais/InicioPerguntasGerais"
import Tela_1 from "./PerguntasGerais/TelaLocalizacao";
import TelaLocalizacao from "./PerguntasGerais/TelaLocalizacao";
import InformacoesProjeto from "./PerguntasGerais/InformacoesProjeto";
import TelaTexto from "./PerguntasGerais/TelaTexto";
//teste branch 

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  SearchScreen: undefined;
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <NavigationContainer independent>
        <SafeAreaView style={styles.safeArea}>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: "transparent" },
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="HomeVisitante" component={HomePageVisitante} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="InicioPerguntasGerais" component={InicioPerguntasGerais} />
            <Stack.Screen name="TelaLocalizacao" component={TelaLocalizacao} />
            <Stack.Screen name="InformacoesProjeto" component={InformacoesProjeto} />
            <Stack.Screen name="TelaTexto" component={TelaTexto} />
            <Stack.Screen name="Splach" component={SplachScreen} />
            <Stack.Screen name="Tela1" component={Tela1} />
            <Stack.Screen name="Tela2" component={Tela2} />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
  },
  safeArea: {
    flex: 1,
    margin: 0,
    padding: 100,
    marginTop: -48,
    marginBottom: -40,
  },
});
