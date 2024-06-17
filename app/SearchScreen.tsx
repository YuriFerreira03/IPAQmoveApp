import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/SearchScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../app';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SearchScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [searchName, setSearchName] = React.useState('');
  const [researcherName, setResearcherName] = React.useState('');
  const [location, setLocation] = React.useState('');

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={20}
    >
      <LinearGradient colors={['#032D45', '#0A4E66']} style={styles.container}>
        <LinearGradient colors={['#0A4E66', '#14E2C3']} style={styles.header}>
          <View style={styles.textContainer}>
            <Text style={styles.greeting}>
              Olá, <Text style={styles.userName}>Yuri</Text>
            </Text>
            <Text style={styles.location}>Cataguases, MG</Text>
          </View>
          <Icon name="person" size={60} color="#FFFFFF" style={styles.icon} />
        </LinearGradient>

        <Text style={styles.texthead}>CADASTRAR PESQUISA</Text>

        <TextInput
          style={styles.textbox}
          label="Nome da pesquisa:"
          value={searchName}
          mode="outlined"
          onChangeText={text => setSearchName(text)}
          theme={{ colors: { primary: '#14E2C3', text: '#FFFFFF', placeholder: '#FFFFF' } }}
          underlineColor="#FFFFF"
          outlineColor="#FFFFFF"
        />

        <TextInput
          style={styles.textbox}
          label="Nome do pesquisador:"
          value={researcherName}
          mode="outlined"
          onChangeText={text => setResearcherName(text)}
          theme={{ colors: { primary: '#14E2C3', text: '#FFFFFF', placeholder: '#FFFFF' } }}
          underlineColor="#FFFFF"
          outlineColor="#FFFFFF"
        />

        <TextInput
          style={styles.textbox}
          label="Localização:"
          value={location}
          mode="outlined"
          onChangeText={text => setLocation(text)}
          theme={{ colors: { primary: '#14E2C3', text: '#FFFFFF', placeholder: '#FFFFF' } }}
          underlineColor="#FFFFF"
          outlineColor="#FFFFFF"
        />

        <TouchableOpacity style={styles.buttonSearch}>
          <Text style={styles.textButtonSearch}>CADASTRAR</Text>
        </TouchableOpacity>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default SearchScreen;