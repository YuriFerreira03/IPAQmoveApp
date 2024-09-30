import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import styles from "../styles/LoginStyles";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "./index";
import Dialog from "react-native-dialog";
import axios from "axios";
import getIp from "../app/getIp";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(true); //ligado, por padrão, no visitante
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [locality, setLocality] = useState("");

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleToggleSwitch = () => {
    setIsSwitchOn((previousState) => !previousState);
  };

  const handleLoginPress1 = () => {
    navigation.navigate("Login1");
  };

  const handleLoginPress2 = () => {
    navigation.navigate("Login2");
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={isSwitchOn ? ["#032D45", "#14E2C3"] : ["#14E2C3", "#032D45"]}
        style={styles.gradient}
      >
        <Image
          source={require("../images/logo.png")}
          style={styles.imageStyle}
        />
        <Text style={styles.textStyle}>Seja bem-vindo ao</Text>
        <Text style={styles.textStyleII}>
          <Text style={{ color: "#082D47" }}>IPAQ</Text>
          <Text style={{ color: "#15E2C3" }}>move</Text>
        </Text>

        {isSwitchOn ? (
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleLoginPress2} //visitante
          >
            <Text style={styles.googleButtonText}>Entrar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleLoginPress1} //pesquisador
          >
            <Text style={styles.googleButtonText}>Entrar</Text>
          </TouchableOpacity>
        )}

        <View style={styles.switchContainer}>
          <Text
            style={[
              styles.switchLabel,
              { color: isSwitchOn ? "#00263E" : "#fff" },
            ]}
          >
            Pesquisador
          </Text>
          <Switch
            style={styles.switchStyle}
            value={isSwitchOn}
            onValueChange={handleToggleSwitch}
            trackColor={{ false: "#14E2C3", true: "#00263E" }}
            thumbColor={isSwitchOn ? "#14E2C3" : "#00263E"}
          />
          <Text
            style={[
              styles.switchLabel,
              { color: isSwitchOn ? "#00263E" : "#fff" },
            ]}
          >
            Visitante
          </Text>
        </View>

        <TouchableOpacity style={styles.termsContainer}>
          <FontAwesome
            name="file-text-o"
            size={30}
            color={isSwitchOn ? "#00263E" : "#fff"}
          />
          <Text
            style={[
              styles.termsText,
              { color: isSwitchOn ? "#00263E" : "#fff" },
            ]}
          >
            Termos de Uso
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default LoginScreen;
