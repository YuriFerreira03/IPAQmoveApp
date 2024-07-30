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
import Tela1S2 from "./Session_2/Tela1S2";
import InicioPerguntasGerais from "./PerguntasGerais/InicioPerguntasGerais";
import TelaLocalizacao from "./PerguntasGerais/TelaLocalizacao";
import InformacoesProjeto from "./PerguntasGerais/InformacoesProjeto";
import ScreenExpli1 from "./PerguntasGerais/ScreenExpli1";
import ScreenExpli2 from "./PerguntasGerais/ScreenExpli2";
import ScreenExpli3 from "./PerguntasGerais/ScreenExpli3";
import ScreenExpli4 from "./PerguntasGerais/ScreenExpli4";
import GeneralQuestionsScreen from "./PerguntasGerais/GeneralQuestionsScreen";

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
            <Stack.Screen
              name="InicioPerguntasGerais"
              component={InicioPerguntasGerais}
            />
            <Stack.Screen name="TelaLocalizacao" component={TelaLocalizacao} />
            <Stack.Screen
              name="InformacoesProjeto"
              component={InformacoesProjeto}
            />
            <Stack.Screen name="ScreenExpli1" component={ScreenExpli1} />
            <Stack.Screen name="ScreenExpli2" component={ScreenExpli2} />
            <Stack.Screen name="ScreenExpli3" component={ScreenExpli3} />
            <Stack.Screen name="ScreenExpli4" component={ScreenExpli4} />
            <Stack.Screen
              name="GeneralQuestionsScreen"
              component={GeneralQuestionsScreen}
            />
            <Stack.Screen name="Splach" component={SplachScreen} />
            <Stack.Screen name="Tela1" component={Tela1} />
            <Stack.Screen name="Tela2" component={Tela2} />
            <Stack.Screen name="Tela1S2" component={Tela1S2} />
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
