import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Checkbox from "expo-checkbox";
import CustomStepper from "../Components/CustomStepper";
import Button from "../Components/Button";
import styles from "../../styles/Tela_2";

const Tela2 = () => {
  const [isChecked, setChecked] = React.useState(false);
  const steps = ["1", "2", "3", "4", "5"];
  const activeStep = 0;
  return (
    <LinearGradient colors={["#032D45", "#0A4E66"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>SEÇÃO 1</Text>
        <CustomStepper steps={steps} activeStep={activeStep} />
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Atualmente você trabalha, estuda ou faz trabalho voluntário fora de
            sua casa?
          </Text>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? "#14E2C3" : undefined}
            />
            <Text style={styles.label}>SIM</Text>
            <Checkbox
              value={!isChecked}
              onValueChange={() => setChecked(!isChecked)}
              color={!isChecked ? "#14E2C3" : undefined}
            />
            <Text style={styles.label}>NÃO</Text>
          </View>
        </View>
        <Text style={styles.body}>
          As próximas questões são em relação a toda a atividade física que você
          fez na ultima semana como parte do seu trabalho remunerado ou não
          remunerado e/ou do seu estudo.
          {"           "}
          <Text style={styles.nao}>NÃO</Text> inclua o transporte para o
          trabalho. Pense unicamente nas atividades que você faz por
          {" "}
          <Text style={styles.nao}>pelo menos 10 MINUTOS CONTÍNUOS:</Text>
        </Text>
        <Button />
      </ScrollView>
    </LinearGradient>
  );
};

export default Tela2;
