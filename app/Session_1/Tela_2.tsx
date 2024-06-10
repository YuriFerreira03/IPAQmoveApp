import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Checkbox from "expo-checkbox";
import styles from "../../styles/Tela_2";

const Tela2 = () => {
  const [isChecked, setChecked] = React.useState(false);

  return (
    <LinearGradient colors={["#032D45", "#0A4E66"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>SEÇÃO 1</Text>
        <View style={styles.stepper}>
          {["1", "2", "3", "4", "5"].map((label, index) => (
            <View key={index} style={styles.stepContainer}>
              <View style={[styles.circle, index === 0 && styles.activeCircle]}>
                <Text
                  style={[
                    styles.stepLabel,
                    index === 0 && styles.activeStepLabel,
                  ]}
                >
                  {label}
                </Text>
              </View>
              {index < 4 && (
                <View style={[styles.line, index === 0 && styles.activeLine]} />
              )}
            </View>
          ))}
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Você trabalha de forma remunerada ou voluntária:
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
          fez na última semana você fez na última semana como parte seu trabalho
          remunerado ou não remunerado e/ou do seu estudo. NÃO inclua o
          transporte para o trabalho. Pense unicamente nas atividades que você
          faz por pelo menos 10 MINUTOS CONTÍNUOS:
        </Text>
      </ScrollView>
    </LinearGradient>
  );
};

export default Tela2;
