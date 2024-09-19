import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "../styles/Resultados";

const Resultado: React.FC = () => {
  const handleDownloadPDF = () => {
    // adicionar a lógica para baixar ou abrir o PDF, por enquanto vamos usar um link de exemplo
    Linking.openURL("https://example.com/seu-relatorio.pdf");
  };

  const handleAccessProFeatures = () => {
    // Navegação para mais recursos ou funcionalidades PRO
  };

  return (
    <LinearGradient colors={["#032D45", "#0A4E66"]} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>RESULTADOS:</Text>

          {/* Botão para visualizar em PDF */}
          <TouchableOpacity
            style={styles.pdfButton}
            onPress={handleDownloadPDF}
          >
            <Icon name="picture-as-pdf" size={24} color="#FFFFFF" />
            <Text style={styles.pdfButtonText}>VISUALIZAR RESULTADOS EM PDF</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Resultado;
