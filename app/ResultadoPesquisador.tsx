import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PieChart } from "react-native-chart-kit"; // <-- Import da biblioteca
import styles from "../styles/ResultadosPesquisador";
import { api } from "@/api/api";
import { useNavigation } from "@react-navigation/native";

const ResultadoPesquisador: React.FC = () => {
  const [pesquisas, setPesquisas] = useState([]);
  const [userId, setUserId] = useState<string | null>("");
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [classificacao, setClassificacao] = useState<any>(null);
  const navigation = useNavigation();

  const generateRandomColor = () => {
    let color;
    do {
      // Gera uma cor aleatória
      color = `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`;
      // .padStart(6, "0") garante que sempre teremos 6 dígitos no hexadecimal
    } while (color.toLowerCase() === "#0a4e66"); // Verifica se é a cor indesejada

    return color;
  };

  // Dimensões da tela para ajustar o tamanho do gráfico
  const screenWidth = Dimensions.get("window").width;

  // Função para buscar o userId do AsyncStorage
  const getDataFromStorage = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem("userId");
      setUserId(storedUserId);
      console.log("User ID obtido do AsyncStorage:", storedUserId);
    } catch (error) {
      console.error("Erro ao buscar userId do AsyncStorage:", error);
    }
  };

  // Função para buscar as pesquisas do pesquisador
  const fetchPesquisas = async () => {
    try {
      console.log("Buscando pesquisas para userId:", userId);
      const url = `/PesquisasAll?userId=${userId}`;
      const response = await api.get(url);
      setPesquisas(response.data);
      console.log("Pesquisas carregadas:", response.data);
    } catch (error) {
      console.error("Erro ao buscar pesquisas:", error);
    }
  };

  // Função para buscar os dados de classificação da pesquisa selecionada
  const fetchClassificacao = async (pesquisaNome: string) => {
    try {
      console.log("Buscando classificação para pesquisa:", pesquisaNome);
      const response = await api.get(
        `/classificacaoResumo?nome_pesq=${pesquisaNome}`
      );
      setClassificacao(response.data);
      console.log("Dados da classificação:", response.data);
      console.log("Classificação carregada:", response.data);
    } catch (error) {
      console.error("Erro ao buscar classificação:", error);
    }
  };

  // useEffect para buscar userId e as pesquisas quando o componente é carregado
  useEffect(() => {
    getDataFromStorage();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchPesquisas();
    }
  }, [userId]);

  // Monta os dados para o PieChart somente se 'classificacao' tiver valores
  const pieChartData = classificacao
    ? [
        {
          name: "Masculino",
          population: classificacao.totalMasculino || 0,
          color: generateRandomColor(),
          legendFontColor: "#FFF",
          legendFontSize: 20,
        },
        {
          name: "Feminino",
          population: classificacao.totalFeminino || 0,
          color: generateRandomColor(),
          legendFontColor: "#FFF",
          legendFontSize: 18,
        },
      ]
    : [];

  const pieChartDataLocalidade =
    classificacao?.localidades?.map((local) => ({
      name: local.localidade,
      population: parseFloat(local.percent),
      color: generateRandomColor(), // Gera uma cor aleatória para cada localidade
      legendFontColor: "#FFF",
      legendFontSize: 18,
    })) || [];

  const pieChartDataFaixaEtaria =
    classificacao?.faixaEtaria?.map((faixa) => ({
      name: faixa.faixa,
      population: parseFloat(faixa.percent),
      color: generateRandomColor(), // Gera uma cor aleatória
      legendFontColor: "#FFF",
      legendFontSize: 18,
    })) || [];

  return (
    <LinearGradient colors={["#032D45", "#0A4E66"]} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        {/* Usamos ScrollView para permitir rolagem se o conteúdo for maior que a tela */}
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}>
          <View style={styles.container}>
            <Text style={styles.title}>DASHBOARD</Text>

            {pesquisas.length === 0 ? (
              <Text style={styles.noDataText}>
                Nenhuma pesquisa cadastrada.
              </Text>
            ) : (
              <View style={{ zIndex: 2000, elevation: 1000 }}>
                <DropDownPicker
                  items={pesquisas.map((pesquisa) => ({
                    label: pesquisa.nome_pesq || "Sem nome",
                    value: pesquisa.nome_pesq,
                  }))}
                  placeholder="Selecione uma pesquisa"
                  open={open}
                  setOpen={setOpen}
                  value={selectedValue}
                  setValue={(callback) => {
                    const value =
                      typeof callback === "function"
                        ? callback(selectedValue)
                        : callback;
                    setSelectedValue(value);
                    if (typeof value === "string") {
                      console.log("Pesquisa selecionada:", value);
                      fetchClassificacao(value);
                    } else {
                      console.log(
                        "Erro: valor selecionado não é uma string:",
                        value
                      );
                    }
                  }}
                  style={{
                    backgroundColor: "#0A4E66",
                    borderWidth: 3,
                    borderColor: "#032D45",
                    borderRadius: 10,
                    marginTop: -30,
                  }}
                  dropDownContainerStyle={{
                    backgroundColor: "#032D45",
                    borderWidth: 1,
                    borderColor: "#0A4E66",
                    borderRadius: 8,
                    marginTop: -29,
                  }}
                  textStyle={{
                    color: "white",
                    fontSize: 16,
                  }}
                  placeholderStyle={{
                    color: "white",
                    fontSize: 20,
                  }}
                  zIndex={1000}
                />
              </View>
            )}

            {classificacao && (
              <>
                {/* Botão para navegar para classificação detalhada */}
                <TouchableOpacity
                  style={styles.buttonSearch}
                  onPress={() =>
                    navigation.navigate("UsuariosCadastrados", {
                      pesquisaNome: selectedValue,
                    })
                  }
                >
                  <Text style={styles.buttonTextI}>
                    Detalhes dos Participantes
                  </Text>
                </TouchableOpacity>

                {/* Classificação do nível de atividade física */}
                <View style={styles.resultContainer}>
                  <Text style={styles.resultTitle}>
                    Classificação Geral do Nível de Atividade Física
                  </Text>
                  <Text style={styles.resultSubtitle}>
                    DOS{" "}
                    <Text
                      style={{
                        color: generateRandomColor(),
                        fontWeight: "bold",
                      }}
                    >
                      {classificacao.totalParticipantes}
                    </Text>{" "}
                    PARTICIPANTES:
                  </Text>
                  <Text style={styles.resultItem}>
                    {classificacao.resumo.muitoAtivo} % SÃO ——{" "}
                    <Text
                      style={{
                        color: generateRandomColor(),
                        fontWeight: "bold",
                      }}
                    >
                      MUITO ATIVO
                    </Text>
                  </Text>
                  <Text style={styles.resultItem}>
                    {classificacao.resumo.ativo} % SÃO ——{" "}
                    <Text
                      style={{
                        color: generateRandomColor(),
                        fontWeight: "bold",
                      }}
                    >
                      ATIVO
                    </Text>
                  </Text>
                  <Text style={styles.resultItem}>
                    {classificacao.resumo.irregularAtivoA} % SÃO ——{" "}
                    <Text
                      style={{
                        color: generateRandomColor(),
                        fontWeight: "bold",
                      }}
                    >
                      IRREG. ATIVO A
                    </Text>
                  </Text>
                  <Text style={styles.resultItem}>
                    {classificacao.resumo.sedentario} % SÃO ——{" "}
                    <Text
                      style={{
                        color: generateRandomColor(),
                        fontWeight: "bold",
                      }}
                    >
                      SEDENTÁRIO
                    </Text>
                  </Text>
                </View>

                {/* Distribuição por Sexo */}
                <View
                  style={[
                    styles.resultContainer,
                    {
                      marginTop: 30,
                      alignItems: "center",
                      marginBottom: 10,
                      width: "100%",
                    },
                  ]}
                >
                  <Text style={styles.resultTitle}>Distribuição por Sexo</Text>
                  <PieChart
                    data={pieChartData}
                    width={screenWidth * 0.99}
                    height={250}
                    chartConfig={{
                      backgroundColor: "#FFFFFF",
                      backgroundGradientFrom: "#1E2923",
                      backgroundGradientTo: "#08130D",
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="30"
                    center={[0, 0]}
                    absolute={false}
                    hasLegend={false}
                  />

                  {/* Legenda customizada */}
                  <View
                    style={{
                      marginLeft: 250,
                      flexDirection: "column",
                      alignItems: "flex-start",
                      marginTop: -160,
                    }}
                  >
                    {pieChartData.map((item, index) => (
                      <View
                        key={index}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 30,
                        }}
                      >
                        <View
                          style={{
                            width: 12,
                            height: 12,
                            backgroundColor: item.color,
                            marginRight: 5,
                          }}
                        />
                        <Text style={{ color: "#FFF", fontSize: 20 }}>
                          {item.name === "Masculino"
                            ? `Masculino ${classificacao?.masculinoPercent}%`
                            : item.name === "Feminino"
                              ? `Feminino ${classificacao?.femininoPercent}%`
                              : item.name}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Gráfico de Localidade */}
                <View
                  style={[
                    styles.resultContainer,
                    {
                      marginTop: 30,
                      alignItems: "center",
                      marginBottom: 10,
                      width: "100%",
                    },
                  ]}
                >
                  <Text style={styles.resultTitle}>
                    Distribuição por Localidade
                  </Text>
                  <PieChart
                    data={pieChartDataLocalidade}
                    width={screenWidth * 0.99}
                    height={250}
                    chartConfig={{
                      backgroundColor: "#FFFFFF",
                      backgroundGradientFrom: "#1E2923",
                      backgroundGradientTo: "#08130D",
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="100"
                    center={[10, 10]}
                    absolute={false}
                    hasLegend={false}
                  />
                  <View
                    style={{
                      flexDirection: "column",
                      marginTop: 10,
                      alignItems: "flex-start",
                    }}
                  >
                    {pieChartDataLocalidade.map((item, index) => (
                      <View
                        key={index}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 15,
                          marginRight: -10,
                        }}
                      >
                        <View
                          style={{
                            width: 12,
                            height: 12,
                            backgroundColor: item.color,
                            marginRight: 10,
                          }}
                        />
                        <Text style={{ color: "#FFF", fontSize: 19 }}>
                          {item.name} {item.population}%
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Gráfico de Faixa Etária */}
                <View
                  style={[
                    styles.resultContainer,
                    {
                      marginTop: 30,
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                    },
                  ]}
                >
                  <Text style={styles.resultTitle}>
                    Distribuição por Faixa Etária
                  </Text>
                  <PieChart
                    data={pieChartDataFaixaEtaria}
                    width={screenWidth * 0.99}
                    height={250}
                    chartConfig={{
                      backgroundColor: "#FFFFFF",
                      backgroundGradientFrom: "#1E2923",
                      backgroundGradientTo: "#08130D",
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="20"
                    center={[0, 0]}
                    absolute={false}
                    hasLegend={false}
                  />
                  <View
                    style={{
                      marginLeft: 210,
                      flexDirection: "column",
                      alignItems: "flex-start",
                      marginTop: -180,
                    }}
                  >
                    {pieChartDataFaixaEtaria.map((item, index) => (
                      <View
                        key={index}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 30,
                        }}
                      >
                        <View
                          style={{
                            width: 12,
                            height: 12,
                            backgroundColor: item.color,
                            marginRight: 5,
                          }}
                        />
                        <Text style={{ color: "#FFF", fontSize: 19 }}>
                          {item.name} {item.population}%
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Botão de voltar */}
                <View style={styles.space}>
                  <TouchableOpacity
                    style={styles.buttonSearch}
                    onPress={() => navigation.navigate("Home")}
                  >
                    <Icon name="arrow-back" size={30} color="white" />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ResultadoPesquisador;
