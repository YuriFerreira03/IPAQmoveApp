import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { View, Text } from "react-native";
import styles from "../../styles/ScreensExpli";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/EvilIcons";

const ScreenExpli1 = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient colors={["#032D45", "#0A4E66"]} style={styles.container}>
      <Icon2 name="clock" size={100} color="white" style={styles.clock} />

      <Text style={styles.textXII}>
        As perguntas estão relacionadas ao tempo que você gasta fazendo
        atividade física em uma semana típica, na
      </Text>
      <View style={styles.view3}>
        <Text style={styles.textXIII}>ÚLTIMA</Text>
      </View>
      <Text style={styles.textXIII}>SEMANA</Text>
      <View style={styles.line}></View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ScreenExpli2")}
      >
        <Icon name="chevron-right" size={30} color="#032D45" />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default ScreenExpli1;
