// src/screens/Quatro2.tsx
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  TextInput,
  ImageStyle,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { useCep } from "../hooks/useCep";

const Quatro2: React.FC = () => {
  const { cep, setCep, cepData, getCepData } = useCep();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("../components/fatec-logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>ViaCEP</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite o CEP (8 dígitos)"
          keyboardType="numeric"
          maxLength={8}
          value={cep}
          onChangeText={setCep}
        />

        <TouchableOpacity style={styles.button} onPress={getCepData}>
          <Ionicons name="search" size={20} color="#000" style={styles.icon} />
          <Text style={styles.buttonText}>Obter</Text>
        </TouchableOpacity>

        {cepData && (
          <View style={styles.resultContainer}>
            {cepData.erro === "true" ? (
              <Text style={styles.resultText}>CEP Inválido</Text>
            ) : (
              <>
                <Text style={styles.resultText}>CEP: {cepData.cep || "Não informado"}</Text>
                <Text style={styles.resultText}>
                  Logradouro: {cepData.logradouro || "Não informado"}
                </Text>
                <Text style={styles.resultText}>
                  Bairro: {cepData.bairro || "Não informado"}
                </Text>
                <Text style={styles.resultText}>
                  Cidade: {cepData.localidade || "Não informado"}/{cepData.uf || "Não informado"}
                </Text>
              </>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
  },
  card: {
    backgroundColor: "white",
    width: "80%",
    padding: 20,
    alignItems: "center",
    borderRadius: 10,
    elevation: 5,
  },
  logo: {
    width: 140,
    height: 140,
    resizeMode: "contain",
    marginBottom: 10,
  } as ImageStyle, // Explicitamente tipando como ImageStyle
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#ffff00",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  icon: {
    marginRight: 8,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "flex-start",
    width: "100%", // Corrigindo para uma string válida com unidade
  },
  resultText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
});

export default Quatro2;