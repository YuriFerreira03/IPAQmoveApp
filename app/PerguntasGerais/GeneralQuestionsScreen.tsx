import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Checkbox from "expo-checkbox";
import styles from "../../styles/GeneralQuestionsScreen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import { TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons';


const GeneralQuestionsScreen = () => {
  const [isChecked, setChecked] = React.useState(false);
  const [name, Name] = React.useState("");
  const [age, Age] = React.useState("");
  const [gender, Gender] = React.useState("");
  const [estatura, Estatura] = React.useState("");
  const [peso, Peso] = React.useState("");
  const navigation = useNavigation();


  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={20}
    >
      <LinearGradient colors={["#032D45", "#14E2C3"]} style={styles.container}>
        <TextInput
          style={styles.textbox}
          label="Nome: "
          value={name}
          mode="outlined"
          onChangeText={(text) => Name(text)}
          theme={{
            colors: {
              primary: "#FFFFF",
              text: "#FFFFFF",
              placeholder: "#FFFFF",
            },
          }}
          underlineColor="#FFFFF"
          outlineColor="#FFFFFF"
        />

        <TextInput
          style={styles.textboxI}
          label="Idade: "
          value={age}
          mode="outlined"
          onChangeText={(text) => Age(text)}
          theme={{
            colors: {
              primary: "#FFFFF",
              text: "#FFFFFF",
              placeholder: "#FFFFF",
            },
          }}
          underlineColor="#FFFFF"
          outlineColor="#FFFFFF"
        />

        <TextInput
          style={styles.textbox}
          label="Sexo: "
          value={gender}
          mode="outlined"
          onChangeText={(text) => Gender(text)}
          theme={{
            colors: {
              primary: "#FFFFF",
              text: "#FFFFFF",
              placeholder: "#FFFFF",
            },
          }}
          underlineColor="#FFFFF"
          outlineColor="#FFFFFF"
        />

        <TextInput
          style={styles.textboxII}
          label="Estatura: "
          value={estatura}
          mode="outlined"
          onChangeText={(text) => Estatura(text)}
          theme={{
            colors: {
              primary: "#FFFFF",
              text: "#FFFFFF",
              placeholder: "#FFFFF",
            },
          }}
          underlineColor="#FFFFF"
          outlineColor="#FFFFFF"
        />

        <TextInput
          style={styles.textboxIII}
          label="Peso: "
          value={peso}
          mode="outlined"
          onChangeText={(text) => Peso(text)}
          theme={{
            colors: {
              primary: "#FFFFF",
              text: "#FFFFFF",
              placeholder: "#FFFFF",
            },
          }}
          underlineColor="#FFFFF"
          outlineColor="#FFFFFF"
        />

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

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Quantas horas você trabalha por dia:
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Quantas horas você dorme por dia:
          </Text>
        </View>
        <TouchableOpacity
                style={styles.button3}
                onPress={() => navigation.navigate("Splach")}
            >
                <Icon name="chevron-right" size={30} color="#032D45" />
            </TouchableOpacity>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default GeneralQuestionsScreen;
