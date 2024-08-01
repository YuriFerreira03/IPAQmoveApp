import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';

const Button = ({ icon, onPress }) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("Tela2")} //esse onpress precisa sair para que ele possa ser utilizado em outros lugares
    >
      <Icon name="chevron-right" size={30} color="#032D45" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -4, 
    marginBottom: 30, 
    marginLeft: 300, 
  },
});

export default Button;
