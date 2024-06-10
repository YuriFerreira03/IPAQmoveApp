import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "../../styles/Tela_1";


const Tela1 = () => {

  const navigation = useNavigation();

  return (
    <LinearGradient colors={["#032D45", "#0A4E66"]} style={styles.container}>
      <ScrollView>
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
        <Text style={styles.body}>
          Esta seção inclui as atividades que você faz no seu serviço, que
          incluem trabalho remunerado ou voluntário, as atividades na escola ou
          faculdade e outro tipo de trabalho não remunerado fora da sua casa.
          {"            "}
          <Text style={styles.nao}>NÃO</Text>
          {" "}
          <Text style={styles.body2}>
            incluir trabalho não remunerado que você faz na sua casa como
            tarefas domésticas, cuidar do jardim e da casa ou tomar conta da sua
            família. Estas serão incluídas na <Text style={styles.nao}>SEÇÃO 3.</Text>
          </Text>
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Tela2')}
        >
          <Icon name="chevron-right" size={30} color="#032D45" />
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

export default Tela1;
