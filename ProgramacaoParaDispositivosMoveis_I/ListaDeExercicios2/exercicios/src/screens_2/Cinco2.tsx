// src/screens/Cinco2.tsx
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import { useCep } from "../hooks/useCep";

const Cinco2: React.FC = () => {
  const { consultedCeps } = useCep();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Consultas de CEP</Text>
        <ScrollView style={styles.historyContainer}>
          {consultedCeps.length > 0 ? (
            consultedCeps.map((data, index) => (
              <View key={index} style={styles.historyItem}>
                <Text style={styles.historyText}>
                  CEP: {data.cep || "Não informado"} | Logradouro: {data.logradouro || "Não informado"} | Cidade: {data.localidade || "Não informado"}/{data.uf || "Não informado"}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.resultText}>Nenhuma consulta realizada.</Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: Constants.statusBarHeight,
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    width: "80%",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  historyContainer: {
    width: "100%",
    marginBottom: 20,
  },
  historyItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  historyText: {
    fontSize: 12,
    color: "#333",
  },
  resultText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginTop: 10,
  },
});

export default Cinco2;