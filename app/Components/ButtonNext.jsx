import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { scale, verticalScale } from "react-native-size-matters";

export const ButtonNext = ({onPress}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.button3} onPress={onPress}>
      <Icon name="chevron-right" size={30} color="#032D45" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button3: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(-20),
    marginBottom: verticalScale(40),
    marginLeft: scale(200),
  },
});
