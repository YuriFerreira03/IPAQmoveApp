import React, { useState, useEffect } from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";
import axios from "axios";
import styles from "../styles/UsuariosCadastrados";
import getIp from "./getIp";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import { api } from "@/api/api";
import XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Alert } from "react-native";

const UsuariosCadastrados: React.FC<{ route: any }> = ({ route }) => {
  const { pesquisaNome } = route.params; // Use 'pesquisaNome' ao invés de 'nome_pesq'
  console.log("Nome da pesquisa selecionada:", pesquisaNome); // Verifique o valor de nome_pesq
  const [usuarios, setUsuarios] = useState<any[]>([]);

  const exportToExcel = async () => {
    try {
      // Converte os dados dos usuários para formato de planilha
      const worksheet = XLSX.utils.json_to_sheet(
        usuarios.map((usuario) => ({
          Nome: usuario.nome || "Desconhecido",
          Sexo: usuario.sexo || "Não informado",
          Idade: usuario.idade || "Não informada",
          Peso: usuario.peso
            ? `${parseFloat(usuario.peso).toFixed(1)} kg`
            : "Não informado",
          Estatura: usuario.estatura
            ? `${parseFloat(usuario.estatura).toFixed(2)} m`
            : "Não informada",
          IMC: usuario.imc || "Não calculado",
          "Duração Vigorosa": usuario.duracaoVigorosa || "0 minutos",
          "Duração Moderada": usuario.duracaoModerada || "0 minutos",
          "Duração Caminhada": usuario.duracaoCaminhada || "0 minutos",
          "Freq. Mod. Caminhada": usuario.freqModCam || "Não informada",
          "Dur. Mod. Caminhada": usuario.durModCam || "Não informada",
          Classificação: usuario.classificacao || "Não classificado",
        }))
      );

      // Cria a planilha
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Participantes");

      // Gera o arquivo Excel em base64
      const excelOutput = XLSX.write(workbook, {
        type: "base64",
        bookType: "xlsx",
      });
      const path = `${FileSystem.documentDirectory}Participantes_${pesquisaNome}.xlsx`;

      // Salva o arquivo localmente
      await FileSystem.writeAsStringAsync(path, excelOutput, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Compartilha o arquivo
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(path);
        Alert.alert("Sucesso", "Arquivo exportado com sucesso!");
      } else {
        Alert.alert("Sucesso", `Arquivo salvo em: ${path}`);
      }
    } catch (error) {
      console.error("Erro ao exportar para Excel:", error);
      Alert.alert("Erro", "Não foi possível exportar os dados.");
    }
  };

  const fetchProjetosVinculados = async () => {
    try {
      const ip = getIp();
      const url = `/usuarios-pesquisa/${pesquisaNome}`;
      const urlIMC = `/respostaIMC`;
      const urlClassificacao = `/classificacao`;
      const urlDuracaoModerada = `/respostaDuracaoModerada`;
      const urlDuracaovigorosa = `/respostaDuracaoVigorosa`;
      const urlDuracaoCaminhada = `/respostaDuracaoMedia`;
      const urlFreqModCam = `/respostaFreqModCam`;
      const urlDurModCam = `/respostaDurModCam`;

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
        api.get(url),
        api.get(urlIMC),
        api.get(urlClassificacao),
        api.get(urlDuracaoModerada),
        api.get(urlDuracaovigorosa),
        api.get(urlDuracaoCaminhada),
        api.get(urlFreqModCam),
        api.get(urlDurModCam),
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
      {/* Botão para Exportar para Excel */}
      <TouchableOpacity style={styles.pdfButton} onPress={exportToExcel}>
        <Icon name="file-download" size={30} color="#FFFFFF" />
        <Text style={styles.pdfButtonText}>Exportar para Excel</Text>
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
