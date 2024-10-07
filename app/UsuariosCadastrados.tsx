import React, { useState, useEffect } from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";
import axios from "axios";
import styles from "../styles/UsuariosCadastrados";
import getIp from "./getIp";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";

const UsuariosCadastrados: React.FC<{ route: any }> = ({ route }) => {
  const { pesquisaNome } = route.params; // Use 'pesquisaNome' ao invés de 'nome_pesq'
  console.log("Nome da pesquisa selecionada:", pesquisaNome); // Verifique o valor de nome_pesq
  const [usuarios, setUsuarios] = useState<any[]>([]);

  const fetchProjetosVinculados = async () => {
    try {
      const ip = getIp();
      const url = `http://${ip}:8080/usuarios-pesquisa/${pesquisaNome}`;
      const urlIMC = `http://${ip}:8080/respostaIMC`;
      const urlClassificacao = `http://${ip}:8080/classificacao`;
      const urlDuracaoModerada = `http://${ip}:8080/respostaDuracaoModerada`;
      const urlDuracaovigorosa = `http://${ip}:8080/respostaDuracaoVigorosa`;
      const urlDuracaoCaminhada = `http://${ip}:8080/respostaDuracaoMedia`;
      const urlFreqModCam = `http://${ip}:8080/respostaFreqModCam`;
      const urlDurModCam = `http://${ip}:8080/respostaDurModCam`;

      // Fazendo as requisições
      const [
        response,
        responseIMC,
        responseClassificacao,
        responseDuracaoModerada,
        responseDuracaoVigorosa,
        responseDuracaoCaminhada,
        responseFreqModCam,
        responseDurModCam,
      ] = await Promise.all([
        axios.get(url),
        axios.get(urlIMC),
        axios.get(urlClassificacao),
        axios.get(urlDuracaoModerada),
        axios.get(urlDuracaovigorosa),
        axios.get(urlDuracaoCaminhada),
        axios.get(urlFreqModCam),
        axios.get(urlDurModCam),
      ]);

      console.log("Projetos vinculados:", response.data);
      console.log("Dados IMC:", responseIMC.data);
      console.log("Dados Classificação:", responseClassificacao.data);
      console.log("Dados Duracao Moderada:", responseDuracaoModerada.data);
      console.log("Dados Duracao Vigorosa:", responseDuracaoVigorosa.data);
      console.log("Dados Duracao Caminhada:", responseDuracaoCaminhada.data);
      console.log("Dados Freq Mod Cam:", responseFreqModCam.data);
      console.log("Dados Dur Mod Cam:", responseDurModCam.data);

      // Mesclando dados de IMC e classificações aos usuários
      const usuariosComIMCClassificacao = response.data.map((usuario) => {
        const imcData = responseIMC.data.find(
          (imc) => imc.id === usuario.id_usuario
        );
        const duracaoModerada = responseDuracaoModerada.data.find(
          (duracao) => duracao.id === usuario.id_usuario
        );
        const duracaoVigorosa = responseDuracaoVigorosa.data.find(
          (vigorosa) => vigorosa.id === usuario.id_usuario
        );
        const duracaoCaminhada = responseDuracaoCaminhada.data.find(
          (caminhada) => caminhada.id === usuario.id_usuario
        );
        const freqModCam = responseFreqModCam.data.find(
          (freq) => freq.id === usuario.id_usuario
        );
        const mediaDuracaoModCam = Array.isArray(responseDurModCam.data)
          ? responseDurModCam.data.find(
              (durModCam) => Number(durModCam.id) === Number(usuario.id_usuario)
            )?.mediaDuracaoMediaModCam
          : undefined;

        const classificacao = responseClassificacao.data.find(
          (classif) => classif.id === usuario.id_usuario
        );

        return {
          ...usuario,
          ...imcData,
          duracaoModerada: duracaoModerada?.mediaModeradaDuracaoMedia,
          duracaoVigorosa: duracaoVigorosa?.mediaVigorosaDuracaoMedia,
          duracaoCaminhada: duracaoCaminhada?.mediaCaminhadaDuracaoMedia,
          freqModCam: freqModCam?.mediaFrequenciaMediaModCam,
          durModCam: mediaDuracaoModCam,
          classificacao: classificacao?.mensagem,
        };
      });

      setUsuarios(usuariosComIMCClassificacao); // Armazena os dados combinados de usuários
    } catch (error) {
      console.error("Erro ao buscar projetos vinculados ou IMC:", error);
    }
  };

  // Chamando a função correta dentro do useEffect
  useEffect(() => {
    fetchProjetosVinculados(); // Corrigido: chamada da função correta
  }, []);

  const renderUsuario = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.nome || "Nome desconhecido"}</Text>
      <Text style={styles.cardDescription}>
        Sexo: {item.sexo || "Não informado"}
      </Text>
      <Text style={styles.cardDescription}>
        Idade: {item.idade ? `${item.idade} anos` : "Não informada"}
      </Text>
      <Text style={styles.cardDescription}>
        Peso:{" "}
        {item.peso ? `${parseFloat(item.peso).toFixed(1)} kg` : "Não informado"}
      </Text>
      <Text style={styles.cardDescription}>
        Estatura:{" "}
        {item.estatura
          ? `${parseFloat(item.estatura).toFixed(2)} m`
          : "Não informada"}
      </Text>
      <Text style={styles.cardDescription}>
        IMC: {item.imc ? item.imc.toString() : "Não calculado"}
      </Text>
      <Text style={styles.cardDescription}>
        Duração Média Vigorosa:{" "}
        {item.duracaoVigorosa ? `${item.duracaoVigorosa} minutos` : "0"}
      </Text>
      <Text style={styles.cardDescription}>
        Duração Média Moderada:{" "}
        {item.duracaoModerada ? `${item.duracaoModerada} minutos` : "0"}
      </Text>
      <Text style={styles.cardDescription}>
        Duração Média Caminhada:{" "}
        {item.duracaoCaminhada ? `${item.duracaoCaminhada} minutos` : "0"}
      </Text>
      <Text style={styles.cardDescription}>
        Frequência Moderada Caminhada:{" "}
        {item.freqModCam && item.freqModCam !== 0
          ? `${item.freqModCam} vezes`
          : "Não informada"}
      </Text>
      <Text style={styles.cardDescription}>
        Duração Moderada Caminhada:{" "}
        {item.durModCam && item.durModCam !== 0
          ? `${item.durModCam} minutos`
          : "Não informada"}
      </Text>
      <Text style={styles.cardDescription}>
        Classificação: {item.classificacao || "Não classificado"}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>PARTICIPANTES DO PROJETO</Text>
      {/* Botão para Visualizar Resultados em PDF */}
      <TouchableOpacity style={styles.pdfButton} onPress={() => {}}>
        <Icon name="picture-as-pdf" size={30} color="#FFFFFF" />
        <Text style={styles.pdfButtonText}>VISUALIZAR TODOS EM PDF</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <FlatList
          data={usuarios}
          renderItem={renderUsuario}
          keyExtractor={(item) =>
            item.id_usuario?.toString() || Math.random().toString()
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default UsuariosCadastrados;
