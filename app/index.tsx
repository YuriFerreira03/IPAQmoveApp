import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar, SafeAreaView, StyleSheet, View } from "react-native";
import HomePage from "./HomePagePesquisador";
import LoginScreen from "./LoginScreen";
import SearchScreen from "./SearchScreen"; //importando a tela
import HomePageVisitante from "./HomePageVisitante"; //importando a home page sem possibilidade de cadastrar uma pesquisa
import Login1 from "./LoginPesquisador";
import Login2 from "./LoginVisitante";
import Resultados from "./Resultados";

import SplachScreen from "./Session_1/SplachScreen";
import SplashScreen2 from "./Session_2/SplashScreen2";
import SplashScreen3 from "./Session_3/SplashScreen3";
import SplashScreen4 from "./Session_4/SplachScreen4";
import SplashScreen5 from "./Session_5/SplachScreen5";


import Tela1 from "./Session_1/Tela_1";
import Tela2 from "./Session_1/Tela_2";
import Tela3 from "./Session_1/Tela_3";
import Tela4 from "./Session_1/Tela_4";
import Tela5 from "./Session_1/Tela_5";
import Tela6 from "./Session_1/Tela_6";
import Tela7 from "./Session_1/Tela_7";


import Tela1_2 from "./Session_2/Tela1_2";
import Tela2_2 from "./Session_2/Tela2_2";
import Tela3_2 from "./Session_2/Tela3_2";
import Tela4_2 from "./Session_2/Tela4_2";
import Tela5_2 from "./Session_2/Tela5_2";
import Tela6_2 from "./Session_2/Tela6_2";

import Tela1_3 from "./Session_3/Tela1_3";
import Tela2_3 from "./Session_3/Tela2_3";
import Tela3_3 from "./Session_3/Tela3_3";
import Tela4_3 from "./Session_3/Tela4_3";

import Tela1_4 from "./Session_4/Tela1_4";
import Tela2_4 from "./Session_4/Tela2_4";
import Tela3_4 from "./Session_4/Tela3_4";
import Tela4_4 from "./Session_4/Tela4_4";
import Tela5_4 from "./Session_4/Tela5_4";
import Tela6_4 from "./Session_4/Tela6_4";

import Tela1_5 from "./Session_5/Tela1_5";
import Tela2_5 from "./Session_5/Tela2_5";




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
  TelaLocalizacao: undefined;
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
            <Stack.Screen name="Login1" component={Login1} />
            <Stack.Screen name="Login2" component={Login2} />
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="HomeVisitante" component={HomePageVisitante} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Resultados" component={Resultados} />
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
            <Stack.Screen name="Tela3" component={Tela3} />
            <Stack.Screen name="Tela4" component={Tela4} />
            <Stack.Screen name="Tela5" component={Tela5} />
            <Stack.Screen name="Tela6" component={Tela6} />
            <Stack.Screen name="Tela7" component={Tela7} />

            <Stack.Screen name="Splash2" component={SplashScreen2} />
            <Stack.Screen name="Tela1_2" component={Tela1_2} />
            <Stack.Screen name="Tela2_2" component={Tela2_2} />
            <Stack.Screen name="Tela3_2" component={Tela3_2} />
            <Stack.Screen name="Tela4_2" component={Tela4_2} />
            <Stack.Screen name="Tela5_2" component={Tela5_2} />
            <Stack.Screen name="Tela6_2" component={Tela6_2} />

            <Stack.Screen name="Splash3" component={SplashScreen3} />
            <Stack.Screen name="Tela1_3" component={Tela1_3} />
            <Stack.Screen name="Tela2_3" component={Tela2_3} />
            <Stack.Screen name="Tela3_3" component={Tela3_3} />
            <Stack.Screen name="Tela4_3" component={Tela4_3} />

            <Stack.Screen name="Splach4" component={SplashScreen4} />
            <Stack.Screen name="Tela1_4" component={Tela1_4} />
            <Stack.Screen name="Tela2_4" component={Tela2_4} />
            <Stack.Screen name="Tela3_4" component={Tela3_4} />
            <Stack.Screen name="Tela4_4" component={Tela4_4} />
            <Stack.Screen name="Tela5_4" component={Tela5_4} />
            <Stack.Screen name="Tela6_4" component={Tela6_4} />

            <Stack.Screen name="Splach5" component={SplashScreen5} />
            <Stack.Screen name="Tela1_5" component={Tela1_5} />
            <Stack.Screen name="Tela2_5" component={Tela2_5} />

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
