import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import CustomStepper from "../Components/CustomStepper";
import Button from "../Components/Button";
import styles from "../../styles/Tela_1";

const Tela1 = () => {
  const [isChecked, setChecked] = React.useState(false);
  const steps = ["1", "2", "3", "4", "5"];
  const activeStep = 0;

  const navigation = useNavigation();

  return (
    <LinearGradient colors={["#032D45", "#0A4E66"]} style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>SEÇÃO 1</Text>
        <CustomStepper steps={steps} activeStep={activeStep} />
        <Text style={styles.body}>
          Esta seção inclui as atividades que você faz no seu serviço, que
          incluem trabalho remunerado ou voluntário, as atividades na escola ou
          faculdade e outro tipo de trabalho não remunerado fora da sua casa.
          {"            "}
          <Text style={styles.nao}>NÃO</Text>{" "}
          <Text style={styles.body2}>
            incluir trabalho não remunerado que você faz na sua casa como
            tarefas domésticas, cuidar do jardim e da casa ou tomar conta da sua
            família. Estas serão incluídas na{" "}
            <Text style={styles.nao}>SEÇÃO 3.</Text>
          </Text>
        </Text>
        <Button/>
      </ScrollView>
    </LinearGradient>
  );
};

export default Tela1;
